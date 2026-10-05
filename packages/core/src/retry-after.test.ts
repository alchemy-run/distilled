import * as Clock from "effect/Clock";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import * as TestClock from "effect/testing/TestClock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import * as API from "./api.ts";
import { RETRYABLE_HTTP_STATUSES } from "./errors.ts";
import { makeRestProtocol } from "./protocol-rest.ts";
import {
  parseRatelimit,
  parseRetryAfter,
  parseRetryAfterForStatus,
  parseServerRetryHint,
} from "./retry-after.ts";
import * as Retry from "./retry.ts";
import * as S from "./schema.ts";
import * as T from "./trait.ts";

const NOW = Date.parse("2026-10-05T12:00:00Z");

const millis = (d: Duration.Duration | undefined) =>
  d === undefined ? undefined : Duration.toMillis(d);

beforeEach(() => {
  vi.spyOn(Date, "now").mockReturnValue(NOW);
  // Pin retry jitter to zero so end-to-end delays are exact.
  vi.spyOn(Math, "random").mockReturnValue(0);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("parseRetryAfter delay-seconds", () => {
  test("parses a non-negative integer number of seconds", () => {
    expect(millis(parseRetryAfter({ "retry-after": "120" }))).toBe(120_000);
    expect(millis(parseRetryAfter({ "retry-after": "1" }))).toBe(1_000);
  });

  test("zero seconds is a zero duration, not absent", () => {
    expect(millis(parseRetryAfter({ "retry-after": "0" }))).toBe(0);
  });

  test("surrounding whitespace is ignored", () => {
    expect(millis(parseRetryAfter({ "retry-after": "  5\t" }))).toBe(5_000);
  });

  test("leading zeros are accepted", () => {
    expect(millis(parseRetryAfter({ "retry-after": "007" }))).toBe(7_000);
  });

  test("signed or fractional numbers are rejected", () => {
    for (const raw of ["-5", "+5", "1.5", "-0", "0.0"]) {
      expect(parseRetryAfter({ "retry-after": raw })).toBeUndefined();
    }
  });
});

describe("parseRetryAfter HTTP-date", () => {
  test("parses an IMF-fixdate relative to now", () => {
    expect(millis(parseRetryAfter({ "retry-after": "Mon, 05 Oct 2026 12:00:30 GMT" }))).toBe(
      30_000,
    );
  });

  test("parses the obsolete RFC 850 and asctime forms", () => {
    expect(millis(parseRetryAfter({ "retry-after": "Monday, 05-Oct-26 12:01:00 GMT" }))).toBe(
      60_000,
    );
    expect(millis(parseRetryAfter({ "retry-after": "Mon Oct  5 12:00:10 2026 GMT" }))).toBe(10_000);
  });

  test("a date in the past is a zero duration", () => {
    expect(millis(parseRetryAfter({ "retry-after": "Mon, 05 Oct 2026 11:00:00 GMT" }))).toBe(0);
  });

  test("a date equal to now is a zero duration", () => {
    expect(millis(parseRetryAfter({ "retry-after": "Mon, 05 Oct 2026 12:00:00 GMT" }))).toBe(0);
  });
});

describe("parseRetryAfter absent or invalid headers", () => {
  test("no header bag, or no retry-after header, is absent", () => {
    expect(parseRetryAfter(undefined)).toBeUndefined();
    expect(parseRetryAfter({})).toBeUndefined();
    expect(parseRetryAfter({ "retry-after": undefined })).toBeUndefined();
  });

  test("empty and whitespace-only values are absent", () => {
    expect(parseRetryAfter({ "retry-after": "" })).toBeUndefined();
    expect(parseRetryAfter({ "retry-after": "   " })).toBeUndefined();
  });

  test("unparseable values are absent", () => {
    for (const raw of ["soon", "5s", "PT5S", "tomorrow at noon"]) {
      expect(parseRetryAfter({ "retry-after": raw })).toBeUndefined();
    }
  });

  test("only the lowercase header key is read", () => {
    expect(parseRetryAfter({ "Retry-After": "5" })).toBeUndefined();
  });
});

describe("parseRatelimit", () => {
  test("returns the reset time when the remaining quota is zero", () => {
    expect(millis(parseRatelimit({ ratelimit: "r=0, t=30" }))).toBe(30_000);
    expect(millis(parseRatelimit({ ratelimit: "limit=100, remaining=0, reset=30" }))).toBe(30_000);
    expect(millis(parseRatelimit({ ratelimit: '"default";r=0;t=30' }))).toBe(30_000);
  });

  test("tolerates whitespace and key case", () => {
    expect(millis(parseRatelimit({ ratelimit: " R = 0 ;  T = 12 " }))).toBe(12_000);
  });

  test("is absent while quota remains", () => {
    expect(parseRatelimit({ ratelimit: "r=5, t=30" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "limit=100, remaining=1, reset=30" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: '"default";r=2;t=30' })).toBeUndefined();
  });

  test("is absent unless remaining is present and exactly zero", () => {
    expect(parseRatelimit({ ratelimit: "t=30" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "limit=100, reset=30" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: '"default";t=30' })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "r=-1, t=30" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "remaining=-1, reset=30" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "r=0.5, t=30" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "r=none, t=30" })).toBeUndefined();
  });

  test("is absent without a usable reset", () => {
    expect(parseRatelimit({ ratelimit: "r=0" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "r=0, t=-1" })).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "r=0, t=later" })).toBeUndefined();
  });

  test("is absent when the header is missing or empty", () => {
    expect(parseRatelimit(undefined)).toBeUndefined();
    expect(parseRatelimit({})).toBeUndefined();
    expect(parseRatelimit({ ratelimit: "" })).toBeUndefined();
  });
});

