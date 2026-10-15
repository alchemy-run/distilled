import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import * as API from "./api.ts";
import { makeRestProtocol, type RestProtocolOptions } from "./protocol-rest.ts";
import * as ResponseValidation from "./response-validation.ts";
import * as S from "./schema.ts";
import * as T from "./trait.ts";

// =============================================================================
// Fixtures
// =============================================================================

interface Creds {
  readonly token: string;
}

class TestCreds extends Context.Service<TestCreds, Creds>()("ApiStreamTest/Creds") {}

class TestUnknownError extends Schema.TaggedError<TestUnknownError>()("TestUnknownError", {
  info: Schema.Unknown,
}) {}

class TestParseError extends Schema.TaggedError<TestParseError>()("TestParseError", {
  info: Schema.Unknown,
}) {}

class Overloaded extends T.applyErrorMatchers(
  Schema.TaggedError<Overloaded>()("Overloaded", { message: Schema.String }),
  [{ status: 529 }],
) {}

const options: RestProtocolOptions<Creds> = {
  credentials: Effect.gen(function* () {
    return yield* TestCreds;
  }),
  baseUrl: () => "https://api.test",
  headers: (creds) => ({ authorization: `Bearer ${creds.token}` }),
  unknownError: (info) => new TestUnknownError({ info }),
  parseError: (info) => new TestParseError({ info }),
};

const Protocol = makeRestProtocol(options);

const CreateInput = S.Struct({
  prompt: S.String.pipe(T.Body("prompt")),
  stream: S.optional(S.Boolean.pipe(T.Body("stream"))),
}).pipe(T.Http({ method: "POST", uri: "/responses" }));

const Delta = S.Struct({
  type: S.String,
  textDelta: S.optional(S.String.pipe(T.Body("text_delta"))),
});

const createStream = API.makeStream(() => ({
  input: CreateInput,
  output: Delta,
  errors: [Overloaded],
  protocol: Protocol,
  eventStream: { requestFlag: "stream", done: "[DONE]" },
}));

interface Recorded {
  readonly requests: Array<HttpClientRequest.HttpClientRequest>;
}

/** An SSE body delivered in arbitrary chunks (events split across reads). */
const sse = (chunks: ReadonlyArray<string>, status = 200) =>
  new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
        controller.close();
      },
    }),
    { status, headers: { "content-type": "text/event-stream" } },
  );

const fakeClient = (respond: () => Response, recorded: Recorded = { requests: [] }) =>
  Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        recorded.requests.push(request);
        return HttpClientResponse.fromWeb(request, respond());
      }),
    ),
  );

const creds = Layer.succeed(TestCreds, { token: "tok" });

const collect = (stream: Stream.Stream<any, any, any>, ...layers: Array<Layer.Any>) =>
  Effect.runPromise(
    Effect.result(
      Stream.runCollect(stream).pipe(Effect.provide(Layer.mergeAll(...(layers as [any])))),
    ) as Effect.Effect<any, never, never>,
  );

const bodyJson = (request: HttpClientRequest.HttpClientRequest): unknown => {
  const body = request.body as any;
  if (body._tag === "Uint8Array") return JSON.parse(new TextDecoder().decode(body.body));
  return undefined;
};

// =============================================================================
// Tests
// =============================================================================

describe("API.makeStream", () => {
  test("decodes SSE events split across chunks, mapping wire keys", async () => {
    const result = await collect(
      createStream({ prompt: "hi" }),
      fakeClient(() =>
        sse([
          'event: delta\ndata: {"type":"delta","text_',
          'delta":"Hel"}\n\n',
          'data: {"type":"delta","text_delta":"lo"}\n\ndata: {"type":"done"}\n\n',
        ]),
      ),
      creds,
    );
    expect(result._tag).toBe("Success");
    expect(Array.from(result.success)).toEqual([
      { type: "delta", textDelta: "Hel" },
      { type: "delta", textDelta: "lo" },
      { type: "done" },
    ]);
  });

  test("forces the request flag and asks for an event stream", async () => {
    const recorded: Recorded = { requests: [] };
    await collect(
      createStream({ prompt: "hi" }),
      fakeClient(() => sse([]), recorded),
      creds,
    );
    const [request] = recorded.requests;
    expect(bodyJson(request!)).toEqual({ prompt: "hi", stream: true });
    expect(request!.headers["accept"]).toBe("text/event-stream");
    expect(request!.headers["authorization"]).toBe("Bearer tok");
  });

  test("ends at the done sentinel and skips empty data", async () => {
    const result = await collect(
      createStream({ prompt: "hi" }),
      fakeClient(() =>
        sse([
          ": keep-alive comment\n\n",
          'data: {"type":"a"}\n\n',
          "data: [DONE]\n\n",
          'data: {"type":"after-done"}\n\n',
        ]),
      ),
      creds,
    );
    expect(Array.from(result.success)).toEqual([{ type: "a" }]);
  });

  test("a non-2xx response fails with the operation's typed error", async () => {
    const result = await collect(
      createStream({ prompt: "hi" }),
      fakeClient(
        () =>
          new Response(JSON.stringify({ message: "overloaded" }), {
            status: 529,
            headers: { "content-type": "application/json" },
          }),
      ),
      creds,
    );
    expect(result._tag).toBe("Failure");
    expect(result.failure).toBeInstanceOf(Overloaded);
  });

  test("strict validation fails a malformed event with the parse error", async () => {
    const result = await collect(
      createStream({ prompt: "hi" }),
      fakeClient(() => sse(['data: {"type":42}\n\n'])),
      creds,
      ResponseValidation.strict,
    );
    expect(result._tag).toBe("Failure");
    expect(result.failure).toBeInstanceOf(TestParseError);
  });

  test("yield* captures context and returns a requirement-free stream factory", async () => {
    const program = Effect.gen(function* () {
      const create = yield* createStream;
      return yield* Stream.runCollect(create({ prompt: "hi" }));
    }).pipe(
      Effect.provide(
        Layer.mergeAll(
          fakeClient(() => sse(['data: {"type":"x"}\n\n'])),
          creds,
        ),
      ),
    );
    const events = await Effect.runPromise(program as Effect.Effect<any, any, never>);
    expect(Array.from(events)).toEqual([{ type: "x" }]);
  });
});
