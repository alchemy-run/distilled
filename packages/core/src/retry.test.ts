import * as Clock from "effect/Clock";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import * as Schema from "effect/Schema";
import * as TestClock from "effect/testing/TestClock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import * as API from "./api.ts";
import * as Category from "./category.ts";
import {
  BadGateway,
  BadRequest,
  Conflict,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
} from "./errors.ts";
import { makeRestProtocol } from "./protocol-rest.ts";
import * as Retry from "./retry.ts";
import * as S from "./schema.ts";
import * as T from "./trait.ts";

// =============================================================================
// Fixtures
// =============================================================================

class TestRetry extends Retry.makeRetryService("RetryTest/Retry") {}
class OtherRetry extends Retry.makeRetryService("RetryTest/OtherRetry") {}

class UnknownTestError extends Schema.TaggedError<UnknownTestError>()("UnknownTestError", {
  message: Schema.String,
}) {}

const TestProtocol = makeRestProtocol<{}>({
  credentials: Effect.succeed({}),
  baseUrl: () => "https://api.test",
  headers: () => ({}),
  unknownError: ({ message }) => new UnknownTestError({ message }),
  parseError: ({ body }) => new UnknownTestError({ message: String(body) }),
});

const Output = S.Struct({ ok: S.optional(S.Boolean) });

type Call = (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

const operation = (method: "GET" | "POST", retry?: typeof TestRetry): Call =>
  API.make(() => ({
    input: S.Struct({}).pipe(T.Http({ method, uri: "/thing" })),
    output: Output,
    protocol: TestProtocol,
    ...(retry ? { retry } : {}),
  })) as unknown as Call;

const getThing = operation("GET", TestRetry);
const createThing = operation("POST", TestRetry);
const getThingWithoutRetry = operation("GET");

type Reply = Response | "transport";

/**
 * Fake HttpClient replying from `script` by attempt number (0-based) and
 * recording the TestClock time of every attempt.
 */
const scripted = (script: (attempt: number) => Reply) => {
  const attempts: Array<{ readonly at: number; readonly method: string }> = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.gen(function* () {
        const at = yield* Clock.currentTimeMillis;
        const reply = script(attempts.length);
        attempts.push({ at, method: request.method });
        if (reply === "transport") {
          return yield* Effect.fail(
            new HttpClientError.HttpClientError({
              reason: new HttpClientError.TransportError({ request, description: "reset" }),
            }),
          );
        }
        return HttpClientResponse.fromWeb(request, reply);
      }),
    ),
  );
  return { attempts, layer, times: () => attempts.map((a) => a.at) };
};

const status = (code: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify({ message: `status ${code}` }), { status: code, headers });
const ok = () => new Response(JSON.stringify({ ok: true }), { status: 200 });

/** Fail `n` times with `reply`, then succeed. */
const failTimes = (n: number, reply: () => Reply) => (attempt: number) =>
  attempt < n ? reply() : ok();

/**
 * Run `effect` under a TestClock, advancing virtual time far enough for any
 * finite retry sequence in these tests to complete.
 */
const runVirtual = <A, E>(effect: Effect.Effect<A, E, any>, layer: Layer.Layer<any>) =>
  Effect.runPromise(
    Effect.gen(function* () {
      const fiber = yield* Effect.forkChild(Effect.result(effect));
      yield* TestClock.adjust(Duration.hours(1));
      return yield* Fiber.join(fiber);
    }).pipe(Effect.provide(Layer.mergeAll(layer, TestClock.layer()))) as Effect.Effect<
      any,
      never,
      never
    >,
  );

const delays = (times: ReadonlyArray<number>) => times.slice(1).map((t, i) => t - times[i]!);

const withPolicy =
  (policy: Retry.Policy) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>) =>
    effect.pipe(Effect.provideService(TestRetry, policy));

const none: Retry.Options = { while: () => false };

beforeEach(() => {
  // Pin jitter (Math.random * 50ms) to zero so delays are exact.
  vi.spyOn(Math, "random").mockReturnValue(0);
});

afterEach(() => {
  vi.restoreAllMocks();
});

// The default ConfigProvider snapshots process.env on first use, so env
// overrides are supplied through an explicit provider.
const env = (vars: Record<string, string>) =>
  ConfigProvider.layer(ConfigProvider.fromEnv({ env: vars }));

