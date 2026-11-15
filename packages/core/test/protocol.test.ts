/**
 * A typed protocol (core/protocol): `API.make` runs it and reads the SDK's
 * service errors and protocol errors from its type, and the compiler checks
 * each group. The `@ts-expect-error` lines are the compile-time half.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import { describe, expect, test } from "vitest";
import * as API from "../src/api.ts";
import type { NotFound } from "../src/errors.ts";
import {
  restProtocol,
  type HttpStatusError,
  type RestProtocolError,
} from "../src/protocol-rest.ts";
import type { Protocol } from "../src/protocol.ts";
import * as S from "../src/schema.ts";
import { SdkError } from "../src/sdk-error.ts";
import * as T from "../src/trait.ts";

// =============================================================================
// An SDK: its credentials, its two unions, its protocol
// =============================================================================

interface Creds {
  readonly host: string;
}

class TestCreds extends Context.Service<TestCreds, Creds>()("ProtocolTest/Creds") {}

class TestUnknownError extends Schema.TaggedError<TestUnknownError>()("TestUnknownError", {
  status: Schema.Number,
}) {}

class TestParseError extends Schema.TaggedError<TestParseError>()("TestParseError", {
  cause: Schema.Unknown,
}) {}

/** Group 2: what the server can answer on any operation. */
type TestServiceError = HttpStatusError | TestUnknownError;
/** Group 3: what the SDK's own code fails with. */
type TestProtocolError = RestProtocolError | TestParseError;

const credentials = Effect.gen(function* () {
  return yield* TestCreds;
});

const options = {
  credentials,
  baseUrl: (creds: Creds) => {
    if (creds.host === "") throw new Error("no host");
    return `https://${creds.host}`;
  },
  headers: () => ({}),
  unknownError: (info: { readonly status: number }) =>
    new TestUnknownError({ status: info.status }),
  parseError: (info: { readonly cause: unknown }) => new TestParseError({ cause: info.cause }),
};

const TestProtocol: Protocol<TestServiceError, TestProtocolError, TestCreds> =
  restProtocol(options);

// A status class the protocol builds is missing from the service errors.
// @ts-expect-error NotFound is not listed
export const missingServiceError: Protocol<
  Exclude<TestServiceError, NotFound>,
  TestProtocolError,
  TestCreds
> = restProtocol(options);

// The parse error is missing from the protocol errors.
// @ts-expect-error TestParseError is not listed
export const missingProtocolError: Protocol<TestServiceError, RestProtocolError, TestCreds> =
  restProtocol(options);

// The parse error is listed, but as a service error.
// @ts-expect-error TestParseError is a protocol error
export const wrongGroup: Protocol<TestServiceError | TestParseError, RestProtocolError, TestCreds> =
  restProtocol(options);

// =============================================================================
// A hand-written protocol
// =============================================================================

class RateLimited extends Schema.TaggedError<RateLimited>()("RateLimited", {
  message: Schema.String,
}) {}

export const HandWritten: Protocol<TestUnknownError, SdkError> = {
  encode: () => Effect.fail(new SdkError({ message: "not built" })),
  decode: ({ response, errors }) => {
    const Declared = errors[0];
    // One of the operation's own classes: an operation error.
    if (Declared) return Effect.fail(new Declared({ message: "declared" }));
    return Effect.fail(new TestUnknownError({ status: response.status }));
  },
};

export const failsOutsideTheGroups: Protocol<TestUnknownError, SdkError> = {
  encode: () => Effect.fail(new SdkError({ message: "not built" })),
  // @ts-expect-error RateLimited is in neither union and is not an operation error
  decode: () => Effect.fail(new RateLimited({ message: "new" })),
};

export const encodeFailsWithServiceError: Protocol<TestUnknownError, SdkError> = {
  // @ts-expect-error nothing was sent, so encode has protocol errors only
  encode: () => Effect.fail(new TestUnknownError({ status: 0 })),
  decode: () => Effect.succeed(undefined),
};

// =============================================================================
// An operation
// =============================================================================

class ThingLocked extends T.applyErrorMatchers(
  Schema.TaggedError<ThingLocked>()("ThingLocked", { message: Schema.String }),
  [{ status: 409 }],
) {}

const ThingInput = S.Struct({ id: S.String.pipe(T.Label()) }).pipe(
  T.Http({ method: "GET", uri: "/things/{id}" }),
);
const ThingOutput = S.Struct({ id: S.optional(S.String) });

// No error annotation: the operation's errors come from its `errors` list
// (group 1) and from the protocol's type (groups 2 and 3).
const getThing = API.make(() => ({
  input: ThingInput,
  output: ThingOutput,
  errors: [ThingLocked],
  protocol: TestProtocol,
}));

type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type GetThingError = Effect.Error<ReturnType<typeof getThing>>;
export const threeGroups: Same<
  GetThingError,
  ThingLocked | TestServiceError | TestProtocolError | HttpClientError.HttpClientError
> = true;
export const requirements: Same<
  Effect.Services<ReturnType<typeof getThing>>,
  TestCreds | HttpClient.HttpClient
> = true;

const respond = (status: number, body: unknown) =>
  Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.succeed(
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

const call = (status: number, body: unknown, host = "api.test") =>
  Effect.runPromise(
    Effect.result(
      getThing({ id: "t1" }).pipe(
        Effect.provide(Layer.mergeAll(respond(status, body), Layer.succeed(TestCreds, { host }))),
      ),
    ),
  );

const tagOf = async (status: number, body: unknown, host?: string) => {
  const result = await call(status, body, host);
  if (result._tag !== "Failure") throw new Error("expected a failure");
  return result.failure._tag;
};

describe("a typed protocol", () => {
  test("API.make runs an operation that names it", async () => {
    const result = await call(200, { id: "t1" });
    expect(result._tag === "Success" && result.success).toEqual({ id: "t1" });
  });

  test("a declared status fails with the operation's own error", async () => {
    expect(await tagOf(409, { message: "locked" })).toBe("ThingLocked");
  });

  test("an undeclared status fails with a service error", async () => {
    expect(await tagOf(404, { message: "gone" })).toBe("NotFound");
    expect(await tagOf(418, { message: "teapot" })).toBe("TestUnknownError");
  });

  test("a baseUrl that throws fails with SdkError, a protocol error", async () => {
    expect(await tagOf(200, {}, "")).toBe("SdkError");
  });
});
