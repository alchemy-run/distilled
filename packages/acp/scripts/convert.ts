#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the ACP JSON Schema into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-acp/specs/schema.json  (stable v1 JSON Schema)
 *         specs/spec-mirror-acp/specs/meta.json    (wire method names by side)
 *         patches/acp/*.json  (RFC-6902 patches to the Smithy model)
 * Output: .generated-specs/acp.json
 *
 * ACP is JSON-RPC 2.0 over stdio, so this uses core's `json-schema-rpc`
 * dialect (`@distilled.cloud/core/codegen/jsonrpc`). The method list is
 * derived from the schema's own annotations — every Request / Response /
 * Notification definition in `$defs` carries
 *
 *   x-method  the wire method (`session/prompt`)
 *   x-side    who HANDLES it: "agent" (the agent answers — outbound from this
 *             SDK, which is the CLIENT), "client" (the agent calls us —
 *             inbound), or "protocol" (either peer, e.g. `$/cancel_request`)
 *
 * Each `*Request` pairs with the `*Response` of the same x-method/x-side;
 * a `*Notification` is a notification. meta.json is the cross-check: every
 * method it lists must be covered, and nothing else may appear.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  convertJsonSchemaRpcToSmithy,
  type JsonRpcMethodSpec,
} from "@distilled.cloud/core/codegen/jsonrpc";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SCHEMA_PATH = resolveSpecPath(ROOT, "specs/spec-mirror-acp/specs/schema.json");
const META_PATH = resolveSpecPath(ROOT, "specs/spec-mirror-acp/specs/meta.json");
const OUT_DIR = path.join(ROOT, ".generated-specs");
const OUT_FILE = path.join(OUT_DIR, "acp.json");

const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf-8")) as {
  $defs: Record<string, Record<string, unknown>>;
};
const meta = JSON.parse(fs.readFileSync(META_PATH, "utf-8")) as {
  version: number;
  agentMethods: Record<string, string>;
  clientMethods: Record<string, string>;
  protocolMethods?: Record<string, string>;
};

type Side = "agent" | "client" | "protocol";
interface Annotated {
  readonly name: string;
  readonly side: Side;
  readonly method: string;
  readonly role: "Request" | "Response" | "Notification";
  readonly description?: string;
}

const annotated: Annotated[] = [];
for (const [name, def] of Object.entries(schema.$defs)) {
  const method = def["x-method"];
  const side = def["x-side"];
  if (typeof method !== "string" || typeof side !== "string") continue;
  const role = /(Request|Response|Notification)$/.exec(name)?.[1] as Annotated["role"] | undefined;
  if (!role)
    throw new Error(
      `acp: ${name} has x-method ${method} but no Request/Response/Notification suffix`,
    );
  if (side !== "agent" && side !== "client" && side !== "protocol") {
    throw new Error(`acp: ${name} has unknown x-side ${side}`);
  }
  annotated.push({
    name,
    side,
    method,
    role,
    ...(typeof def.description === "string" ? { description: def.description } : {}),
  });
}

/**
 * Operation names that would collide with a `$defs` shape of the same name.
 * `session/update` derives `SessionUpdate`, which is also ACP's discriminated
 * update union — the converter would silently rename the operation, so name
 * it explicitly (the export reads naturally as a stream: `sessionUpdates`).
 */
const OPERATION_NAMES: Record<string, string> = {
  "session/update": "SessionUpdates",
};

/**
 * Inbound twins of bidirectional `protocol` methods need their own operation
 * name (the outbound one takes the default derived from the wire method).
 */
const INBOUND_PROTOCOL_NAMES: Record<string, string> = {
  "$/cancel_request": "CancelRequestReceived",
};

