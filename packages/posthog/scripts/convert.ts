#!/usr/bin/env -S node --conditions=bun
/**
 * convert — PostHog OpenAPI spec → Smithy JSON models in .generated-specs.
 *
 * PostHog ships ONE 4.8 MB OpenAPI 3.0 document covering ~130 tagged
 * services; the v1 layout wants one Smithy model (→ one service module) per
 * tag. Mirroring distilled v0's driver, the ordering here is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Patches are Smithy ops on the converted models, under the names the
 *      spec gives; the finalizeConvert at the end applies them, then the
 *      deferred verbNoun names (see `@distilled.cloud/core/codegen/patches`).
 *   3. Bucket operations by PRIMARY (first) tag — a single path can
 *      contribute different methods to different service buckets.
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy`
 *      (skipDeprecated) and write `.generated-specs/<tag_slug>.json`;
 *      buckets left empty (all-deprecated) are dropped. The observed
 *      400/403/404 errors are patches: `patches/<tag_slug>/*-errors.patch.json`.
 *
 * `scripts/generate.ts` (runGeneratorCli with `patchesDir: false`) then
 * compiles the already-patched models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-posthog/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** Tag → model/resource name (a valid TS identifier for the barrel). */
const toSlug = (tag: string): string =>
  tag
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
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// ---- 3. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const rawTag: string = Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : "default";
    const slug = toSlug(rawTag) || "default";
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

// ---- 4. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
for (const slug of [...tagBuckets.keys()].sort()) {
  const subSpec = { ...fullSpec, paths: tagBuckets.get(slug)! };
  const model = convertOpenApiToSmithy(subSpec, {
    deferNaming: true,
    namespace: `com.posthog.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    // statusToErrorClass / defaultErrorStatuses: the v0 defaults — the
    // patches/<tag>/*-errors.patch.json add the observed 400/403/404 errors
    // (PostHog's spec only declares 2xx upstream).
  });
  // Two PostHog ops take application/x-www-form-urlencoded bodies
  // (warehouseTablesFileCreate, llmSkillsImportCreate). The shared converter
  // leaves that encoding to providers; merge it into the `smithy.api#http`
  // trait (the same flow multipart uses) so generated inputs carry it —
  // core's buildRequest sends JSON until it grows a form-urlencoded branch,
  // matching what distilled v0's client did natively.
  for (const shape of Object.values(model.shapes) as any[]) {
    if (
      shape.type === "operation" &&
      shape.traits?.["com.distilled.openapi#contentType"] === "form-urlencoded" &&
      shape.traits["smithy.api#http"]
    ) {
      shape.traits["smithy.api#http"].contentType = "form-urlencoded";
    }
  }
  const opCount = Object.values(model.shapes).filter((s: any) => s.type === "operation").length;
  if (opCount === 0) continue; // all-deprecated bucket — mirror v0's pruning
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(model, null, 2) + "\n");
  written++;
  totalOps += opCount;
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

await finalizeConvert({ root: rootDir });
