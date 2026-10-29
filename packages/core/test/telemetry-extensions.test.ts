import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Metric from "effect/Metric";
import * as Schema from "effect/Schema";
import * as Tracer from "effect/Tracer";
import { describe, expect, test } from "vitest";
import * as API from "../src/api.ts";
import { makeRestProtocol } from "../src/protocol-rest.ts";
import * as S from "../src/schema.ts";
import { TelemetryHooks } from "../src/telemetry-hooks.ts";
import * as TxLambda from "../src/telemetry-lambda-context.ts";
import * as TxMessage from "../src/telemetry-message-context.ts";
import { TelemetryMetrics } from "../src/telemetry-metrics.ts";
import * as TxXray from "../src/telemetry-xray.ts";
import * as T from "../src/trait.ts";

interface CredsShape {
  readonly token: string;
}
class Creds extends Context.Service<Creds, CredsShape>()("TelemetryExtensionsCreds") {}
class TestError extends Schema.TaggedError<TestError>()("TestError", { info: Schema.Unknown }) {}

const Protocol = makeRestProtocol<CredsShape>({
  credentials: Effect.gen(function* () {
    return yield* Creds;
  }),
  baseUrl: () => "https://api.test",
  headers: (creds) => ({ authorization: `Bearer ${creds.token}` }),
  unknownError: (info) => new TestError({ info }),
  parseError: (info) => new TestError({ info }),
});

const getThing = API.make(() => ({
  input: S.Struct({
    id: S.String.pipe(T.Label()),
    region: S.optional(S.String.pipe(T.Query("region"))),
    config: S.optional(S.Unknown),
  }).pipe(T.Http({ method: "GET", uri: "/things/{id}" })),
  output: S.Struct({
    Arn: S.optional(S.String),
    Usage: S.optional(S.Unknown),
    Capacity: S.optional(S.Unknown),
  }),
  protocol: Protocol,
  telemetry: {
    system: "test-api",
    prefix: "Test",
    service: "Things",
    attributes: { "test.shared": "yes" },
    propagate: TxXray.propagate,
  },
  span: {
    op: "GetThing",
    attributes: { "test.shared": null },
    copy: { "cloud.region": "faas.invoked_region" },
    input: {
      region: [{ name: "cloud.region" }],
      config: [
        { name: "test.max_tokens", field: "limits.maxTokens" },
        { name: "test.stop", field: "limits.stop" },
        { name: "test.empty", field: "limits.none" },
      ],
    },
    output: {
      Arn: [{ name: "test.arn", transform: "arn" }],
      Usage: [
        { name: "test.input_tokens", field: "inputTokens" },
        { name: "test.cache_read", field: "cacheRead", transform: "nonZero" },
        { name: "test.cache_write", field: "cacheWrite", transform: "nonZero" },
      ],
      Capacity: [{ name: "test.capacity", transform: "jsonList" }],
    },
  },
})) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

const respond = (body: unknown, status = 200) =>
  Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() =>
        HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(body), {
            status,
            headers: { "content-type": "application/json" },
          }),
        ),
      ),
    ),
  );

const run = async (
  input: Record<string, unknown>,
  body: unknown,
  extra: Layer.Layer<never> = Layer.empty,
  status = 200,
) => {
  const spans: Tracer.NativeSpan[] = [];
  const requests: HttpClientRequest.HttpClientRequest[] = [];
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
        requests.push(request);
        return HttpClientResponse.fromWeb(
          request,
          new Response(JSON.stringify(body), {
            status,
            headers: { "content-type": "application/json" },
          }),
        );
      }),
    ),
  );
  const exit = await Effect.runPromiseExit(
    getThing(input).pipe(
      Effect.provide(Layer.mergeAll(http, Layer.succeed(Creds, { token: "t" }), extra)),
      Effect.provideService(Tracer.Tracer, tracer),
    ) as Effect.Effect<unknown>,
  );
  return { spans, requests, exit };
};

