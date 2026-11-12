// Galaxy's rate limiter: `Retry-After: 0` with the real wait in a text body.
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as TestClock from "effect/testing/TestClock";
import { expect, test } from "vitest";
import * as StarburstGalaxy from "../src/index.ts";
import { rateLimited } from "../src/protocol.ts";

const stated = "Rate limit exceeded. Please try again in 10 seconds.";

test("a 429 waits as long as Galaxy's body says, else a positive Retry-After, never zero", () => {
  const classify = (message: string, retryAfter: string) =>
    rateLimited({ status: 429, message, body: message, headers: { "retry-after": retryAfter } });
  const ms = (error: ReturnType<typeof rateLimited>) =>
    error?.retryAfter === undefined ? undefined : Duration.toMillis(error.retryAfter);

  expect(ms(classify(stated, "0"))).toBe(10_000);
  expect(ms(classify("Too many requests", "3"))).toBe(3_000);
  expect(classify("Too many requests", "0")?.retryAfter).toBeUndefined();
  expect(rateLimited({ status: 400, message: stated, body: {}, headers: {} })).toBeUndefined();
});

test("a rate-limited call is retried after the stated wait, not at once", async () => {
  const arrivals: number[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.gen(function* () {
        arrivals.push(yield* Effect.clockWith((clock) => clock.currentTimeMillis));
        return HttpClientResponse.fromWeb(
          request,
          arrivals.length === 1
            ? new Response(stated, { status: 429, headers: { "retry-after": "0" } })
            : Response.json({
                syncToken: "s",
                roleId: "r-1",
                roleName: "analysts",
                directlyGrantedRoles: [],
                allRoles: [],
                createdOn: "2026-01-01T00:00:00Z",
                modifiedOn: "2026-01-01T00:00:00Z",
              }),
        );
      }),
    ),
  );
  const credentials = StarburstGalaxy.fromAccessToken({
    domain: "yourco.galaxy.starburst.io",
    accessToken: Redacted.make("token"),
  });

  const role = await Effect.runPromise(
    Effect.gen(function* () {
      const fiber = yield* StarburstGalaxy.role
        .getRole({ roleId: "r-1" })
        .pipe(Effect.provide(Layer.mergeAll(credentials, http)), Effect.forkChild);
      yield* TestClock.adjust(Duration.seconds(9));
      expect(arrivals).toHaveLength(1);
      yield* TestClock.adjust(Duration.seconds(2));
      return yield* Fiber.join(fiber);
    }).pipe(Effect.provide(TestClock.layer())),
  );
  expect(role.roleName).toBe("analysts");
  expect(arrivals[1]! - arrivals[0]!).toBeGreaterThanOrEqual(10_000);
});
