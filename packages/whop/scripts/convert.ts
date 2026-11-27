#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Whop's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Input: `specs/openapi.json` in the spec mirror (`specs/spec-mirror-whop`),
 * the document Whop serves at https://api.whop.com/api/v1/openapi.json and
 * generates its own SDKs from.
 *
 *   1. Read the document and its `info.x-api-version-date` pin.
 *   2. Drop `Api-Version-Date` parameters — WhopProtocol sends the pin on
 *      every request (see {@link API_VERSION_FILE}), so it is not a per-call
 *      input. `Idempotency-Key` is left in place and DOES become one.
 *   3. Bucket operations by PRIMARY (first) tag, case-normalized
 *      (`Promo Codes` + `Promo codes` → `promo_codes`).
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`.
 *   5. Stamp `smithy.api#paginated` on the list operations — see
 *      {@link paginationFor}.
 *   6. finalizeConvert applies patches/<model>/*.json (Smithy ops, under the
 *      names the spec gives), then the deferred verbNoun names.
 *
 * Operation ids are used VERBATIM — the document gives every operation one,
 * and across the buckets they are unique (the compiler lowerCamels them for
 * export: `listPlans`, `uploadDisputeEvidence`). A collision would otherwise
 * be silently renamed, so it fails the run instead.
 *
 * `scripts/generate.ts` (runGeneratorCli with `patchesDir: false`) then
 * compiles the already-patched models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-whop/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

/** Generated: the version pin `src/credentials.ts` defaults to. */
const API_VERSION_FILE = path.join(rootDir, "src/api-version.ts");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * The header the API versions by. Whop pins request/response SHAPES to a
 * date and defaults an unpinned caller to the original `2025-01-01` ones —
 * which are not the shapes this spec describes. WhopProtocol therefore
 * sends the pin on every request, and it is stripped from operation inputs
 * here so it can't be overridden per call into disagreeing with the
 * generated schemas.
 */
const API_VERSION_HEADER = "Api-Version-Date";

/**
 * The `Idempotency-Key` header member, as the converter names it
 * (`headerMemberName` lowerCamels header names) and as this SDK renames it.
 *
 * Whop's wire surface is snake_case throughout — `account_id`,
 * `initial_price`, `page_info` — and the generated inputs keep those names
 * verbatim. A lone camelCase `idempotencyKey` sitting among them reads like
 * a typo. The wire name lives on the member's `smithy.api#httpHeader` trait,
 * so this rename is purely the TS-facing spelling.
 */
const IDEMPOTENCY_MEMBER = "idempotencyKey";
const IDEMPOTENCY_MEMBER_RENAMED = "idempotency_key";

// ============================================================================
// String helpers
// ============================================================================

/** Tag → model/resource name. Case-normalizing, so `Promo Codes` and `Promo codes` agree. */
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

/** `GET /plans` — the identity a route is reported and matched on. */
const routeKey = (method: string, pathTemplate: string): string =>
  `${method.toUpperCase()} ${pathTemplate}`;

// ============================================================================
// 1. Read the document and its version pin
// ============================================================================

if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`pnpm --filter @distilled.cloud/whop run specs:fetch\``,
  );
}
const merged = JSON.parse(fs.readFileSync(specPath, "utf-8"));

const versionDate = merged.info?.["x-api-version-date"];
if (typeof versionDate !== "string") {
  throw new Error(
    "specs/openapi.json has no `info.x-api-version-date` — nothing to pin the SDK to",
  );
}

// ============================================================================
// 2–3. Strip the version header, bucket by tag
// ============================================================================

let versionHeadersDropped = 0;

/**
 * Drop `Api-Version-Date` from a parameter list, resolving `$ref`s to find
 * it — the document may declare it once under `components/parameters` and
 * `$ref` it from every operation, at the path or the operation level.
 */
const withoutVersionHeader = (params: any): any => {
  if (!Array.isArray(params)) return params;
  const kept = params.filter((raw: any) => {
    const p = raw?.$ref
      ? raw.$ref
          .split("/")
          .slice(1)
          .reduce((acc: any, key: string) => acc?.[key], merged)
      : raw;
    return !(p?.in === "header" && p?.name === API_VERSION_HEADER);
  });
  versionHeadersDropped += params.length - kept.length;
  return kept.length === params.length ? params : kept;
};

