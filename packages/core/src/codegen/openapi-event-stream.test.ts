import { describe, expect, test } from "vitest";
import { EVENT_STREAM_TRAIT } from "./event-stream.ts";
import { generateService, type SdkSpec } from "./generator.ts";
import { convertOpenApiToSmithy } from "./openapi.ts";

const ns = "com.example.sse";

const model = () =>
  convertOpenApiToSmithy(
    {
      openapi: "3.1.0",
      info: { title: "Sse", version: "1" },
      components: {
        schemas: {
          Response: {
            type: "object",
            properties: { id: { type: "string" }, output: { type: "string" } },
          },
          StreamEvent: {
            oneOf: [
              {
                type: "object",
                properties: {
                  type: { type: "string", const: "delta" },
                  delta: { type: "string" },
                },
              },
              {
                type: "object",
                properties: {
                  type: { type: "string", const: "completed" },
                  response: { $ref: "#/components/schemas/Response" },
                },
              },
            ],
          },
        },
      },
      paths: {
        // Dual-mode: JSON by default, SSE when `stream: true`.
        "/responses": {
          post: {
            operationId: "createResponse",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      input: { type: "string" },
                      stream: { type: ["boolean", "null"] },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                content: {
                  "application/json": { schema: { $ref: "#/components/schemas/Response" } },
                  "text/event-stream": { schema: { $ref: "#/components/schemas/StreamEvent" } },
                },
              },
            },
          },
        },
        // Stream-only endpoint with untyped events.
        "/event": {
          get: {
            operationId: "subscribeEvent",
            responses: { "200": { content: { "text/event-stream": {} } } },
          },
        },
      },
    },
    { namespace: ns, serviceName: "Sse" },
  );

const spec: SdkSpec = {
  unionStyle: "opaque-cases",
  operationDecl: {
    contextType: "SseContext",
    commonErrorType: "SseError",
    commonErrorClasses: [],
    protocol: "SseProtocol",
  },
};

describe("OpenAPI text/event-stream", () => {
  test("a dual-mode endpoint keeps its JSON op and gains a <Op>Stream sibling", () => {
    const { shapes } = model();
    const json = shapes[`${ns}#CreateResponse`];
    const stream = shapes[`${ns}#CreateResponseStream`];
    expect(json.traits[EVENT_STREAM_TRAIT]).toBeUndefined();
    expect(json.output.target).toBe(`${ns}#Response`);
    expect(stream.traits[EVENT_STREAM_TRAIT]).toEqual({ requestFlag: "stream" });
    expect(stream.input.target).toBe(json.input.target);
    expect(stream.traits["smithy.api#http"]).toEqual(json.traits["smithy.api#http"]);
    // The event union is not flattenable → raw-response wrapper over it.
    const out = shapes[stream.output.target];
    expect(out.members.body.traits["com.distilled.openapi#rawResponse"]).toEqual({});
    const service = shapes[`${ns}#Sse`];
    expect(service.operations).toContainEqual({ target: `${ns}#CreateResponseStream` });
  });

  test("a stream-only endpoint is itself the event-stream op, untyped events → Document", () => {
    const { shapes } = model();
    const op = shapes[`${ns}#SubscribeEvent`];
    expect(op.traits[EVENT_STREAM_TRAIT]).toEqual({});
    expect(op.traits["smithy.api#paginated"]).toBeUndefined();
    const out = shapes[op.output.target];
    expect(out.members.body.target).toBe("smithy.api#Document");
    expect(shapes[`${ns}#SubscribeEventStream`]).toBeUndefined();
  });

  test("the generator emits event-stream ops with API.makeStream", () => {
    const { code } = generateService(model(), spec);
    expect(code).toMatch(/export const createResponseStream: API\.StreamOperationMethod</);
    expect(code).toMatch(/createResponseStream[\s\S]*?API\.makeStream\(/);
    expect(code).toContain(`eventStream: {"requestFlag":"stream"}`);
    expect(code).toMatch(/export const subscribeEvent: API\.StreamOperationMethod</);
    expect(code).toMatch(/export const createResponse: API\.OperationMethod</);
  });
});