// =============================================================================
// Error categories
// =============================================================================

const request = HttpClientRequest.get("https://api.test/thing");
const transportError = new HttpClientError.HttpClientError({
  reason: new HttpClientError.TransportError({ request }),
});
const decodeError = new HttpClientError.HttpClientError({
  reason: new HttpClientError.DecodeError({
    request,
    response: HttpClientResponse.fromWeb(request, new Response("x")),
  }),
});

class CategorizedNetworkError extends Schema.TaggedError<CategorizedNetworkError>()(
  "CategorizedNetworkError",
  { message: Schema.String },
).pipe(Category.withCategory(Category.NetworkError)) {}

class CategorizedTimeoutError extends Schema.TaggedError<CategorizedTimeoutError>()(
  "CategorizedTimeoutError",
  { message: Schema.String },
).pipe(Category.withCategory(Category.TimeoutError)) {}

class RetryableMarked extends Schema.TaggedError<RetryableMarked>()("RetryableMarked", {
  message: Schema.String,
}).pipe(Category.withRetryable()) {}

const transient = [
  new TooManyRequests({ message: "" }),
  new Locked({ message: "" }),
  new InternalServerError({ message: "" }),
  new BadGateway({ message: "" }),
  new ServiceUnavailable({ message: "" }),
  new GatewayTimeout({ message: "" }),
  new CategorizedNetworkError({ message: "" }),
  new CategorizedTimeoutError({ message: "" }),
  new RetryableMarked({ message: "" }),
  transportError,
];

const permanent = [
  new BadRequest({ message: "" }),
  new Unauthorized({ message: "" }),
  new Forbidden({ message: "" }),
  new NotFound({ message: "" }),
  new Conflict({ message: "" }),
  new UnknownTestError({ message: "" }),
  decodeError,
  new Error("plain"),
  undefined,
];

const nameOf = (e: unknown) =>
  (e as { _tag?: string } | undefined)?._tag === "HttpClientError"
    ? `HttpClientError(${(e as HttpClientError.HttpClientError).reason._tag})`
    : ((e as { _tag?: string } | undefined)?._tag ?? String(e));

describe("retry predicates by error category", () => {
  const lastError = Effect.runSync(Ref.make<unknown>(undefined));
  const policies = {
    makeDefault: Retry.makeDefault(lastError),
    transientFactory: Retry.transientFactory(lastError),
    transientOptions: Retry.transientOptions,
    throttlingFactory: Retry.throttlingFactory(lastError),
    throttlingOptions: Retry.throttlingOptions,
  };

  for (const error of transient) {
    test(`default and transient policies retry ${nameOf(error)}`, () => {
      expect(policies.makeDefault.while!(error)).toBe(true);
      expect(policies.transientFactory.while!(error)).toBe(true);
      expect(policies.transientOptions.while!(error)).toBe(true);
    });
  }

  for (const error of permanent) {
    test(`no policy retries ${nameOf(error)}`, () => {
      for (const policy of Object.values(policies)) {
        expect(policy.while!(error)).toBe(false);
      }
    });
  }

  test("throttling policies retry only throttling errors", () => {
    for (const policy of [policies.throttlingFactory, policies.throttlingOptions]) {
      expect(policy.while!(new TooManyRequests({ message: "" }))).toBe(true);
      for (const error of transient.filter((e) => !(e instanceof TooManyRequests))) {
        expect(policy.while!(error)).toBe(false);
      }
    }
  });
});

// =============================================================================
// Default policy
// =============================================================================

