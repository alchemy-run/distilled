import { describe, expect, test } from "bun:test";
import * as API from "@distilled.cloud/core/api";
import * as Cause from "effect/Cause";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Fiber from "effect/Fiber";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import { Credentials } from "./credentials.ts";
import { SpritesProtocol } from "./protocol.ts";
import { ListSpritesRequest } from "./services/sprites.ts";

const mintFixture = (apiKey: string) =>
  Effect.gen(function* () {
    const protocol = yield* API.Protocol;
    const attempts = yield* Effect.forEach([0, 1], () =>
      Effect.gen(function* () {
        return {
          started: yield* Deferred.make<void>(),
          response: yield* Deferred.make<{ status: number; body: unknown }>(),
        };
      }),
    );
    const discoveries: HttpClientRequest.HttpClientRequest[] = [];
    const mints: HttpClientRequest.HttpClientRequest[] = [];
    let credentialReads = 0;
    const client = HttpClient.make((request) =>
      Effect.gen(function* () {
        if (request.url === "https://fly.test/v1/tokens/current") {
          discoveries.push(request);
          return HttpClientResponse.fromWeb(
            request,
            Response.json({ tokens: [{ org_slug: "mint-test" }] }),
          );
        }
        if (
          request.method !== "POST" ||
          request.url !== "https://api.sprites.dev/v1/organizations/mint-test/tokens"
        ) {
          return yield* Effect.die("Unexpected test transport request");
        }
        const attempt = attempts[mints.length];
        mints.push(request);
        if (!attempt) return yield* Effect.die("Unexpected mint attempt");
        yield* Deferred.succeed(attempt.started, undefined);
        const { status, body } = yield* Deferred.await(attempt.response);
        return HttpClientResponse.fromWeb(request, Response.json(body, { status }));
      }),
    );
    const encode = protocol
      .encode({
        input: {},
        inputAst: ListSpritesRequest.ast,
        config: { input: ListSpritesRequest },
      })
      .pipe(
        Effect.provideService(HttpClient.HttpClient, client),
        Effect.provideService(
          Credentials,
          Effect.sync(() => {
            credentialReads++;
            return {
              apiKey: Redacted.make(apiKey),
              apiBaseUrl: "https://fly.test",
            };
          }),
        ),
      );
    return {
      encode,
      discoveries,
      mints,
      credentialReads: () => credentialReads,
      started: (attempt = 0) => Deferred.await(attempts[attempt]!.started),
      respond: (body: unknown, status = 200, attempt = 0) =>
        Deferred.succeed(attempts[attempt]!.response, { status, body }),
    };
  }).pipe(Effect.provide(SpritesProtocol));