describe("parseServerRetryHint", () => {
  test("prefers Retry-After over RateLimit", () => {
    expect(millis(parseServerRetryHint({ "retry-after": "5", ratelimit: "r=0, t=30" }))).toBe(
      5_000,
    );
  });

  test("falls back to RateLimit when Retry-After is absent or invalid", () => {
    expect(millis(parseServerRetryHint({ ratelimit: "r=0, t=30" }))).toBe(30_000);
    expect(millis(parseServerRetryHint({ "retry-after": "soon", ratelimit: "r=0, t=30" }))).toBe(
      30_000,
    );
  });

  test("is absent when neither header yields a value", () => {
    expect(parseServerRetryHint({ ratelimit: "r=3, t=30" })).toBeUndefined();
    expect(parseServerRetryHint({ ratelimit: "t=30" })).toBeUndefined();
    expect(parseServerRetryHint(undefined)).toBeUndefined();
  });
});

describe("parseRetryAfterForStatus", () => {
  test("returns the hint for every retryable status", () => {
    for (const status of RETRYABLE_HTTP_STATUSES) {
      expect(millis(parseRetryAfterForStatus(status, { "retry-after": "4" }))).toBe(4_000);
    }
  });

  test("ignores hints on non-retryable statuses", () => {
    for (const status of [200, 400, 401, 403, 404, 409, 422, 501, 521]) {
      expect(parseRetryAfterForStatus(status, { "retry-after": "4" })).toBeUndefined();
    }
  });
});

// =============================================================================
// End to end: header → error.retryAfter → retry delay
// =============================================================================

class TestRetry extends Retry.makeRetryService("RetryAfterTest/Retry") {}

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

const getThing = API.make(() => ({
  input: S.Struct({}).pipe(T.Http({ method: "GET", uri: "/thing" })),
  output: S.Struct({ ok: S.optional(S.Boolean) }),
  protocol: TestProtocol,
  retry: TestRetry,
})) as unknown as (input: Record<string, unknown>) => Effect.Effect<any, any, any>;

/** First response fails with `status`/`headers`, the second succeeds; returns attempt times. */
const retryDelays = async (status: number, headers: Record<string, string>) => {
  const times: Array<number> = [];
  const client = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.gen(function* () {
        times.push(yield* Clock.currentTimeMillis);
        const response =
          times.length === 1
            ? new Response(JSON.stringify({ message: "nope" }), { status, headers })
            : new Response(JSON.stringify({ ok: true }), { status: 200 });
        return HttpClientResponse.fromWeb(request, response);
      }),
    ),
  );
  await Effect.runPromise(
    Effect.gen(function* () {
      const fiber = yield* Effect.forkChild(Effect.result(getThing({})));
      yield* TestClock.adjust(Duration.hours(1));
      return yield* Fiber.join(fiber);
    }).pipe(Effect.provide(Layer.mergeAll(client, TestClock.layer()))) as Effect.Effect<
      any,
      never,
      never
    >,
  );
  return times.slice(1).map((t, i) => t - times[i]!);
};

describe("Retry-After feeding the default retry delay", () => {
  test("delay-seconds replaces the default backoff", async () => {
    expect(await retryDelays(503, { "retry-after": "3" })).toEqual([3_000]);
  });

  test("an HTTP-date waits until that date", async () => {
    expect(await retryDelays(429, { "retry-after": "Mon, 05 Oct 2026 12:00:04 GMT" })).toEqual([
      4_000,
    ]);
  });

  test("a RateLimit reset is used when Retry-After is absent", async () => {
    expect(await retryDelays(429, { ratelimit: "r=0, t=2" })).toEqual([2_000]);
  });

  test("an invalid header falls back to the default backoff", async () => {
    expect(await retryDelays(503, { "retry-after": "soon" })).toEqual([250]);
    expect(await retryDelays(429, { "retry-after": "soon" })).toEqual([500]);
  });

  test("a RateLimit header with quota left falls back to the default backoff", async () => {
    expect(await retryDelays(503, { ratelimit: "r=4, t=30" })).toEqual([250]);
  });

  test("a hint on a non-retryable status neither stamps nor triggers a retry", async () => {
    expect(await retryDelays(404, { "retry-after": "3" })).toEqual([]);
  });
});