describe("makeDefault schedule", () => {
  test("backs off exponentially from 250ms, capped at 5s, and gives up after 8 retries", async () => {
    const http = scripted(() => status(503));
    const result = await runVirtual(getThing({}), http.layer);
    expect(result._tag).toBe("Failure");
    expect(result.failure).toBeInstanceOf(ServiceUnavailable);
    expect(http.attempts).toHaveLength(9);
    expect(delays(http.times())).toEqual([250, 500, 1000, 2000, 4000, 5000, 5000, 5000]);
  });

  test("succeeds as soon as a retry succeeds", async () => {
    const http = scripted(failTimes(2, () => status(500)));
    const result = await runVirtual(getThing({}), http.layer);
    expect(result).toMatchObject({ _tag: "Success", success: { ok: true } });
    expect(http.attempts).toHaveLength(3);
  });

  test("throttling errors wait at least 500ms", async () => {
    const http = scripted(failTimes(3, () => status(429)));
    await runVirtual(getThing({}), http.layer);
    expect(delays(http.times())).toEqual([500, 500, 1000]);
  });

  test("retries wire-level transport failures", async () => {
    const http = scripted(failTimes(2, () => "transport"));
    const result = await runVirtual(getThing({}), http.layer);
    expect(result._tag).toBe("Success");
    expect(delays(http.times())).toEqual([250, 500]);
  });

  test("does not retry non-transient failures", async () => {
    for (const code of [400, 401, 403, 404, 409, 422, 402]) {
      const http = scripted(() => status(code));
      const result = await runVirtual(getThing({}), http.layer);
      expect(result._tag).toBe("Failure");
      expect(http.attempts).toHaveLength(1);
    }
  });

  test("does not distinguish mutations from reads", async () => {
    const reads = scripted(failTimes(2, () => status(503)));
    const writes = scripted(failTimes(2, () => status(503)));
    await runVirtual(getThing({}), reads.layer);
    await runVirtual(createThing({}), writes.layer);
    expect(writes.attempts.map((a) => a.method)).toEqual(["POST", "POST", "POST"]);
    expect(writes.times()).toEqual(reads.times());
  });

  test("jitter adds up to 50ms to each delay", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const http = scripted(failTimes(2, () => status(503)));
    await runVirtual(getThing({}), http.layer);
    expect(delays(http.times())).toEqual([275, 525]);
  });
});

describe("server retry hints", () => {
  test("the default policy honors retryAfter over its own backoff", async () => {
    const http = scripted(failTimes(2, () => status(503, { "retry-after": "2" })));
    await runVirtual(getThing({}), http.layer);
    expect(delays(http.times())).toEqual([2000, 2000]);
  });

  test("a hint longer than the 5s backoff cap is honored in full", async () => {
    const http = scripted(failTimes(1, () => status(429, { "retry-after": "30" })));
    await runVirtual(getThing({}), http.layer);
    expect(delays(http.times())).toEqual([30_000]);
  });

  test("a hint shorter than the throttling floor still wins", async () => {
    const http = scripted(failTimes(1, () => status(429, { "retry-after": "0" })));
    await runVirtual(getThing({}), http.layer);
    expect(delays(http.times())).toEqual([0]);
  });

  test("hints are capped at DEFAULT_SERVER_RETRY_HINT_CAP_MS", async () => {
    expect(Retry.DEFAULT_SERVER_RETRY_HINT_CAP_MS).toBe(60_000);
    const http = scripted(failTimes(1, () => status(429, { "retry-after": "600" })));
    await runVirtual(getThing({}), http.layer);
    expect(delays(http.times())).toEqual([60_000]);
  });

  test("serverRetryHintCapLayer overrides the cap", async () => {
    const http = scripted(failTimes(1, () => status(429, { "retry-after": "600" })));
    await runVirtual(
      getThing({}),
      Layer.mergeAll(http.layer, Retry.serverRetryHintCapLayer(1_500)),
    );
    expect(delays(http.times())).toEqual([1_500]);
  });

  test("DISTILLED_SERVER_RETRY_HINT_CAP_MS overrides the cap", async () => {
    const http = scripted(failTimes(1, () => status(429, { "retry-after": "600" })));
    await runVirtual(
      getThing({}),
      Layer.mergeAll(http.layer, env({ DISTILLED_SERVER_RETRY_HINT_CAP_MS: "2500" })),
    );
    expect(delays(http.times())).toEqual([2_500]);
  });

  test("an invalid DISTILLED_SERVER_RETRY_HINT_CAP_MS falls back to the default cap", async () => {
    for (const raw of ["-1", "soon", "Infinity", ""]) {
      const http = scripted(failTimes(1, () => status(429, { "retry-after": "600" })));
      await runVirtual(
        getThing({}),
        Layer.mergeAll(http.layer, env({ DISTILLED_SERVER_RETRY_HINT_CAP_MS: raw })),
      );
      expect(delays(http.times())).toEqual([60_000]);
    }
  });

  test("DISTILLED_SERVER_RETRY_HINT_CAP_MS is truncated to whole milliseconds", async () => {
    const http = scripted(failTimes(1, () => status(429, { "retry-after": "600" })));
    await runVirtual(
      getThing({}),
      Layer.mergeAll(http.layer, env({ DISTILLED_SERVER_RETRY_HINT_CAP_MS: "1234.9" })),
    );
    expect(delays(http.times())).toEqual([1_234]);
  });

  test("the layer cap wins over the environment cap", async () => {
    const http = scripted(failTimes(1, () => status(429, { "retry-after": "600" })));
    await runVirtual(
      getThing({}),
      Layer.mergeAll(
        http.layer,
        Retry.serverRetryHintCapLayer(1_000),
        env({ DISTILLED_SERVER_RETRY_HINT_CAP_MS: "2500" }),
      ),
    );
    expect(delays(http.times())).toEqual([1_000]);
  });

  test("an invalid layer cap falls back to the environment cap", async () => {
    const http = scripted(failTimes(1, () => status(429, { "retry-after": "600" })));
    await runVirtual(
      getThing({}),
      Layer.mergeAll(
        http.layer,
        Retry.serverRetryHintCapLayer(-1),
        env({ DISTILLED_SERVER_RETRY_HINT_CAP_MS: "2500" }),
      ),
    );
    expect(delays(http.times())).toEqual([2_500]);
  });

  test("factory policies honor hints; static Options policies cannot", async () => {
    const factory = scripted(failTimes(1, () => status(429, { "retry-after": "3" })));
    await runVirtual(getThing({}).pipe(withPolicy(Retry.throttlingFactory)), factory.layer);
    expect(delays(factory.times())).toEqual([3_000]);

    const options = scripted(failTimes(1, () => status(429, { "retry-after": "3" })));
    await runVirtual(getThing({}).pipe(withPolicy(Retry.throttlingOptions)), options.layer);
    expect(delays(options.times())).toEqual([1_000]);
  });
});

