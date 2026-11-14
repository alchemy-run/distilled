import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as TestClock from "effect/testing/TestClock";
import { describe, expect, test } from "vitest";
import { type Expiring, refreshing, refreshingByKey } from "../src/token-cache.ts";

const MINUTE = 60_000;

/** A token named `value` that expires `lifetimeMs` from now (effect `Clock`). */
const expiring = (value: string, lifetimeMs: number): Effect.Effect<Expiring<string>> =>
  Effect.map(Clock.currentTimeMillis, (now) => ({ value, expiresAt: now + lifetimeMs }));

const withTestClock = <A, E>(effect: Effect.Effect<A, E>) =>
  Effect.runPromise(effect.pipe(Effect.provide(TestClock.layer())));

describe("refreshing", () => {
  test("reuses a token until 5 minutes before it expires, then mints again", async () => {
    let mints = 0;
    const token = refreshing(Effect.suspend(() => expiring(`t${++mints}`, 60 * MINUTE)));
    const values = await withTestClock(
      Effect.gen(function* () {
        const first = yield* token;
        // 6 minutes left: still fresh.
        yield* TestClock.adjust(54 * MINUTE);
        const fresh = yield* token;
        // 4 minutes left: inside the window.
        yield* TestClock.adjust(2 * MINUTE);
        const refreshed = yield* token;
        const again = yield* token;
        return [first, fresh, refreshed, again];
      }),
    );
    expect(values).toEqual(["t1", "t1", "t2", "t2"]);
    expect(mints).toBe(2);
  });

  test("refreshWindowMs sets the window", async () => {
    let mints = 0;
    const token = refreshing(
      Effect.suspend(() => expiring(`t${++mints}`, 10 * MINUTE)),
      {
        refreshWindowMs: 0,
      },
    );
    const values = await withTestClock(
      Effect.gen(function* () {
        const first = yield* token;
        yield* TestClock.adjust(10 * MINUTE - 1);
        const last = yield* token;
        yield* TestClock.adjust(1);
        const expired = yield* token;
        return [first, last, expired];
      }),
    );
    expect(values).toEqual(["t1", "t1", "t2"]);
  });

  test("concurrent callers share one mint", async () => {
    let mints = 0;
    const token = refreshing(
      Effect.sync(() => ++mints).pipe(
        Effect.andThen(Effect.sleep("20 millis")),
        Effect.andThen(expiring("shared", 60 * MINUTE)),
      ),
    );
    const values = await Effect.runPromise(
      Effect.all([token, token, token], { concurrency: "unbounded" }),
    );
    expect(values).toEqual(["shared", "shared", "shared"]);
    expect(mints).toBe(1);
  });

  test("an interrupted caller does not strand the others", async () => {
    let mints = 0;
    const token = refreshing(
      Effect.sync(() => ++mints).pipe(
        Effect.andThen(Effect.sleep("30 millis")),
        Effect.andThen(expiring("shared", 60 * MINUTE)),
      ),
    );
    const value = await Effect.runPromise(
      Effect.gen(function* () {
        const owner = yield* Effect.forkChild(token);
        yield* Effect.sleep("5 millis");
        const waiter = yield* Effect.forkChild(token);
        yield* Fiber.interrupt(owner);
        return yield* Fiber.join(waiter);
      }),
    );
    expect(value).toBe("shared");
    // The owner's mint is interrupted with it; the waiter mints its own.
    expect(mints).toBe(2);
  });

  test("a failed refresh keeps a token that has not expired; a failure with no token is retried next call", async () => {
    let n = 0;
    const token = refreshing(
      Effect.suspend(() => {
        n++;
        // One minute left: inside the window, so every call refreshes.
        if (n === 1) return expiring("old", MINUTE);
        if (n === 2) return Effect.fail("down" as const);
        return expiring("new", 60 * MINUTE);
      }),
    );
    const values = await Effect.runPromise(Effect.all([token, token, token]));
    expect(values).toEqual(["old", "old", "new"]);

    let m = 0;
    const failing = refreshing(
      Effect.suspend(() =>
        ++m === 1 ? Effect.fail("down" as const) : expiring("ok", 60 * MINUTE),
      ),
    );
    expect(await Effect.runPromise(Effect.flip(failing))).toBe("down");
    expect(await Effect.runPromise(failing)).toBe("ok");
  });

  test("a failed refresh of an expired token fails", async () => {
    let n = 0;
    const token = refreshing(
      Effect.suspend(() =>
        ++n === 1 ? expiring("old", 10 * MINUTE) : Effect.fail("down" as const),
      ),
    );
    const result = await withTestClock(
      Effect.gen(function* () {
        const first = yield* token;
        yield* TestClock.adjust(10 * MINUTE);
        const error = yield* Effect.flip(token);
        return { first, error };
      }),
    );
    expect(result).toEqual({ first: "old", error: "down" });
  });
});

describe("refreshingByKey", () => {
  test("caches one token per key, and concurrent callers of a key share one mint", async () => {
    const minted: string[] = [];
    const token = refreshingByKey((key) =>
      Effect.sync(() => minted.push(key)).pipe(
        Effect.andThen(Effect.sleep("20 millis")),
        Effect.andThen(expiring(`for-${key}`, 60 * MINUTE)),
      ),
    );
    const values = await Effect.runPromise(
      Effect.all([token("a"), token("a"), token("a"), token("b"), token("b")], {
        concurrency: "unbounded",
      }),
    );
    expect(values).toEqual(["for-a", "for-a", "for-a", "for-b", "for-b"]);
    expect([...minted].sort()).toEqual(["a", "b"]);
    // Later calls reuse the cached tokens.
    expect(await Effect.runPromise(Effect.all([token("a"), token("b")]))).toEqual([
      "for-a",
      "for-b",
    ]);
    expect(minted).toHaveLength(2);
  });

  test("refreshes each key on its own expiry", async () => {
    const minted: string[] = [];
    const lifetimes: Record<string, number> = { short: 10 * MINUTE, long: 60 * MINUTE };
    const token = refreshingByKey((key) =>
      Effect.suspend(() => {
        minted.push(key);
        return expiring(`${key}${minted.length}`, lifetimes[key]!);
      }),
    );
    const values = await withTestClock(
      Effect.gen(function* () {
        const before = [yield* token("short"), yield* token("long")];
        // `short` has 4 minutes left, `long` 54.
        yield* TestClock.adjust(6 * MINUTE);
        const after = [yield* token("short"), yield* token("long")];
        return { before, after };
      }),
    );
    expect(values).toEqual({ before: ["short1", "long2"], after: ["short3", "long2"] });
    expect(minted).toEqual(["short", "long", "short"]);
  });
});
