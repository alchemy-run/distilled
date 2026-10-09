#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Notion's OpenAPI description → Smithy JSON models in
 * `.generated-specs`.
 *
 * Notion publishes ONE OpenAPI 3.1 document (mirrored at
 * `specs/spec-mirror-notion/specs/openapi.json`, fetched from
 * https://developers.notion.com/openapi.json). The layout wants one Smithy
 * model — one service module — per tag. The pipeline:
 *
 *   1. Read the full spec.
 *   2. Bucket operations by PRIMARY (first) tag, skipping the OAuth routes
 *      (see {@link SKIPPED_PREFIXES}).
 *   3. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`.
 *   4. Stamp `smithy.api#paginated` on the cursor-paged operations — see
 *      {@link paginationFor}.
 *
 * The only header parameter in the spec is the required `Notion-Version`
 * pin, which NotionProtocol sends on every request, so header params are not
 * modeled. Failures share one `{ object: "error", status, code, message }`
 * envelope and are dispatched at runtime by NotionProtocol from the status
 * plus core's shared HTTP status map (`statusToErrorClass: {}`).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-notion/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Routes left out of the SDK. The OAuth token endpoints authenticate with
 * HTTP Basic (client id + secret) instead of the bearer token every other
 * route uses, and the shared REST protocol picks headers per credentials,
 * not per route.
 */
const SKIPPED_PREFIXES: readonly string[] = ["/v1/oauth/"];

/**
 * Notion's operation ids are kebab-case reference-page slugs
 * (`retrieve-a-page`, `post-database-query`, `create-a-database`), several
 * of which name the old resource or only restate the method. Keys are
 * `"METHOD path"`.
 */
const OPERATION_NAMES: Record<string, string> = {
  "GET /v1/users/me": "getSelf",
  "GET /v1/users/{user_id}": "getUser",
  "GET /v1/users": "listUsers",
  "POST /v1/pages": "createPage",
  "GET /v1/pages/{page_id}": "getPage",
  "PATCH /v1/pages/{page_id}": "updatePage",
  "POST /v1/pages/{page_id}/move": "movePage",
  "GET /v1/pages/{page_id}/properties/{property_id}": "getPageProperty",
  "GET /v1/pages/{page_id}/markdown": "getPageMarkdown",
  "PATCH /v1/pages/{page_id}/markdown": "updatePageMarkdown",
  "GET /v1/async_tasks/{task_id}": "getAsyncTask",
  "GET /v1/blocks/{block_id}": "getBlock",
  "PATCH /v1/blocks/{block_id}": "updateBlock",
  "DELETE /v1/blocks/{block_id}": "deleteBlock",
  "GET /v1/blocks/{block_id}/children": "listBlockChildren",
  "PATCH /v1/blocks/{block_id}/children": "appendBlockChildren",
  "GET /v1/data_sources/{data_source_id}": "getDataSource",
  "PATCH /v1/data_sources/{data_source_id}": "updateDataSource",
  "POST /v1/data_sources/{data_source_id}/query": "queryDataSource",
  "POST /v1/data_sources": "createDataSource",
  "GET /v1/data_sources/{data_source_id}/templates": "listDataSourceTemplates",
  "GET /v1/databases/{database_id}": "getDatabase",
  "PATCH /v1/databases/{database_id}": "updateDatabase",
  "POST /v1/databases": "createDatabase",
  "POST /v1/search": "searchByTitle",
  "POST /v1/comments": "createComment",
  "GET /v1/comments": "listComments",
  "GET /v1/comments/{comment_id}": "getComment",
  "PATCH /v1/comments/{comment_id}": "updateComment",
  "DELETE /v1/comments/{comment_id}": "deleteComment",
  "POST /v1/file_uploads": "createFileUpload",
  "GET /v1/file_uploads": "listFileUploads",
  "POST /v1/file_uploads/{file_upload_id}/send": "sendFileUpload",
  "POST /v1/file_uploads/{file_upload_id}/complete": "completeFileUpload",
  "GET /v1/file_uploads/{file_upload_id}": "getFileUpload",
  "GET /v1/custom_emojis": "listCustomEmojis",
  "GET /v1/views": "listViews",
  "POST /v1/views": "createView",
  "GET /v1/views/{view_id}": "getView",
  "PATCH /v1/views/{view_id}": "updateView",
  "DELETE /v1/views/{view_id}": "deleteView",
  "POST /v1/views/{view_id}/queries": "createViewQuery",
  "GET /v1/views/{view_id}/queries/{query_id}": "getViewQueryResults",
  "DELETE /v1/views/{view_id}/queries/{query_id}": "deleteViewQuery",
  "POST /v1/blocks/meeting_notes": "createMeetingNote",
  "POST /v1/blocks/meeting_notes/query": "queryMeetingNotes",
  "POST /v1/agents/query": "queryAgents",
  "GET /v1/agents/{agent_id}": "getAgent",
  "DELETE /v1/agents/{agent_id}": "deleteAgent",
  "GET /v1/agents/{agent_id}/insights": "getAgentInsights",
  "PATCH /v1/agents/{agent_id}/status": "updateAgentStatus",
  "PATCH /v1/agents/{agent_id}/credit_limit": "updateAgentCreditLimit",
  "POST /v1/agents/batch": "batchAgents",
  "GET /v1/ai/plugins": "listPlugins",
  "GET /v1/ai/plugins/{id}": "getPluginDirectory",
  "GET /v1/ai/skills/{id}": "getSkillDirectory",
  "POST /v1/sessions": "updateSession",
  "GET /v1/sessions/{session_id}": "getSession",
  "POST /v1/sessions/query": "querySessions",
  "POST /v1/sessions/{session_id}/events/query": "querySessionEvents",
  "POST /v1/sessions/{session_id}/cancel": "cancelSession",
};

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

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(`${specPath} not found — run \`pnpm specs:local notion\` (or specs:fetch) first`);
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

/** Resolve `$ref`s (recursively) against the full spec. */
function deref(schema: any): any {
  const ref = schema?.$ref;
  if (typeof ref !== "string" || !ref.startsWith("#/")) return schema;
  const target = ref
    .slice(2)
    .split("/")
    .reduce((node: any, key: string) => node?.[key], fullSpec);
  return target === undefined ? schema : deref(target);
}

/** Top-level properties of an object schema, merging `allOf` arms. */
const propertiesOf = (schema: any): Record<string, any> => {
  const s = deref(schema);
  if (!s || typeof s !== "object") return {};
  const own = s.properties ?? {};
  const fromAllOf = Array.isArray(s.allOf)
    ? Object.assign({}, ...s.allOf.map((arm: any) => propertiesOf(arm)))
    : {};
  return { ...fromAllOf, ...own };
};

// ---- 2. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
const unrouted: string[] = [];
const named = new Set<string>();
let skipped = 0;
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  if (SKIPPED_PREFIXES.some((prefix) => pathTemplate.startsWith(prefix))) {
    skipped += HTTP_METHODS.filter((m) => (pathItem as Record<string, any>)[m]).length;
    continue;
  }
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const route = `${method.toUpperCase()} ${pathTemplate}`;
    if (!(route in OPERATION_NAMES)) {
      throw new Error(`${route} (${op.operationId}) has no entry in OPERATION_NAMES — add one`);
    }
    named.add(route);
    const rawTag: string | undefined =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
    if (rawTag === undefined) unrouted.push(route);
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
const staleNames = Object.keys(OPERATION_NAMES).filter((route) => !named.has(route));
if (staleNames.length) {
  console.warn(
    `   ⚠️  OPERATION_NAMES entries gone from the spec (prune them): ${staleNames.join(", ")}`,
  );
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
 * does not page.
 *
 * Notion pages by cursor: `start_cursor` + `page_size` in (query string on
 * GETs, JSON body on POST queries), and `{ results, has_more, next_cursor }`
 * out, where `next_cursor` is `null` on the last page. The converter's own
 * detection looks for `cursor`/`next_token` names, so the trait is stamped
 * here. Every part is read off the OpenAPI operation:
 *   • `inputToken` — a `start_cursor` query parameter or body member;
 *   • `outputToken` — the 200 response must carry `next_cursor`;
 *   • `items` — the response's array property (`results`, or `templates`).
 * `POST /v1/views/{view_id}/queries` answers with a first page but takes no
 * `start_cursor` (later pages come from `getViewQueryResults`), so it is not
 * stamped.
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const queryParams = (op.parameters ?? []).map(deref);
  const bodyProps = propertiesOf(op.requestBody?.content?.["application/json"]?.schema);
  const hasStartCursor =
    queryParams.some((p: any) => p?.in === "query" && p?.name === "start_cursor") ||
    "start_cursor" in bodyProps;
  if (!hasStartCursor) return undefined;

  const props = propertiesOf(op.responses?.["200"]?.content?.["application/json"]?.schema);
  if (!("next_cursor" in props)) return undefined;

  const items = Object.entries<any>(props).find(([, value]) => deref(value)?.type === "array")?.[0];
  if (items === undefined) {
    throw new Error(`paginated operation ${op.operationId}: response has no array member`);
  }

  return {
    inputToken: "start_cursor",
    outputToken: "next_cursor",
    items,
    pageSize: "page_size",
  };
};

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
    deferNaming: true,
    namespace: `com.notion.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    // `POST /v1/pages` and `PATCH /v1/pages/{page_id}/markdown` declare 202.
    successStatuses: ["200", "201", "202", "204"],
    // Every failure shares one error envelope; no per-op classes.
    statusToErrorClass: {},
    operationNames: OPERATION_NAMES,
  });

  const operations = Object.entries<any>(model.shapes).filter(([, s]) => s.type === "operation");
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
  // A miss means an http uri no longer round-trips to its OpenAPI path and
  // the operation would silently lose `.pages()`.
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
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated; ` +
    `${skipped} OAuth operation(s) skipped) → ${outDir}`,
);

// Every operation is named in OPERATION_NAMES; skip the verbNoun reorder,
// which would turn `completeFileUpload` into `uploadCompleteFile`.
await finalizeConvert({ root: rootDir, operationNaming: "as-is" });
