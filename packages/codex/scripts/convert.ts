#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Codex app-server JSON Schemas into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-codex/specs/{Client,Server}{Request,Notification}.json
 *           the four per-direction method unions: a `oneOf` of
 *           `{ method: { enum: [<wire method>] }, params: <schema> }` variants
 *           plus a `definitions` map holding every params type
 *         specs/spec-mirror-codex/specs/{,v1/,v2/}*Response.json
 *           the request result types (not part of the unions)
 *         patches/codex/*.json  (RFC-6902 patches to the Smithy model)
 * Output: .generated-specs/codex.json
 *
 * Codex speaks JSON-RPC (without the `"jsonrpc": "2.0"` member) over stdio,
 * so this uses core's `json-schema-rpc` dialect
 * (`@distilled.cloud/core/codegen/jsonrpc`):
 *
 *   ClientRequest       → outbound requests       (we call `codex app-server`)
 *   ClientNotification  → outbound notifications
 *   ServerRequest       → inbound requests        (approvals, user input, …)
 *   ServerNotification  → inbound notifications   (thread/turn/item events)
 *
 * Request results are resolved by convention — a `FooParams` request returns
 * `FooResponse`, a request without params returns `<PascalCase(method)>Response`
 * — with an explicit override table for the methods that break it. The
 * convention and the overrides are ported from T3 Code's
 * `effect-codex-app-server` generator (MIT, T3 Tools Inc.). An unresolvable
 * result fails the run.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  convertJsonSchemaRpcToSmithy,
  JSONRPC_METHOD_TRAIT,
  methodToOperationName,
  type JsonRpcMethodSpec,
} from "@distilled.cloud/core/codegen/jsonrpc";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SPECS_DIR = resolveSpecPath(ROOT, "specs/spec-mirror-codex/specs");
const OUT_DIR = path.join(ROOT, ".generated-specs");
const OUT_FILE = path.join(OUT_DIR, "codex.json");

type Json = Record<string, unknown>;
const isObject = (u: unknown): u is Json =>
  typeof u === "object" && u !== null && !Array.isArray(u);
const readJson = (file: string): Json => {
  const doc = JSON.parse(fs.readFileSync(file, "utf-8"));
  if (!isObject(doc)) throw new Error(`codex: ${file} is not a JSON object`);
  return doc;
};

//#region Definitions

/**
 * Every definition, merged across the union files and the per-type response
 * files. The same name appears in many files (each file inlines the closure
 * of what it references); a name whose copies DISAGREE is a real conflict and
 * fails the run rather than silently picking one.
 */
const definitions: Record<string, Json> = {};
const definedIn: Record<string, string> = {};
const canonical = (u: unknown): string =>
  JSON.stringify(u, (_k, v) =>
    isObject(v) ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b))) : v,
  );
const define = (name: string, schema: Json, file: string) => {
  const existing = definitions[name];
  if (existing === undefined) {
    definitions[name] = schema;
    definedIn[name] = file;
  } else if (canonical(existing) !== canonical(schema)) {
    throw new Error(
      `codex: conflicting definitions of ${name} in ${definedIn[name]} and ${file} — ` +
        `the merged definitions map cannot hold both`,
    );
  }
};
const defineAll = (doc: Json, file: string) => {
  if (doc.definitions === undefined) return;
  if (!isObject(doc.definitions)) throw new Error(`codex: ${file} definitions is not an object`);
  for (const [name, schema] of Object.entries(doc.definitions)) {
    if (!isObject(schema)) throw new Error(`codex: ${file}#/definitions/${name} is not a schema`);
    define(name, schema, file);
  }
};

const UNIONS = [
  "ClientRequest",
  "ClientNotification",
  "ServerRequest",
  "ServerNotification",
] as const;
type Union = (typeof UNIONS)[number];
const unions = Object.fromEntries(
  UNIONS.map((u) => {
    const file = path.join(SPECS_DIR, `${u}.json`);
    const doc = readJson(file);
    defineAll(doc, `${u}.json`);
    return [u, doc];
  }),
) as Record<Union, Json>;

const responseFiles = ["", "v1", "v2"].flatMap((sub) => {
  const dir = path.join(SPECS_DIR, sub);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith("Response.json"))
    .sort()
    .map((f) => path.join(sub, f));
});
if (responseFiles.length === 0) throw new Error(`codex: no *Response.json files in ${SPECS_DIR}`);
for (const rel of responseFiles) {
  const doc = readJson(path.join(SPECS_DIR, rel));
  defineAll(doc, rel);
  // The file's root schema is the response type itself.
  const { definitions: _defs, $schema: _schema, ...root } = doc;
  define(path.basename(rel, ".json"), root, rel);
}

