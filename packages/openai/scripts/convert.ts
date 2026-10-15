#!/usr/bin/env -S node --conditions=bun
/**
 * convert — OpenAI's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * OpenAI publishes ONE ~4.7 MB OpenAPI 3.1 document (`openapi.json` in
 * openai/openai-openapi, mirrored to `specs/spec-mirror-openai/specs/`)
 * covering ~350 operations across ~40 tags — the inference API and the Admin
 * API (`/organization/*`) together. One module per tag keeps every generated
 * file reviewable. Following the GitHub / Hugging Face pipeline, the
 * ordering is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Apply ALL `patches/*.patch.json` (OpenAPI pointers) ONCE to the full
 *      spec. Patching per-slice would hard-fail: a patch targeting one tag's
 *      paths doesn't resolve against another tag's slice.
 *   3. Normalise the Stainless `?beta=true` path keys (see below) and bucket
 *      operations by PRIMARY (first) tag; untagged operations are bucketed by
 *      {@link UNTAGGED}.
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy`, stamp
 *      {@link ADMIN_AUTH_TRAIT} on Admin-API operations, and write
 *      `.generated-specs/<tag_slug>.json`.
 *   5. `finalizeConvert` applies the Smithy-pointer patches in
 *      `patches/<tag_slug>/*.json` (typed errors, event-stream `done`).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";
import { applyOperation, type PatchFile } from "@distilled.cloud/core/json-patch";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-openai/specs/openapi.json");
const patchDir = path.join(rootDir, "patches");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Operation trait marking an Admin-API operation: one whose `security` names
 * `AdminApiKeyAuth`, or any `/organization/*` route (a few of those omit
 * `security`). `scripts/generate.ts` turns it into `T.AdminAuth()` on the
 * operation input, and the protocol authenticates it with the admin key.
 */
const ADMIN_AUTH_TRAIT = "com.distilled.openai#adminAuth";

/**
 * Untagged operations → module, by path prefix (first match wins). An
 * untagged operation no entry covers fails the run, so upstream adding one
 * is a loud one-line fix rather than a silently misfiled operation.
 */
const UNTAGGED: ReadonlyArray<readonly [prefix: string, slug: string]> = [
  ["/containers", "containers"],
  ["/chatkit", "chatkit"],
  ["/webhook_endpoints", "webhooks"],
  ["/webhook_event_types", "webhooks"],
  ["/safety", "safety"],
  ["/content_provenance_checks", "content_provenance"],
  ["/organization/admin_api_keys", "admin_api_keys"],
  ["/organization/external_storage", "external_storage"],
  ["/organization/spend_limit", "spend_limits"],
  ["/organization/projects/{project_id}/spend_limit", "spend_limits"],
  ["/organization/projects/{project_id}/service_accounts", "projects"],
];

/**
 * Stainless models a second, beta request schema for the Responses API as
 * separate path keys suffixed `?beta=true` (`/responses?beta=true`). A query
 * string inside a path template would break as soon as the operation has
 * query members of its own, so the suffix becomes a required `beta` query
 * member (always `true`) and the operations move to their own module
 * (`responses_beta`) where their names don't collide with the GA ones.
 */
const BETA_SUFFIX = "?beta=true";

/**
 * Irregular operation ids. Most OpenAI ids are already verbNoun
 * (`createChatCompletion`); the Admin API uses kebab-case and a few newer
 * endpoints use run-together summaries (`Getsafetycase`). Keys are
 * `"METHOD path"` (path as it appears after {@link BETA_SUFFIX} stripping).
 */
