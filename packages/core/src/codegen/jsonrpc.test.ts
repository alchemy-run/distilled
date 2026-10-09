import { describe, expect, test } from "vitest";
import { generateService, type SdkSpec } from "./generator.ts";
import {
  convertJsonSchemaRpcToSmithy,
  JSONRPC_INBOUND_TRAIT,
  JSONRPC_METHOD_TRAIT,
  JSONRPC_NOTIFICATION_TRAIT,
  JSONRPC_NO_PARAMS_TRAIT,
  JSONRPC_SERVICE_TRAIT,
  jsonRpcEmission,
  methodToOperationName,
  normalizeJsonSchema,
} from "./jsonrpc.ts";

const ns = "com.example.agent";

/** A miniature ACP: JSON Schema definitions using `#/$defs` refs. */
const definitions = {
  SessionId: { type: "string" },
  PromptRequest: {
    type: "object",
    required: ["sessionId", "prompt"],
    properties: {
      sessionId: { $ref: "#/$defs/SessionId" },
      prompt: { type: "array", items: { $ref: "#/$defs/ContentBlock" } },
    },
  },
  ContentBlock: {
    type: "object",
    required: ["type", "text"],
    properties: { type: { type: "string" }, text: { type: "string" } },
  },
  PromptResponse: {
    type: "object",
    required: ["stopReason"],
    properties: { stopReason: { type: "string", enum: ["end_turn", "cancelled"] } },
  },
  CancelNotification: {
    type: "object",
    required: ["sessionId"],
    properties: { sessionId: { $ref: "#/$defs/SessionId" } },
  },
  ReadTextFileRequest: {
    type: "object",
    required: ["path"],
    properties: { path: { type: "string" } },
  },
  ReadTextFileResponse: {
    type: "object",
    required: ["content"],
    properties: { content: { type: "string" } },
  },
  SessionNotification: {
    type: "object",
    required: ["sessionId", "update"],
    properties: { sessionId: { $ref: "#/$defs/SessionId" }, update: { type: "object" } },
  },
};

const model = () =>
  convertJsonSchemaRpcToSmithy({
    namespace: ns,
    serviceName: "Agent",
    definitions,
    methods: [
      {
        method: "session/prompt",
        direction: "outbound",
        kind: "request",
        params: "PromptRequest",
        result: "PromptResponse",
      },
      {
        method: "session/cancel",
        direction: "outbound",
        kind: "notification",
        params: "CancelNotification",
      },
      {
        method: "fs/read_text_file",
        direction: "inbound",
        kind: "request",
        params: "ReadTextFileRequest",
        result: "ReadTextFileResponse",
      },
      {
        method: "session/update",
        direction: "inbound",
        kind: "notification",
        params: "SessionNotification",
      },
    ],
  });

describe("json-schema-rpc dialect", () => {
  test("method names become PascalCase operation names", () => {
    expect(methodToOperationName("session/request_permission")).toBe("SessionRequestPermission");
    expect(methodToOperationName("$/cancel_request")).toBe("CancelRequest");
    expect(methodToOperationName("thread/start")).toBe("ThreadStart");
  });

  test("operations carry JSON-RPC traits instead of an HTTP binding", () => {
    const { shapes } = model();
    const prompt = shapes[`${ns}#SessionPrompt`];
    expect(prompt.traits[JSONRPC_METHOD_TRAIT]).toBe("session/prompt");
    expect(prompt.traits["smithy.api#http"]).toBeUndefined();
    expect(prompt.traits[JSONRPC_NOTIFICATION_TRAIT]).toBeUndefined();
    expect(shapes[`${ns}#SessionCancel`].traits[JSONRPC_NOTIFICATION_TRAIT]).toEqual({});
    expect(shapes[`${ns}#FsReadTextFile`].traits[JSONRPC_INBOUND_TRAIT]).toEqual({});
    expect(shapes[`${ns}#Agent`].traits[JSONRPC_SERVICE_TRAIT]).toEqual({ params: "named" });
  });

  test("params flatten into the input; results reuse named definitions", () => {
    const { shapes } = model();
    const prompt = shapes[`${ns}#SessionPrompt`];
    const input = shapes[prompt.input.target];
    expect(Object.keys(input.members).sort()).toEqual(["prompt", "sessionId"]);
    expect(prompt.output.target).toBe(`${ns}#PromptResponse`);
    expect(shapes[`${ns}#SessionCancel`].output.target).toBe("smithy.api#Unit");
  });

  test("unknown definitions and name collisions are rejected", () => {
    expect(() =>
      convertJsonSchemaRpcToSmithy({
        namespace: ns,
        serviceName: "Agent",
        definitions,
        methods: [{ method: "x/y", direction: "outbound", kind: "request", params: "Nope" }],
      }),
    ).toThrow(/unknown definition Nope/);
    expect(() =>
      convertJsonSchemaRpcToSmithy({
        namespace: ns,
        serviceName: "Agent",
        definitions,
        methods: [
          { method: "a/b", direction: "outbound", kind: "notification" },
          { method: "a_b", direction: "inbound", kind: "notification" },
        ],
      }),
    ).toThrow(/used by both a\/b and a_b/);
  });
});

