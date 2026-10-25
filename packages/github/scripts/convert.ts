#!/usr/bin/env -S node --conditions=bun
/**
 * convert — GitHub's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * GitHub publishes ONE ~13 MB OpenAPI 3.0 document (`descriptions/
 * api.github.com/api.github.com.json` in the rest-api-description submodule)
 * covering ~1220 operations across 47 tags; the v1 layout wants one Smithy
 * model — one service module — per tag. Following the PostHog pipeline, the
 * ordering is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Patches are Smithy ops on the converted models, under the names the
 *      spec gives; the finalizeConvert at the end applies them, then the
 *      deferred verbNoun names (see `@distilled.cloud/core/codegen/patches`).
 *   3. Bucket operations by PRIMARY (first) tag — a single path can
 *      contribute different methods to different service buckets.
 *   4. Shorten operation ids (see `shortId`) so the module namespace isn't
 *      repeated in every member of it.
 *   5. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`; buckets left empty (all
 *      deprecated) are dropped.
 *
 * The submodule is sparse-checked-out to the single spec file — a full
 * checkout of github/rest-api-description is ~6.7 GB of GHES snapshots and
 * dereferenced variants. `pnpm run specs:fetch` sets that up.
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
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-github/specs/api.github.com.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** Tag → model/resource name (the generated module's filename). */
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

/**
 * GitHub operation ids are `<namespace>/<verb-phrase>` (`repos/list-for-org`),
 * and the namespace is usually the operation's tag — which is already the
 * module name, so keeping it would read `Repos.reposListForOrg`. Drop the
 * namespace when it IS the bucket's tag, leaving `Repos.listForOrg` (the
 * spelling GitHub's own clients use).
 *
 * 14 operations are filed under a tag their id doesn't name — `api-insights/*`
 * lives in `orgs`, `pull-request-stacks/*` in `pulls`. Those keep the full id
 * (`Pulls.pullRequestStacksList`): stripping there would collide with the
 * bucket's own `pulls/list`.
 */
const shortId = (operationId: string, tag: string): string =>
  operationId.startsWith(`${tag}/`) ? operationId.slice(tag.length + 1) : operationId;

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`pnpm run specs:fetch\` to check out the spec submodule`,
  );
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// ---- 3./4. Bucket paths by primary tag, shortening operation ids -----------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const rawTag: string = Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : "default";
    const slug = toSlug(rawTag) || "default";
    if (typeof op.operationId === "string") {
      op.operationId = shortId(op.operationId, rawTag);
    }
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

// ---- 5. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
for (const slug of [...tagBuckets.keys()].sort()) {
  const subSpec = { ...fullSpec, paths: tagBuckets.get(slug)! };
  const model = convertOpenApiToSmithy(subSpec, {
    deferNaming: true,
    namespace: `com.github.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    statusToErrorClass: {
      // The converter's defaults …
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
      // … plus the one GitHub adds to the common vocabulary: 410 for
      // resources that existed and no longer serve (issues disabled on a
      // repo, a migration archive that has been deleted).
      "410": "Gone",
    },
    // 401/429/500/503 ride the common GithubOpError union.
  });
  const opCount = Object.values(model.shapes).filter((s: any) => s.type === "operation").length;
  if (opCount === 0) continue; // all-deprecated bucket
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(model, null, 2) + "\n");
  written++;
  totalOps += opCount;
}

// ---- 6. Webhook payloads ---------------------------------------------------
// `x-webhooks` describes every delivery GitHub POSTs to a webhook: one entry
// per event and action (`issues/opened`), each with the payload as its
// request body. Converting them as synthetic POST operations reuses the
// converter's schema handling (the body flattens into the input structure,
// which IS the payload); the operations are then dropped, leaving a
// types-only `webhooks` model. Each payload is renamed `<Event><Action>Event`
// and tagged with its `X-GitHub-Event` name and action, which roots it for
// generate.ts and feeds the `WebhookEvents` map.
const WEBHOOK_EVENT_TRAIT = "com.distilled.github#webhookEvent";
const webhookPaths: Record<string, unknown> = {};
const webhookMeta = new Map<string, { event: string; action: string | undefined }>();
for (const [name, item] of Object.entries<Record<string, any>>(fullSpec["x-webhooks"] ?? {})) {
  const op = item.post;
  const body = op?.requestBody?.content?.["application/json"];
  const event = op?.parameters?.find((p: any) => p.name === "X-Github-Event")?.example;
  if (!body || typeof event !== "string" || typeof op.operationId !== "string") continue;
  const [, action] = op.operationId.split("/");
  webhookPaths[`/webhooks/${name}`] = {
    post: {
      operationId: op.operationId,
      requestBody: { content: { "application/json": body } },
      responses: { "200": { description: "Delivered" } },
    },
  };
  webhookMeta.set(op.operationId, { event, action });
}
if (webhookMeta.size > 0) {
  const ns = "com.github.webhooks";
  const model = convertOpenApiToSmithy(
    { ...fullSpec, paths: webhookPaths },
    { namespace: ns, serviceName: "Webhooks", skipDeprecated: false },
  );
  // operation shape id → its payload (input) shape id
  const payloads = new Map<string, string>();
  for (const [id, shape] of Object.entries<any>(model.shapes)) {
    if (shape.type === "operation") payloads.set(id, shape.input.target);
  }
  let json = JSON.stringify(model);
  for (const [opId, input] of payloads) {
    // `IssuesOpenedRequest…` → `IssuesOpenedEvent…` (the payload and its nested shapes)
    json = json.replace(
      new RegExp(`#${input.slice(ns.length + 1)}(?=["A-Z])`, "g"),
      `#${opId.slice(ns.length + 1)}Event`,
    );
  }
  const renamed = JSON.parse(json);
  const shapes: Record<string, any> = {};
  for (const [id, shape] of Object.entries<any>(renamed.shapes)) {
    if (shape.type === "operation" || shape.type === "service") continue;
    shapes[id] = shape;
  }
  for (const [opId, shape] of Object.entries<any>(model.shapes)) {
    if (shape.type !== "operation") continue;
    const rawId = (shape.traits?.["smithy.api#http"]?.uri as string).slice("/webhooks/".length);
    const operationId = fullSpec["x-webhooks"][rawId].post.operationId as string;
    const payload = `${ns}#${opId.slice(ns.length + 1)}Event`;
    const { "smithy.api#input": _, ...traits } = shapes[payload].traits ?? {};
    shapes[payload].traits = { ...traits, [WEBHOOK_EVENT_TRAIT]: webhookMeta.get(operationId) };
  }
  fs.writeFileSync(
    path.join(outDir, "webhooks.json"),
    JSON.stringify({ ...renamed, shapes }, null, 2) + "\n",
  );
  console.log(`✅ webhooks model (${webhookMeta.size} payloads) → ${outDir}`);
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

await finalizeConvert({ root: rootDir });
