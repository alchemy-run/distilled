/**
 * One refresh at a time for a credential cache -- hand-written.
 *
 * Token caches here live as long as a Worker's isolate and are shared by all its
 * requests, so a semaphore won't do: `effect/Semaphore` resumes a waiter on the
 * releasing fiber's dispatcher, which on workerd is another request's IoContext,
 * and I/O is pinned to the request that started it. So a caller that finds a
 * refresh in flight polls on its own timers instead, in its own request, until
 * that refresh is done.
 *
 * Nothing waits on the fiber holding the claim. If that fiber's request ends and
 * takes the refresh with it, its claim runs out after the budget and the next
 * caller takes over.
 */
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as Schedule from "effect/Schedule";

const POLL_INTERVAL_MS = 25;

/** Long enough for a healthy token request. A caller never waits longer than this. */
const CLAIM_BUDGET_MS = 10 * 1000;

/**
 * A gate for one cache. The effect passed to it runs once no other caller holds
 * the claim, so it should read the cache again before doing any I/O.
 */
export const makeRefreshGate = (options: { readonly claimBudgetMs?: number } = {}) => {
  const budget = options.claimBudgetMs ?? CLAIM_BUDGET_MS;
  let claimedAt: number | undefined;

  const claimHeld = Effect.map(
    Clock.currentTimeMillis,
    (now) => claimedAt !== undefined && now - claimedAt < budget,
  );

  const waitForClaim = claimHeld.pipe(
    Effect.repeat({
      schedule: Schedule.spaced(`${POLL_INTERVAL_MS} millis`),
      until: (held) => !held,
      times: Math.ceil(budget / POLL_INTERVAL_MS),
    }),
  );

  return <A, E, R>(refresh: Effect.Effect<A, E, R>): Effect.Effect<A, E, R> =>
    Effect.flatMap(waitForClaim, () =>
      Effect.flatMap(Clock.currentTimeMillis, (now) => {
        claimedAt = now;
        return Effect.ensuring(
          refresh,
          // Leave the claim of a caller that took over from this one alone.
          Effect.sync(() => {
            if (claimedAt === now) claimedAt = undefined;
          }),
        );
      }),
    );
};
