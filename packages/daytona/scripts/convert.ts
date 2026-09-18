#!/usr/bin/env bun
/**
 * convert — Daytona's three OpenAPI descriptions → Smithy JSON models in
 * `.generated-specs`.
 *
 * Daytona publishes THREE documents (mirrored at
 * `specs/spec-mirror-daytona/specs/`):
 *
 *   • `openapi.json`            Platform API (OAS 3.0) — sandboxes, orgs, …
 *   • `toolbox-openapi.json`    Toolbox API (Swagger 2.0) — in-sandbox ops
 *   • `analytics-openapi.json`  Analytics API (Swagger 2.0) — telemetry/usage
 *
 * The layout wants one Smithy model — one service module — per tag. The
 * pipeline:
 *
 *   1. Read each spec.
 *   2. Assert toolbox path roots still match `src/endpoints.ts` (the
 *      protocol routes by those roots).
 *   3. Bucket operations by PRIMARY (first) tag.
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`. A slug that would collide
 *      across documents is prefixed with the document name.
 *
 * `X-Daytona-Organization-ID` is a real per-call input (JWT org picker), so
 * header params are modeled. Failures are dispatched at runtime by
 * DaytonaProtocol from the status plus core's shared HTTP status map — the
 * specs type no per-status error schema worth generating classes for
 * (`statusToErrorClass: {}`).
 *
 * `scripts/generate.ts` then compiles the models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";
import { TOOLBOX_ROOTS } from "../src/endpoints.ts";

const rootDir = path.resolve(import.meta.dir, "..");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

interface SpecDoc {
  /** Output-model prefix used only on slug collisions. */
  readonly name: string;
  /** Production path; `resolveSpecPath` re-roots under DISTILLED_SPECS_LOCAL. */
  readonly specPath: string;
}

const DOCS: readonly SpecDoc[] = [
  {
    name: "platform",
    specPath: "specs/spec-mirror-daytona/specs/openapi.json",
  },
  {
    name: "toolbox",
    specPath: "specs/spec-mirror-daytona/specs/toolbox-openapi.json",
  },
  {
    name: "analytics",
    specPath: "specs/spec-mirror-daytona/specs/analytics-openapi.json",
  },
];

/** Tag → model/resource name (the generated module's filename). */
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

const firstSegment = (pathTemplate: string): string =>
  pathTemplate.split("/").filter(Boolean)[0] ?? "";

type PathBucket = Record<string, Record<string, unknown>>;

interface Bucket {
  readonly slug: string;
  readonly spec: Record<string, unknown>;
  readonly paths: PathBucket;
}

const loadSpec = (doc: SpecDoc): Record<string, any> => {
  const specPath = resolveSpecPath(rootDir, doc.specPath);
  if (!fs.existsSync(specPath)) {
    throw new Error(
      `${specPath} not found — run \`pnpm specs:local daytona\` (or specs:fetch) first`,
    );
  }
  return JSON.parse(fs.readFileSync(specPath, "utf-8"));
};

// ---- 1. Read specs + assert toolbox roots ----------------------------------
const toolboxSpec = loadSpec(DOCS[1]!);
const toolboxRoots = new Set<string>();
for (const pathTemplate of Object.keys(toolboxSpec.paths ?? {})) {
  const root = firstSegment(pathTemplate);
  if (root) toolboxRoots.add(root);
}
const expectedRoots = new Set<string>(TOOLBOX_ROOTS);
const extraRoots = [...toolboxRoots].filter((r) => !expectedRoots.has(r));
if (extraRoots.length) {
  throw new Error(
    `toolbox spec has path root(s) not in src/endpoints.ts TOOLBOX_ROOTS: ${extraRoots
      .sort()
      .join(", ")} — add them or toolbox calls will hit the platform host`,
  );
}
const missingRoots = [...expectedRoots].filter((r) => !toolboxRoots.has(r));
if (missingRoots.length) {
  console.warn(
    `   ⚠️  TOOLBOX_ROOTS entries gone from the spec (harmless, prune when convenient): ${missingRoots.join(", ")}`,
  );
}

// ---- 2. Bucket each document by primary tag --------------------------------
const claimed = new Map<string, string>();
const buckets: Bucket[] = [];
const unrouted: string[] = [];

for (const doc of DOCS) {
  const fullSpec = doc.name === "toolbox" ? toolboxSpec : loadSpec(doc);
  const tagBuckets = new Map<string, PathBucket>();

  for (const [pathTemplate, pathItem] of Object.entries<
    Record<string, unknown>
  >(fullSpec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = (pathItem as Record<string, any>)[method];
      if (!op) continue;
      const rawTag: string | undefined =
        Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
      if (rawTag === undefined) {
        unrouted.push(`${doc.name} ${method.toUpperCase()} ${pathTemplate}`);
      }
      const slug = toSlug(rawTag ?? "misc") || "misc";
      if (!tagBuckets.has(slug)) tagBuckets.set(slug, {});
      const bucketPaths = tagBuckets.get(slug)!;
      if (!bucketPaths[pathTemplate]) {
        const pathParams = (pathItem as Record<string, any>).parameters;
        bucketPaths[pathTemplate] = pathParams
          ? { parameters: pathParams }
          : {};
      }
      (bucketPaths[pathTemplate] as Record<string, unknown>)[method] = op;
    }
  }

  for (const [slug, paths] of tagBuckets) {
    const owner = claimed.get(slug);
    const finalSlug =
      owner !== undefined && owner !== doc.name ? `${doc.name}_${slug}` : slug;
    if (claimed.has(finalSlug) && claimed.get(finalSlug) !== doc.name) {
      throw new Error(
        `slug collision: ${finalSlug} from ${doc.name} and ${claimed.get(finalSlug)}`,
      );
    }
    claimed.set(finalSlug, doc.name);
    buckets.push({ slug: finalSlug, spec: fullSpec, paths });
  }
}

if (unrouted.length) {
  console.warn(
    `   ⚠️  ${unrouted.length} untagged operation(s) fell into \`misc\`:\n      ` +
      unrouted.join("\n      "),
  );
}

// ---- 3. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
for (const { slug, spec, paths } of buckets.sort((a, b) =>
  a.slug.localeCompare(b.slug),
)) {
  const subSpec = { ...spec, paths };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.daytona.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    // `X-Daytona-Organization-ID` is a real per-call input (JWT org picker),
    // not a transport header the protocol already sends.
    headerParams: true,
    successStatuses: ["200", "201", "202", "204"],
    // Failures share a `{ message }` envelope (toolbox) or an untyped Nest
    // error page (platform); no operation narrows which codes it produces.
    statusToErrorClass: {},
  });

  const operations = Object.entries<any>(model.shapes).filter(
    ([, s]) => s.type === "operation",
  );
  if (operations.length === 0) {
    console.warn(`   ⚠️  ${slug}: no operations — bucket dropped`);
    continue;
  }

  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify(model, null, 2) + "\n",
  );
  written++;
  totalOps += operations.length;
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

await finalizeConvert({ root: rootDir });
