#!/usr/bin/env bun
/**
 * convert — STACKIT's OpenAPI descriptions → Smithy JSON models in
 * .generated-specs.
 *
 * STACKIT publishes one OpenAPI document per product (mirrored at
 * `specs/spec-mirror-stackit/specs/<service>.json` — latest version per
 * product). Each file becomes one Smithy model / service module.
 *
 * After the shared OpenAPI→Smithy conversion:
 *
 *   1. Stamp the spec's `servers[0].url` onto every operation's
 *      `smithy.api#http.baseUrl` so the generated `T.Http` carries the
 *      product host (IaaS, SKE, DNS, … each have their own).
 *   2. Stamp `smithy.api#paginated` on list operations that take `page` /
 *      `pageSize` and answer with `totalPages` plus a collection array —
 *      see {@link paginationFor}.
 *
 * `scripts/generate.ts` then compiles the models. Patches, when added, live
 * in `patches/<name>/*.json` and apply here via `runOpenApiConvert`.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const root = path.resolve(import.meta.dir, "..");
const manifestPath = resolveSpecPath(root, "specs/spec-mirror-stackit/specs/_manifest.json");
const specsDir = path.dirname(manifestPath);
const outDir = path.join(root, ".generated-specs");

if (!fs.existsSync(manifestPath)) {
  throw new Error(
    `${manifestPath} not found — run \`pnpm specs:local stackit\` (or specs:fetch) first`,
  );
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as Array<{
  readonly service: string;
  readonly version: string;
  readonly output: string;
}>;

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

const specServerUrl = (spec: any): string => {
  const servers = spec?.servers;
  if (!Array.isArray(servers) || servers.length === 0) {
    throw new Error("OpenAPI document has no servers[0].url");
  }
  const url = servers[0]?.url;
  if (typeof url !== "string" || url === "") {
    throw new Error("OpenAPI document has no servers[0].url");
  }
  return url.replace(/\/+$/, "");
};

/** Resolve one level of `$ref` against the spec's components. */
const deref = (spec: any, schema: any): any => {
  const ref = schema?.$ref;
  if (typeof ref !== "string") return schema;
  const prefix = "#/components/schemas/";
  if (!ref.startsWith(prefix)) return schema;
  return spec.components?.schemas?.[ref.slice(prefix.length)] ?? schema;
};

/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page.
 *
 * STACKIT pages by NUMBER: `?page=N&pageSize=M` in, and a 200 whose schema
 * carries `totalPages` beside a collection array (`zones`, `rrSets`, …).
 * Core's `paginatePageNumber` treats `outputToken` as the NEXT page, so
 * pointing it at `totalPages` would skip to the last page; the trait's
 * `mode` is `page` (the PaginatedTrait union) and
 * `src/pagination.ts`'s `paginateByTotalPages` advances by one until
 * `page >= totalPages`.
 */
const paginationFor = (spec: any, op: any): Record<string, string> | undefined => {
  const params = [...((op.parameters ?? []) as any[])];
  const hasPage = params.some((p) => p?.in === "query" && p?.name === "page");
  const hasPageSize = params.some(
    (p) => p?.in === "query" && (p?.name === "pageSize" || p?.name === "page_size"),
  );
  if (!hasPage || !hasPageSize) return undefined;

  const schema = deref(spec, op.responses?.["200"]?.content?.["application/json"]?.schema);
  const props = schema?.properties;
  if (!props || typeof props !== "object") return undefined;
  if (props.totalPages === undefined && props.total_pages === undefined) {
    return undefined;
  }
  const totalPages = props.totalPages !== undefined ? "totalPages" : "total_pages";
  const pageSize = params.some((p) => p?.in === "query" && p?.name === "pageSize")
    ? "pageSize"
    : "page_size";

  const items = Object.entries<any>(props).find(
    ([name, value]) =>
      name !== totalPages &&
      name !== "message" &&
      name !== "itemsPerPage" &&
      name !== "items_per_page" &&
      name !== "totalItems" &&
      name !== "total_items" &&
      deref(spec, value)?.type === "array",
  )?.[0];
  if (items === undefined) return undefined;

  return {
    mode: "page",
    inputToken: "page",
    outputToken: totalPages,
    items,
    pageSize,
  };
};

await runOpenApiConvert({
  root,
  specs: manifest.map((entry) => {
    const slug = entry.output.replace(/\.json$/, "");
    return {
      name: slug,
      specPath: `specs/spec-mirror-stackit/specs/${entry.output}`,
      options: {
        namespace: `com.stackit.${slug}`,
        serviceName: toPascal(slug),
      },
    };
  }),
  patchesDir: "patches",
  finalize: false,
  options: {
    namespace: "com.stackit.api",
    serviceName: "Stackit",
    skipDeprecated: true,
    successStatuses: ["200", "201", "202", "204"],
  },
});

// Stamp per-product hosts and totalPages pagination onto the written models.
let stampedUrls = 0;
let stampedPages = 0;
for (const entry of manifest) {
  const slug = entry.output.replace(/\.json$/, "");
  const spec = JSON.parse(fs.readFileSync(path.join(specsDir, entry.output), "utf8"));
  const modelPath = path.join(outDir, `${slug}.json`);
  if (!fs.existsSync(modelPath)) continue;
  const model = JSON.parse(fs.readFileSync(modelPath, "utf8"));
  const opCount = Object.values<any>(model.shapes ?? {}).filter(
    (s) => s?.type === "operation",
  ).length;
  if (opCount === 0) {
    // STACKIT Redis v2 is fully deprecated (Valkey replaced it); skip
    // writing an empty module rather than generating a hollow service.
    console.warn(`   ⚠️  ${slug}: no operations (all deprecated?) — dropped`);
    fs.unlinkSync(modelPath);
    continue;
  }
  const serverUrl = specServerUrl(spec);

  const byRoute = new Map<string, Record<string, string>>();
  for (const [pathTemplate, pathItem] of Object.entries<any>(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = pathItem?.[method];
      if (!op) continue;
      const trait = paginationFor(spec, op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${pathTemplate}`, trait);
    }
  }

  let paginated = 0;
  for (const shape of Object.values<any>(model.shapes ?? {})) {
    if (shape?.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    if (!http || typeof http !== "object") continue;
    http.baseUrl = serverUrl;
    stampedUrls++;
    const trait = byRoute.get(`${http.method} ${http.uri}`);
    if (!trait) continue;
    if (shape.traits["smithy.api#paginated"] === undefined) {
      shape.traits["smithy.api#paginated"] = trait;
    }
    paginated++;
  }
  if (paginated !== byRoute.size) {
    throw new Error(
      `${slug}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped — ` +
        `an operation's http uri no longer matches its OpenAPI path`,
    );
  }
  stampedPages += paginated;
  fs.writeFileSync(modelPath, JSON.stringify(model, null, 2) + "\n");
}

console.log(`🔗 stamped ${stampedUrls} operation baseUrl(s), ${stampedPages} paginated`);

await finalizeConvert({ root });
