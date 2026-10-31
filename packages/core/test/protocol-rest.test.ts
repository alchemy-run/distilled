import * as Context from "effect/Context";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import * as API from "../src/api.ts";
import {
  BadRequest,
  InternalServerError,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
} from "../src/errors.ts";
import {
  BinaryResponse,
  makeRestProtocol,
  RawResponseRoot,
  SensitiveValue,
  type RestErrorInfo,
  type RestParseErrorInfo,
  type RestProtocolOptions,
} from "../src/protocol-rest.ts";
import * as ResponseValidation from "../src/response-validation.ts";
import * as S from "../src/schema.ts";
import * as T from "../src/trait.ts";

// =============================================================================
// Fixtures
// =============================================================================

interface Creds {
  readonly token: string;
  readonly host: string;
}

class TestCreds extends Context.Service<TestCreds, Creds>()("ProtocolRestTest/Creds") {}

class TestUnknownError extends Schema.TaggedError<TestUnknownError>()("TestUnknownError", {
  info: Schema.Unknown,
}) {}

class TestParseError extends Schema.TaggedError<TestParseError>()("TestParseError", {
  info: Schema.Unknown,
}) {}

class ThingLocked extends T.applyErrorMatchers(
  Schema.TaggedError<ThingLocked>()("ThingLocked", { message: Schema.String }),
  [{ status: 409, message: { includes: "locked" } }],
) {}

class QuotaExceeded extends T.applyErrorMatchers(
  Schema.TaggedError<QuotaExceeded>()("QuotaExceeded", { message: Schema.String }),
  [{ code: 4001 }],
) {}

class QuotaExceededOnCreate extends T.applyErrorMatchers(
  Schema.TaggedError<QuotaExceededOnCreate>()("QuotaExceededOnCreate", {
    message: Schema.String,
  }),
  [{ code: 4001, status: 403 }],
) {}

class Teapot extends T.applyErrorMatchers(
  Schema.TaggedError<Teapot>()("Teapot", {
    message: Schema.String,
    body: Schema.Unknown,
    headers: Schema.Unknown,
  }),
  [{ status: 418, headers: { "X-Reason": "teapot" } }],
) {}

class Gone extends T.applyErrorMatchers(
  Schema.TaggedError<Gone>()("Gone", { message: Schema.String }),
  [{ body: { "/detail/kind": "gone" } }],
) {}

const baseOptions: RestProtocolOptions<Creds> = {
  credentials: Effect.gen(function* () {
    return yield* TestCreds;
  }),
  baseUrl: (creds) => `https://${creds.host}`,
  headers: (creds) => ({ authorization: `Bearer ${creds.token}` }),
  unknownError: (info) => new TestUnknownError({ info }),
  parseError: (info) => new TestParseError({ info }),
};

// `API.make` memoizes protocol layers by identity, so each variant is a
// module-level const like a provider's `protocol.ts`.
const DefaultProtocol = makeRestProtocol(baseOptions);

const ThingInput = S.Struct({
  id: S.String.pipe(T.Label()),
  limit: S.optional(S.Number.pipe(T.Query("limit"))),
  tags: S.optional(S.Array(S.String).pipe(T.Query("tag"))),
  trace: S.optional(S.String.pipe(T.Header("X-Trace-Id"))),
  displayName: S.optional(S.String.pipe(T.Body("display_name"))),
  secret: S.optional(S.String.pipe(SensitiveValue(), T.Body("secret_value"))),
}).pipe(T.Http({ method: "POST", uri: "/things/{id}" }));

const ThingOutput = S.Struct({
  id: S.optional(S.String),
  displayName: S.optional(S.String.pipe(T.Body("display_name"))),
  secret: S.optional(S.String.pipe(SensitiveValue(), T.Body("secret_value"))),
});