const tagBuckets = new Map<string, Record<string, any>>();
/** Bucket slug → operation id → the `METHOD path` claiming it. */
const nameClaims = new Map<string, Map<string, string[]>>();

for (const [pathTemplate, pathItem] of Object.entries<any>(merged.paths)) {
  pathItem.parameters = withoutVersionHeader(pathItem.parameters);
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (!op) continue;

    const key = routeKey(method, pathTemplate);
    op.parameters = withoutVersionHeader(op.parameters);

    if (typeof op.operationId !== "string" || op.operationId === "") {
      throw new Error(`${key} has no operationId`);
    }

    const rawTag: string | undefined =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
    const slug = rawTag !== undefined ? toSlug(rawTag) || "misc" : "misc";

    if (!nameClaims.has(slug)) nameClaims.set(slug, new Map());
    const claims = nameClaims.get(slug)!;
    if (!claims.has(op.operationId)) claims.set(op.operationId, []);
    claims.get(op.operationId)!.push(key);

    if (!tagBuckets.has(slug)) tagBuckets.set(slug, {});
    const bucketPaths = tagBuckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      bucketPaths[pathTemplate] = pathItem.parameters ? { parameters: pathItem.parameters } : {};
    }
    bucketPaths[pathTemplate][method] = op;
  }
}

console.log(
  `📌 ${versionHeadersDropped} \`${API_VERSION_HEADER}\` parameter(s) dropped ` +
    `— WhopProtocol pins ${versionDate} on every request`,
);

// A collision within one bucket would otherwise be silently renamed by the
// converter's uniqueName pass (`retrieveApp2`) — fail instead, naming both
// claimants.
const collisions: string[] = [];
for (const [slug, claims] of nameClaims) {
  for (const [name, keys] of claims) {
    if (keys.length > 1) {
      collisions.push(`${slug} :: ${name}\n` + keys.map((k) => `  ${k}`).join("\n"));
    }
  }
}
if (collisions.length) {
  throw new Error(`operation-id collision(s) in the tag buckets:\n${collisions.join("\n")}`);
}

// ============================================================================
// Pagination
// ============================================================================

/**
 * Response statuses the output shape is read from, most preferred first.
 * Beyond the converter's `200`/`201`/`204` default, some endpoints
 * answer asynchronous work with `202 Accepted` AND a payload (exports,
 * media generation) that would otherwise generate as a `void` output.
 */
const SUCCESS_STATUSES = ["200", "201", "202", "204"] as const;

/** Resolve a local `$ref` against the document. */
const deref = (node: any): any =>
  node?.$ref
    ? node.$ref
        .split("/")
        .slice(1)
        .reduce((acc: any, key: string) => acc?.[key.replace(/~1/g, "/")], merged)
    : node;

/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page.
 *
 * Every paginated Whop list is a RELAY
 * connection: `?first=N&after=<cursor>` in, and `{ data: [...], page_info: {
 * end_cursor, has_next_page, has_previous_page, start_cursor } }` back. The
 * last page still carries an `end_cursor`, so `has_next_page` is the only
 * thing that terminates traversal — which is exactly what core's
 * `paginateRelay` reads.
 *
 * The converter's own detection looks for a top-level `pagination` object or
 * a `next_token`, so it never fires here; the trait is stamped in this
 * script rather than teaching the shared converter about `page_info`, which
 * would make an unrelated API's `page_info` silently start paginating.
 *
 * All three parts are read off the operation, so an endpoint that stops
 * paging upstream stops being stamped:
 *   • `inputToken` — the `after` query parameter must exist;
 *   • `outputToken` — the success schema's `page_info` must carry
 *     `end_cursor` AND `has_next_page`;
 *   • `items` — `data` must be the array beside it.
 *
 * `before`/`last` (backwards paging) are left as plain inputs: a stream that
 * walks backwards from the end is a different traversal, not this one.
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const params = op.parameters ?? [];
  const hasQuery = (name: string) =>
    params.some((raw: any) => {
      const p = deref(raw);
      return p?.in === "query" && p?.name === name;
    });
  if (!hasQuery("after")) return undefined;

  const responses = op.responses ?? {};
  const success = SUCCESS_STATUSES.map((s) => responses[s]).find(Boolean);
  const schema = deref(deref(success)?.content?.["application/json"]?.schema);
  const props = schema?.properties;
  if (!props) return undefined;

  if (deref(props.data)?.type !== "array") return undefined;
  const pageInfo = deref(props.page_info)?.properties;
  if (!pageInfo?.end_cursor || !pageInfo?.has_next_page) return undefined;

  return {
    mode: "relay",
    inputToken: "after",
    outputToken: "page_info.end_cursor",
    hasNextPage: "page_info.has_next_page",
    items: "data",
    ...(hasQuery("first") ? { pageSize: "first" } : {}),
  };
};

