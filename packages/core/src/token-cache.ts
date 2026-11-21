/**
 * A token or credentials cache shared by every call on one layer value.
 *
 * The first call mints, later calls reuse the value until it goes stale, and
 * calls that find a cold or stale cache while another call mints wait for
 * that mint instead of starting their own. A waiting call never waits on the
 * minting call itself: it sleeps on its own timer and checks the cache
 * again. In workerd one request's events never wake another request, and a
 * request that waits on nothing of its own is cancelled as hung, so a lock,
 * `Deferred`, `SynchronizedRef` or `Effect.cachedWithTTL` shared between
 * requests fails there.
 *
 * A mint that fails fails every call that waited on it, with the same
 * error, and is not cached: the next call mints again. A mint that is
 * interrupted, or runs longer than {@link LEASE_MS}, no longer holds the
 * waiting calls back: the next of them mints.
 */
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";

/** How often a call waiting on another call's mint checks the cache. */
export const POLL_MS = 20;

/** How long a mint may run before a waiting call starts its own. */
export const LEASE_MS = 10_000;

/**
 * Cache what `mint` produces. `refreshAt` gives the epoch milliseconds after
 * which a value is stale (`Infinity` for never); `undefined` keeps no copy,
 * so every call mints, with no waiting.
 *
 * Create the cache once per layer value, outside `Layer.effect`, so every
 * build of the layer shares it.
 */
export const refreshing = <A, E, R>(
  mint: Effect.Effect<A, E, R>,
  refreshAt: (value: A) => number | undefined,
): Effect.Effect<A, E, R> => {
  let cached: { readonly value: A; readonly refreshAt: number } | undefined;
  let keepsNoCopy = false;
  /** The mint in progress; `exit` is set when it succeeds or fails. */
  let minting: { readonly since: number; exit?: Exit.Exit<A, E> } | undefined;

  const fresh = () => cached !== undefined && Date.now() < cached.refreshAt;

  const store = (value: A) => {
    const at = refreshAt(value);
    keepsNoCopy = at === undefined;
    cached = at === undefined ? undefined : { value, refreshAt: at };
    return value;
  };

  const mintAndStore = Effect.suspend(() => {
    const mine: NonNullable<typeof minting> = { since: Date.now() };
    minting = mine;
    return Effect.map(mint, store).pipe(
      Effect.onExit((exit) =>
        Effect.sync(() => {
          if (minting === mine) minting = undefined;
          // An interrupted mint has no result to share: its waiters mint again.
          if (!Exit.hasInterrupts(exit)) mine.exit = exit;
        }),
      ),
    );
  });

  const waitFor = (mine: NonNullable<typeof minting>): Effect.Effect<A, E, R> =>
    Effect.suspend(() => {
      if (mine.exit !== undefined) return mine.exit;
      if (minting !== mine || Date.now() - mine.since >= LEASE_MS) return get;
      return Effect.andThen(Effect.sleep(POLL_MS), waitFor(mine));
    });

  const get: Effect.Effect<A, E, R> = Effect.suspend(() => {
    if (fresh()) return Effect.succeed(cached!.value);
    if (keepsNoCopy) return Effect.map(mint, store);
    if (minting !== undefined && Date.now() - minting.since < LEASE_MS) {
      return waitFor(minting);
    }
    return mintAndStore;
  });
  return get;
};
