/**
 * The defect boundary (core/api). Whatever is thrown while an operation
 * runs fails the call with `SdkError`: lint keeps `throw` out of Effect
 * code, but a plain helper can throw, and so can any line (`JSON.parse`, a
 * property read on a `null` the spec says is an object).
 */
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Fiber from "effect/Fiber";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import * as API from "../src/api.ts";
import { ServiceUnavailable } from "../src/errors.ts";
import type { Protocol } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import * as S from "../src/schema.ts";
import * as T from "../src/trait.ts";

class TestRetry extends Retry.makeRetryService("DefectBoundaryTest/Retry") {}

const client = Layer.succeed(
  HttpClient.HttpClient,
  HttpClient.make((request) =>
    Effect.succeed(HttpClientResponse.fromWeb(request, new Response("{}", { status: 200 }))),
  ),
);

/** A protocol that works: each case replaces one method with one that throws. */
const working: Protocol<ServiceUnavailable> = {
  encode: () => Effect.succeed(HttpClientRequest.get("https://api.test/things")),
  decode: () => Effect.succeed({ items: [] }),
};

const thrown = new TypeError("Cannot read properties of null (reading 'id')");
const boom = (): never => {
  throw thrown;
};

const config = (protocol: Protocol<ServiceUnavailable>) => () => ({
  input: S.Struct({}).pipe(T.Http({ method: "GET", uri: "/things" })),
  output: S.Struct({ items: S.Array(S.Unknown) }),
  operationName: "ListThings",
  protocol,
  retry: TestRetry,
});

type Run = () => Effect.Effect<unknown, unknown, HttpClient.HttpClient>;

const call = (protocol: Protocol<ServiceUnavailable>): Run => {
  const listThings = API.make(config(protocol));
  return () => listThings({});
};

const stream = (protocol: Protocol<ServiceUnavailable>): Run => {
  const listThings = API.makeStreaming(config(protocol));
  return () => Stream.runCollect(listThings.stream({}));
};

const encodeRequest = (protocol: Protocol<ServiceUnavailable>): Run => {
  const listThings = API.make(config(protocol));
  return () => API.encodeRequest(listThings, {});
};

/** A paginated operation whose strategy throws: when it is called, or after its first page. */
const paged = (method: "pages" | "items", when: "called" | "after a page"): Run => {
  const listThings = API.makePaginated(
    () => ({ ...config(working)(), pagination: { items: "items" } }),
    (operation, input) =>
      when === "called" ? boom() : Stream.map(Stream.fromEffect(operation(input)), boom),
  );
  return () => Stream.runCollect(listThings[method]({}));
};

const cases: ReadonlyArray<readonly [string, Run]> = [
  ["encode throws", call({ ...working, encode: boom })],
  ["encode throws in its Effect", call({ ...working, encode: () => Effect.sync(boom) })],
  ["decode throws", call({ ...working, decode: boom })],
  ["decode throws in its Effect", call({ ...working, decode: () => Effect.sync(boom) })],
  ["call throws", call({ ...working, call: boom })],
  ["call throws in its Effect", call({ ...working, call: () => Effect.sync(boom) })],
  ["stream throws", stream({ ...working, stream: boom })],
  [
    "stream throws on a message",
    stream({ ...working, stream: () => Stream.map(Stream.make(1), boom) }),
  ],
  ["encodeRequest: encode throws", encodeRequest({ ...working, encode: boom })],
  ["pages: the strategy throws", paged("pages", "called")],
  ["pages: the strategy throws after a page", paged("pages", "after a page")],
  ["items: the strategy throws after a page", paged("items", "after a page")],
];

const expectSdkError = (exit: Exit.Exit<unknown, unknown>) => {
  if (!Exit.isFailure(exit)) throw new Error("expected a failure");
  expect(Cause.hasDies(exit.cause)).toBe(false);
  expect(Cause.squash(exit.cause)).toMatchObject({
    _tag: "SdkError",
    message: "ListThings threw: TypeError: Cannot read properties of null (reading 'id')",
    cause: thrown,
  });
};

describe("the defect boundary", () => {
  test.each(cases)("%s: the failure is an SdkError", async (_name, run) => {
    // The first call of an operation and its later calls take different paths.
    expectSdkError(await Effect.runPromiseExit(Effect.provide(run(), client)));
    expectSdkError(await Effect.runPromiseExit(Effect.provide(run(), client)));
  });

  test("a retried try that throws: the failure is an SdkError", async () => {
    let tries = 0;
    const listThings = call({
      ...working,
      decode: () =>
        tries++ === 0 ? Effect.fail(new ServiceUnavailable({ message: "503" })) : boom(),
    });
    const exit = await Effect.runPromiseExit(
      listThings().pipe(
        Effect.provide(client),
        Effect.provideService(TestRetry, { while: (error) => error instanceof ServiceUnavailable }),
      ),
    );
    expectSdkError(exit);
    expect(tries).toBe(2);
  });

  test("an interrupted call is still an interrupt", async () => {
    const hangs = call({ ...working, decode: () => Effect.never });
    const exit = await Effect.runPromise(
      Effect.gen(function* () {
        const fiber = yield* Effect.forkChild(hangs());
        yield* Effect.yieldNow;
        yield* Fiber.interrupt(fiber);
        return yield* Fiber.await(fiber);
      }).pipe(Effect.provide(client)),
    );
    expect(Exit.isFailure(exit) && Cause.hasInterruptsOnly(exit.cause)).toBe(true);
  });
});