describe("Sprites token mint coordination", () => {
  test("shares concurrent minting and reuses the successful token without exposing it in request JSON", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const fixture = yield* mintFixture("mint-concurrent-fly-secret");
        const owner = yield* fixture.encode.pipe(Effect.forkChild({ startImmediately: true }));
        yield* fixture.started();
        const waiters = yield* Effect.forEach(Array.from({ length: 20 }), () =>
          fixture.encode.pipe(Effect.forkChild({ startImmediately: true })),
        );
        expect(fixture.credentialReads()).toBe(21);
        expect(fixture.discoveries).toHaveLength(1);
        expect(fixture.mints).toHaveLength(1);
        yield* fixture.respond({ token: "mint-concurrent-sprites-secret" });
        const requests = yield* Effect.forEach([owner, ...waiters], Fiber.join);
        requests.push(yield* fixture.encode);
        for (const request of requests) {
          expect(request.url).toBe("https://api.sprites.dev/v1/sprites");
          expect(request.headers.authorization).toBe("Bearer mint-concurrent-sprites-secret");
          expect(JSON.stringify(request)).not.toContain("mint-concurrent-sprites-secret");
        }
        expect(fixture.mints[0]!.headers.authorization).toBe("FlyV1 mint-concurrent-fly-secret");
        for (const request of [...fixture.discoveries, ...fixture.mints]) {
          expect(JSON.stringify(request)).not.toContain("mint-concurrent-fly-secret");
        }
        expect(fixture.credentialReads()).toBe(22);
        expect(fixture.discoveries).toHaveLength(1);
        expect(fixture.mints).toHaveLength(1);
      }).pipe(Effect.timeout("2 seconds")),
    ));

  test("shares a failed mint and allows a subsequent successful retry", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const fixture = yield* mintFixture("mint-retry-fly-secret");
        const owner = yield* fixture.encode.pipe(Effect.forkChild({ startImmediately: true }));
        yield* fixture.started();
        const waiter = yield* fixture.encode.pipe(Effect.forkChild({ startImmediately: true }));
        expect(fixture.credentialReads()).toBe(2);
        expect(fixture.mints).toHaveLength(1);
        yield* fixture.respond({ message: "synthetic mint failure" }, 500);
        const exits = yield* Fiber.awaitAll([owner, waiter]);
        for (const exit of exits) {
          expect(Exit.isFailure(exit)).toBe(true);
          if (Exit.isFailure(exit)) {
            expect(Cause.pretty(exit.cause)).toContain("synthetic mint failure");
            expect(Cause.pretty(exit.cause)).not.toContain("mint-retry-fly-secret");
          }
        }
        expect(exits[0]).toEqual(exits[1]);
        const retry = yield* fixture.encode.pipe(Effect.forkChild({ startImmediately: true }));
        yield* fixture.started(1);
        yield* fixture.respond({ token: "mint-retry-sprites-secret" }, 200, 1);
        expect((yield* Fiber.join(retry)).headers.authorization).toBe(
          "Bearer mint-retry-sprites-secret",
        );
        expect((yield* fixture.encode).headers.authorization).toBe(
          "Bearer mint-retry-sprites-secret",
        );
        expect(fixture.discoveries).toHaveLength(2);
        expect(fixture.mints).toHaveLength(2);
      }).pipe(Effect.timeout("2 seconds")),
    ));

  test("isolates pending and successful tokens for separate credentials", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const first = yield* mintFixture("mint-isolation-first");
        const second = yield* mintFixture("mint-isolation-second");
        const firstFiber = yield* first.encode.pipe(Effect.forkChild({ startImmediately: true }));
        const secondFiber = yield* second.encode.pipe(Effect.forkChild({ startImmediately: true }));
        yield* first.started();
        yield* second.started();
        expect(first.mints[0]!.headers.authorization).toBe("FlyV1 mint-isolation-first");
        expect(second.mints[0]!.headers.authorization).toBe("FlyV1 mint-isolation-second");
        yield* second.respond({ token: "sprites-isolation-second" });
        expect((yield* Fiber.join(secondFiber)).headers.authorization).toBe(
          "Bearer sprites-isolation-second",
        );
        yield* first.respond({ token: "sprites-isolation-first" });
        expect((yield* Fiber.join(firstFiber)).headers.authorization).toBe(
          "Bearer sprites-isolation-first",
        );
        expect((yield* first.encode).headers.authorization).toBe("Bearer sprites-isolation-first");
        expect((yield* second.encode).headers.authorization).toBe(
          "Bearer sprites-isolation-second",
        );
        expect(first.mints).toHaveLength(1);
        expect(second.mints).toHaveLength(1);
      }).pipe(Effect.timeout("2 seconds")),
    ));

  test("interrupting a waiter does not cancel or evict the active mint", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const fixture = yield* mintFixture("mint-interrupted-waiter");
        const owner = yield* fixture.encode.pipe(Effect.forkChild({ startImmediately: true }));
        yield* fixture.started();
        const waiter = yield* fixture.encode.pipe(Effect.forkChild({ startImmediately: true }));
        expect(fixture.credentialReads()).toBe(2);
        yield* Fiber.interrupt(waiter);
        expect(Exit.hasInterrupts(yield* Fiber.await(waiter))).toBe(true);
        const replacementWaiter = yield* fixture.encode.pipe(
          Effect.forkChild({ startImmediately: true }),
        );
        expect(fixture.credentialReads()).toBe(3);
        expect(fixture.mints).toHaveLength(1);
        yield* fixture.respond({ token: "sprites-after-waiter-interruption" });
        for (const fiber of [owner, replacementWaiter]) {
          expect((yield* Fiber.join(fiber)).headers.authorization).toBe(
            "Bearer sprites-after-waiter-interruption",
          );
        }
        expect(fixture.discoveries).toHaveLength(1);
      }).pipe(Effect.timeout("2 seconds")),
    ));

  test("owner interruption releases all waiters and allows another mint", () =>
    Effect.runPromise(
      Effect.gen(function* () {
        const fixture = yield* mintFixture("mint-interrupted-owner");
        const owner = yield* fixture.encode.pipe(Effect.forkChild({ startImmediately: true }));
        yield* fixture.started();
        const waiters = yield* Effect.forEach([0, 1, 2], () =>
          fixture.encode.pipe(Effect.forkChild({ startImmediately: true })),
        );
        expect(fixture.credentialReads()).toBe(4);
        expect(fixture.mints).toHaveLength(1);
        yield* Fiber.interrupt(owner);
        for (const exit of yield* Fiber.awaitAll([owner, ...waiters])) {
          expect(Exit.hasInterrupts(exit)).toBe(true);
        }
        const retry = yield* fixture.encode.pipe(Effect.forkChild({ startImmediately: true }));
        yield* fixture.started(1);
        yield* fixture.respond({ token: "sprites-after-interruption" }, 200, 1);
        expect((yield* Fiber.join(retry)).headers.authorization).toBe(
          "Bearer sprites-after-interruption",
        );
        expect((yield* fixture.encode).headers.authorization).toBe(
          "Bearer sprites-after-interruption",
        );
        expect(fixture.discoveries).toHaveLength(2);
        expect(fixture.mints).toHaveLength(2);
      }).pipe(Effect.timeout("2 seconds")),
    ));
});