const thingOp = (protocol: Layer.Layer<API.Protocol>, errors: ReadonlyArray<any> = []) =>
  API.make(() => ({
    input: ThingInput,
    output: ThingOutput,
    errors: errors as any,
    protocol,
  })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

const createThing = thingOp(DefaultProtocol);
const createThingWithErrors = thingOp(DefaultProtocol, [
  ThingLocked,
  QuotaExceeded,
  QuotaExceededOnCreate,
  Teapot,
  Gone,
]);

interface Recorded {
  readonly requests: Array<HttpClientRequest.HttpClientRequest>;
}

const fakeClient = (
  respond: (request: HttpClientRequest.HttpClientRequest) => Response,
  recorded: Recorded = { requests: [] },
) =>
  Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        recorded.requests.push(request);
        return HttpClientResponse.fromWeb(request, respond(request));
      }),
    ),
  );

const creds = (token = "tok-1", host = "api.test") => Layer.succeed(TestCreds, { token, host });

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

const run = <A, E>(effect: Effect.Effect<A, E, any>, ...layers: Array<Layer.Any>) =>
  Effect.runPromise(
    Effect.result(
      effect.pipe(Effect.provide(Layer.mergeAll(...(layers as [any])))),
    ) as Effect.Effect<any, never, never>,
  );

const succeed = async <A>(effect: Effect.Effect<A, any, any>, ...layers: Array<Layer.Any>) => {
  const result = await run(effect, ...layers);
  if (result._tag !== "Success") throw new Error(`expected success, got ${String(result.failure)}`);
  return result.success as any;
};

const failWith = async (effect: Effect.Effect<any, any, any>, ...layers: Array<Layer.Any>) => {
  const result = await run(effect, ...layers);
  if (result._tag !== "Failure") throw new Error("expected failure");
  return result.failure as any;
};

const failOn = (response: () => Response, op = createThingWithErrors) =>
  failWith(op({ id: "t1" }), fakeClient(response), creds());

const bodyText = (request: HttpClientRequest.HttpClientRequest): string | undefined => {
  const body = request.body as any;
  if (body._tag === "Uint8Array") return new TextDecoder().decode(body.body);
  if (body._tag === "Text") return body.body;
  return undefined;
};

// =============================================================================
// Request
// =============================================================================

