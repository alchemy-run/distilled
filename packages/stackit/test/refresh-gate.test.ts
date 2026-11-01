import * as Effect from "effect/Effect";
import { describe, expect, test } from "vitest";
import { makeRefreshGate } from "../src/refresh-gate.ts";

describe("makeRefreshGate", () => {
  test("runs one caller at a time, each on its own fiber", async () => {
    const withClaim = makeRefreshGate();
    let running = 0;
    let most = 0;
    const work = withClaim(
      Effect.gen(function* () {
        running++;
        most = Math.max(most, running);
        yield* Effect.sleep("20 millis");
        running--;
      }),
    );
    await Effect.runPromise(Effect.all([work, work, work], { concurrency: "unbounded" }));
    expect(most).toBe(1);
  });

  test("a failed holder releases the claim", async () => {
    const withClaim = makeRefreshGate();
    const failed = await Effect.runPromise(
      withClaim(Effect.fail("nope" as const)).pipe(Effect.flip),
    );
    expect(failed).toBe("nope");
    await expect(Effect.runPromise(withClaim(Effect.succeed("ok")))).resolves.toBe("ok");
  });

  test("a holder that never finishes loses the claim after the budget", async () => {
    const withClaim = makeRefreshGate({ claimBudgetMs: 50 });
    const taken = await Effect.runPromise(
      Effect.gen(function* () {
        // A request that ended: its refresh never settles, and nothing releases it.
        yield* Effect.forkChild(withClaim(Effect.never));
        yield* Effect.sleep("5 millis");
        return yield* withClaim(Effect.succeed("taken over"));
      }),
    );
    expect(taken).toBe("taken over");
  });
});