describe("operation span extensions", () => {
  test("output rules, field paths, transforms, copy, null-dropped service attributes", async () => {
    const { spans } = await run(
      {
        id: "t1",
        region: "eu-west-1",
        config: { limits: { maxTokens: 512, stop: ["END"], none: [] } },
      },
      {
        Arn: "arn:aws:test:::t1",
        Usage: { inputTokens: 7, cacheRead: 0, cacheWrite: 3 },
        Capacity: { TableName: "users" },
      },
    );
    const attributes = Object.fromEntries(spans[0]!.attributes);
    expect(attributes).toMatchObject({
      "rpc.method": "Things/GetThing",
      "cloud.region": "eu-west-1",
      "faas.invoked_region": "eu-west-1",
      "test.max_tokens": 512,
      "test.arn": "arn:aws:test:::t1",
      "test.input_tokens": 7,
      "test.stop": ["END"],
      "test.cache_write": 3,
      "test.capacity": ['{"TableName":"users"}'],
    });
    expect(attributes).not.toHaveProperty("test.shared");
    expect(attributes).not.toHaveProperty("test.empty");
    expect(attributes).not.toHaveProperty("test.cache_read");
  });

  test("arn records nothing for a value that is not an ARN", async () => {
    const { spans } = await run({ id: "t1" }, { Arn: "my-secret" });
    expect(spans[0]!.attributes.has("test.arn")).toBe(false);
  });

  test("propagation sends the span's X-Ray header", async () => {
    const { spans, requests } = await run({ id: "t1" }, {});
    expect(requests[0]!.headers["x-amzn-trace-id"]).toBe(TxXray.traceHeader(spans[0]!));
  });

  test("w3c propagation sends the span's traceparent", async () => {
    const spans: Tracer.NativeSpan[] = [];
    const requests: HttpClientRequest.HttpClientRequest[] = [];
    const tracer = Tracer.make({
      span(options) {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);
        return span;
      },
    });
    const op = API.make(() => ({
      input: S.Struct({ id: S.String.pipe(T.Label()) }).pipe(
        T.Http({ method: "GET", uri: "/things/{id}" }),
      ),
      output: S.Struct({}),
      protocol: Protocol,
      telemetry: { system: "test-api", prefix: "Test", service: "Things", propagate: "w3c" },
      span: "GetThing",
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
    const http = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => {
          requests.push(request);
          return HttpClientResponse.fromWeb(request, new Response("{}", { status: 200 }));
        }),
      ),
    );
    await Effect.runPromise(
      op({ id: "t1" }).pipe(
        Effect.provide(Layer.mergeAll(http, Layer.succeed(Creds, { token: "t" }))),
        Effect.provideService(Tracer.Tracer, tracer),
      ) as Effect.Effect<unknown>,
    );
    expect(requests[0]!.headers.traceparent).toBe(TxMessage.traceparent(spans[0]!));
    expect(requests[0]!.headers.b3).toBeUndefined();
  });

  test("hooks see the span at start and the exit at the end", async () => {
    const seen: string[] = [];
    const { spans } = await run(
      { id: "t1" },
      {},
      TelemetryHooks.layer({
        onStart: (span, call) => {
          span.attribute("app.tenant", "acme");
          seen.push(`start ${call.name} ${String(call.method)} ${(call.input as any).id}`);
        },
        onEnd: (_span, exit) => {
          seen.push(`end ${exit._tag}`);
        },
      }),
    );
    expect(spans[0]!.attributes.get("app.tenant")).toBe("acme");
    expect(seen).toEqual(["start Test.GetThing Things/GetThing t1", "end Success"]);
  });

  test("a failed call still sets error.type", async () => {
    const { spans, exit } = await run({ id: "t1" }, { message: "boom" }, Layer.empty, 500);
    expect(Exit.isFailure(exit)).toBe(true);
    expect(spans[0]!.attributes.get("error.type")).toBe("InternalServerError");
  });
});

describe("TelemetryMetrics", () => {
  const histogram = (errorType?: string) =>
    Metric.withAttributes(
      Metric.histogram("rpc.client.call.duration", {
        description: "Duration of outbound RPC calls.",
        boundaries: [0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10],
      }),
      {
        "rpc.system.name": "test-api",
        "rpc.method": "Things/GetThing",
        ...(errorType ? { "error.type": errorType } : {}),
      },
    );

  test("records rpc.client.call.duration, with error.type on failure, without an exporter", async () => {
    const program = Effect.gen(function* () {
      yield* Effect.exit(getThing({ id: "ok" }));
      yield* Effect.exit(Effect.provide(getThing({ id: "bad" }), respond({}, 500)));
      return [
        yield* Metric.value(histogram()),
        yield* Metric.value(histogram("InternalServerError")),
      ];
    });
    const [ok, failed] = await Effect.runPromise(
      program.pipe(
        Effect.provide(
          Layer.mergeAll(respond({}), Layer.succeed(Creds, { token: "t" }), TelemetryMetrics.layer),
        ),
      ) as unknown as Effect.Effect<ReadonlyArray<{ readonly count: number }>>,
    );
    expect(ok!.count).toBe(1);
    expect(failed!.count).toBe(1);
  });
});