describe("readServerRetryHintCapMsFromEnv", () => {
  test("returns the default cap when the variable is unset", () => {
    expect(process.env.DISTILLED_SERVER_RETRY_HINT_CAP_MS).toBeUndefined();
    expect(Retry.readServerRetryHintCapMsFromEnv()).toBe(Retry.DEFAULT_SERVER_RETRY_HINT_CAP_MS);
  });
});

// =============================================================================
// Other built-in policies
// =============================================================================

describe("throttling and transient policies", () => {
  test("transient policies back off from 1s, cap at 5s, and keep retrying past 8 attempts", async () => {
    for (const policy of [Retry.transientFactory, Retry.transientOptions]) {
      const http = scripted(failTimes(10, () => status(502)));
      const result = await runVirtual(getThing({}).pipe(withPolicy(policy)), http.layer);
      expect(result._tag).toBe("Success");
      expect(delays(http.times())).toEqual([
        1000, 2000, 4000, 5000, 5000, 5000, 5000, 5000, 5000, 5000,
      ]);
    }
  });

  test("throttling policies do not retry server errors", async () => {
    const http = scripted(() => status(503));
    const result = await runVirtual(
      getThing({}).pipe(withPolicy(Retry.throttlingFactory)),
      http.layer,
    );
    expect(result.failure).toBeInstanceOf(ServiceUnavailable);
    expect(http.attempts).toHaveLength(1);
  });
});

describe("schedule helpers", () => {
  const delaysOf = async (schedule: Schedule.Schedule<unknown>, failures: number) => {
    const http = scripted(failTimes(failures, () => status(503)));
    await runVirtual(getThing({}).pipe(withPolicy({ while: () => true, schedule })), http.layer);
    return delays(http.times());
  };

  test("capped clamps each delay to the maximum", async () => {
    expect(
      await delaysOf(Schedule.exponential(1000, 3).pipe(Retry.capped(Duration.seconds(2))), 3),
    ).toEqual([1000, 2000, 2000]);
  });

  test("jittered adds Math.random() * 50ms", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.2);
    expect(await delaysOf(Schedule.spaced(100).pipe(Retry.jittered), 2)).toEqual([110, 110]);
  });
});

