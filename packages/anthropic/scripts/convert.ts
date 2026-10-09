#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Anthropic OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-anthropic/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/anthropic.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Anthropic's
 * pipeline config. `scripts/generate.ts` compiles the model into
 * src/services.
 *
 * Two spec quirks are handled here rather than in patches, because they are
 * mechanical and apply to every operation:
 *
 * 1. `?beta=true` path keys. Stainless models each beta endpoint as its own
 *    path key with a literal query string (`/v1/messages?beta=true` next to
 *    the GA `/v1/messages`); the official SDKs send that `beta=true` query
 *    parameter on every beta call. The converter drops a path key's query
 *    string, so the preprocess hook tags every operation under such a key
 *    with a marker header parameter, and the finalize transform swaps the
 *    marker for the literal on the operation's `smithy.api#http` uri
 *    (`/v1/messages?beta=true`). The protocol (src/protocol.ts) folds that
 *    literal into the request's query parameters. The caller never sees a
 *    `beta` input member — the route itself is the beta variant.
 *
 * 2. Protocol-owned headers. Nearly every operation declares `x-api-key` and
 *    `anthropic-version` header parameters; the protocol sends both (and
 *    picks the key per route), so they are removed from the inputs.
 *    `anthropic-beta`, `anthropic-workspace-id`, `anthropic-user-profile-id`
 *    and the rest stay as per-call header members (`headerParams: true`).
 *
 * Typed errors are NOT per-operation: the converter's status → class map is
 * disabled (`statusToErrorClass: {}`) because Anthropic discriminates
 * failures by the envelope's `error.type`, not the status, and every
 * operation declares the same 16 statuses. The `error.type` classes live in
 * src/errors.ts and ride on every operation as common error classes.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";

const root = path.resolve(import.meta.dirname, "..");

/** Marker header carried from preprocess to the finalize transform. */
const BETA_MARKER_HEADER = "x-distilled-beta-route";
const BETA_QUERY = "beta=true";
/** Headers the protocol owns; never per-call inputs. */
const PROTOCOL_HEADERS = new Set(["x-api-key", "anthropic-version"]);
const METHODS = ["get", "put", "post", "delete", "patch", "head", "options"];

// ---------------------------------------------------------------------------
// Operation names
// ---------------------------------------------------------------------------
//
// The spec mixes three id styles: Stainless resource ids (`messages_post`,
// `message_batches_retrieve`), FastAPI ids that spell out the route and
// method (`list_files_v1_files_get`), and PascalCase managed-agents ids
// (`BetaListSessions`). Names are computed here (convert policy, never an
// operationId patch):
//
//   • FastAPI ids lose their `_v1_<route>_<method>` tail.
//   • A `beta_`/`Beta` prefix is dropped — the route already carries
//     `?beta=true` — unless the GA spec has an operation of the same name,
//     in which case `Beta` qualifies the noun (`createBetaMessage` next to
//     `createMessage`).
//   • Admin analytics routes (`/v1/organizations/analytics/*`) qualify the
//     noun with `Analytics`; they otherwise collide with the admin cost and
//     usage reports.
//   • The irregulars below name the Stainless resource ids and the
//     too-generic managed-agents ids.

const IRREGULAR_NAMES: Record<string, string> = {
  messages_post: "createMessage",
  complete_post: "createCompletion",
  models_list: "listModels",
  models_get: "getModel",
  message_batches_post: "createMessageBatch",
  message_batches_list: "listMessageBatches",
  message_batches_retrieve: "getMessageBatch",
  message_batches_delete: "deleteMessageBatch",
  message_batches_cancel: "cancelMessageBatch",
  message_batches_results: "getMessageBatchResults",
  messages_count_tokens_post: "countMessageTokens",
  // Session sub-resources: `listEvents`/`getResource` alone say nothing.
  ListEvents: "listSessionEvents",
  SendEvents: "sendSessionEvents",
  ListResources: "listSessionResources",
  AddResource: "addSessionResource",
  GetResource: "getSessionResource",
  UpdateResource: "updateSessionResource",
  DeleteResource: "deleteSessionResource",
  // Vault credentials (and not the SDK's own `Credentials`).
  ListCredentials: "listVaultCredentials",
  CreateCredential: "createVaultCredential",
  GetCredential: "getVaultCredential",
  UpdateCredential: "updateVaultCredential",
  DeleteCredential: "deleteVaultCredential",
  ArchiveCredential: "archiveVaultCredential",
  ValidateCredential: "validateVaultCredential",
};

const camel = (id: string): string => {
  const words = id.split(/_+/).filter(Boolean);
  if (words.length === 1) return words[0]!.charAt(0).toLowerCase() + words[0]!.slice(1);
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");
};

/** `beta_list_files_v1_files_get` → `{ beta: true, name: "listFiles" }`. */
const baseName = (operationId: string): { beta: boolean; name: string } => {
  let id = operationId.replace(/_v1_[a-z0-9_]*_(get|post|put|patch|delete)$/, "");
  let beta = false;
  if (id.startsWith("beta_")) {
    beta = true;
    id = id.slice("beta_".length);
  } else if (/^Beta[A-Z]/.test(id)) {
    beta = true;
    id = id.slice("Beta".length);
  }
  return { beta, name: IRREGULAR_NAMES[id] ?? camel(id) };
};

/** Insert a qualifier after the leading verb: (`getCostReport`, `Analytics`). */
const qualify = (name: string, qualifier: string): string => {
  const verb = /^[a-z]+/.exec(name)![0];
  return `${verb}${qualifier}${name.slice(verb.length)}`;
};

