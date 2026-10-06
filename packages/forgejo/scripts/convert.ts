#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Forgejo's Swagger 2.0 description → Smithy JSON models in
 * .generated-specs.
 *
 * Forgejo's API is ONE ~850 KB Swagger 2.0 document (the `spec-mirror-forgejo`
 * mirror snapshots it from the Forgejo repository at a pinned release tag —
 * see `stacks/distilled-submodules/spec-repos/forgejo/fetch-specs.ts`)
 * covering ~520 operations across 10 tags; the v1 layout wants one Smithy
 * model — one service module — per tag. Following the Hetzner/GitHub
 * pipeline, the ordering is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Patches are Smithy ops on the converted models, under the names the
 *      spec gives; the finalizeConvert at the end applies them, then the
 *      deferred verbNoun names (see `@distilled.cloud/core/codegen/patches`).
 *   3. Bucket operations by PRIMARY (first) tag — every operation in this
 *      spec carries exactly one.
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag>.json`; buckets left empty (all
 *      deprecated) are dropped.
 *
 * Operation ids are used VERBATIM — Forgejo's are already unique and
 * camelCased (`repoGet`, `orgListTeams`, `adminCreateOrg`), prefixed with
 * the resource they act on rather than the tag, so there is no namespace
 * to strip the way GitHub's `repos/list-for-org` needs.
 *
 * No `smithy.api#paginated` trait is stamped: Forgejo pages by number
 * (`page`/`limit`) and reports the total only in an `X-Total-Count`
 * response header — list responses are bare arrays with no in-body token,
 * which none of core's strategies can drive. `page`/`limit` stay plain
 * input fields; callers advance `page` until an empty page comes back.
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
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-forgejo/specs/forgejo.spec.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Tag → model/resource name (the generated module's filename).
 *
 * Forgejo's tags are single lowercase words (`repository`, `organization`,
 * `activitypub`), so the slug is the tag itself — but camel boundaries are
 * split first anyway, for the same reason Vercel and Hetzner do it: a tag
 * that ever arrives camelCased shouldn't flatten into one unreadable word.
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
    `${specPath} not found — run \`pnpm run specs:fetch\` to check out the spec mirror (or \`pnpm specs:local forgejo\` and set DISTILLED_SPECS_LOCAL=1)`,
  );
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// ---- 3. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
const unrouted: string[] = [];
const deprecated: string[] = [];
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    // Reported, not dropped here — the converter is what skips them, so the
    // list stays accurate if that option ever changes.
    if (op.deprecated === true) {
      deprecated.push(`${method.toUpperCase()} ${pathTemplate} (${op.operationId})`);
    }
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

// ---- 4. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
const emptyBuckets: string[] = [];
for (const slug of [...tagBuckets.keys()].sort()) {
  const paths = tagBuckets.get(slug)!;
  const subSpec = { ...fullSpec, paths };
  const model = convertOpenApiToSmithy(subSpec, {
    deferNaming: true,
    namespace: `com.forgejo.${slug}`,
    // Forgejo's tags are the singular resource names its definitions use —
    // `repository` / `Repository`, `organization` / `Organization`, `user` /
    // `User` — and the converter reserves the service name before any
    // definition is named, so a bare `Repository` service would push the
    // `Repository` definition out to `Repository2` in exactly the module a
    // reader expects to find it. Prefixing the service shape keeps the
    // definitions' own names.
    serviceName: `Forgejo${toPascal(slug)}`,
    skipDeprecated: true,
    statusToErrorClass: {
      // The converter's defaults …
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
      // … plus the one Forgejo adds to the common vocabulary: 423 for
      // writes refused on an archived repository (`repoArchivedError`),
      // which core's shared map already names `Locked`.
      "423": "Locked",
    },
    // 401/429/500/503 ride the common ForgejoOpError union.
  });

  const operations = Object.entries<any>(model.shapes).filter(([, s]) => s.type === "operation");
  if (operations.length === 0) {
    emptyBuckets.push(slug);
    continue; // all-deprecated bucket
  }

  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(model, null, 2) + "\n");
  written++;
  totalOps += operations.length;
}

if (deprecated.length) {
  console.log(
    `🗑️  ${deprecated.length} deprecated operation(s) skipped:\n      ` +
      deprecated.join("\n      "),
  );
}
if (emptyBuckets.length) {
  console.log(
    `   (${emptyBuckets.length} tag(s) dropped — every operation deprecated: ${emptyBuckets.join(", ")})`,
  );
}
console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

await finalizeConvert({ root: rootDir });