// =============================================================================
// Policy resolution from context
// =============================================================================

describe("retry policy resolution", () => {
  test("operations without a retry tag never retry", async () => {
    const http = scripted(() => status(503));
    await runVirtual(getThingWithoutRetry({}).pipe(withPolicy(Retry.transientOptions)), http.layer);
    expect(http.attempts).toHaveLength(1);
  });

  test("with no policy in context the default policy applies", async () => {
    const http = scripted(failTimes(1, () => status(503)));
    const result = await runVirtual(getThing({}), http.layer);
    expect(result._tag).toBe("Success");
    expect(http.attempts).toHaveLength(2);
  });

  test("a policy that never retries disables the default", async () => {
    const http = scripted(() => status(503));
    await runVirtual(getThing({}).pipe(withPolicy(none)), http.layer);
    expect(http.attempts).toHaveLength(1);
  });

  test("a policy without `while` disables retrying", async () => {
    const http = scripted(() => status(503));
    await runVirtual(getThing({}).pipe(withPolicy({ schedule: Schedule.recurs(5) })), http.layer);
    expect(http.attempts).toHaveLength(1);
  });

  test("a policy without a schedule retries immediately while its predicate holds", async () => {
    const http = scripted(failTimes(3, () => status(400)));
    const result = await runVirtual(
      getThing({}).pipe(withPolicy({ while: (e) => e instanceof BadRequest })),
      http.layer,
    );
    expect(result._tag).toBe("Success");
    expect(http.times()).toEqual([0, 0, 0, 0]);
  });

  test("a custom schedule bounds the attempts", async () => {
    const http = scripted(() => status(503));
    await runVirtual(
      getThing({}).pipe(withPolicy({ while: () => true, schedule: Schedule.recurs(2) })),
      http.layer,
    );
    expect(http.attempts).toHaveLength(3);
  });

  test("factory policies get a ref holding the latest failure", async () => {
    const seen: Array<unknown> = [];
    const factory: Retry.Factory = (lastError) => ({
      while: () => true,
      schedule: Schedule.recurs(2).pipe(
        Schedule.tap(() =>
          Effect.flatMap(Ref.get(lastError), (e) => Effect.sync(() => seen.push(e))),
        ),
      ),
    });
    let n = 0;
    const http = scripted(() => status([500, 502, 503][n++]!));
    const result = await runVirtual(getThing({}).pipe(withPolicy(factory)), http.layer);
    // One schedule step per retry decision, each seeing the failure it retries.
    expect(seen.map((e) => (e as { _tag: string })._tag)).toEqual([
      "InternalServerError",
      "BadGateway",
    ]);
    expect(result.failure).toBeInstanceOf(ServiceUnavailable);
  });

  test("an outer policy applies to every call beneath it", async () => {
    const http = scripted(() => status(503));
    await runVirtual(
      Effect.all([Effect.result(getThing({})), Effect.result(createThing({}))]).pipe(
        withPolicy(none),
      ),
      http.layer,
    );
    expect(http.attempts.map((a) => a.method)).toEqual(["GET", "POST"]);
  });

  test("an inner policy overrides the outer one for its own subtree only", async () => {
    const http = scripted(() => status(503));
    const inner = getThing({}).pipe(withPolicy(none));
    const sibling = createThing({});
    await runVirtual(
      Effect.all([Effect.result(inner), Effect.result(sibling)]).pipe(
        withPolicy({ while: () => true, schedule: Schedule.recurs(2) }),
      ),
      http.layer,
    );
    expect(http.attempts.map((a) => a.method)).toEqual(["GET", "POST", "POST", "POST"]);
  });

  test("a policy under another SDK's tag does not apply", async () => {
    const http = scripted(failTimes(1, () => status(503)));
    const result = await runVirtual(
      getThing({}).pipe(Effect.provideService(OtherRetry, none)),
      http.layer,
    );
    expect(result._tag).toBe("Success");
    expect(http.attempts).toHaveLength(2);
  });

  test("a policy installed as a layer applies like provideService", async () => {
    const http = scripted(() => status(503));
    await runVirtual(getThing({}), Layer.mergeAll(http.layer, Layer.succeed(TestRetry, none)));
    expect(http.attempts).toHaveLength(1);
  });
});