describe("makeRestProtocol request encoding", () => {
  test("builds path, query, header and JSON body members from the input schema", async () => {
    const recorded: Recorded = { requests: [] };
    await succeed(
      createThing({
        id: "a b/c",
        limit: 5,
        tags: ["x", "y"],
        trace: "trace-1",
        displayName: "Widget",
      }),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    const [request] = recorded.requests;
    expect(request!.method).toBe("POST");
    expect(request!.url).toBe("https://api.test/things/a%20b%2Fc?limit=5&tag=x&tag=y");
    expect(request!.headers["x-trace-id"]).toBe("trace-1");
    expect(JSON.parse(bodyText(request!)!)).toEqual({ display_name: "Widget" });
  });

  test("unwraps Redacted input values before serializing them", async () => {
    const recorded: Recorded = { requests: [] };
    await succeed(
      createThing({ id: "t1", secret: Redacted.make("s3cret") }),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    expect(JSON.parse(bodyText(recorded.requests[0]!)!)).toEqual({ secret_value: "s3cret" });
  });

  test("applies the headers hook from the resolved credentials", async () => {
    const recorded: Recorded = { requests: [] };
    await succeed(
      createThing({ id: "t1" }),
      fakeClient(() => json({}), recorded),
      creds("tok-abc"),
    );
    expect(recorded.requests[0]!.headers.authorization).toBe("Bearer tok-abc");
  });

  test("resolves credentials on every request from the calling fiber's context", async () => {
    const recorded: Recorded = { requests: [] };
    const client = fakeClient(() => json({}), recorded);
    await succeed(createThing({ id: "t1" }), client, creds("first", "one.test"));
    await succeed(createThing({ id: "t1" }), client, creds("second", "two.test"));
    expect(recorded.requests.map((r) => [r.url, r.headers.authorization])).toEqual([
      ["https://one.test/things/t1", "Bearer first"],
      ["https://two.test/things/t1", "Bearer second"],
    ]);
  });

  test("a credentials failure fails the call before any request is sent", async () => {
    const CredsFailProtocol = makeRestProtocol<Creds>({
      ...baseOptions,
      credentials: Effect.fail(new BadRequest({ message: "no creds" })),
    });
    const recorded: Recorded = { requests: [] };
    const error = await failWith(
      thingOp(CredsFailProtocol)({ id: "t1" }),
      fakeClient(() => json({}), recorded),
    );
    expect(error).toBeInstanceOf(BadRequest);
    expect(recorded.requests).toHaveLength(0);
  });

  test("baseUrl receives the operation's route", async () => {
    const targets: Array<unknown> = [];
    const RoutingProtocol = makeRestProtocol<Creds>({
      ...baseOptions,
      baseUrl: (c, target) => {
        targets.push(target);
        return `https://routed.${c.host}`;
      },
    });
    const recorded: Recorded = { requests: [] };
    await succeed(
      thingOp(RoutingProtocol)({ id: "t1" }),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    expect(targets).toEqual([{ uri: "/things/{id}", method: "POST" }]);
    expect(recorded.requests[0]!.url).toBe("https://routed.api.test/things/t1");
  });

  test("an error thrown by baseUrl fails the call instead of dying", async () => {
    const refusal = new BadRequest({ message: "scope missing" });
    const RefusingProtocol = makeRestProtocol<Creds>({
      ...baseOptions,
      baseUrl: () => {
        throw refusal;
      },
    });
    const recorded: Recorded = { requests: [] };
    const error = await failWith(
      thingOp(RefusingProtocol)({ id: "t1" }),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    expect(error).toBe(refusal);
    expect(recorded.requests).toHaveLength(0);
  });

  test("mapMemberHeader transforms member headers but not the auth headers", async () => {
    const MappedHeaderProtocol = makeRestProtocol<Creds>({
      ...baseOptions,
      mapMemberHeader: (name, value) => `${name}=${value.toUpperCase()}`,
    });
    const recorded: Recorded = { requests: [] };
    await succeed(
      thingOp(MappedHeaderProtocol)({ id: "t1", trace: "abc" }),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    expect(recorded.requests[0]!.headers["x-trace-id"]).toBe("x-trace-id=ABC");
    expect(recorded.requests[0]!.headers.authorization).toBe("Bearer tok-1");
  });

  test("unknownKeyToWire names input keys the schema does not model", async () => {
    const SnakeProtocol = makeRestProtocol<Creds>({
      ...baseOptions,
      unknownKeyToWire: (key) => key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`),
    });
    const recorded: Recorded = { requests: [] };
    await succeed(
      thingOp(SnakeProtocol)({ id: "t1", extraField: 1 }),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    expect(JSON.parse(bodyText(recorded.requests[0]!)!)).toEqual({ extra_field: 1 });
  });

  test("without unknownKeyToWire, unmodeled input keys pass through verbatim", async () => {
    const recorded: Recorded = { requests: [] };
    await succeed(
      createThing({ id: "t1", extraField: 1 }),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    expect(JSON.parse(bodyText(recorded.requests[0]!)!)).toEqual({ extraField: 1 });
  });
});

describe("makeRestProtocol raw request bodies", () => {
  // Shaped like Cloudflare R2 putObject: a raw body, a Content-Type header
  // member, and a declared bodyMediaType.
  const UploadInput = S.Struct({
    key: S.String.pipe(T.Label()),
    body: S.optional(S.String.pipe(T.HttpBody())),
    contentType: S.optional(S.String.pipe(T.Header("Content-Type"))),
  }).pipe(
    T.Http({ method: "PUT", uri: "/objects/{key}", bodyMediaType: "application/octet-stream" }),
  );
  const NdjsonInput = S.Struct({
    body: S.optional(S.String.pipe(T.HttpBody())),
  }).pipe(T.Http({ method: "POST", uri: "/insert", bodyMediaType: "application/x-ndjson" }));
  const UntypedUploadInput = S.Struct({
    body: S.optional(S.Unknown.pipe(T.HttpBody())),
  }).pipe(T.Http({ method: "PUT", uri: "/blob" }));

  const op = (input: S.Top) =>
    API.make(() => ({
      input,
      output: S.Struct({}),
      errors: [],
      protocol: DefaultProtocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
  const upload = op(UploadInput);
  const insert = op(NdjsonInput);
  const untypedUpload = op(UntypedUploadInput);

  // The request as `fetch` would receive it.
  const send = async (effect: Effect.Effect<any, any, any>) => {
    const recorded: Recorded = { requests: [] };
    await succeed(
      effect,
      fakeClient(() => json({}), recorded),
      creds(),
    );
    return Result.getOrThrow(HttpClientRequest.toWebResult(recorded.requests[0]!));
  };

  test("a raw body is sent under the caller's Content-Type, for every body type", async () => {
    const bytes = new Uint8Array([1, 2, 3]);
    for (const body of [bytes, bytes.buffer, new Blob([bytes]), "#EXTM3U"]) {
      const request = await send(upload({ key: "a.mp4", body, contentType: "video/mp4" }));
      expect(request.headers.get("content-type")).toBe("video/mp4");
    }
    const request = await send(upload({ key: "a.mp4", body: bytes, contentType: "video/mp4" }));
    expect(new Uint8Array(await request.arrayBuffer())).toEqual(bytes);
  });

  test("without a Content-Type member value, the declared bodyMediaType is used", async () => {
    const object = await send(upload({ key: "a.bin", body: new Uint8Array([1]) }));
    expect(object.headers.get("content-type")).toBe("application/octet-stream");
    const ndjson = await send(insert({ body: '{"id":"1"}\n' }));
    expect(ndjson.headers.get("content-type")).toBe("application/x-ndjson");
    expect(await ndjson.text()).toBe('{"id":"1"}\n');
  });

  test("with neither, a Blob body is sent under its own type", async () => {
    const request = await send(untypedUpload({ body: new Blob(["<p>"], { type: "text/html" }) }));
    expect(request.headers.get("content-type")).toBe("text/html");
  });

  test("a JSON body is sent under the Content-Type member, else as application/json", async () => {
    // Shaped like a Kubernetes patch: the patch type is the Content-Type.
    const patch = op(
      S.Struct({
        body: S.Unknown.pipe(T.HttpBody()),
        contentType: S.optional(S.String.pipe(T.Header("Content-Type"))),
      }).pipe(T.Http({ method: "PATCH", uri: "/things" })),
    );
    const merge = await send(
      patch({ body: { spec: { replicas: 3 } }, contentType: "application/merge-patch+json" }),
    );
    expect(merge.headers.get("content-type")).toBe("application/merge-patch+json");
    expect(await merge.text()).toBe('{"spec":{"replicas":3}}');
    const plain = await send(patch({ body: { spec: { replicas: 3 } } }));
    expect(plain.headers.get("content-type")).toBe("application/json");
  });
});

// =============================================================================
// Success responses
// =============================================================================

describe("makeRestProtocol success decoding", () => {
  test("maps wire keys to TS names and wraps sensitive members in Redacted", async () => {
    const out = await succeed(
      createThing({ id: "t1" }),
      fakeClient(() =>
        json({ id: "t1", display_name: "Widget", secret_value: "s3cret", extra: 1 }),
      ),
      creds(),
    );
    expect(out).toEqual({
      id: "t1",
      displayName: "Widget",
      secret: Redacted.make("s3cret"),
      extra: 1,
    });
    expect(Redacted.value(out.secret)).toBe("s3cret");
    expect(JSON.stringify(out)).not.toContain("s3cret");
  });

  test("a 204 with no body decodes to an empty object", async () => {
    const out = await succeed(
      createThing({ id: "t1" }),
      fakeClient(() => new Response(null, { status: 204 })),
      creds(),
    );
    expect(out).toEqual({});
  });

  test("a whitespace-only 200 body decodes to an empty object", async () => {
    const out = await succeed(
      createThing({ id: "t1" }),
      fakeClient(() => new Response("  \n", { status: 200 })),
      creds(),
    );
    expect(out).toEqual({});
  });

  test("transformResponse runs on the parsed body before key mapping", async () => {
    const seen: Array<unknown> = [];
    const UnwrapProtocol = makeRestProtocol<Creds>({
      ...baseOptions,
      transformResponse: (body) => {
        seen.push(body);
        return (body as { data: unknown }).data;
      },
    });
    const out = await succeed(
      thingOp(UnwrapProtocol)({ id: "t1" }),
      fakeClient(() => json({ data: { id: "t1", display_name: "Widget" } })),
      creds(),
    );
    expect(seen).toEqual([{ data: { id: "t1", display_name: "Widget" } }]);
    expect(out).toEqual({ id: "t1", displayName: "Widget" });
  });

  test("transformResponse is not applied to error responses", async () => {
    let calls = 0;
    const CountingProtocol = makeRestProtocol<Creds>({
      ...baseOptions,
      transformResponse: (body) => {
        calls++;
        return body;
      },
    });
    await failWith(
      thingOp(CountingProtocol)({ id: "t1" }),
      fakeClient(() => json({ message: "nope" }, 404)),
      creds(),
    );
    expect(calls).toBe(0);
  });

  describe("response header members", () => {
    const HeaderOutput = S.Struct({
      id: S.optional(S.String),
      operation: S.optional(S.String.pipe(T.Header("Azure-AsyncOperation"))),
      retryAfter: S.optional(S.Number.pipe(T.Header("Retry-After"))),
    });
    const headerOp = API.make(() => ({
      input: ThingInput,
      output: HeaderOutput,
      protocol: DefaultProtocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

    test("copies declared headers onto the body, parsing number members", async () => {
      const out = await succeed(
        headerOp({ id: "t1" }),
        fakeClient(() =>
          json({ id: "t1" }, 200, {
            "Azure-AsyncOperation": "https://status.test/op/1",
            "retry-after": "30",
            "x-request-id": "ignored",
          }),
        ),
        creds(),
        ResponseValidation.strict,
      );
      expect(out).toEqual({ id: "t1", operation: "https://status.test/op/1", retryAfter: 30 });
    });

    test("a bodiless 202 decodes to its headers", async () => {
      const out = await succeed(
        headerOp({ id: "t1" }),
        fakeClient(
          () =>
            new Response(null, {
              status: 202,
              headers: { "azure-asyncoperation": "https://status.test/op/2" },
            }),
        ),
        creds(),
      );
      expect(out).toEqual({ operation: "https://status.test/op/2" });
    });

    test("a number member keeps text that is not a number, so strict mode reports it", async () => {
      const error = await failWith(
        headerOp({ id: "t1" }),
        fakeClient(() => json({}, 200, { "retry-after": "Wed, 21 Oct 2026 07:28:00 GMT" })),
        creds(),
        ResponseValidation.strict,
      );
      expect(error).toBeInstanceOf(TestParseError);
    });
  });

  test("strict validation failures go through the parseError hook with the raw body", async () => {
    const StrictOutput = S.Struct({ id: S.String });
    const strictOp = API.make(() => ({
      input: ThingInput,
      output: StrictOutput,
      protocol: DefaultProtocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
    const error = await failWith(
      strictOp({ id: "t1" }),
      fakeClient(() => json({ id: 42 })),
      creds(),
      ResponseValidation.strict,
    );
    expect(error).toBeInstanceOf(TestParseError);
    const info = error.info as RestParseErrorInfo;
    expect(info.body).toEqual({ id: 42 });
    expect(info.cause).toBeDefined();
  });

  test("RawResponseRoot outputs return a bare array body as-is", async () => {
    const ListOutput = S.Array(S.Struct({ id: S.String })).pipe(RawResponseRoot());
    const listOp = API.make(() => ({
      input: ThingInput,
      output: ListOutput,
      protocol: DefaultProtocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
    const out = await succeed(
      listOp({ id: "t1" }),
      fakeClient(() => json([{ id: "a" }, { id: "b" }])),
      creds(),
    );
    expect(out).toEqual([{ id: "a" }, { id: "b" }]);
  });

  test("BinaryResponse outputs return the body bytes untouched", async () => {
    const bytes = new Uint8Array([0, 255, 1, 128, 10]);
    const BinaryOutput = S.Unknown.pipe(BinaryResponse());
    const binaryOp = API.make(() => ({
      input: ThingInput,
      output: BinaryOutput,
      protocol: DefaultProtocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
    const out = await succeed(
      binaryOp({ id: "t1" }),
      fakeClient(() => new Response(bytes, { status: 200 })),
      creds(),
    );
    expect(out).toBeInstanceOf(Uint8Array);
    expect(Array.from(out)).toEqual(Array.from(bytes));
  });
});

describe("makeRestProtocol body read failures", () => {
  // A body that errors mid-read, like a connection reset after the headers.
  const brokenBody = (status: number) =>
    new Response(
      new ReadableStream({
        start: (controller) => controller.error(new Error("socket reset")),
      }),
      { status, headers: { "content-type": "application/json" } },
    );

  test.each([200, 500])("a %i body read failure fails with HttpClientError", async (status) => {
    const error = await failOn(() => brokenBody(status));
    expect(error._tag).toBe("HttpClientError");
    expect(error.reason._tag).toBe("DecodeError");
  });

  test("a BinaryResponse body read failure fails with HttpClientError", async () => {
    const binaryOp = API.make(() => ({
      input: ThingInput,
      output: S.Unknown.pipe(BinaryResponse()),
      protocol: DefaultProtocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
    const error = await failOn(() => brokenBody(200), binaryOp);
    expect(error._tag).toBe("HttpClientError");
    expect(error.reason._tag).toBe("DecodeError");
  });
});

describe("makeRestProtocol label refusals", () => {
  test("a `..` label fails with InvalidInput and sends nothing", async () => {
    let sent = 0;
    const error = await failWith(
      createThingWithErrors({ id: ".." }),
      fakeClient(() => {
        sent++;
        return json({});
      }),
      creds(),
    );
    expect(error._tag).toBe("InvalidInput");
    expect(error.member).toBe("id");
    expect(sent).toBe(0);
  });
});

// =============================================================================
// Error responses
// =============================================================================

describe("makeRestProtocol typed error matching", () => {
  test("a declared error whose status and message matcher match wins over the status map", async () => {
    const error = await failOn(() => json({ message: "thing is locked" }, 409));
    expect(error).toBeInstanceOf(ThingLocked);
    expect(error.message).toBe("thing is locked");
  });

  test("a numeric envelope code selects the declared error with that code", async () => {
    const error = await failOn(() => json({ code: 4001, message: "quota" }, 400));
    expect(error).toBeInstanceOf(QuotaExceeded);
    expect(error.message).toBe("quota");
  });

  test("the most specific matching declared error wins", async () => {
    const error = await failOn(() => json({ code: 4001, message: "quota" }, 403));
    expect(error).toBeInstanceOf(QuotaExceededOnCreate);
  });

  test("a string envelope code never satisfies a numeric code matcher", async () => {
    const error = await failOn(() => json({ code: "4001", message: "quota" }, 400));
    expect(error).toBeInstanceOf(BadRequest);
  });

  test("header matchers see the response headers case-insensitively, with body and headers passed to the class", async () => {
    const error = await failOn(() =>
      json({ message: "short and stout" }, 418, { "x-reason": "teapot" }),
    );
    expect(error).toBeInstanceOf(Teapot);
    expect(error.body).toEqual({ message: "short and stout" });
    expect(error.headers["x-reason"]).toBe("teapot");
  });

  test("body pointer matchers see the parsed JSON body", async () => {
    const error = await failOn(() => json({ message: "bye", detail: { kind: "gone" } }, 410));
    expect(error).toBeInstanceOf(Gone);
  });

  test("declared errors are ignored when nothing matches", async () => {
    const error = await failOn(() => json({ message: "thing is busy" }, 409));
    expect(error._tag).toBe("Conflict");
    expect(error.message).toBe("thing is busy");
  });

  test("operations without declared errors fall straight to the status map", async () => {
    const error = await failOn(() => json({ message: "thing is locked" }, 409), createThing);
    expect(error._tag).toBe("Conflict");
  });
});

describe("makeRestProtocol status mapping and fallbacks", () => {
  test("mapped 4xx statuses become core HTTP errors with the envelope message", async () => {
    const error = await failOn(() => json({ message: "no such thing" }, 404));
    expect(error).toBeInstanceOf(NotFound);
    expect(error.message).toBe("no such thing");
  });

  test("the default envelope falls back to a string `error` field for the message", async () => {
    const error = await failOn(() => json({ error: "bad input" }, 400));
    expect(error).toBeInstanceOf(BadRequest);
    expect(error.message).toBe("bad input");
  });

  test("a JSON body without a message yields an `HTTP <status>` message", async () => {
    const error = await failOn(() => json({ detail: "x" }, 400));
    expect(error.message).toBe("HTTP 400");
  });

  test("retryable statuses carry retryAfter from the Retry-After header", async () => {
    const error = await failOn(() => json({ message: "slow down" }, 429, { "retry-after": "7" }));
    expect(error).toBeInstanceOf(TooManyRequests);
    expect(Duration.toMillis(error.retryAfter)).toBe(7_000);
  });

  test("retryable statuses carry retryAfter from the RateLimit header", async () => {
    const error = await failOn(() => json({}, 503, { ratelimit: "r=0, t=12" }));
    expect(error).toBeInstanceOf(ServiceUnavailable);
    expect(Duration.toMillis(error.retryAfter)).toBe(12_000);
  });

  test("non-retryable statuses never carry retryAfter", async () => {
    const error = await failOn(() => json({ message: "gone" }, 404, { "retry-after": "7" }));
    expect(error).toBeInstanceOf(NotFound);
    expect(error.retryAfter).toBeUndefined();
  });

  test("unmapped 5xx statuses become a retryable InternalServerError", async () => {
    const error = await failOn(() => json({ message: "origin down" }, 521, { "retry-after": "3" }));
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error.message).toBe("origin down");
    // 521 is not in RETRYABLE_HTTP_STATUSES, so its hint is not stamped.
    expect(error.retryAfter).toBeUndefined();
  });

  test("unmapped 4xx statuses go to the unknownError hook with the wire details", async () => {
    const error = await failOn(() =>
      json({ code: "PAYMENT", message: "pay up" }, 402, { "x-id": "r1" }),
    );
    expect(error).toBeInstanceOf(TestUnknownError);
    const info = error.info as RestErrorInfo;
    expect(info.status).toBe(402);
    expect(info.code).toBe("PAYMENT");
    expect(info.message).toBe("pay up");
    expect(info.body).toEqual({ code: "PAYMENT", message: "pay up" });
    expect(info.headers["x-id"]).toBe("r1");
  });

  test("a non-JSON error body becomes the trimmed message and the raw body", async () => {
    const error = await failOn(
      () => new Response("  <html>Bad gateway thing</html>\n", { status: 402 }),
    );
    const info = error.info as RestErrorInfo;
    expect(info.message).toBe("<html>Bad gateway thing</html>");
    expect(info.body).toBe("  <html>Bad gateway thing</html>\n");
    expect(info.code).toBeUndefined();
  });

  test("a non-JSON error body can still be matched by a declared message matcher", async () => {
    const error = await failOn(
      () => new Response("resource locked by another op", { status: 409 }),
    );
    expect(error).toBeInstanceOf(ThingLocked);
    expect(error.message).toBe("resource locked by another op");
  });

  test("a non-JSON mapped error keeps the text as the message", async () => {
    const error = await failOn(() => new Response("Service Unavailable", { status: 503 }));
    expect(error).toBeInstanceOf(ServiceUnavailable);
    expect(error.message).toBe("Service Unavailable");
  });

  test("an empty error body yields an `HTTP <status>` message", async () => {
    const error = await failOn(() => new Response(null, { status: 402 }));
    const info = error.info as RestErrorInfo;
    expect(info.message).toBe("HTTP 402");
    expect(info.body).toBeUndefined();
  });
});

class CustomNotFound extends Schema.TaggedError<CustomNotFound>()("CustomNotFound", {
  message: Schema.String,
  retryAfter: Schema.optional(Schema.Unknown),
}) {}

const CustomEnvelopeProtocol = makeRestProtocol<Creds>({
  ...baseOptions,
  errorEnvelope: (body) => {
    const err = (body as { err?: { id?: number; text?: string } } | null)?.err;
    return err ? { code: err.id, message: err.text } : undefined;
  },
  statusMap: { 404: CustomNotFound },
});
const customOp = thingOp(CustomEnvelopeProtocol, [QuotaExceeded]);

describe("makeRestProtocol errorEnvelope and statusMap options", () => {
  test("a custom errorEnvelope supplies the code and message used for matching", async () => {
    const error = await failOn(() => json({ err: { id: 4001, text: "quota" } }, 400), customOp);
    expect(error).toBeInstanceOf(QuotaExceeded);
    expect(error.message).toBe("quota");
  });

  test("a custom errorEnvelope returning undefined falls back to `HTTP <status>`", async () => {
    const error = await failOn(() => json({ message: "ignored" }, 404), customOp);
    expect(error).toBeInstanceOf(CustomNotFound);
    expect(error.message).toBe("HTTP 404");
  });

  test("a custom statusMap replaces the default map rather than extending it", async () => {
    const error = await failOn(() => json({ err: { text: "bad" } }, 400), customOp);
    expect(error).toBeInstanceOf(TestUnknownError);
    expect((error.info as RestErrorInfo).message).toBe("bad");
  });

  test("unmapped 5xx still become InternalServerError with a custom statusMap", async () => {
    const error = await failOn(() => json({ err: { text: "boom" } }, 500), customOp);
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error.message).toBe("boom");
  });
});

describe("Link-header pagination", () => {
  const listThings = API.makePaginated(() => ({
    input: S.Struct({
      state: S.optional(S.String).pipe(T.Query("state")),
      page: S.optional(S.Number).pipe(T.Query("page")),
      per_page: S.optional(S.Number).pipe(T.Query("per_page")),
    }).pipe(T.Http({ method: "GET", uri: "/things" })),
    output: S.Array(S.Struct({ id: S.String })).pipe(RawResponseRoot()),
    protocol: DefaultProtocol,
    pagination: { mode: "link", inputToken: "page", pageSize: "per_page", items: "body" },
  })) as unknown as {
    items: (input: Record<string, unknown>) => Stream.Stream<{ id: string }, any, any>;
    pages: (input: Record<string, unknown>) => Stream.Stream<unknown, any, any>;
  };

  // Three pages of two; each page but the last links to the next, keeping
  // the request's other query parameters, the way GitHub does.
  const server = (recorded: Recorded) =>
    fakeClient((request) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get("page") ?? "1");
      const link = (n: number, rel: string) => {
        const next = new URL(url);
        next.searchParams.set("page", String(n));
        return `<${next}>; rel="${rel}"`;
      };
      const links = [
        ...(page < 3 ? [link(page + 1, "next")] : []),
        link(3, "last"),
        link(1, "first"),
      ];
      return json([{ id: `${page}a` }, { id: `${page}b` }], 200, { link: links.join(", ") });
    }, recorded);

  test("items follow rel=next across bare-array pages", async () => {
    const recorded: Recorded = { requests: [] };
    const items = await succeed(
      Stream.runCollect(listThings.items({ state: "open", per_page: 2 })),
      server(recorded),
      creds(),
    );
    expect(items.map((i: { id: string }) => i.id)).toEqual(["1a", "1b", "2a", "2b", "3a", "3b"]);
    expect(recorded.requests.map((r) => new URL(r.url).search)).toEqual([
      "?state=open&per_page=2",
      "?state=open&page=2&per_page=2",
      "?state=open&page=3&per_page=2",
    ]);
  });

  test("pages are the bare arrays", async () => {
    const pages = await succeed(
      Stream.runCollect(listThings.pages({ page: 2, per_page: 2 })),
      server({ requests: [] }),
      creds(),
    );
    expect(pages).toEqual([
      [{ id: "2a" }, { id: "2b" }],
      [{ id: "3a" }, { id: "3b" }],
    ]);
  });

  test("a response without a Link header is the only page", async () => {
    const recorded: Recorded = { requests: [] };
    const items = await succeed(
      Stream.runCollect(listThings.items({})),
      fakeClient(() => json([{ id: "x" }]), recorded),
      creds(),
    );
    expect(items).toEqual([{ id: "x" }]);
    expect(recorded.requests).toHaveLength(1);
  });
});