const OPERATION_NAMES: Readonly<Record<string, string>> = {
  "GET /safety/cases/{id}": "getSafetyCase",
  "GET /safety/alerts/{id}": "getProjectSafetyAlert",
  "GET /organization/external_storage": "listExternalStorageConfigurations",
  "POST /organization/external_storage": "createExternalStorageConfiguration",
  "GET /organization/external_storage/{external_storage_id}": "getExternalStorageConfiguration",
  "DELETE /organization/external_storage/{external_storage_id}":
    "deleteExternalStorageConfiguration",
  "POST /organization/external_storage/{external_storage_id}/validate":
    "validateExternalStorageConfiguration",
  "GET /organization/spend_limit": "getOrganizationSpendLimit",
  "POST /organization/spend_limit": "updateOrganizationSpendLimit",
  "DELETE /organization/spend_limit": "deleteOrganizationSpendLimit",
  "GET /organization/projects/{project_id}/spend_limit": "getProjectSpendLimit",
  "POST /organization/projects/{project_id}/spend_limit": "updateProjectSpendLimit",
  "DELETE /organization/projects/{project_id}/spend_limit": "deleteProjectSpendLimit",
  "POST /organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys":
    "createServiceAccountApiKey",
  "POST /content_provenance_checks": "createContentProvenanceCheck",
  "POST /responses/input_tokens": "getInputTokenCounts",
  "POST /responses/compact": "compactConversation",
  "GET /organization/admin_api_keys": "listAdminApiKeys",
  "POST /organization/admin_api_keys": "createAdminApiKey",
  "GET /organization/admin_api_keys/{key_id}": "getAdminApiKey",
  "DELETE /organization/admin_api_keys/{key_id}": "deleteAdminApiKey",
  "GET /organization/costs": "getCosts",
  "GET /organization/usage/audio_speeches": "getAudioSpeechesUsage",
  "GET /organization/usage/audio_transcriptions": "getAudioTranscriptionsUsage",
  "GET /organization/usage/code_interpreter_sessions": "getCodeInterpreterSessionsUsage",
  "GET /organization/usage/completions": "getCompletionsUsage",
  "GET /organization/usage/embeddings": "getEmbeddingsUsage",
  "GET /organization/usage/file_search_calls": "getFileSearchCallsUsage",
  "GET /organization/usage/images": "getImagesUsage",
  "GET /organization/usage/moderations": "getModerationsUsage",
  "GET /organization/usage/vector_stores": "getVectorStoresUsage",
  "GET /organization/usage/web_search_calls": "getWebSearchCallsUsage",
  "POST /live/sessions": "createLiveSession",
  "GET /live/sessions/{session_id}/content": "downloadLiveRecording",
  "POST /videos/extensions": "createVideoExtension",
  "POST /chatkit/sessions/{session_id}/cancel": "cancelChatSession",
  "POST /chatkit/sessions": "createChatSession",
  "GET /chatkit/threads/{thread_id}/items": "listThreadItems",
  "GET /chatkit/threads/{thread_id}": "getThread",
  "DELETE /chatkit/threads/{thread_id}": "deleteThread",
  "GET /chatkit/threads": "listThreads",
  // Upstream typo (`Ouputs`).
  "POST /threads/{thread_id}/runs/{run_id}/submit_tool_outputs": "submitToolOutputsToRun",
};

/** Names for the `?beta=true` twins, which live in `responses_beta`. */
const BETA_OPERATION_NAMES: Readonly<Record<string, string>> = {
  "POST /responses": "createResponse",
  "GET /responses/{response_id}": "getResponse",
  "DELETE /responses/{response_id}": "deleteResponse",
  "POST /responses/{response_id}/cancel": "cancelResponse",
  "POST /responses/compact": "compactConversation",
  "GET /responses/{response_id}/input_items": "listInputItems",
  "POST /responses/input_tokens": "getInputTokenCounts",
};

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

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(`${specPath} not found — run \`pnpm run specs:fetch\` to fetch the spec mirror`);
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// ---- 2. Apply the OpenAPI patch chain ONCE to the full spec ----------------
// Flat `patches/*.patch.json` hold OpenAPI pointers; Smithy pointers live in
// `patches/<slug>/*.json` and are applied by finalizeConvert (step 5).
let patchFiles = 0;
const badPatches: string[] = [];
if (fs.existsSync(patchDir)) {
  for (const pf of fs
    .readdirSync(patchDir)
    .filter((f) => f.endsWith(".patch.json"))
    .sort((a, b) => a.localeCompare(b))) {
    const parsed = JSON.parse(fs.readFileSync(path.join(patchDir, pf), "utf-8")) as PatchFile;
    for (const patchOp of parsed.patches ?? []) {
      try {
        applyOperation(fullSpec, patchOp);
      } catch (e) {
        badPatches.push(
          `${pf} [${patchOp.op} ${patchOp.path}]: ${e instanceof Error ? e.message : e}`,
        );
      }
    }
    patchFiles++;
  }
}
if (badPatches.length) {
  for (const b of badPatches) console.error(`❌ bad patch: ${b}`);
  throw new Error(
    `${badPatches.length} patch operation(s) failed — fix the pointers or delete the patch`,
  );
}
console.log(`🩹 ${patchFiles} OpenAPI patch file(s) applied`);

// ---- 3. Bucket by primary tag ----------------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
/** `METHOD path` keys of Admin-API operations (paths after beta stripping). */
const adminRoutes = new Set<string>();
const unmapped: string[] = [];

