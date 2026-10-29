import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Tracer from "effect/Tracer";
import { describe, expect, test, vi } from "vitest";
import * as API from "../src/api.ts";
import {
  GqlTransport,
  root,
  scalarField,
  type GraphQLTelemetry,
  type TypeMeta,
} from "../src/graphql.ts";
import { makeRestProtocol } from "../src/protocol-rest.ts";
import { Query } from "../src/query.ts";
import * as S from "../src/schema.ts";
import { TelemetryDebug } from "../src/telemetry-debug.ts";
import * as TxHost from "../src/telemetry-host-rules.ts";
import * as TxMessage from "../src/telemetry-message-context.ts";
import * as TxName from "../src/telemetry-name-template.ts";
import * as Telemetry from "../src/telemetry.ts";
import * as T from "../src/trait.ts";

interface CredsShape {
  readonly token: string;
}

class Creds extends Context.Service<Creds, CredsShape>()("TelemetryTestCreds") {}

class TestUnknownError extends Schema.TaggedError<TestUnknownError>()("TestUnknownError", {
  info: Schema.Unknown,
}) {}

const Protocol = makeRestProtocol<CredsShape>({
  credentials: Effect.gen(function* () {
    return yield* Creds;
  }),
  baseUrl: () => "https://api.test:8443",
  headers: (creds) => ({ authorization: `Bearer ${creds.token}` }),
  unknownError: (info) => new TestUnknownError({ info }),
  parseError: (info) => new TestUnknownError({ info }),
});

const TELEMETRY: Telemetry.ServiceTelemetry = {
  system: "test-api",
  attributes: { "test.fixed": true },
  responseHeaders: [
    { header: "x-request-id", name: "http.response.header.x-request-id", transform: "list" },
  ],
};

const getZone = API.make(() => ({
  input: S.Struct({
    zone_id: S.String.pipe(T.Label()),
    names: S.optional(S.Array(S.String).pipe(T.Query("name"))),
    token: S.optional(S.String.pipe(T.Query("token"))),
  }).pipe(T.Http({ method: "GET", uri: "/zones/{zone_id}" })),
  output: S.Struct({ id: S.optional(S.String) }),
  protocol: Protocol,
  telemetry: TELEMETRY,
  span: {
    name: "Test.GetZone",
    method: "Zones/GetZone",
    kind: "producer",
    attributes: { "url.template": "/zones/{zone_id}" },
    input: {
      zone_id: [{ name: "test.zone_id" }],
      names: [{ name: "test.name_count", transform: "count" }],
      token: [{ name: "test.token" }],
    },
  },
})) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

const traced = async (
  input: Record<string, unknown>,
  level: "operation" | "debug" = "operation",
  exporter = true,
) => {
  const spans: Tracer.NativeSpan[] = [];
  const tracer = Tracer.make({
    span(options) {
      const span = new Tracer.NativeSpan(options);
      spans.push(span);
      return span;
    },
  });
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() =>
        HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify({ id: "z1" }), {
            headers: { "content-type": "application/json", "x-request-id": "req-1" },
          }),
        ),
      ),
    ),
  );
  await Effect.runPromise(
    getZone(input).pipe(
      Effect.provide(
        Layer.mergeAll(
          http,
          Layer.succeed(Creds, { token: "t" }),
          level === "debug" ? TelemetryDebug.layer : Layer.empty,
        ),
      ),
      exporter ? Effect.provideService(Tracer.Tracer, tracer) : (effect) => effect,
    ) as Effect.Effect<unknown>,
  );
  return spans;
};

describe("operation span from the telemetry traits", () => {
  test("carries the trait's name, kind and attributes, the input, request and response", async () => {
    const [span, ...rest] = await traced({ zone_id: "z1", names: ["a", "b"] });
    expect(rest).toEqual([]);
    expect(span!.name).toBe("Test.GetZone");
    expect(span!.kind).toBe("producer");
    expect(Object.fromEntries(span!.attributes)).toEqual({
      "rpc.system.name": "test-api",
      "rpc.method": "Zones/GetZone",
      "test.fixed": true,
      "url.template": "/zones/{zone_id}",
      "test.zone_id": "z1",
      "test.name_count": 2,
      "http.request.method": "GET",
      "server.address": "api.test",
      "server.port": 8443,
      "http.response.status_code": 200,
      "http.response.header.x-request-id": ["req-1"],
    });
  });

  test("a redacted input value records nothing", async () => {
    const [span] = await traced({ zone_id: "z1", token: Redacted.make("secret") });
    expect(span!.attributes.has("test.token")).toBe(false);
  });

  test("without an exporter there is no span", async () => {
    const spans = await traced({ zone_id: "z1" }, "operation", false);
    expect(spans).toEqual([]);
  });
});