/** GA operation names, collected by preprocess before conversion. */
const gaNames = new Set<string>();

const operationName = (operationId: string, ctx: { path: string; method: string }) => {
  const { beta, name } = baseName(operationId);
  if (ctx.path.startsWith("/v1/organizations/analytics/")) return qualify(name, "Analytics");
  if (beta && gaNames.has(name)) return qualify(name, "Beta");
  return name;
};

const preprocess = (spec: any) => {
  for (const [key, item] of Object.entries<any>(spec.paths)) {
    if (key.includes("?")) continue;
    for (const method of METHODS) {
      const id = item[method]?.operationId;
      if (typeof id === "string") gaNames.add(baseName(id).name);
    }
  }
  for (const [key, item] of Object.entries<any>(spec.paths)) {
    const query = key.includes("?") ? key.slice(key.indexOf("?") + 1) : undefined;
    if (query !== undefined && query !== BETA_QUERY) {
      throw new Error(`unexpected literal query on path key ${key} — extend scripts/convert.ts`);
    }
    if (Array.isArray(item.parameters)) {
      item.parameters = item.parameters.filter(
        (p: any) => !(p.in === "header" && PROTOCOL_HEADERS.has(String(p.name).toLowerCase())),
      );
    }
    for (const method of METHODS) {
      const op = item[method];
      if (!op) continue;
      const params = (op.parameters ?? []).filter(
        (p: any) => !(p.in === "header" && PROTOCOL_HEADERS.has(String(p.name).toLowerCase())),
      );
      if (query !== undefined) {
        params.push({
          name: BETA_MARKER_HEADER,
          in: "header",
          required: false,
          schema: { type: "string" },
        });
      }
      op.parameters = params;
    }
  }
};

/**
 * Swap the marker header member for the `?beta=true` uri literal. A
 * dual-mode endpoint's `<Op>Stream` sibling shares its input shape, so
 * operations are rewritten first and the markers removed after.
 */
const applyBetaRoutes = (model: any): string => {
  const isMarker = (m: any) => m.traits?.["smithy.api#httpHeader"] === BETA_MARKER_HEADER;
  let count = 0;
  const inputs = new Set<any>();
  for (const shape of Object.values<any>(model.shapes)) {
    if (shape.type !== "operation") continue;
    const input = model.shapes[shape.input?.target];
    if (!Object.values<any>(input?.members ?? {}).some(isMarker)) continue;
    inputs.add(input);
    const http = shape.traits["smithy.api#http"];
    http.uri = `${http.uri}?${BETA_QUERY}`;
    count++;
  }
  for (const input of inputs) {
    for (const [name, member] of Object.entries<any>(input.members)) {
      if (isMarker(member)) delete input.members[name];
    }
  }
  return `beta routes: ${count} operation(s) → ?${BETA_QUERY}`;
};

/**
 * Stamp `smithy.api#paginated` on the list operations. The converter's
 * detector knows `pagination.*`/`next_token` envelopes, not Anthropic's two
 * list shapes:
 *
 *   • relay — `?after_id=` in, `{ data, has_more, first_id, last_id }` out
 *     (models, message batches, admin users/invites/workspaces/api keys).
 *     `last_id` is set on the last page too, so `has_more` terminates.
 *   • cursor — `?page=` in, `{ data, next_page }` out (files, skills,
 *     managed agents, admin reports); `next_page: null` terminates.
 *
 * Both run through core's `paginateWithDefaults`, which dispatches on `mode`.
 */
const applyPagination = (model: any): string => {
  let relay = 0;
  let cursor = 0;
  for (const shape of Object.values<any>(model.shapes)) {
    if (shape.type !== "operation" || shape.traits["com.distilled#eventStream"]) continue;
    const input = model.shapes[shape.input?.target]?.members ?? {};
    const output = model.shapes[shape.output?.target]?.members ?? {};
    if (!("data" in output)) continue;
    const pageSize = "limit" in input ? { pageSize: "limit" } : {};
    if ("after_id" in input && "last_id" in output && "has_more" in output) {
      shape.traits["smithy.api#paginated"] = {
        mode: "relay",
        inputToken: "after_id",
        outputToken: "last_id",
        hasNextPage: "has_more",
        items: "data",
        ...pageSize,
      };
      relay++;
    } else if ("page" in input && "next_page" in output) {
      shape.traits["smithy.api#paginated"] = {
        mode: "cursor",
        inputToken: "page",
        outputToken: "next_page",
        items: "data",
        ...pageSize,
      };
      cursor++;
    }
  }
  return `pagination: ${relay} relay + ${cursor} cursor operation(s)`;
};

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "anthropic",
      specPath: "specs/spec-mirror-anthropic/specs/openapi.json",
      preprocess,
    },
  ],
  patchesDir: "patches",
  // Finalized below, after the beta-route transform.
  finalize: false,
  options: {
    namespace: "com.anthropic.api",
    serviceName: "Anthropic",
    skipDeprecated: true,
    headerParams: true,
    binaryTypes: true,
    unionCaseTitles: true,
    statusToErrorClass: {},
    operationNames: operationName,
  },
});

await finalizeConvert({
  root,
  patchesDir: false,
  operationNaming: "as-is",
  include: (resource) => resource === "anthropic",
  transform: (model) => `${applyBetaRoutes(model)}; ${applyPagination(model)}`,
});
