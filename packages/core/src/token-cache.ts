/**
 * A token or credentials cache shared by every call on one layer value.
 *
 * The first call mints, later calls reuse the value until it goes stale, and
 * calls that find a cold or stale cache while another call mints wait for
 * that mint instead of starting their own: only one mint runs at a time
 * (request coalescing). A waiting call never waits on the minting call
 * itself: it sleeps on its own timer and checks again. In workerd one
 * request's events never wake another request, and a request that waits on
 * nothing of its own is cancelled as hung, so a lock, `Deferred`,
 * `SynchronizedRef` or `Effect.cachedWithTTL` shared between requests fails
 * there.
 *
 * Every mint has a time limit. A mint that runs past it is interrupted and
 * fails with the caller's timeout error, and so does every call waiting on
 * it. A mint that fails is not cached: the next call mints again.
 *
 * A mint whose owner disappears without finishing (workerd drops the
 * request) can never run again. Once its time limit and
 * {@link TAKEOVER_MARGIN_MS} have passed, the next waiting call mints in its
 * place, and the old mint may no longer write the cache.
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";

/** How often a call waiting on another call's mint checks again. */
export const POLL_MS = 20;

/**
 * Default time limit of one mint. A token endpoint answers in well under a
 * second; this is a ceiling for a hung endpoint, not a latency target. A
 * provider whose own retries can take longer passes its own limit.
 */
export const DEFAULT_MINT_TIMEOUT_MS = 60_000;

/**
 * How long after a mint's time limit a waiting call takes its place. The
 * owner's timeout normally ends the mint first; the margin covers a timer
 * that fires late.
 */
export const TAKEOVER_MARGIN_MS = 1_000;

export interface RefreshingOptions<E> {
  /** Time limit of one mint, in milliseconds. @default DEFAULT_MINT_TIMEOUT_MS */
  readonly timeoutMs?: number;
  /** The error a mint fails with when it runs past `timeoutMs`. */
  readonly onTimeout: (timeoutMs: number) => E;
}

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
  options: RefreshingOptions<E>,
): Effect.Effect<A, E, R> => {
  const timeoutMs = options.timeoutMs ?? DEFAULT_MINT_TIMEOUT_MS;
  const limited = Effect.timeoutOrElse(mint, {
    duration: Duration.millis(timeoutMs),
    orElse: () => Effect.fail(options.onTimeout(timeoutMs)),
  });

  let cached: { readonly value: A; readonly refreshAt: number } | undefined;
  let keepsNoCopy = false;
  /** The mint in progress; `exit` is set when it succeeds or fails. */
  let minting: { readonly since: number; exit?: Exit.Exit<A, E> } | undefined;

  const fresh = () => cached !== undefined && Date.now() < cached.refreshAt;
  const takenOver = (mine: NonNullable<typeof minting>) =>
    Date.now() - mine.since >= timeoutMs + TAKEOVER_MARGIN_MS;

  const store = (value: A) => {
    const at = refreshAt(value);
    keepsNoCopy = at === undefined;
    cached = at === undefined ? undefined : { value, refreshAt: at };
    return value;
  };

  const mintAndStore = Effect.suspend(() => {
    const mine: NonNullable<typeof minting> = { since: Date.now() };
    minting = mine;
    return limited.pipe(
      // A mint another call has taken over no longer writes the cache.
      Effect.map((value) => (minting === mine ? store(value) : value)),
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
      if (fresh()) return Effect.succeed(cached!.value);
      if (mine.exit !== undefined) return mine.exit;
      if (minting !== mine || takenOver(mine)) return get;
      return Effect.andThen(Effect.sleep(POLL_MS), waitFor(mine));
    });

  const get: Effect.Effect<A, E, R> = Effect.suspend(() => {
    if (fresh()) return Effect.succeed(cached!.value);
    if (keepsNoCopy) return Effect.map(limited, store);
    if (minting !== undefined && !takenOver(minting)) return waitFor(minting);
    return mintAndStore;
  });
  return get;
};
