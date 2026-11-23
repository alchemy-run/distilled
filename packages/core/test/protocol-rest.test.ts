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
  API_ERRORS,
  BadRequest,
  Conflict,
  InternalServerError,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
} from "../src/errors.ts";
import {
  BinaryResponse,
  RawResponse,
  RawResponseRoot,
  restProtocol,
  SensitiveValue,
  type RestErrorInfo,
  type RestParseErrorInfo,
} from "../src/protocol-rest.ts";
import type { Protocol } from "../src/protocol.ts";
import * as ResponseValidation from "../src/response-validation.ts";
import * as L from "../src/schema-lite.ts";
import * as S from "../src/schema.ts";
import { SdkError } from "../src/sdk-error.ts";
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

class Nested extends T.applyErrorMatchers(
  Schema.TaggedError<Nested>()("Nested", {
    message: Schema.String,
    status: Schema.optional(Schema.String),
    details: Schema.optional(Schema.Unknown),
    requestId: Schema.optional(Schema.String),
  }),
  [{ status: 412 }],
) {}

class SlowDown extends T.applyErrorMatchers(
  Schema.TaggedError<SlowDown>()("SlowDown", {
    message: Schema.String,
    retryAfter: Schema.optional(Schema.Unknown),
  }),
  [{ status: 409, body: { "/code": "slow_down" } }],
) {}

class KeyReused extends T.applyErrorMatchers(
  Schema.TaggedError<KeyReused>()("KeyReused", {
    code: Schema.Number,
    message: Schema.String,
    requestId: Schema.optional(Schema.String),
    error: Schema.optional(Schema.Unknown),
  }),
  [{ status: 422, body: { "/code": "key_reused" } }],
) {}

const TypedErrorBody = S.Struct({
  requestId: S.optional(S.String.pipe(T.Body("request_id"))),
});

class TypedBody extends T.applyErrorMatchers(
  Schema.TaggedError<TypedBody>()("TypedBody", {
    message: Schema.String,
    body: Schema.optional(Schema.Union([Schema.suspend(() => TypedErrorBody), Schema.String])),
  }),
  [{ status: 402 }],
) {}

const baseOptions = {
  credentials: Effect.gen(function* () {
    return yield* TestCreds;
  }),
  baseUrl: (creds: Creds) => `https://${creds.host}`,
  headers: (creds: Creds) => ({ authorization: `Bearer ${creds.token}` }),
  unknownError: (info: RestErrorInfo) => new TestUnknownError({ info }),
  parseError: (info: RestParseErrorInfo) => new TestParseError({ info }),
};

const DefaultProtocol = restProtocol(baseOptions);

const ThingInput = S.Struct({
  id: S.String.pipe(T.Label()),
  limit: S.optional(S.Number.pipe(T.Query("limit"))),
  tags: S.optional(S.Array(S.String).pipe(T.Query("tag"))),
  states: S.optional(S.Array(S.String).pipe(T.Query("state"), T.CommaDelimited())),
  trace: S.optional(S.String.pipe(T.Header("X-Trace-Id"))),
  displayName: S.optional(S.String.pipe(T.Body("display_name"))),
  secret: S.optional(S.String.pipe(SensitiveValue(), T.Body("secret_value"))),
}).pipe(T.Http({ method: "POST", uri: "/things/{id}" }));

const ThingOutput = S.Struct({
  id: S.optional(S.String),
  displayName: S.optional(S.String.pipe(T.Body("display_name"))),
  secret: S.optional(S.String.pipe(SensitiveValue(), T.Body("secret_value"))),
});

