#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Claude Platform (Anthropic) API's OpenAPI description →
 * Smithy JSON models in .generated-specs.
 *
 * Anthropic publishes ONE OpenAPI 3.1 document, the one its Stainless SDKs
 * are generated from (mirrored at `specs/spec-mirror-anthropic/specs/openapi.json`).
 * It has no tags, so operations are bucketed by the first path segment
 * after `/v1` (`/v1/messages/batches` → `messages`).
 *
 * Beta twins: the document keys the beta form of a route as
 * `<path>?beta=true` (`/v1/messages` and `/v1/messages?beta=true` are two
 * path items with different schemas). The query pair only tells the two
 * apart in the document: the official SDKs keep it in an internal
 * `__qualifiers` option and request the bare path, and the API selects a
 * beta by the `anthropic-beta` header. So the literal is dropped and every beta route
 * goes in a `beta_<segment>` module beside its generally available twin, as
 * the official SDKs put them under `client.beta`.
 *
 * Header parameters are modeled (`headerParams`): `anthropic-beta` (an array,
 * sent comma-separated), `anthropic-workspace-id`, `anthropic-user-profile-id`
 * and `anthropic-version`, which overrides the version the protocol sends.
 *
 * Every failure shares the `{ type: "error", error: { type, message } }`
 * envelope, so no per-status error classes are generated
 * (`statusToErrorClass: {}`): AnthropicProtocol dispatches on the status.
 *
 * Operation ids come in three spellings — FastAPI (`list_files_v1_files_get`),
 * snake (`message_batches_list`) and Pascal (`BetaCreateAgent`). The FastAPI
 * route suffix and the `beta` prefix are cut before the verbNoun heuristic
 * runs; {@link OPERATION_NAMES} covers the ids it cannot reorder.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { toVerbNoun } from "@distilled.cloud/dev/codegen/rewrite-operation-ids";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-anthropic/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** The query pair the document appends to a beta route's path key. */
const BETA_LITERAL = "beta=true";

/**
 * Irregular operation names, keyed by `METHOD route` (a beta twin shares its
 * generally available route, so one entry names both).
 */
const OPERATION_NAMES: Record<string, string> = {
  "POST /v1/messages": "createMessage",
  "POST /v1/messages/count_tokens": "countMessageTokens",
  "POST /v1/messages/batches": "createMessageBatch",
  "GET /v1/messages/batches/{message_batch_id}/results": "getMessageBatchResults",
  "GET /v1/sessions/{session_id}/events": "listSessionEvents",
  "POST /v1/sessions/{session_id}/events": "sendSessionEvents",
  "GET /v1/sessions/{session_id}/resources": "listSessionResources",
  "POST /v1/sessions/{session_id}/resources": "addSessionResource",
  "GET /v1/sessions/{session_id}/resources/{resource_id}": "getSessionResource",
  "POST /v1/sessions/{session_id}/resources/{resource_id}": "updateSessionResource",
  "DELETE /v1/sessions/{session_id}/resources/{resource_id}": "deleteSessionResource",
  "GET /v1/organizations/rate_limits": "getOrganizationRateLimits",
  // Claude Enterprise analytics: `get_users` / `get_skills` / `get_cost_report`
  // would read as (or collide with) the admin operations beside them.
  "GET /v1/organizations/analytics/summaries": "getAnalyticsSummaries",
  "GET /v1/organizations/analytics/users": "getAnalyticsUsers",
  "GET /v1/organizations/analytics/apps/chat/projects": "getAnalyticsChatProjects",
  "GET /v1/organizations/analytics/skills": "getAnalyticsSkills",
  "GET /v1/organizations/analytics/connectors": "getAnalyticsConnectors",
  "GET /v1/organizations/analytics/plugins": "getAnalyticsPlugins",
  "GET /v1/organizations/analytics/artifacts": "getAnalyticsArtifacts",
  "GET /v1/organizations/analytics/user_usage_report": "getAnalyticsUserUsageReport",
  "GET /v1/organizations/analytics/user_cost_report": "getAnalyticsUserCostReport",
  "GET /v1/organizations/analytics/usage_report": "getAnalyticsUsageReport",
  "GET /v1/organizations/analytics/cost_report": "getAnalyticsCostReport",
  "GET /v1/organizations/analytics/usage": "getAnalyticsUsage",
  "GET /v1/organizations/analytics/cost": "getAnalyticsCost",
};

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

/**
 * `beta_list_files_v1_files_get` → `list_files`, `BetaCreateAgent` →
 * `CreateAgent`, `message_batches_list` unchanged.
 */