// A queue-like REST operation: messages carry trace context, the response
// returns messages, the host gets a host rule.
const QUEUE_TELEMETRY: Telemetry.ServiceTelemetry = {
  system: "queue-api",
  onRequest: TxHost.hostRules([
    {
      suffix: ".test",
      hostLabel: "queue.account",
      copy: { "messaging.destination.name": "queue.name" },
    },
  ]),
};

const queueOp = (span: Telemetry.SpanConfig) =>
  API.make(() => ({
    input: S.Struct({
      queue: S.String.pipe(T.Label()),
      MessageAttributes: S.optional(S.Unknown),
      Entries: S.optional(S.Unknown),
      AttributeNames: S.optional(S.Unknown),
    }).pipe(T.Http({ method: "POST", uri: "/queues/{queue}" })),
    output: S.Struct({ Messages: S.optional(S.Unknown) }),
    protocol: Protocol,
    telemetry: QUEUE_TELEMETRY,
    span: {
      ...span,
      input: { queue: [{ name: "messaging.destination.name" }] },
    },
  })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

const sendMessage = queueOp({
  name: "Queue.Send",
  method: "Queue/Send",
  kind: "producer",
  rename: TxName.nameTemplate("send {messaging.destination.name}"),
  inject: TxMessage.injectAwsMessageAttributes({ member: "MessageAttributes" }),
});
const sendBatch = queueOp({
  name: "Queue.SendBatch",
  method: "Queue/SendBatch",
  rename: TxName.nameTemplate("send {messaging.missing}"),
  inject: TxMessage.injectAwsMessageAttributes({ list: "Entries", member: "MessageAttributes" }),
});
const receive = queueOp({
  name: "Queue.Receive",
  method: "Queue/Receive",
  extract: TxMessage.extractAwsMessageAttributes({
    list: "Messages",
    member: "MessageAttributes",
    request: "AttributeNames",
  }),
});

const runQueue = async (
  op: (input: Record<string, unknown>) => Effect.Effect<any, any, any>,
  input: Record<string, unknown>,
  responseBody: unknown = {},
) => {
  const spans: Tracer.NativeSpan[] = [];
  const bodies: unknown[] = [];
  const tracer = Tracer.make({
    span(options) {
      const span = new Tracer.NativeSpan(options);
      spans.push(span);
      return span;
    },
  });
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        const body = request.body as { _tag: string; body: Uint8Array };
        bodies.push(JSON.parse(new TextDecoder().decode(body.body)));
        return HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(responseBody), {
            headers: { "content-type": "application/json" },
          }),
        );
      }),
    ),
  );
  await Effect.runPromise(
    op(input).pipe(
      Effect.provide(Layer.mergeAll(http, Layer.succeed(Creds, { token: "t" }))),
      Effect.provideService(Tracer.Tracer, tracer),
    ) as Effect.Effect<unknown>,
  );
  return { spans, bodies };
};

