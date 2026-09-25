#!/usr/bin/env bun
/**
 * convert — turn the Temporal Cloud Ops API OpenAPI spec into a Smithy 2.0
 * JSON model.
 *
 * Input:  specs/spec-mirror-temporal-cloud/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/temporal-cloud.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Temporal Cloud's
 * pipeline config. `scripts/generate.ts` compiles the model into
 * src/services.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";

const root = path.resolve(import.meta.dir, "..");
const NAME = "temporal-cloud";
const OUT_PATH = path.join(root, ".generated-specs", `${NAME}.json`);

interface ListRoute {
  /** Collection member of the 200 body (`namespaces`, `users`, …). */
  readonly items: string;
}

/**
 * List endpoints, keyed `"GET <path>"`. Every Cloud Ops collection read
 * takes `pageSize`/`pageToken` and answers `nextPageToken` beside one array
 * — the gRPC List convention — but the RPCs are named `Get<Things>`, so
 * both the `list` verb and the pagination trait are derived here from that
 * shape. Filled by `preprocess`, which runs before conversion.
 */
const listRoutes = new Map<string, ListRoute>();

const collectListRoutes = (spec: any) => {
  const schemas = spec.components?.schemas ?? {};
  const deref = (s: any) =>
    typeof s?.$ref === "string"
      ? schemas[s.$ref.replace("#/components/schemas/", "")]
      : s;
  for (const [p, item] of Object.entries<any>(spec.paths ?? {})) {
    const op = item?.get;
    if (!op) continue;
    const takesToken = (op.parameters ?? []).some(
      (param: any) => param?.in === "query" && param?.name === "pageToken",
    );
    const body = deref(
      op.responses?.["200"]?.content?.["application/json"]?.schema,
    );
    const props = body?.properties ?? {};
    if (!takesToken || props.nextPageToken === undefined) continue;
    const items = Object.entries<any>(props).find(
      ([, v]) => deref(v)?.type === "array",
    )?.[0];
    if (items === undefined) {
      throw new Error(`GET ${p}: paginated response has no array member`);
    }
    listRoutes.set(`GET ${p}`, { items });
  }
};

/**
 * gRPC transcoding binds `{spec.name}` into the request message's nested
 * `spec.name`; the converter would surface it as a `spec_name` member.
 * The path segment is only a placeholder on the wire, so rename it to its
 * last segment (`name`) — the camelCase spelling the rest of the API uses.
 */
const renameDottedPathParams = (spec: any) => {
  const schemas = spec.components?.schemas ?? {};
  for (const p of Object.keys(spec.paths ?? {})) {
    if (!/\{[^}]+\.[^}]+\}/.test(p)) continue;
    const item = spec.paths[p];
    const renames = new Map<string, string>();
    for (const op of Object.values<any>(item)) {
      for (const param of op?.parameters ?? []) {
        if (param?.in !== "path" || !param.name.includes(".")) continue;
        const short = param.name.split(".").at(-1)!;
        const taken =
          (op.parameters ?? []).some((q: any) => q?.name === short) ||
          short in
            (schemas[
              op.requestBody?.content?.["application/json"]?.schema?.$ref
                ?.split("/")
                .at(-1) ?? ""
            ]?.properties ?? {});
        if (taken) {
          throw new Error(`${p}: cannot rename {${param.name}} to {${short}}`);
        }
        renames.set(param.name, short);
        param.name = short;
      }
    }
    let renamed = p;
    for (const [from, to] of renames) {
      renamed = renamed.replace(`{${from}}`, `{${to}}`);
    }
    if (renamed === p) continue;
    if (spec.paths[renamed]) {
      // `/audit-log-sinks/{name}` already exists for GET/DELETE; merge the
      // POST into it.
      for (const [method, op] of Object.entries(item)) {
        if (spec.paths[renamed][method] !== undefined) {
          throw new Error(`${p}: ${method} already defined on ${renamed}`);
        }
        spec.paths[renamed][method] = op;
      }
    } else {
      spec.paths[renamed] = item;
    }
    delete spec.paths[p];
  }
};

await runOpenApiConvert({
  root,
  specs: [
    {
      name: NAME,
      specPath: "specs/spec-mirror-temporal-cloud/specs/openapi.json",
      preprocess: (spec) => {
        renameDottedPathParams(spec);
        collectListRoutes(spec);
      },
    },
  ],
  patchesDir: "patches",
  options: {
    namespace: "com.temporal.cloud",
    serviceName: "TemporalCloud",
    skipDeprecated: true,
    // `GetNamespaces` → `listNamespaces` on paginated collection reads, and
    // on `GetRegions`, the one unpaginated collection. Every other id goes
    // through the default verbNoun policy.
    operationNames: (operationId, ctx) => {
      const route = `${ctx.method.toUpperCase()} ${ctx.path}`;
      return listRoutes.has(route) || route === "GET /cloud/regions"
        ? operationId.replace(/^(Get|list)/, "list")
        : undefined;
    },
  },
  // Pagination is stamped below, before the finalized marker is written.
  finalize: false,
});

// ---- Stamp cursor pagination, matching on the http trait's method + uri ----
const model = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
let stamped = 0;
for (const shape of Object.values<any>(model.shapes)) {
  if (shape.type !== "operation") continue;
  const http = shape.traits?.["smithy.api#http"];
  const route = http && listRoutes.get(`${http.method} ${http.uri}`);
  if (!route) continue;
  shape.traits["smithy.api#paginated"] = {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: route.items,
    pageSize: "pageSize",
  };
  stamped++;
}
// A miss means an operation's uri no longer round-trips to its OpenAPI path
// and the SDK would silently lose `.pages()` on that endpoint.
if (stamped !== listRoutes.size) {
  throw new Error(
    `${listRoutes.size} paginated route(s) detected but ${stamped} stamped`,
  );
}
fs.writeFileSync(OUT_PATH, JSON.stringify(model, null, 2) + "\n");
console.log(`   📄 ${stamped} paginated list operations`);

await finalizeConvert({
  root,
  patchesDir: false,
  operationNaming: "as-is",
  include: (resource) => resource === NAME,
});
