#!/usr/bin/env bun
/**
 * convert — S2's OpenAPI description → Smithy JSON models in .generated-specs.
 *
 * S2 publishes ONE OpenAPI 3.1 document (mirrored at
 * `specs/spec-mirror-s2/specs/openapi.json`) covering 26 operations across 6
 * tags; the layout wants one Smithy model — one service module — per tag.
 * The pipeline:
 *
 *   1. Read the full spec.
 *   2. Bucket operations by PRIMARY (first) tag — every operation in this
 *      spec carries exactly one.
 *   3. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`.
 *   4. Stamp `smithy.api#paginated` on the three list operations — see
 *      {@link paginationFor}.
 *
 * Operation ids are used VERBATIM — S2's are already unique, snake_case and
 * descriptive (`list_access_tokens`, `reconfigure_basin`) — and the
 * converter's default verbNoun policy plus the compiler's lowerCaming turn
 * them into `listAccessTokens` / `reconfigureBasin` for export. The two
 * records operations are already verb-first (`read`, `append`) and stay.
 *
 * S2 declares failures as concrete statuses against the shared `ErrorInfo`
 * envelope (`{ code, message }`) — 400/403/404 everywhere plus 408/412/416
 * on the records routes — with no per-operation error schema beyond it, so
 * no per-status error classes are generated (`statusToErrorClass: {}`):
 * failures are dispatched at runtime by S2Protocol from the status plus
 * core's shared HTTP status map (see src/protocol.ts).
 *
 * `scripts/generate.ts` (runGeneratorCli with `patchesDir: false` — the
 * Smithy patches, if any, apply via `finalizeConvert` HERE) then compiles
 * the models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const rootDir = path.resolve(import.meta.dir, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-s2/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Tag → model/resource name (the generated module's filename). S2's tags are
 * kebab-case (`access-tokens`), so the slug is just an underscore join.
 */
const toSlug = (tag: string): string =>
  tag
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(`${specPath} not found — run \`pnpm specs:local s2\` (or specs:fetch) first`);
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// ---- 2. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
const unrouted: string[] = [];
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const rawTag: string | undefined =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
    if (rawTag === undefined) {
      unrouted.push(`${method.toUpperCase()} ${pathTemplate}`);
    }
    const slug = toSlug(rawTag ?? "misc") || "misc";
    if (!tagBuckets.has(slug)) tagBuckets.set(slug, {});
    const bucketPaths = tagBuckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      // Carry any path-level params into the slice.
      const pathParams = (pathItem as Record<string, any>).parameters;
      bucketPaths[pathTemplate] = pathParams ? { parameters: pathParams } : {};
    }
    (bucketPaths[pathTemplate] as Record<string, unknown>)[method] = op;
  }
}
if (unrouted.length) {
  console.warn(
    `   ⚠️  ${unrouted.length} untagged operation(s) fell into \`misc\`:\n      ` +
      unrouted.join("\n      "),
  );
}

// ---- 3. Pagination ---------------------------------------------------------
/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page.
 *
 * S2 pages by START-AFTER: `?start_after=<id>&limit=N` in, and a response
 * carrying the collection array beside a `has_more` boolean — there is no
 * cursor member on the response, so the converter's own detection (which
 * looks for a `next_token`/`cursor`/`next_page`) never fires and the trait
 * is stamped here instead. The next page's `start_after` is the last item's
 * identity field, which the paginated trait has no slot for, so it rides in
 * `outputToken`; `src/pagination.ts`'s `paginateStartAfter` reads it back.
 *
 * All three parts are read off the OpenAPI operation, so an endpoint that
 * stops paging upstream stops being stamped here:
 *   • `inputToken` — the `start_after` query parameter must exist;
 *   • `hasNextPage` — the 200 response must carry a `has_more` boolean;
 *   • `items` — the response's top-level array property (`access_tokens`,
 *     `basins`, `streams`);
 *   • `outputToken` — the item schema's identity field: `id` when it has
 *     one (access tokens), else `name` (basins, streams).
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const hasStartAfter = (op.parameters ?? []).some(
    (p: any) => p?.in === "query" && p?.name === "start_after",
  );
  if (!hasStartAfter) return undefined;

  const schema = op.responses?.["200"]?.content?.["application/json"]?.schema;
  const resolved = deref(schema);
  const props = resolved?.properties;
  if (!props || typeof props !== "object") return undefined;
  if (props.has_more?.type !== "boolean") return undefined;

  const itemsEntry = Object.entries<any>(props).find(
    ([name, value]) => name !== "has_more" && deref(value)?.type === "array",
  );
  if (itemsEntry === undefined) return undefined;
  const [items, itemsSchema] = itemsEntry;

  const itemProps = deref(deref(itemsSchema)?.items)?.properties ?? {};
  const cursorField = "id" in itemProps ? "id" : "name" in itemProps ? "name" : undefined;
  if (cursorField === undefined) {
    throw new Error(
      `paginated operation ${op.operationId}: items carry neither \`id\` nor \`name\` — ` +
        `start-after pagination has no cursor field to follow`,
    );
  }

  return {
    inputToken: "start_after",
    outputToken: cursorField,
    items,
    pageSize: "limit",
    hasNextPage: "has_more",
  };
};

/** Resolve one level of `$ref` against the full spec's components. */
function deref(schema: any): any {
  const ref = schema?.$ref;
  if (typeof ref !== "string") return schema;
  const prefix = "#/components/schemas/";
  if (!ref.startsWith(prefix)) return schema;
  return fullSpec.components?.schemas?.[ref.slice(prefix.length)] ?? schema;
}

// ---- 4. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
let totalPaginated = 0;
for (const slug of [...tagBuckets.keys()].sort()) {
  const paths = tagBuckets.get(slug)!;
  const subSpec = { ...fullSpec, paths };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.s2.${slug}`,
    serviceName: toPascal(slug),
    // S2's `in: header` parameters are real per-call inputs — the
    // idempotency `s2-request-token` on creates and the records routes'
    // `s2-format` / `s2-encryption-key` — not transport headers the protocol
    // already sends, so they are modeled as input members.
    headerParams: true,
    // DELETEs answer `202 Accepted` with no body; include it so those
    // operations generate a void output rather than none at all.
    successStatuses: ["200", "201", "202", "204"],
    // Every failure shares the `{ code, message }` ErrorInfo envelope and no
    // operation narrows which codes it can produce, so there is nothing
    // per-status to type — see the module docblock and src/errors.ts.
    statusToErrorClass: {},
  });

  const operations = Object.entries<any>(model.shapes).filter(([, s]) => s.type === "operation");
  if (operations.length === 0) {
    console.warn(`   ⚠️  ${slug}: no operations — bucket dropped`);
    continue;
  }

  // ---- 5. Stamp pagination, matching on the http trait's method + uri ----
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
  // Every route the pagination pass identified must have landed on an
  // operation; a miss means the uri no longer round-trips and the SDK would
  // silently lose `.pages()` on that endpoint.
  if (paginated !== byRoute.size) {
    throw new Error(
      `${slug}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped — ` +
        `an operation's http uri no longer matches its OpenAPI path`,
    );
  }

  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(model, null, 2) + "\n");
  written++;
  totalOps += operations.length;
  totalPaginated += paginated;
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root: rootDir });