describe("messaging", () => {
  test("names the span from its template and sends its trace context", async () => {
    const input = { queue: "orders", MessageAttributes: { kind: { DataType: "String" } } };
    const { spans, bodies } = await runQueue(sendMessage, input);
    const [span] = spans;
    expect(span!.name).toBe("send orders");
    expect(span!.kind).toBe("producer");
    expect((bodies[0] as any).MessageAttributes).toEqual({
      kind: { DataType: "String" },
      traceparent: { DataType: "String", StringValue: TxMessage.traceparent(span!) },
    });
    // The caller's object is not changed.
    expect(input.MessageAttributes).toEqual({ kind: { DataType: "String" } });
  });

  test("injects into every batch entry, skips full and traced ones, and falls back to the name", async () => {
    const full = Object.fromEntries(
      Array.from({ length: 10 }, (_, i) => [`a${i}`, { DataType: "String" }]),
    );
    const traced = { traceparent: { DataType: "String", StringValue: "kept" } };
    const { spans, bodies } = await runQueue(sendBatch, {
      queue: "orders",
      Entries: [
        { Id: "1" },
        { Id: "2", MessageAttributes: full },
        { Id: "3", MessageAttributes: traced },
      ],
    });
    expect(spans[0]!.name).toBe("Queue.SendBatch");
    const entries = (bodies[0] as any).Entries;
    expect(entries[0].MessageAttributes.traceparent.StringValue).toBe(
      TxMessage.traceparent(spans[0]!),
    );
    expect(Object.keys(entries[1].MessageAttributes)).toHaveLength(10);
    expect(entries[2].MessageAttributes).toEqual(traced);
  });

  test("asks for the trace context back and links the span to each message's", async () => {
    const producer = "00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01";
    const { spans, bodies } = await runQueue(
      receive,
      { queue: "orders", AttributeNames: ["kind"] },
      {
        Messages: [
          { MessageAttributes: { traceparent: { StringValue: producer } } },
          { MessageAttributes: { traceparent: { StringValue: "garbage" } } },
          {},
        ],
      },
    );
    expect((bodies[0] as any).AttributeNames).toEqual(["kind", "traceparent"]);
    expect(spans[0]!.links.map((l) => [l.span.traceId, l.span.spanId, l.span.sampled])).toEqual([
      ["0af7651916cd43dd8448eb211c80319c", "b7ad6b7169203331", true],
    ]);
  });

  test("a host rule adds its label and copies attributes", async () => {
    const { spans } = await runQueue(sendMessage, { queue: "orders" });
    const attributes = Object.fromEntries(spans[0]!.attributes);
    expect(attributes["queue.account"]).toBe("api");
    expect(attributes["queue.name"]).toBe("orders");
  });
});

test("parseTraceparent round-trips and rejects malformed values", () => {
  const span = TxMessage.parseTraceparent(
    "00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-00",
  );
  expect(span && TxMessage.traceparent(span as any)).toBe(
    "00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-00",
  );
  expect(TxMessage.parseTraceparent("01-xyz")).toBeUndefined();
});

describe("TelemetryDebug logRequests", () => {
  const logged = async (layer: Layer.Layer<never>) => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const http = Layer.succeed(
        HttpClient.HttpClient,
        HttpClient.make((request) =>
          Effect.sync(() =>
            HttpClientResponse.fromWeb(
              request,
              new Response(JSON.stringify({ id: "z1" }), {
                headers: { "content-type": "application/json" },
              }),
            ),
          ),
        ),
      );
      await Effect.runPromise(
        getZone({ zone_id: "z1" }).pipe(
          Effect.provide(Layer.mergeAll(http, Layer.succeed(Creds, { token: "t" }), layer)),
        ) as Effect.Effect<unknown>,
      );
      return spy.mock.calls.map((c) => String(c[0]));
    } finally {
      spy.mockRestore();
    }
  };

  test("prints each request and response with logRequests", async () => {
    expect(await logged(TelemetryDebug.layerWith({ logRequests: true }))).toEqual([
      "[distilled] -> GET /zones/{zone_id}",
      "[distilled] <- 200",
    ]);
  });

  test("prints nothing by default, or with the plain debug layer", async () => {
    expect(await logged(Layer.empty)).toEqual([]);
    expect(await logged(TelemetryDebug.layer)).toEqual([]);
  });
});