for (const [rawPath, pathItem] of Object.entries<Record<string, any>>(fullSpec.paths)) {
  const beta = rawPath.endsWith(BETA_SUFFIX);
  const pathTemplate = beta ? rawPath.slice(0, -BETA_SUFFIX.length) : rawPath;
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (!op) continue;
    const key = `${method.toUpperCase()} ${pathTemplate}`;

    let slug: string;
    if (beta) {
      slug = "responses_beta";
      op.parameters = [
        ...(op.parameters ?? []),
        {
          name: "beta",
          in: "query",
          required: true,
          description: "Selects the beta request schema. Always `true`.",
          schema: { type: "boolean", enum: [true] },
        },
      ];
    } else if (Array.isArray(op.tags) && op.tags.length > 0) {
      slug = toSlug(op.tags[0]);
    } else {
      const hit = UNTAGGED.find(([prefix]) => pathTemplate.startsWith(prefix));
      if (!hit) {
        unmapped.push(key);
        continue;
      }
      slug = hit[1];
    }

    const security = JSON.stringify(op.security ?? fullSpec.security ?? []);
    if (security.includes("AdminApiKeyAuth") || pathTemplate.startsWith("/organization/")) {
      adminRoutes.add(key);
    }

    if (!tagBuckets.has(slug)) tagBuckets.set(slug, {});
    const bucketPaths = tagBuckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      const pathParams = pathItem.parameters;
      bucketPaths[pathTemplate] = pathParams ? { parameters: pathParams } : {};
    }
    bucketPaths[pathTemplate]![method] = op;
  }
}
if (unmapped.length) {
  throw new Error(`untagged operation(s) with no UNTAGGED entry:\n  ${unmapped.join("\n  ")}`);
}

// ---- 4. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
let adminOps = 0;
let afterPaginated = 0;

/**
 * OpenAI's list convention: an `after` query cursor in, and
 * `{ data, has_more, … }` out, where the next page's cursor is `last_id`,
 * `next` (Admin API groups/roles), or — when neither is modeled (fine-tuning
 * jobs/events) — the id of the last item. The converter only recognises
 * `cursor`/`page_token`-style names, so these are stamped here and paged by
 * `paginateAfter` (src/pagination.ts), which stops on `has_more: false`.
 * Returns the output token (`""` = last item id), or undefined.
 */
const afterOutputToken = (model: any, op: any): string | undefined => {
  if (op.traits?.["com.distilled#eventStream"]) return undefined;
  const after = model.shapes[op.input?.target]?.members?.after;
  if (!after || after.traits?.["smithy.api#httpQuery"] !== "after") return undefined;
  const out = model.shapes[op.output?.target]?.members ?? {};
  if (!("data" in out && "has_more" in out)) return undefined;
  return "last_id" in out ? "last_id" : "next" in out ? "next" : "";
};

for (const slug of [...tagBuckets.keys()].sort()) {
  const subSpec = { ...fullSpec, paths: tagBuckets.get(slug)! };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.openai.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    // `Idempotency-Key` and `openai-beta` are real per-call inputs.
    headerParams: true,
    // Multipart uploads (files, audio, images) take bytes, and content
    // downloads (speech, file/container/video/skill content) return them.
    binaryTypes: true,
    unionCaseTitles: true,
    // Batch-style endpoints answer 202 with a body.
    successStatuses: ["200", "201", "202", "204"],
    statusToErrorClass: {
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "410": "Gone",
      "413": "PayloadTooLarge",
      "422": "UnprocessableEntity",
    },
    operationNames: slug === "responses_beta" ? BETA_OPERATION_NAMES : OPERATION_NAMES,
  });

  let opCount = 0;
  for (const shape of Object.values<any>(model.shapes)) {
    if (shape.type !== "operation") continue;
    opCount++;
    const http = shape.traits?.["smithy.api#http"];
    if (http && adminRoutes.has(`${http.method} ${http.uri}`)) {
      shape.traits[ADMIN_AUTH_TRAIT] = {};
      adminOps++;
    }
    const afterToken = shape.traits["smithy.api#paginated"]
      ? undefined
      : afterOutputToken(model, shape);
    if (afterToken !== undefined) {
      shape.traits["smithy.api#paginated"] = {
        mode: "cursor",
        inputToken: "after",
        ...(afterToken ? { outputToken: afterToken } : {}),
        items: "data",
        ...(model.shapes[shape.input.target]?.members?.limit ? { pageSize: "limit" } : {}),
      };
      afterPaginated++;
    }
  }
  if (opCount === 0) continue; // all-deprecated bucket
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(model, null, 2) + "\n");
  written++;
  totalOps += opCount;
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${adminOps} admin, ${afterPaginated} after-paginated) → ${outDir}`,
);

// ---- 5. Smithy-pointer patches + finalize ----------------------------------
await finalizeConvert({ root: rootDir, operationNaming: "as-is" });