describe("JSON-RPC emission", () => {
  const generate = () => {
    const spec: SdkSpec = {
      unionStyle: "opaque-cases",
      ...jsonRpcEmission({
        protocol: "AgentProtocol",
        connection: "AgentConnection",
        commonErrorType: "AgentOpError",
        commonErrorClasses: ["UnknownAgentError"],
      }),
    };
    return generateService(model(), spec).code;
  };

  test("outbound requests and notifications become JsonRpc callables", () => {
    const code = generate();
    expect(code).toMatch(
      /export const sessionPrompt: JsonRpc\.RequestMethod<\s*SessionPromptRequest,\s*PromptResponse,\s*SessionPromptError,\s*AgentConnection\s*> = \/\*@__PURE__\*\/ JsonRpc\.request\(|export const sessionPrompt: JsonRpc\.RequestMethod<SessionPromptRequest, PromptResponse, SessionPromptError, AgentConnection> = JsonRpc\.request\(/,
    );
    expect(code).toContain(`method: "session/prompt"`);
    expect(code).toContain(`errors: [UnknownAgentError]`);
    expect(code).toMatch(
      /export const sessionCancel: JsonRpc\.RequestMethod<SessionCancelRequest, void, JsonRpc\.JsonRpcTransportError, AgentConnection>/,
    );
  });

  test("inbound notifications become streams; inbound methods land in the handler table", () => {
    const code = generate();
    expect(code).toContain(
      `export const sessionUpdate: Stream.Stream<SessionUpdateRequest, never, AgentConnection> = JsonRpc.notifications(`,
    );
    expect(code).not.toMatch(/export const fsReadTextFile/);
    expect(code).toContain(
      `  fsReadTextFile: { method: "fs/read_text_file", kind: "request", params: FsReadTextFileRequest, result: ReadTextFileResponse },`,
    );
    expect(code).toContain(
      `  readonly fsReadTextFile?: (params: FsReadTextFileRequest) => Effect.Effect<ReadTextFileResponse, JsonRpc.HandlerError, R>;`,
    );
    expect(code).toContain(
      `  readonly sessionUpdate?: (params: SessionUpdateRequest) => Effect.Effect<void, never, R>;`,
    );
    expect(code).toContain(`export const handlers = <R = never>(impl: InboundHandlers<R>)`);
    expect(code).toContain(`import * as JsonRpc from "@distilled.cloud/core/jsonrpc";`);
  });
});

describe("json-schema-rpc normalization and edge cases", () => {
  const base = {
    Mode: {
      oneOf: [
        { type: "string", const: "fast" },
        { type: "string", const: "slow" },
      ],
    },
    Update: {
      oneOf: [
        {
          type: "object",
          required: ["kind"],
          properties: { kind: { const: "text" }, text: { type: "string" } },
        },
        {
          type: "object",
          required: ["kind"],
          properties: {
            kind: { const: "plan" },
            steps: { type: "array", items: { type: "string" } },
          },
        },
      ],
    },
    LoginParams: {
      oneOf: [
        {
          type: "object",
          required: ["type"],
          properties: { type: { const: "apiKey" }, apiKey: { type: "string" } },
        },
        { type: "object", required: ["type"], properties: { type: { const: "chatgpt" } } },
      ],
    },
    LoginResponse: { type: "object", properties: { ok: { type: "boolean" } } },
    StatusResponse: { type: "object", properties: { mode: { $ref: "#/$defs/Mode" } } },
  };

  const model = () =>
    convertJsonSchemaRpcToSmithy({
      namespace: ns,
      serviceName: "Agent",
      definitions: base,
      methods: [
        {
          method: "account/login",
          direction: "outbound",
          kind: "request",
          params: "LoginParams",
          result: "LoginResponse",
        },
        { method: "status/read", direction: "outbound", kind: "request", result: "StatusResponse" },
        { method: "initialized", direction: "outbound", kind: "notification" },
      ],
    });

  test("const discriminators become enums; literal unions collapse to one enum", () => {
    expect(normalizeJsonSchema({ const: "x" })).toEqual({ enum: ["x"], type: "string" });
    expect(normalizeJsonSchema(base.Mode)).toEqual({ type: "string", enum: ["fast", "slow"] });
    const { shapes } = model();
    const mode = shapes[`${ns}#Mode`];
    expect(mode.type).toBe("enum");
  });

  test("base properties beside a oneOf distribute into every variant", () => {
    // ACP's SessionConfigOption: shared id/name AND one per-kind variant.
    const out = normalizeJsonSchema({
      type: "object",
      properties: { id: { type: "string" }, name: { type: "string" } },
      required: ["id"],
      oneOf: [
        { type: "object", properties: { value: { type: "boolean" } }, required: ["value"] },
        { type: "object", allOf: [{ $ref: "#/$defs/Select" }] },
      ],
    }) as { properties?: unknown; oneOf: Array<{ properties: object; required: string[] }> };
    expect(out.properties).toBeUndefined();
    expect(Object.keys(out.oneOf[0]!.properties)).toEqual(["id", "name", "value"]);
    expect(out.oneOf[0]!.required).toEqual(["id", "value"]);
    expect(Object.keys(out.oneOf[1]!.properties)).toEqual(["id", "name"]);
  });

  test("union params are the operation's input directly (no `body` wrapper)", () => {
    const { shapes } = model();
    const login = shapes[`${ns}#AccountLogin`];
    expect(login.input.target).toBe(`${ns}#LoginParams`);
    const { code } = generateService(model(), {
      unionStyle: "opaque-cases",
      ...jsonRpcEmission({
        protocol: "P",
        connection: "C",
        commonErrorType: "E",
        commonErrorClasses: [],
      }),
    });
    expect(code).toMatch(/export const accountLogin: JsonRpc\.RequestMethod<\s*LoginParams,/);
  });

  test("methods without params take no argument (void input, S.Void schema)", () => {
    const { shapes } = model();
    expect(shapes[`${ns}#StatusRead`].traits[JSONRPC_NO_PARAMS_TRAIT]).toEqual({});
    const emission = jsonRpcEmission({
      protocol: "P",
      connection: "C",
      commonErrorType: "E",
      commonErrorClasses: [],
    });
    const { code } = generateService(model(), { unionStyle: "opaque-cases", ...emission });
    expect(code).toMatch(/export const statusRead: JsonRpc\.RequestMethod<\s*void,/);
    expect(code).toMatch(/statusRead[\s\S]*?input: S\.Void/);
    expect(code).toMatch(/export const initialized: JsonRpc\.RequestMethod<void, void,/);
  });

  test("an operation name colliding with a definition fails loudly", () => {
    expect(() =>
      convertJsonSchemaRpcToSmithy({
        namespace: ns,
        serviceName: "Agent",
        definitions: { ...base, StatusRead: { type: "object" } },
        methods: [
          {
            method: "status/read",
            direction: "outbound",
            kind: "request",
            result: "StatusResponse",
          },
        ],
      }),
    ).toThrow(/collides with the definition StatusRead/);
  });

  test("postProcess drops an unused traits import", () => {
    const emission = jsonRpcEmission({
      protocol: "P",
      connection: "C",
      commonErrorType: "E",
      commonErrorClasses: [],
    });
    const header = emission.header({ hasPaginated: false, model: {} });
    expect(header).toContain(`import * as T from "../traits.ts";`);
    expect(emission.postProcess(`${header}export const x = 1;\n`)).not.toContain(`import * as T`);
    expect(emission.postProcess(`${header}export const x = T.Body("a");\n`)).toContain(
      `import * as T`,
    );
  });
});