describe("operationInfo", () => {
  test("falls back to the operation name without traits", () => {
    const info = Telemetry.operationInfo(undefined, undefined, "GetThing");
    expect(info).toEqual({
      name: "GetThing",
      kind: "client",
      attributes: {},
      input: [],
      output: [],
      responseHeaders: [],
      onRequest: undefined,
      propagate: undefined,
      copy: undefined,
      rename: undefined,
      inject: undefined,
      extract: undefined,
    });
  });

  const RULES: Telemetry.ServiceTelemetry = {
    system: "zones-api",
    prefix: "Zones",
    service: "ZoneService",
    labels: "zones",
  };
  const inputAst = S.Struct({
    zoneId: S.String.pipe(T.Label()),
    recordID: S.String.pipe(T.Label()),
    name: S.optional(S.String),
  }).pipe(T.Http({ method: "GET", uri: "/zones/{zoneId}/records/{recordID}?expand=1" })).ast;

  const facts = (span: Telemetry.SpanConfig | string, service = RULES) => {
    const info = Telemetry.operationInfo(service, span, undefined, inputAst);
    return { name: info.name, attributes: info.attributes, input: info.input };
  };

  test("a span that is just its op derives name, method, template and labels", () => {
    expect(facts("GetRecord")).toEqual({
      name: "Zones.GetRecord",
      attributes: {
        "rpc.system.name": "zones-api",
        "rpc.method": "ZoneService/GetRecord",
        "url.template": "/zones/{zoneId}/records/{recordID}",
      },
      input: [
        ["zoneId", { name: "zones.zone_id" }],
        ["recordID", { name: "zones.record_id" }],
      ],
    });
  });

  test("what the span states wins over what it derives", () => {
    const got = facts({
      op: "GetRecord",
      name: "Custom.Name",
      attributes: { "url.template": "/custom" },
      input: { recordID: [], name: [{ name: "zones.name" }] },
    });
    expect(got.name).toBe("Custom.Name");
    expect(got.attributes["url.template"]).toBe("/custom");
    expect(got.input).toEqual([
      ["zoneId", { name: "zones.zone_id" }],
      ["name", { name: "zones.name" }],
    ]);
  });

  test("template: false on the span or templates: false on the service drops url.template", () => {
    expect(facts({ op: "GetRecord", template: false }).attributes).not.toHaveProperty(
      "url.template",
    );
    expect(facts("GetRecord", { ...RULES, templates: false }).attributes).not.toHaveProperty(
      "url.template",
    );
  });

  test("labelNames renames a derived label", () => {
    expect(facts("GetRecord", { ...RULES, labelNames: { zoneId: "zones.zone.id" } }).input).toEqual(
      [
        ["zoneId", { name: "zones.zone.id" }],
        ["recordID", { name: "zones.record_id" }],
      ],
    );
  });

  test("no labels rule: no derived input; no op: nothing derived", () => {
    expect(facts("GetRecord", { ...RULES, labels: undefined }).input).toEqual([]);
    expect(facts({ name: "Full.Name", method: "Full/Name" })).toEqual({
      name: "Full.Name",
      attributes: { "rpc.system.name": "zones-api", "rpc.method": "Full/Name" },
      input: [],
    });
  });
});

describe("GraphQL documents", () => {
  const Project: TypeMeta = { name: "Project", fields: {} };
  Object.assign(Project.fields, { name: scalarField("name") });

  const transport = (telemetry?: GraphQLTelemetry) =>
    Layer.succeed(GqlTransport, {
      execute: () => Effect.succeed({ data: { project: { name: "engine" } } }),
      ...(telemetry ? { telemetry } : {}),
    });

  const run = async (layer: Layer.Layer<GqlTransport>) => {
    const spans: Tracer.NativeSpan[] = [];
    const tracer = Tracer.make({
      span(options) {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);
        return span;
      },
    });
    const program = Query.fn(() => {
      const project = root<{ name: string }>(
        "query",
        "project",
        Project,
        { id: "p1" },
        {
          id: "String!",
        },
      );
      return { name: project.name };
    })();
    const result = await Effect.runPromise(
      program.pipe(Effect.provide(layer), Effect.provideService(Tracer.Tracer, tracer)),
    );
    return { result, spans };
  };

  test("one span per document, named by its root field, with argument attributes", async () => {
    const { result, spans } = await run(
      transport({
        system: "railway-api",
        prefix: "Railway",
        fields: { "query.project": { id: [{ name: "railway.project_id" }] } },
      }),
    );
    expect(result).toEqual({ name: "engine" });
    expect(spans.map((s) => s.name)).toEqual(["Railway.project"]);
    expect(Object.fromEntries(spans[0]!.attributes)).toEqual({
      "rpc.system.name": "railway-api",
      "rpc.method": "Railway/project",
      "graphql.operation.type": "query",
      "graphql.operation.name": "project",
      "railway.project_id": "p1",
    });
  });

  test("a transport without telemetry makes no span", async () => {
    const { spans } = await run(transport());
    expect(spans).toEqual([]);
  });
});
