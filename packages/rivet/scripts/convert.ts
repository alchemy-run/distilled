#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Rivet engine's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Rivet publishes ONE OpenAPI 3.1 document (mirrored at
 * `specs/spec-mirror-rivet/specs/openapi.json`). The layout wants one Smithy
 * model — one service module — per API area, so operations are bucketed by
 * the first segment of their primary tag (`actors::list` and `actors::get`
 * both land in `actors`, `auth::tokens` in `auth`).
 *
 * Every failure shares the `{ group, code, message }` ErrorResponse envelope
 * and no operation narrows which codes it can produce, so no per-status error
 * classes are generated (`statusToErrorClass: {}`): RivetProtocol dispatches
 * on core's shared HTTP status map, and typed per-operation errors are added
 * by patches that match the `<group>.<code>` pair.
 *
 * Lists page by cursor: `?cursor=&limit=` in, `{ <items>, pagination: {
 * cursor } }` out, with a null cursor on the last page. The paginated trait
 * is stamped from the OpenAPI operation, so an endpoint that stops paging
 * upstream stops being stamped.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-rivet/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** `actors::list` → `actors`, `auth::tokens` → `auth`. */
const toSlug = (tag: string): string =>
  tag
    .split("::")[0]!
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

/** Irregular operation names, keyed by `METHOD path`. */
const OPERATION_NAMES: Record<string, string> = {
  "PUT /actors": "getOrCreateActor",
  "POST /actors/{actor_id}/reschedule": "rescheduleActor",
  "POST /actors/{actor_id}/sleep": "sleepActor",
  "GET /auth/tokens/inspect": "inspectAuthToken",
};

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(`${specPath} not found — run \`pnpm specs:local rivet\` (or specs:fetch) first`);
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

/** Resolve one level of `$ref` against the full spec's components. */
function deref(schema: any): any {
  const ref = schema?.$ref;
  if (typeof ref !== "string") return schema;
  const prefix = "#/components/schemas/";
  if (!ref.startsWith(prefix)) return schema;
  return fullSpec.components?.schemas?.[ref.slice(prefix.length)] ?? schema;
}

// ---- 2. Bucket paths by area -----------------------------------------------
const buckets = new Map<string, Record<string, Record<string, unknown>>>();
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const tag: string | undefined = Array.isArray(op.tags) ? op.tags[0] : undefined;
    if (tag === undefined) {
      throw new Error(`${method.toUpperCase()} ${pathTemplate} has no tag to place it in a module`);
    }
    const slug = toSlug(tag);
    if (!buckets.has(slug)) buckets.set(slug, {});
    const bucketPaths = buckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      const pathParams = (pathItem as Record<string, any>).parameters;
      bucketPaths[pathTemplate] = pathParams ? { parameters: pathParams } : {};
    }
    (bucketPaths[pathTemplate] as Record<string, unknown>)[method] = op;
  }
}

// ---- 3. Pagination ---------------------------------------------------------
/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page: a `cursor` query parameter in, and a 200 response with a
 * `pagination` object beside exactly one array property out.
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const params: any[] = op.parameters ?? [];
  if (!params.some((p) => p?.in === "query" && p?.name === "cursor")) return undefined;

  const props = deref(op.responses?.["200"]?.content?.["application/json"]?.schema)?.properties;
  if (!props || typeof props !== "object" || props.pagination === undefined) return undefined;

  const arrays = Object.entries<any>(props).filter(
    ([name, value]) => name !== "pagination" && deref(value)?.type === "array",
  );
  if (arrays.length !== 1) {
    throw new Error(
      `paginated operation ${op.operationId}: expected one array beside \`pagination\`, found ${arrays.length}`,
    );
  }

  return {
    mode: "cursor",
    inputToken: "cursor",
    outputToken: "pagination.cursor",
    items: arrays[0]![0],
    ...(params.some((p) => p?.in === "query" && p?.name === "limit") ? { pageSize: "limit" } : {}),
  };
};

// ---- 4. Convert each bucket ------------------------------------------------
clearModels(outDir);

let written = 0;
let totalOps = 0;
let totalPaginated = 0;
for (const slug of [...buckets.keys()].sort()) {
  const paths = buckets.get(slug)!;
  const model = convertOpenApiToSmithy(
    { ...fullSpec, paths },
    {
      deferNaming: true,
      namespace: `com.rivet.${slug}`,
      serviceName: toPascal(slug),
      // Every failure is the shared ErrorResponse envelope — see the module
      // docblock and src/errors.ts.
      statusToErrorClass: {},
      // Ids the verbNoun heuristic leaves noun-first (`actors_sleep`,
      // `auth_tokens_inspect`).
      operationNames: OPERATION_NAMES,
    },
  );

  const operations = Object.entries<any>(model.shapes).filter(([, s]) => s.type === "operation");
  if (operations.length === 0) {
    throw new Error(`${slug}: no operations converted`);
  }

  const byRoute = new Map<string, Record<string, string>>();
  for (const [pathTemplate, pathItem] of Object.entries<any>(paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op) continue;
      const trait = paginationFor(op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${pathTemplate}`, trait);
    }
  }
  let paginated = 0;
  for (const [, shape] of operations) {
    const http = shape.traits?.["smithy.api#http"];
    if (!http) continue;
    const trait = byRoute.get(`${http.method} ${http.uri}`);
    if (!trait) continue;
    shape.traits["smithy.api#paginated"] = trait;
    paginated++;
  }
  // Every paginated route must land on an operation; a miss means the uri no
  // longer round-trips and the SDK would silently lose `.pages()`.
  if (paginated !== byRoute.size) {
    throw new Error(
      `${slug}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped — ` +
        `an operation's http uri no longer matches its OpenAPI path`,
    );
  }

  writeModel(path.join(outDir, `${slug}.json`), model);
  written++;
  totalOps += operations.length;
  totalPaginated += paginated;
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root: rootDir });