// The test service declares core's status classes, as most SDKs do: a
// failed response that no matcher fits becomes core's class for its status.
const thingOp = (
  protocol: Protocol<any, any>,
  errors: ReadonlyArray<any> = [],
  serviceErrors: ReadonlyArray<any> = API_ERRORS,
) =>
  API.make(() => ({
    input: ThingInput,
    output: ThingOutput,
    errors: errors as any,
    serviceErrors: serviceErrors as any,
    protocol,
  })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

const createThing = thingOp(DefaultProtocol);
const createThingWithErrors = thingOp(DefaultProtocol, [
  ThingLocked,
  QuotaExceeded,
  QuotaExceededOnCreate,
  Teapot,
  Gone,
  KeyReused,
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

describe("restProtocol request encoding", () => {
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

  test("sends a CommaDelimited query list as one comma-separated parameter", async () => {
    const recorded: Recorded = { requests: [] };
    await succeed(
      createThing({ id: "t1", states: ["running", "paused"] }),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    expect(recorded.requests[0]!.url).toBe("https://api.test/things/t1?state=running%2Cpaused");
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
    const CredsFailProtocol = restProtocol({
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
    const RoutingProtocol = restProtocol({
      ...baseOptions,
      baseUrl: (c: Creds, target) => {
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
    const RefusingProtocol = restProtocol({
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
    expect(error).toBeInstanceOf(SdkError);
    expect(error.message).toBe(`baseUrl threw: ${String(refusal)}`);
    expect(recorded.requests).toHaveLength(0);
  });

  test("mapMemberHeader transforms member headers but not the auth headers", async () => {
    const MappedHeaderProtocol = restProtocol({
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
    const SnakeProtocol = restProtocol({
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

describe("restProtocol raw request bodies", () => {
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

  test("an Extend input sends the base struct's fields as the body", async () => {
    // Shaped like a flattened GCP request: the body struct, extended with the
    // path and query members. A shadowed body field keeps its member binding.
    const Firewall = L.suspend(() =>
      L.Struct({ name: L.optional(L.String), sourceRanges: L.optional(L.Array(L.String)) }),
    );
    const patch = op(
      L.suspend(() =>
        L.Extend(
          Firewall,
          L.Struct({
            project: L.String.pipe(T.Label()),
            name: L.String.pipe(T.Label()),
            requestId: L.optional(L.String.pipe(T.Query())),
          }),
        ).pipe(T.Http({ method: "PATCH", uri: "/projects/{project}/firewalls/{name}" })),
      ),
    );
    const request = await send(
      patch({ project: "p", name: "fw", requestId: "r", sourceRanges: ["10.0.0.0/8"] }),
    );
    expect(new URL(request.url).pathname).toBe("/projects/p/firewalls/fw");
    expect(new URL(request.url).searchParams.get("requestId")).toBe("r");
    expect(await request.text()).toBe('{"sourceRanges":["10.0.0.0/8"]}');
  });

  test("body fields go out under the Content-Type member; a set payload wins", async () => {
    // Shaped like a flattened Kubernetes patch: resource fields for a merge
    // patch, the `patch` payload for a JSON patch array.
    const patch = op(
      S.Struct({
        contentType: S.String.pipe(T.Header("Content-Type")),
        spec: S.optional(S.Unknown),
        patch: S.optional(S.Unknown.pipe(T.HttpBody())),
      }).pipe(T.Http({ method: "PATCH", uri: "/things" })),
    );
    const merge = await send(
      patch({ contentType: "application/merge-patch+json", spec: { replicas: 3 } }),
    );
    expect(merge.headers.get("content-type")).toBe("application/merge-patch+json");
    expect(await merge.text()).toBe('{"spec":{"replicas":3}}');
    const json = await send(
      patch({
        contentType: "application/json-patch+json",
        patch: [{ op: "replace", path: "/spec/replicas", value: 3 }],
      }),
    );
    expect(json.headers.get("content-type")).toBe("application/json-patch+json");
    expect(await json.text()).toBe('[{"op":"replace","path":"/spec/replicas","value":3}]');
  });
});

// =============================================================================
// Success responses
// =============================================================================

describe("restProtocol success decoding", () => {
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

  test("a 200 response whose body is JSON null returns null, in strict mode too", async () => {
    const nullableOp = API.make(() => ({
      input: ThingInput,
      output: S.NullOr(S.Struct({ id: S.String })),
      protocol: DefaultProtocol,
    }));
    const respond = fakeClient(() => json(null));
    expect(await succeed(nullableOp({ id: "t1" }), respond, creds())).toBeNull();
    expect(
      await succeed(nullableOp({ id: "t1" }), respond, creds(), ResponseValidation.strict),
    ).toBeNull();
  });

  test("an empty 200 body decodes to an empty string when the output is a string", async () => {
    const getText = API.make(() => ({
      input: S.Struct({ id: S.String.pipe(T.Label()) }).pipe(
        T.Http({ method: "GET", uri: "/things/{id}/logs" }),
      ),
      output: S.String,
      errors: [],
      protocol: DefaultProtocol,
    }));
    const empty = await succeed(
      getText({ id: "t1" }),
      fakeClient(
        () => new Response("", { status: 200, headers: { "content-type": "text/plain" } }),
      ),
      creds(),
    );
    expect(empty).toEqual("");
    const text = await succeed(
      getText({ id: "t1" }),
      fakeClient(
        () => new Response("done\n", { status: 200, headers: { "content-type": "text/plain" } }),
      ),
      creds(),
    );
    expect(text).toEqual("done\n");
  });

  test("transformResponse runs on the parsed body before key mapping", async () => {
    const seen: Array<unknown> = [];
    const UnwrapProtocol = restProtocol({
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
    const CountingProtocol = restProtocol({
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

describe("restProtocol body read failures", () => {
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

describe("restProtocol label refusals", () => {
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

  // `DELETE /things/` would address the collection `/things`.
  test('a required `""` label fails with InvalidInput and sends nothing', async () => {
    let sent = 0;
    const error = await failWith(
      createThingWithErrors({ id: "" }),
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

  test('a required `""` greedy label fails with InvalidInput', async () => {
    const deleteObject = API.make(() => ({
      input: L.Struct({ key: L.String.pipe(T.Label()) }).pipe(
        T.Http({ method: "DELETE", uri: "/objects/{key+}" }),
      ),
      output: L.Struct({}),
      protocol: DefaultProtocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
    const error = await failWith(
      deleteObject({ key: "" }),
      fakeClient(() => json({})),
      creds(),
    );
    expect(error._tag).toBe("InvalidInput");
    expect(error.member).toBe("key");
  });

  test.each([
    ['`""`', { name: "db", version: "" }],
    ["omitted", { name: "db" }],
  ])("an optional label that is %s sends an empty segment", async (_, input) => {
    const getSecret = API.make(() => ({
      input: L.Struct({
        name: L.String.pipe(T.Label()),
        version: L.optional(L.String.pipe(T.Label())),
      }).pipe(T.Http({ method: "GET", uri: "/secrets/{name}/{version}" })),
      output: L.Struct({}),
      protocol: DefaultProtocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
    const recorded: Recorded = { requests: [] };
    await succeed(
      getSecret(input),
      fakeClient(() => json({}), recorded),
      creds(),
    );
    expect(recorded.requests[0]!.url).toBe("https://api.test/secrets/db/");
  });
});

// =============================================================================
// Error responses
// =============================================================================

describe("restProtocol typed error matching", () => {
  test("a declared error whose status and message matcher match wins over the status class", async () => {
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

  test("a matched error's declared fields carry the body's values, with the matched code and message", async () => {
    const error = await failOn(() =>
      json(
        {
          code: "key_reused",
          message: "key was used",
          requestId: "req_1",
          error: { details: { window: "day" } },
          extra: true,
        },
        422,
      ),
    );
    expect(error).toBeInstanceOf(KeyReused);
    expect(error.requestId).toBe("req_1");
    expect(error.error).toEqual({ details: { window: "day" } });
    expect(error.code).toBe(0);
    expect(error.message).toBe("key was used");
    expect(error.extra).toBeUndefined();
  });

  test("declared errors are ignored when nothing matches", async () => {
    const error = await failOn(() => json({ message: "thing is busy" }, 409));
    expect(error._tag).toBe("Conflict");
    expect(error.message).toBe("thing is busy");
  });

  test("operations without declared errors fall straight to the service's status class", async () => {
    const error = await failOn(() => json({ message: "thing is locked" }, 409), createThing);
    expect(error._tag).toBe("Conflict");
  });
});

describe("restProtocol error response fields", () => {
  const PlainOutput = S.Struct({ id: S.optional(S.String) });
  const NestedProtocol = restProtocol({ ...baseOptions, errorFieldsAt: "/error" });
  const plainOp = (protocol: Protocol<any, any>) =>
    API.make(() => ({
      input: ThingInput,
      output: PlainOutput,
      errors: [Nested, SlowDown, TypedBody] as any,
      serviceErrors: API_ERRORS,
      protocol,
    })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;
  const plain = plainOp(DefaultProtocol);
  const nested = plainOp(NestedProtocol);

  test("a status class error carries the body and headers", async () => {
    const error = await failOn(
      () => json({ message: "busy", requestId: "req_7" }, 409, { "x-request-id": "req_7" }),
      plain,
    );
    expect(error).toBeInstanceOf(Conflict);
    expect(error.body).toEqual({ message: "busy", requestId: "req_7" });
    expect(error.headers["x-request-id"]).toBe("req_7");
  });

  test("errorFieldsAt reads declared fields from the nested object, then the top level", async () => {
    const error = await failOn(
      () =>
        json(
          { error: { message: "no", status: "FAILED_PRECONDITION", details: [1] }, requestId: "r" },
          412,
        ),
      nested,
    );
    expect(error).toBeInstanceOf(Nested);
    expect(error.status).toBe("FAILED_PRECONDITION");
    expect(error.details).toEqual([1]);
    expect(error.requestId).toBe("r");
  });

  test("a typed body gets its keys mapped to TS names", async () => {
    const error = await failOn(() => json({ message: "pay", request_id: "req_9" }, 402), plain);
    expect(error).toBeInstanceOf(TypedBody);
    expect(error.body).toMatchObject({ requestId: "req_9" });
  });

  test("a typed body that is not JSON stays the raw text", async () => {
    const error = await failOn(() => new Response("<html>pay</html>", { status: 402 }), plain);
    expect(error).toBeInstanceOf(TypedBody);
    expect(error.body).toBe("<html>pay</html>");
  });

  test("a typed error that declares retryAfter gets the Retry-After hint", async () => {
    const error = await failOn(
      () => json({ code: "slow_down", message: "later" }, 409, { "retry-after": "7" }),
      plain,
    );
    expect(error).toBeInstanceOf(SlowDown);
    expect(Duration.toSeconds(error.retryAfter)).toBe(7);
  });
});

describe("restProtocol status classes and fallbacks", () => {
  test("declared 4xx statuses become core HTTP errors with the envelope message", async () => {
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

  test("undeclared 5xx statuses become a retryable InternalServerError", async () => {
    const error = await failOn(() => json({ message: "origin down" }, 521, { "retry-after": "3" }));
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error.message).toBe("origin down");
    // 521 is not in RETRYABLE_HTTP_STATUSES, so its hint is not stamped.
    expect(error.retryAfter).toBeUndefined();
  });

  test("undeclared 4xx statuses go to the unknownError hook with the wire details", async () => {
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

  test("a non-JSON status class error keeps the text as the message", async () => {
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

// The service's own class for a status: a class with a status matcher.
class CustomNotFound extends T.applyErrorMatchers(
  Schema.TaggedError<CustomNotFound>()("CustomNotFound", {
    message: Schema.String,
    retryAfter: Schema.optional(Schema.Unknown),
  }),
  [{ status: 404 }],
) {}

const CustomEnvelopeProtocol = restProtocol({
  ...baseOptions,
  errorEnvelope: (body) => {
    const err = (body as { err?: { id?: number; text?: string } } | null)?.err;
    return err ? { code: err.id, message: err.text } : undefined;
  },
});
// A service that declares only its own class, and none of core's.
const customOp = thingOp(CustomEnvelopeProtocol, [QuotaExceeded], [CustomNotFound]);

describe("restProtocol errorEnvelope option and a service's own status class", () => {
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

  test("a service that declares only its own class gets none of core's status classes", async () => {
    const error = await failOn(() => json({ err: { text: "bad" } }, 400), customOp);
    expect(error).toBeInstanceOf(TestUnknownError);
    expect((error.info as RestErrorInfo).message).toBe("bad");
  });

  test("undeclared 5xx still become InternalServerError when the service declares its own class", async () => {
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

describe("restProtocol raw body members", () => {
  // Shaped like E2B's list endpoints: a bare JSON array body, with the next
  // page token in a response header.
  const PageOutput = S.Struct({
    items: S.Array(S.Struct({ id: S.String })).pipe(RawResponse()),
    nextToken: S.optional(S.String.pipe(T.Header("X-Next-Token"))),
  });
  const pageOp = API.make(() => ({
    input: ThingInput,
    output: PageOutput,
    errors: [],
    protocol: DefaultProtocol,
  })) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

  test("a bare array body lands in the raw member, next to header members", async () => {
    const out = await succeed(
      pageOp({ id: "t1" }),
      fakeClient(() => json([{ id: "a" }, { id: "b" }], 200, { "X-Next-Token": "page-2" })),
      creds(),
    );
    expect(out).toEqual({ items: [{ id: "a" }, { id: "b" }], nextToken: "page-2" });
  });

  test("a missing header leaves the header member unset", async () => {
    const out = await succeed(
      pageOp({ id: "t1" }),
      fakeClient(() => json([])),
      creds(),
    );
    expect(out).toEqual({ items: [] });
  });
});