const methods: JsonRpcMethodSpec[] = [];
for (const a of annotated.sort((x, y) => x.method.localeCompare(y.method))) {
  if (a.role === "Response") continue;
  const documentation = a.description;
  if (a.role === "Request") {
    const response = annotated.find(
      (r) => r.role === "Response" && r.method === a.method && r.side === a.side,
    );
    if (!response) throw new Error(`acp: ${a.name} (${a.method}) has no matching *Response`);
    if (a.side === "protocol")
      throw new Error(`acp: protocol-level request ${a.method} unsupported`);
    methods.push({
      method: a.method,
      direction: a.side === "agent" ? "outbound" : "inbound",
      kind: "request",
      params: a.name,
      result: response.name,
      ...(OPERATION_NAMES[a.method] ? { name: OPERATION_NAMES[a.method] } : {}),
      ...(documentation ? { documentation } : {}),
    });
    continue;
  }
  // Notification
  if (a.side === "protocol") {
    // Either peer may send it: we can cancel our own outstanding requests,
    // and the agent can cancel the ones it sent us.
    methods.push({
      method: a.method,
      direction: "outbound",
      kind: "notification",
      params: a.name,
      ...(documentation ? { documentation } : {}),
    });
    const name = INBOUND_PROTOCOL_NAMES[a.method];
    if (!name) throw new Error(`acp: no inbound operation name for protocol method ${a.method}`);
    methods.push({
      method: a.method,
      direction: "inbound",
      kind: "notification",
      params: a.name,
      name,
      ...(documentation ? { documentation } : {}),
    });
  } else {
    methods.push({
      method: a.method,
      direction: a.side === "agent" ? "outbound" : "inbound",
      kind: "notification",
      params: a.name,
      ...(OPERATION_NAMES[a.method] ? { name: OPERATION_NAMES[a.method] } : {}),
      ...(documentation ? { documentation } : {}),
    });
  }
}

// Cross-check against meta.json: the annotations and the method index agree.
const metaMethods = new Set([
  ...Object.values(meta.agentMethods),
  ...Object.values(meta.clientMethods),
  ...Object.values(meta.protocolMethods ?? {}),
]);
const covered = new Set(methods.map((m) => m.method));
const missing = [...metaMethods].filter((m) => !covered.has(m));
const extra = [...covered].filter((m) => !metaMethods.has(m));
if (missing.length || extra.length) {
  throw new Error(
    `acp: schema annotations and meta.json disagree — missing ${JSON.stringify(missing)}, extra ${JSON.stringify(extra)}`,
  );
}
for (const m of methods) {
  const side = Object.values(meta.agentMethods).includes(m.method)
    ? "outbound"
    : Object.values(meta.clientMethods).includes(m.method)
      ? "inbound"
      : undefined;
  if (side && side !== m.direction) {
    throw new Error(`acp: ${m.method} is ${m.direction} by x-side but ${side} by meta.json`);
  }
}

const model = convertJsonSchemaRpcToSmithy({
  namespace: "com.agentclientprotocol.acp",
  serviceName: "Acp",
  version: String(meta.version),
  definitions: schema.$defs as Record<string, unknown>,
  methods,
});

// Guard: the JSON-RPC traits must sit on operations only. (An operation name
// equal to a definition name makes the converter rename the operation and the
// trait swap decorate the definition instead — fail loudly if that recurs.)
for (const [id, shape] of Object.entries(model.shapes as Record<string, any>)) {
  const isRpc = shape.traits?.["com.distilled.jsonrpc#method"] !== undefined;
  if (shape.type === "operation" && !isRpc) {
    throw new Error(
      `acp: operation ${id} lost its JSON-RPC method (name collision?) — add it to OPERATION_NAMES`,
    );
  }
  if (shape.type !== "operation" && isRpc) {
    throw new Error(
      `acp: non-operation ${id} carries JSON-RPC traits (name collision?) — add it to OPERATION_NAMES`,
    );
  }
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(model, null, 2)}\n`);

const count = (direction: string, kind: string) =>
  methods.filter((m) => m.direction === direction && m.kind === kind).length;
console.log(
  `✅ Converted ACP v${meta.version}: ${count("outbound", "request")} outbound requests, ` +
    `${count("outbound", "notification")} outbound notifications, ` +
    `${count("inbound", "request")} inbound requests, ` +
    `${count("inbound", "notification")} inbound notifications → ${OUT_FILE}`,
);

await finalizeConvert({ root: ROOT, operationNaming: "as-is" });