describe("X-Ray", () => {
  const span = Tracer.externalSpan({
    traceId: "5759e988bd862e3fe1be46a994272793",
    spanId: "53995c3f42cd8ad8",
    sampled: true,
  });

  test("the trace header round-trips a W3C trace id", () => {
    const header = TxXray.traceHeader(span);
    expect(header).toBe(
      "Root=1-5759e988-bd862e3fe1be46a994272793;Parent=53995c3f42cd8ad8;Sampled=1",
    );
    const parsed = TxXray.parseTraceHeader(header)!;
    expect([parsed.traceId, parsed.spanId, parsed.sampled]).toEqual([
      span.traceId,
      span.spanId,
      true,
    ]);
    expect(TxXray.parseTraceHeader("Root=1-5759e988-bd862e3fe1be46a994272793")).toBeUndefined();
  });

  test("injectTraceHeader fills each entry and keeps a caller's header", () => {
    const inject = TxXray.injectTraceHeader({ list: "Entries", member: "TraceHeader" });
    const out = inject(span as unknown as Tracer.Span, {
      Entries: [{ Detail: "{}" }, { TraceHeader: "mine" }],
    }) as any;
    expect(out.Entries[0].TraceHeader).toBe(TxXray.traceHeader(span));
    expect(out.Entries[1].TraceHeader).toBe("mine");
  });
});

describe("Lambda client context", () => {
  const span = Tracer.externalSpan({
    traceId: "0af7651916cd43dd8448eb211c80319c",
    spanId: "b7ad6b7169203331",
    sampled: true,
  }) as unknown as Tracer.Span;
  const inject = TxLambda.injectLambdaClientContext({ member: "ClientContext" });
  const decode = (s: string) => JSON.parse(atob(s));

  test("adds custom.traceparent, keeping the caller's context", () => {
    const own = btoa(JSON.stringify({ custom: { app: "x" }, env: { a: 1 } }));
    const out = inject(span, { FunctionName: "f", ClientContext: own }) as any;
    expect(decode(out.ClientContext)).toEqual({
      custom: { app: "x", traceparent: TxMessage.traceparent(span) },
      env: { a: 1 },
    });
    expect(decode((inject(span, { FunctionName: "f" }) as any).ClientContext).custom).toEqual({
      traceparent: TxMessage.traceparent(span),
    });
  });

  test("leaves it alone when too big or not base64 JSON", () => {
    const big = btoa(JSON.stringify({ custom: { pad: "x".repeat(2650) } }));
    expect((inject(span, { ClientContext: big }) as any).ClientContext).toBe(big);
    expect((inject(span, { ClientContext: "%%%" }) as any).ClientContext).toBe("%%%");
  });
});

describe("SQS receive extras", () => {
  const extract = TxMessage.extractAwsMessageAttributes({
    list: "Messages",
    member: "MessageAttributes",
    request: "MessageAttributeNames",
    envelope: "Body",
    system: "Attributes",
    systemRequest: "MessageSystemAttributeNames",
    messageId: "MessageId",
  });

  test("asks for traceparent and AWSTraceHeader", () => {
    expect(extract.request({ QueueUrl: "q" })).toEqual({
      QueueUrl: "q",
      MessageAttributeNames: ["traceparent"],
      MessageSystemAttributeNames: ["AWSTraceHeader"],
    });
  });

  test("links an SNS envelope's traceparent and an X-Ray AWSTraceHeader", () => {
    const sns = JSON.stringify({
      Type: "Notification",
      Message: "hi",
      MessageAttributes: {
        traceparent: {
          Type: "String",
          Value: "00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01",
        },
      },
    });
    const links = extract.links({
      Messages: [
        { MessageId: "m-1", Body: sns },
        {
          MessageId: "m-2",
          Body: "plain",
          Attributes: {
            AWSTraceHeader:
              "Root=1-5759e988-bd862e3fe1be46a994272793;Parent=53995c3f42cd8ad8;Sampled=1",
          },
        },
      ],
    });
    expect(links.map((l) => [l.span.traceId, l.span.spanId, l.attributes])).toEqual([
      ["0af7651916cd43dd8448eb211c80319c", "b7ad6b7169203331", { "messaging.message.id": "m-1" }],
      ["5759e988bd862e3fe1be46a994272793", "53995c3f42cd8ad8", { "messaging.message.id": "m-2" }],
    ]);
  });
});
