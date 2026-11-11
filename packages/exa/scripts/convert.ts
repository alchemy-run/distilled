#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Exa's OpenAPI documents → Smithy JSON models in .generated-specs.
 *
 * Input:  specs/spec-mirror-exa/specs/exa-spec.json              (public API)
 *         specs/spec-mirror-exa/specs/team-management-spec.yaml  (Team Management API)
 *         patches/<name>/*.json  (RFC-6902 patches to the Smithy models)
 * Output: .generated-specs/{api,team_management}.json
 *
 * Each document becomes one service module. Two steps run around the shared
 * OpenAPI→Smithy conversion:
 *
 *   1. Servers are folded into routes. The public document serves Websets
 *      from a path-level server (`https://api.exa.ai/websets`); a route whose
 *      path or operation declares a server under the document's server gets
 *      that server's extra path as a prefix (`/v0/websets` →
 *      `/websets/v0/websets`), so every operation of a document shares one
 *      base URL. A server on another origin fails the run.
 *   2. Cursor lists are stamped `smithy.api#paginated`: a `cursor` query
 *      parameter in, and a 200 body with `nextCursor` beside a `data` array
 *      out. The trait is derived from the OpenAPI operation, so an endpoint
 *      that stops paging upstream stops being stamped.
 *
 * Then `finalizeConvert` applies the patches and the verbNoun names.
 * `scripts/generate.ts` compiles the models into src/services.
 */
import * as path from "node:path";
import { readModel, writeModel } from "@distilled.cloud/dev/codegen/models";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { parse as parseYaml } from "yaml";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

const SPECS = [
  { name: "api", file: "exa-spec.json", serviceName: "Api" },
  { name: "team_management", file: "team-management-spec.yaml", serviceName: "TeamManagement" },
] as const;

/**
 * Websets monitors (`monitors-*`) would take the names of the search
 * monitors (`createMonitor`, …) in the same module; name them after the
 * Webset they watch.
 */
const OPERATION_NAMES: Record<string, string> = {
  "monitors-create": "createWebsetMonitor",
  "monitors-list": "listWebsetMonitors",
  "monitors-get": "getWebsetMonitor",
  "monitors-update": "updateWebsetMonitor",
  "monitors-delete": "deleteWebsetMonitor",
  "monitors-runs-list": "listWebsetMonitorRuns",
  "monitors-runs-get": "getWebsetMonitorRun",
};

/** Each document after {@link foldServers}, for the pagination stamp. */
const folded = new Map<string, any>();

const serverUrl = (servers: unknown, where: string): URL => {
  const url = Array.isArray(servers) ? servers[0]?.url : undefined;
  if (typeof url !== "string" || url === "") {
    throw new Error(`${where}: no servers[0].url`);
  }
  return new URL(url);
};

const trimSlash = (p: string): string => p.replace(/\/+$/, "");

/** Fold path- and operation-level servers into the routes (step 1). */
const foldServers = (name: string) => (spec: any) => {
  const base = serverUrl(spec.servers, `${name}: document`);
  const basePath = trimSlash(base.pathname);

  const prefixFor = (servers: unknown, where: string): string => {
    if (servers === undefined) return "";
    const url = serverUrl(servers, where);
    const urlPath = trimSlash(url.pathname);
    if (url.origin !== base.origin || !`${urlPath}/`.startsWith(`${basePath}/`)) {
      throw new Error(`${where}: server ${url.href} is not under ${base.href}`);
    }
    return urlPath.slice(basePath.length);
  };

  const paths: Record<string, any> = {};
  for (const [route, item] of Object.entries<any>(spec.paths ?? {})) {
    const { servers: pathServers, ...rest } = item;
    const shared = Object.fromEntries(
      Object.entries(rest).filter(([key]) => !(HTTP_METHODS as readonly string[]).includes(key)),
    );
    for (const method of HTTP_METHODS) {
      const op = rest[method];
      if (!op) continue;
      const { servers: opServers, ...opRest } = op;
      const where = `${name}: ${method.toUpperCase()} ${route}`;
      const target = `${prefixFor(opServers ?? pathServers, where)}${route}`;
      paths[target] ??= { ...shared };
      if (paths[target][method]) {
        throw new Error(`${where}: folds onto ${target}, which already has ${method}`);
      }
      paths[target][method] = opRest;
    }
  }
  spec.paths = paths;
  folded.set(name, spec);
};