// ============================================================================
// 7–8. Convert each bucket, stamp pagination
// ============================================================================

clearModels(outDir);

let written = 0;
let totalOps = 0;
let totalPaginated = 0;
let idempotencyRenames = 0;

for (const slug of [...tagBuckets.keys()].sort()) {
  const paths = tagBuckets.get(slug)!;
  const subSpec = { ...merged, paths };
  const model = convertOpenApiToSmithy(subSpec, {
    deferNaming: true,
    namespace: `com.whop.${slug}`,
    serviceName: toPascal(slug),
    // Deprecated operations (`searchAccounts`, …) stay out of the SDK.
    skipDeprecated: true,
    // `Idempotency-Key` is a real per-call input on every mutation
    // (see https://docs.whop.com/developer/api/idempotency). It is the only
    // header parameter left after the version pin is stripped above, so
    // turning this on adds exactly that member and nothing else.
    headerParams: true,
    successStatuses: SUCCESS_STATUSES,
    statusToErrorClass: {
      "400": "BadRequest",
      // Whop's `402` is a real, actionable outcome rather than a generic
      // failure: the account's balance can't cover the call (ad-campaign
      // payments, media generation billed from a balance).
      "402": "PaymentRequired",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
    },
    // 401/429/500/503 stay on the converter's default set: WhopProtocol
    // dispatches them from the status through core's shared map, so they
    // ride the common error channel instead of every operation's own union.
  });

  const operations = Object.entries<any>(model.shapes).filter(([, s]) => s.type === "operation");
  if (operations.length === 0) continue; // all-deprecated bucket

  // Spell the idempotency header input like the rest of the input.
  for (const shape of Object.values<any>(model.shapes)) {
    const member = shape.members?.[IDEMPOTENCY_MEMBER];
    if (!member?.traits?.["smithy.api#httpHeader"]) continue;
    delete shape.members[IDEMPOTENCY_MEMBER];
    shape.members[IDEMPOTENCY_MEMBER_RENAMED] = member;
    idempotencyRenames++;
  }

  // Match on the http trait's method + uri: Whop's path templates contain no
  // characters the converter sanitizes, so the emitted `uri` is the OpenAPI
  // path verbatim and this is an exact lookup rather than a name guess.
  const byRoute = new Map<string, Record<string, string>>();
  for (const [pathTemplate, pathItem] of Object.entries<any>(paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      // skipDeprecated leaves deprecated operations out of the model.
      if (!op || op.deprecated === true) continue;
      const trait = paginationFor(op);
      if (trait) byRoute.set(routeKey(method, pathTemplate), trait);
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

  writeModel(path.join(outDir, `${slug}.json`), model);
  written++;
  totalOps += operations.length;
  totalPaginated += paginated;
}

// ============================================================================
// The generated version pin
// ============================================================================

fs.writeFileSync(
  API_VERSION_FILE,
  `// AUTO-GENERATED by scripts/convert.ts from specs/openapi.json. Do not edit.
/**
 * The dated API version these services were generated from.
 *
 * Whop pins request and response SHAPES to a date, and defaults an unpinned
 * caller to the original \`2025-01-01\` ones -- which are NOT the shapes the
 * generated schemas describe. WhopProtocol therefore sends this on every
 * request, exactly as Whop's own generated SDKs do.
 *
 * @see https://docs.whop.com/developer/api/versioning
 */
export const API_VERSION_DATE = ${JSON.stringify(versionDate)};
`,
);

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);
console.log(
  `   ${idempotencyRenames} \`Idempotency-Key\` input(s) renamed to ` +
    `\`${IDEMPOTENCY_MEMBER_RENAMED}\`; pinned Api-Version-Date: ${versionDate}`,
);

await finalizeConvert({ root: rootDir });