//#endregion

//#region Methods

interface UnionVariant {
  readonly method: string;
  /** The params definition, or undefined for a method without params. */
  readonly params?: string;
  readonly description?: string;
}

const refName = (ref: unknown): string => {
  if (typeof ref !== "string" || !ref.startsWith("#/definitions/")) {
    throw new Error(`codex: unsupported $ref ${JSON.stringify(ref)}`);
  }
  return ref.slice("#/definitions/".length);
};

/**
 * Params schemas come in three shapes: `{ $ref }` (required params),
 * `{ anyOf: [{ $ref }, { type: "null" }] }` (optional params — sent as an
 * object or omitted), and `{ type: "null" }` (no params at all).
 */
const paramsDefinition = (params: unknown, where: string): string | undefined => {
  if (params === undefined) return undefined;
  if (!isObject(params)) throw new Error(`codex: ${where} params is not a schema`);
  if (params.$ref !== undefined) return refName(params.$ref);
  if (params.type === "null") return undefined;
  if (Array.isArray(params.anyOf)) {
    const refs = params.anyOf.filter((s) => isObject(s) && s.$ref !== undefined);
    const rest = params.anyOf.filter((s) => !(isObject(s) && s.$ref !== undefined));
    if (refs.length === 1 && rest.every((s) => isObject(s) && s.type === "null")) {
      return refName((refs[0] as Json).$ref);
    }
  }
  throw new Error(`codex: ${where} has an unsupported params schema ${JSON.stringify(params)}`);
};

const variants = (union: Union): UnionVariant[] => {
  const doc = unions[union];
  if (!Array.isArray(doc.oneOf)) throw new Error(`codex: ${union}.json has no oneOf`);
  return doc.oneOf.map((variant, i) => {
    const where = `${union}.json#/oneOf/${i}`;
    if (!isObject(variant) || !isObject(variant.properties)) {
      throw new Error(`codex: ${where} is not an object variant`);
    }
    const methodSchema = variant.properties.method;
    const method =
      isObject(methodSchema) && Array.isArray(methodSchema.enum) && methodSchema.enum.length === 1
        ? methodSchema.enum[0]
        : undefined;
    if (typeof method !== "string") throw new Error(`codex: ${where} has no single method enum`);
    const params = paramsDefinition(variant.properties.params, `${where} (${method})`);
    return {
      method,
      ...(params !== undefined ? { params } : {}),
      ...(typeof variant.description === "string" ? { description: variant.description } : {}),
    };
  });
};

/**
 * Results that don't follow the `XParams → XResponse` / method-name
 * convention. Ported from T3 Code's effect-codex-app-server generator
 * (`resolveResponseTypeName`).
 */
const RESULT_OVERRIDES: Record<string, string> = {
  "account/gatewayOAuth/cancel": "GatewayOAuthCancelResponse",
  "account/gatewayOAuth/login": "GatewayOAuthLoginResponse",
  "account/gatewayOAuth/read": "GatewayOAuthReadResponse",
  "account/logout": "LogoutAccountResponse",
  "account/rateLimits/read": "GetAccountRateLimitsResponse",
  "account/usage/read": "GetAccountTokenUsageResponse",
  "account/workspaceMessages/read": "GetWorkspaceMessagesResponse",
  "config/batchWrite": "ConfigWriteResponse",
  "config/mcpServer/reload": "McpServerRefreshResponse",
  "config/value/write": "ConfigWriteResponse",
  "configRequirements/read": "ConfigRequirementsReadResponse",
  "externalAgentConfig/import/readHistories": "ExternalAgentConfigImportHistoriesReadResponse",
};

const resolveResult = (v: UnionVariant): string => {
  const candidates = [
    RESULT_OVERRIDES[v.method],
    v.params?.endsWith("Params") ? `${v.params.slice(0, -"Params".length)}Response` : undefined,
    `${methodToOperationName(v.method)}Response`,
  ].filter((c): c is string => c !== undefined);
  const found = candidates.find((c) => c in definitions);
  if (found === undefined) {
    throw new Error(
      `codex: cannot resolve the result type of ${v.method} (tried ${candidates.join(", ")}) — ` +
        `add it to RESULT_OVERRIDES`,
    );
  }
  return found;
};

