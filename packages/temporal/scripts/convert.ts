#!/usr/bin/env bun
/**
 * convert — turn Temporal's two OpenAPI specs into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-temporal/specs/openapi.json        (WorkflowService)
 *         specs/spec-mirror-temporal/specs/cloud-openapi.json  (Cloud Ops API)
 *         patches/<model>/*.patch.json  (RFC-6902 patches per model)
 * Output: .generated-specs/temporal.json, .generated-specs/cloud.json
 *
 * The two APIs share nothing but auth: the WorkflowService is served by every
 * Temporal server under `/api/v1`, the Cloud Ops API only by Temporal Cloud
 * under `/cloud`. They become two service modules of one SDK, and
 * src/protocol.ts routes each call to its host by path.
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Temporal's pipeline
 * config. `scripts/generate.ts` compiles the models into src/services.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";

const root = path.resolve(import.meta.dir, "..");
const MODELS = ["temporal", "cloud"] as const;
const CLOUD_OUT_PATH = path.join(root, ".generated-specs", "cloud.json");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * gnostic emits each WorkflowService RPC twice — once under `/api/v1/…`
 * and once at the unprefixed google.api.http path. Keep the `/api/v1`
 * mapping when both exist so convert does not mint `listNamespaces2`.
 */
const dropDuplicateHttpBindings = (spec: {
  paths?: Record<string, Record<string, unknown>>;
}) => {
  const paths = spec.paths ?? {};
  const byId = new Map<string, Array<{ path: string; method: string }>>();
  for (const [p, item] of Object.entries(paths)) {
    for (const method of HTTP_METHODS) {
      const op = item?.[method] as { operationId?: unknown } | undefined;
      if (typeof op?.operationId !== "string") continue;
      const list = byId.get(op.operationId) ?? [];
      list.push({ path: p, method });
      byId.set(op.operationId, list);
    }
  }
  for (const locs of byId.values()) {
    if (locs.length < 2) continue;
    const preferred =
      locs.find((l) => l.path.startsWith("/api/v1/")) ?? locs[0]!;
    for (const loc of locs) {
      if (loc.path === preferred.path && loc.method === preferred.method) {
        continue;
      }
      delete paths[loc.path]?.[loc.method];
    }
  }
  for (const p of Object.keys(paths)) {
    const item = paths[p]!;
    if (!HTTP_METHODS.some((m) => item[m] !== undefined)) {
      delete paths[p];
    }
  }
};

interface ListRoute {
  /** Collection member of the 200 body (`namespaces`, `users`, …). */
  readonly items: string;
}

/**
 * Cloud Ops list endpoints, keyed `"GET <path>"`. Every Cloud Ops collection read
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
      name: "temporal",
      specPath: "specs/spec-mirror-temporal/specs/openapi.json",
      preprocess: dropDuplicateHttpBindings,
    },
    {
      name: "cloud",
      specPath: "specs/spec-mirror-temporal/specs/cloud-openapi.json",
      preprocess: (spec) => {
        renameDottedPathParams(spec);
        collectListRoutes(spec);
      },
      options: {
        namespace: "com.temporal.cloud",
        serviceName: "TemporalCloud",
        // `GetNamespaces` → `listNamespaces` on paginated collection reads,
        // and on `GetRegions`, the one unpaginated collection. Every other id
        // goes through the default verbNoun policy.
        operationNames: (operationId, ctx) => {
          const route = `${ctx.method.toUpperCase()} ${ctx.path}`;
          return listRoutes.has(route) || route === "GET /cloud/regions"
            ? operationId.replace(/^(Get|list)/, "list")
            : undefined;
        },
      },
    },
  ],
  // RFC-6902 patches live in patches/<model>/ (patches/cloud/ today).
  patchesDir: "patches",
  options: {
    namespace: "com.temporal.api",
    serviceName: "Temporal",
    skipDeprecated: true,
  },
  // Cloud pagination is stamped below, before the finalized marker.
  finalize: false,
});

// ---- Stamp cursor pagination on the Cloud Ops list reads ----
const cloudModel = JSON.parse(fs.readFileSync(CLOUD_OUT_PATH, "utf8"));
let stamped = 0;
for (const shape of Object.values<any>(cloudModel.shapes)) {
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
    `cloud: ${listRoutes.size} paginated route(s) detected but ${stamped} stamped`,
  );
}
fs.writeFileSync(CLOUD_OUT_PATH, JSON.stringify(cloudModel, null, 2) + "\n");
console.log(`   📄 cloud: ${stamped} paginated list operations`);

await finalizeConvert({
  root,
  patchesDir: false,
  operationNaming: "as-is",
  include: (resource) => (MODELS as readonly string[]).includes(resource),
});