const baseOperationId = (id: string): string =>
  id
    .replace(/^beta_/, "")
    .replace(/^Beta(?=[A-Z])/, "")
    .replace(/_v1_\w*_(get|post|put|patch|delete)$/, "");

const operationName = (id: string, route: string, method: string): string =>
  OPERATION_NAMES[`${method.toUpperCase()} ${route}`] ?? toVerbNoun(baseOperationId(id));

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`pnpm specs:local anthropic\` (or specs:fetch) first`,
  );
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

/** Resolve `$ref`s against the full spec's components. */
function deref(schema: any): any {
  let current = schema;
  const prefix = "#/components/schemas/";
  while (typeof current?.$ref === "string" && current.$ref.startsWith(prefix)) {
    current = fullSpec.components?.schemas?.[current.$ref.slice(prefix.length)];
  }
  return current;
}

// ---- 2. Bucket paths by area -----------------------------------------------
const buckets = new Map<string, Record<string, Record<string, unknown>>>();
for (const [pathKey, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  const [route, literal] = pathKey.split("?") as [string, string | undefined];
  if (literal !== undefined && literal !== BETA_LITERAL) {
    throw new Error(`${pathKey}: unknown query literal \`${literal}\` in a path key`);
  }
  const segment = /^\/v1\/([^/]+)/.exec(route)?.[1];
  if (segment === undefined) throw new Error(`${pathKey}: not under /v1/<area>`);
  const slug = `${literal === undefined ? "" : "beta_"}${segment}`;
  if (!buckets.has(slug)) buckets.set(slug, {});
  const bucketPaths = buckets.get(slug)!;
  if (bucketPaths[route]) throw new Error(`${pathKey}: ${route} appears twice in ${slug}`);
  bucketPaths[route] = pathItem;
}

// ---- 3. Pagination ---------------------------------------------------------
/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * does not page. Anthropic lists page one of two ways, both read off the
 * OpenAPI operation:
 *
 *   • by id (models, message batches): `?after_id=&limit=` in,
 *     `{ data, has_more, first_id, last_id }` out — relay mode, following
 *     `last_id` while `has_more` is true;
 *   • by page token (files, skills, managed agents, admin lists):
 *     `?page=&limit=` in, `{ data, next_page }` out, with a null
 *     `next_page` on the last page — cursor mode.
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const query = new Set(
    (op.parameters ?? []).filter((p: any) => p?.in === "query").map((p: any) => p.name),
  );
  const props = deref(op.responses?.["200"]?.content?.["application/json"]?.schema)?.properties;
  if (!props || typeof props !== "object" || deref(props.data)?.type !== "array") {
    return undefined;
  }
  const pageSize: Record<string, string> = query.has("limit") ? { pageSize: "limit" } : {};
  if (query.has("after_id") && "last_id" in props && "has_more" in props) {
    return {
      mode: "relay",
      inputToken: "after_id",
      outputToken: "last_id",
      hasNextPage: "has_more",
      items: "data",
      ...pageSize,
    };
  }
  if (query.has("page") && "next_page" in props) {
    return {
      mode: "cursor",
      inputToken: "page",
      outputToken: "next_page",
      items: "data",
      ...pageSize,
    };
  }
  return undefined;
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
      namespace: `com.anthropic.${slug}`,
      serviceName: toPascal(slug),
      headerParams: true,
      binaryTypes: true,
      // Every failure is the shared error envelope — see the module docblock
      // and src/errors.ts.
      statusToErrorClass: {},
      operationNames: (id, ctx) => operationName(id, ctx.path, ctx.method),
    },
  );

  const operations = Object.entries<any>(model.shapes).filter(([, s]) => s.type === "operation");
  if (operations.length === 0) throw new Error(`${slug}: no operations converted`);

  const byRoute = new Map<string, Record<string, string>>();
  for (const [route, pathItem] of Object.entries<any>(paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      // Deprecated operations are not converted (`skipDeprecated`).
      if (!op || op.deprecated === true) continue;
      const trait = paginationFor(op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${route}`, trait);
    }
  }
  let paginated = 0;
  for (const [, shape] of operations) {
    const http = shape.traits?.["smithy.api#http"];
    if (!http) continue;
    const trait = byRoute.get(`${http.method} ${http.uri}`);
    if (!trait) {
      // The converter's own cursor detection fires on `next_page`; the
      // trait stamped here is the only one kept.
      delete shape.traits["smithy.api#paginated"];
      continue;
    }
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

  writeModel(path.join(outDir, `${slug}.json`), model);
  written++;
  totalOps += operations.length;
  totalPaginated += paginated;
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root: rootDir, operationNaming: "as-is" });