/**
 * Operation names that would collide with a definition of the same name (the
 * converter would rename the operation and the JSON-RPC traits would land on
 * the definition), or that read badly as an export. Keyed by wire method;
 * every other method takes the default `methodToOperationName`.
 */
const OPERATION_NAMES: Record<string, string> = {
  // `ThreadTurnsList` is the synthesized list shape of `Thread.turns`.
  "thread/turns/list": "ListThreadTurns",
  // Definitions of the same name (the method's params/result types).
  "windowsSandbox/readiness": "GetWindowsSandboxReadiness",
  "mcpServer/event/stream/notification": "McpServerEventStream",
  "model/verification": "ModelVerifications",
};

const methods: JsonRpcMethodSpec[] = [];
const overridesUsed = new Set<string>();
const push = (
  v: UnionVariant,
  direction: JsonRpcMethodSpec["direction"],
  kind: JsonRpcMethodSpec["kind"],
) => {
  const name = OPERATION_NAMES[v.method] ?? methodToOperationName(v.method);
  if (name in definitions) {
    throw new Error(
      `codex: ${v.method} derives operation ${name}, which is also a definition — add it to OPERATION_NAMES`,
    );
  }
  let result: string | undefined;
  if (kind === "request") {
    result = resolveResult(v);
    if (RESULT_OVERRIDES[v.method] === result) overridesUsed.add(v.method);
  }
  methods.push({
    method: v.method,
    direction,
    kind,
    name,
    ...(v.params !== undefined ? { params: v.params } : {}),
    ...(result !== undefined ? { result } : {}),
    ...(v.description ? { documentation: v.description } : {}),
  });
};

for (const v of variants("ClientRequest")) push(v, "outbound", "request");
for (const v of variants("ClientNotification")) push(v, "outbound", "notification");
for (const v of variants("ServerRequest")) push(v, "inbound", "request");
for (const v of variants("ServerNotification")) push(v, "inbound", "notification");

const unusedOverrides = Object.keys(RESULT_OVERRIDES).filter((m) => !overridesUsed.has(m));
if (unusedOverrides.length) {
  console.warn(
    `   ⚠️  RESULT_OVERRIDES no longer needed (or method gone): ${unusedOverrides.join(", ")}`,
  );
}

//#endregion

const upstreamFile = path.join(SPECS_DIR, "_upstream.json");
const upstream = fs.existsSync(upstreamFile) ? readJson(upstreamFile) : {};

const model = convertJsonSchemaRpcToSmithy({
  namespace: "com.openai.codex",
  serviceName: "Codex",
  version: typeof upstream.sha === "string" ? upstream.sha : "1",
  definitions,
  methods,
});

// Guard: the JSON-RPC traits must sit on operations only. (An operation name
// equal to a definition name makes the converter rename the operation and the
// trait swap decorate the definition instead — fail loudly if that recurs.)
const misplaced: string[] = [];
for (const [id, shape] of Object.entries(model.shapes as Record<string, any>)) {
  const isRpc = shape.traits?.[JSONRPC_METHOD_TRAIT] !== undefined;
  if (shape.type === "operation" && !isRpc)
    misplaced.push(`operation ${id} lost its JSON-RPC method`);
  if (shape.type !== "operation" && isRpc)
    misplaced.push(`non-operation ${id} carries JSON-RPC traits`);
}
if (misplaced.length) {
  throw new Error(
    `codex: operation/shape name collisions — add the methods to OPERATION_NAMES:\n  ${misplaced.join("\n  ")}`,
  );
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(model, null, 2)}\n`);

const count = (direction: string, kind: string) =>
  methods.filter((m) => m.direction === direction && m.kind === kind).length;
console.log(
  `✅ Converted Codex app-server${typeof upstream.sha === "string" ? ` @ ${upstream.sha.slice(0, 12)}` : ""}: ` +
    `${count("outbound", "request")} outbound requests, ` +
    `${count("outbound", "notification")} outbound notifications, ` +
    `${count("inbound", "request")} inbound requests, ` +
    `${count("inbound", "notification")} inbound notifications ` +
    `(${Object.keys(definitions).length} definitions, ${overridesUsed.size} result overrides) → ${OUT_FILE}`,
);

await finalizeConvert({ root: ROOT, operationNaming: "as-is" });
