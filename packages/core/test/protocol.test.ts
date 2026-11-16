/**
 * A typed protocol (core/protocol). An operation's errors are declared in
 * three places: on the operation (`errors`), on its service
 * (`serviceErrors`) and on its protocol (the protocol's type). `API.make`
 * adds them together, and the compiler checks what the protocol declares.
 * The `@ts-expect-error` lines are the compile-time half.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import { describe, expect, test } from "vitest";
import * as API from "../src/api.ts";
import { TooManyRequests, Unauthorized } from "../src/errors.ts";
import { restProtocol, type RestProtocolError } from "../src/protocol-rest.ts";
import type { Protocol } from "../src/protocol.ts";
import * as S from "../src/schema.ts";
import { SdkError } from "../src/sdk-error.ts";
import * as T from "../src/trait.ts";

// =============================================================================
// An SDK: its credentials, its service's errors, its protocol's errors
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

/** Declared on the service: any operation can return them. */
const TestServiceErrors = [Unauthorized, TooManyRequests] as const;
type TestServiceError = InstanceType<(typeof TestServiceErrors)[number]>;

/** Declared on the protocol: what its own code fails with. */
type TestProtocolError = RestProtocolError | TestParseError | TestUnknownError;

const options = {
  credentials: Effect.gen(function* () {
    return yield* TestCreds;
  }),
  baseUrl: (creds: Creds) => {
    if (creds.host === "") throw new Error("no host");
    return `https://${creds.host}`;
  },
  headers: () => ({}),
  unknownError: (info: { readonly status: number }) =>
    new TestUnknownError({ status: info.status }),
  parseError: (info: { readonly cause: unknown }) => new TestParseError({ cause: info.cause }),
};

const TestProtocol: Protocol<TestProtocolError, TestCreds> = restProtocol(options);

// The protocol fails with a class its type does not declare.
// @ts-expect-error TestParseError is not listed
export const undeclared: Protocol<RestProtocolError | TestUnknownError, TestCreds> =
  restProtocol(options);

// `credentials` as the service key, the distilled convention: the options
// are inferred as they are for an effect.
class KeyedCreds extends Context.Service<KeyedCreds, Effect.Effect<Creds, TestUnknownError>>()(
  "ProtocolTest/KeyedCreds",
) {}

export const Keyed: Protocol<TestProtocolError, KeyedCreds> = restProtocol({
  ...options,
  credentials: KeyedCreds,
  baseUrl: (creds) => `https://${creds.host}`,
});

// =============================================================================
// A hand-written protocol
// =============================================================================

export const HandWritten: Protocol<TestUnknownError | SdkError> = {
  encode: () => Effect.fail(new SdkError({ message: "not built" })),
  decode: ({ response, errors }) => {
    // A class the operation or its service declares.
    const Declared = errors[0];
    if (Declared) return Effect.fail(new Declared({ message: "declared" }));
    return Effect.fail(new TestUnknownError({ status: response.status }));
  },
};

export const buildsServiceError: Protocol<TestUnknownError | SdkError> = {
  encode: () => Effect.fail(new SdkError({ message: "not built" })),
  // @ts-expect-error Unauthorized is the service's to declare; the protocol gets it in `errors`
  decode: () => Effect.fail(new Unauthorized({ message: "401" })),
};

// =============================================================================
// Operations
// =============================================================================

class ThingLocked extends T.applyErrorMatchers(
  Schema.TaggedError<ThingLocked>()("ThingLocked", { message: Schema.String }),
  [{ status: 409 }],
) {}

const ThingInput = S.Struct({ id: S.String.pipe(T.Label()) }).pipe(
  T.Http({ method: "GET", uri: "/things/{id}" }),
);
const ThingOutput = S.Struct({ id: S.optional(S.String) });

// No error annotation: the compiler adds the three places together.
const getThing = API.make(() => ({
  input: ThingInput,
  output: ThingOutput,
  errors: [ThingLocked],
  serviceErrors: TestServiceErrors,
  protocol: TestProtocol,
}));

// An operation that leaves the service's errors out does not get them.
const getThingAlone = API.make(() => ({
  input: ThingInput,
  output: ThingOutput,
  errors: [ThingLocked],
  protocol: TestProtocol,
}));

type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
export const threePlaces: Same<
  Effect.Error<ReturnType<typeof getThing>>,
  ThingLocked | TestServiceError | TestProtocolError
> = true;
export const twoPlaces: Same<
  Effect.Error<ReturnType<typeof getThingAlone>>,
  ThingLocked | TestProtocolError
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

const call = (
  op: typeof getThing | typeof getThingAlone,
  status: number,
  body: unknown,
  host = "api.test",
) =>
  Effect.runPromise(
    Effect.result(
      op({ id: "t1" }).pipe(
        Effect.provide(Layer.mergeAll(respond(status, body), Layer.succeed(TestCreds, { host }))),
      ),
    ),
  );

const tagOf = async (
  op: typeof getThing | typeof getThingAlone,
  status: number,
  body: unknown,
  host?: string,
) => {
  const result = await call(op, status, body, host);
  if (result._tag !== "Failure") throw new Error("expected a failure");
  return result.failure._tag;
};

describe("a typed protocol", () => {
  test("API.make runs an operation that names it", async () => {
    const result = await call(getThing, 200, { id: "t1" });
    expect(result._tag === "Success" && result.success).toEqual({ id: "t1" });
  });

  test("a status the operation declares fails with the operation's error", async () => {
    expect(await tagOf(getThing, 409, { message: "locked" })).toBe("ThingLocked");
  });

  test("a status the service declares fails with the service's error", async () => {
    expect(await tagOf(getThing, 401, { message: "no" })).toBe("Unauthorized");
    expect(await tagOf(getThing, 429, { message: "slow" })).toBe("TooManyRequests");
  });

  test("a status nothing declares fails with the protocol's errors", async () => {
    expect(await tagOf(getThing, 404, { message: "gone" })).toBe("TestUnknownError");
    expect(await tagOf(getThing, 520, { message: "proxy" })).toBe("InternalServerError");
    // The service's errors only reach an operation that lists them.
    expect(await tagOf(getThingAlone, 401, { message: "no" })).toBe("TestUnknownError");
  });

  test("a baseUrl that throws fails with SdkError", async () => {
    expect(await tagOf(getThing, 200, {}, "")).toBe("SdkError");
  });
});