/** Resolve one level of `$ref` against the document's components. */
const deref = (spec: any, node: any): any => {
  const ref = node?.$ref;
  if (typeof ref !== "string" || !ref.startsWith("#/components/")) return node;
  const [kind, key] = ref.slice("#/components/".length).split("/");
  return spec.components?.[kind!]?.[key!] ?? node;
};

/** The `smithy.api#paginated` trait for one operation, or undefined (step 2). */
const paginationFor = (spec: any, op: any): Record<string, string> | undefined => {
  const params: any[] = (op.parameters ?? []).map((p: any) => deref(spec, p));
  const query = (n: string) => params.some((p) => p?.in === "query" && p?.name === n);
  if (!query("cursor")) return undefined;

  const props = deref(
    spec,
    op.responses?.["200"]?.content?.["application/json"]?.schema,
  )?.properties;
  if (props?.nextCursor === undefined || deref(spec, props.data)?.type !== "array") {
    return undefined;
  }
  return {
    mode: "cursor",
    inputToken: "cursor",
    outputToken: "nextCursor",
    items: "data",
    ...(query("limit") ? { pageSize: "limit" } : {}),
  };
};

await runOpenApiConvert({
  root,
  specs: SPECS.map((s) => ({
    name: s.name,
    specPath: `specs/spec-mirror-exa/specs/${s.file}`,
    preprocess: foldServers(s.name),
    options: {
      namespace: `com.exa.${s.name}`,
      serviceName: s.serviceName,
    },
  })),
  patchesDir: "patches",
  finalize: false,
  parse: (text, specPath) => (specPath.endsWith(".yaml") ? parseYaml(text) : JSON.parse(text)),
  options: {
    namespace: "com.exa.api",
    serviceName: "Exa",
    skipDeprecated: true,
    // Exa documents 402 Payment Required (credits exhausted, a budget
    // exceeded) on the paid endpoints.
    statusToErrorClass: {
      "400": "BadRequest",
      "402": "PaymentRequired",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
    },
    // Batches require an `Exa-Beta` header, so header parameters are inputs.
    headerParams: true,
    operationNames: OPERATION_NAMES,
  },
});

let stamped = 0;
for (const { name } of SPECS) {
  const spec = folded.get(name);
  const modelPath = path.join(outDir, `${name}.json`);
  const model = readModel(modelPath);

  const byRoute = new Map<string, Record<string, string>>();
  for (const [route, item] of Object.entries<any>(spec.paths)) {
    for (const method of HTTP_METHODS) {
      const op = item[method];
      if (!op || op.deprecated === true) continue;
      const trait = paginationFor(spec, op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${route}`, trait);
    }
  }

  let paginated = 0;
  for (const shape of Object.values<any>(model.shapes)) {
    if (shape?.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    const trait = http ? byRoute.get(`${http.method} ${http.uri}`) : undefined;
    if (!trait) continue;
    shape.traits["smithy.api#paginated"] = trait;
    paginated++;
  }
  // Every paginated route must land on an operation; a miss means the uri no
  // longer round-trips and the SDK would silently lose `.pages()`.
  if (paginated !== byRoute.size) {
    throw new Error(
      `${name}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped — ` +
        `an operation's http uri no longer matches its OpenAPI path`,
    );
  }
  stamped += paginated;
  writeModel(modelPath, model);
}
console.log(`🔗 stamped ${stamped} paginated operation(s)`);

await finalizeConvert({ root });
