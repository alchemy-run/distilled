#!/usr/bin/env bun
/**
 * convert — Freestyle's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Freestyle publishes ONE OpenAPI 3.1 document (mirrored at
 * `specs/spec-mirror-freestyle/specs/openapi.json`) covering the v5 HTTP
 * API across 11 tags; the layout wants one Smithy model — one service
 * module — per tag. The pipeline:
 *
 *   1. Read the full spec.
 *   2. Bucket operations by PRIMARY (first) tag — every operation in this
 *      spec carries exactly one.
 *   3. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`.
 *   4. Stamp `smithy.api#paginated` on the limit/offset list operations —
 *      see {@link paginationFor}.
 *
 * Operation ids are used VERBATIM — Freestyle's are already unique,
 * snake_case and descriptive (`list_vms`, `create_firewall_rule`) — and
 * the converter's default verbNoun policy plus the compiler's lowerCaming
 * turn them into `listVms` / `createFirewallRule` for export.
 *
 * `scripts/generate.ts` (runGeneratorCli with `patchesDir: false`) then
 * compiles the models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const rootDir = path.resolve(import.meta.dir, "..");
const specPath = resolveSpecPath(
  rootDir,
  "specs/spec-mirror-freestyle/specs/openapi.json",
);
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Tag → model/resource name (the generated module's filename). Freestyle's
 * tags are title case, some with spaces (`Background requests`, `VMs`).
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
  throw new Error(
    `${specPath} not found — run \`pnpm specs:local freestyle\` (or specs:fetch) first`,
  );
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// The list-identities response schema is named `ListIdentities`, which is
// also the Smithy name of the `list_identities` operation. Rename the
// schema so the operation can keep `listIdentities` on the TS surface.
renameSchema(fullSpec, "ListIdentities", "ListIdentitiesResponse");

// ---- 2. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
const unrouted: string[] = [];
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(
  fullSpec.paths,
)) {
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
 * Freestyle pages by OFFSET: `?offset=N&limit=M` in, and a response whose
 * root object carries the collection array beside `totalCount` (or `total`
 * on identities). The converter's own detection looks for cursor/token/
 * next_page members, so it never fires on this shape and the trait is
 * stamped here. `src/pagination.ts`'s `paginateOffset` walks
 * `offset += items.length` until it reaches the total (or a page comes
 * back empty).
 *
 * All three parts are read off the OpenAPI operation, so an endpoint that
 * stops paging upstream stops being stamped here:
 *   • `inputToken` — the `offset` query parameter must exist, with `limit`;
 *   • `outputToken` — `totalCount` or `total` on the 200 body;
 *   • `items` — the response's top-level array property (`vms`, `rules`, …).
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const params = op.parameters ?? [];
  const hasLimit = params.some(
    (p: any) => p?.in === "query" && p?.name === "limit",
  );
  const hasOffset = params.some(
    (p: any) => p?.in === "query" && p?.name === "offset",
  );
  if (!hasLimit || !hasOffset) return undefined;

  const schema = deref(
    op.responses?.["200"]?.content?.["application/json"]?.schema,
  );
  const props = schema?.properties;
  if (!props || typeof props !== "object") return undefined;

  const totalField =
    "totalCount" in props
      ? "totalCount"
      : "total" in props
        ? "total"
        : undefined;
  if (totalField === undefined) return undefined;

  const items = Object.entries<any>(props).find(
    ([name, value]) => name !== totalField && deref(value)?.type === "array",
  )?.[0];
  if (items === undefined) return undefined;

  return {
    inputToken: "offset",
    outputToken: totalField,
    items,
    pageSize: "limit",
  };
};

/** Rename a component schema and rewrite every `$ref` that pointed at it. */
function renameSchema(spec: any, from: string, to: string): void {
  const schemas = spec.components?.schemas;
  if (!schemas?.[from] || schemas[to] !== undefined) return;
  schemas[to] = schemas[from];
  delete schemas[from];
  const fromRef = `#/components/schemas/${from}`;
  const toRef = `#/components/schemas/${to}`;
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      for (const v of node) walk(v);
      return;
    }
    if (node === null || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    if (obj.$ref === fromRef) obj.$ref = toRef;
    for (const v of Object.values(obj)) walk(v);
  };
  walk(spec);
}

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
    namespace: `com.freestyle.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    // Range on file reads is a real per-call input, not a protocol header.
    headerParams: true,
    // Background-request poll and several deletes answer 202/204.
    successStatuses: ["200", "201", "202", "204"],
  });

  const operations = Object.entries<any>(model.shapes).filter(
    ([, s]) => s.type === "operation",
  );
  if (operations.length === 0) {
    console.warn(`   ⚠️  ${slug}: no operations — bucket dropped`);
    continue;
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
  if (paginated !== byRoute.size) {
    throw new Error(
      `${slug}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped — ` +
        `an operation's http uri no longer matches its OpenAPI path`,
    );
  }

  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify(model, null, 2) + "\n",
  );
  written++;
  totalOps += operations.length;
  totalPaginated += paginated;
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root: rootDir });
