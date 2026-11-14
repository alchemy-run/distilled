/**
 * Short-lived tokens, minted on first use and minted again shortly before
 * they expire.
 *
 * A credential provider that trades a long-lived secret for an access token
 * (an OAuth2 client-credentials grant, a managed identity, a workload
 * identity exchange) wraps its mint in {@link refreshing}, or in
 * {@link refreshingByKey} when one identity mints a different token per
 * audience. The cache lives in the closure, so create it once, when the
 * provider's layer is created, not inside a `Layer.sync` / `Layer.effect`
 * that rebuilds it.
 */
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as Semaphore from "effect/Semaphore";

/** A token and when it stops working, in epoch milliseconds. */
export interface Expiring<A> {
  readonly value: A;
  readonly expiresAt: number;
}

export interface RefreshOptions {
  /**
   * Mint again when the token has less than this left.
   * @default 300_000 (five minutes)
   */
  readonly refreshWindowMs?: number;
}

/** Five minutes, the window Azure's, AWS's and Google's own SDKs use. */
export const DEFAULT_REFRESH_WINDOW_MS = 5 * 60 * 1000;

/**
 * The token `mint` produces, reused until `refreshWindowMs` before it
 * expires. Concurrent callers that find no fresh token share one mint. When
 * a refresh fails while the cached token has not expired yet, the cached
 * token is returned and the next call tries again.
 */
export const refreshing = <A, E, R>(
  mint: Effect.Effect<Expiring<A>, E, R>,
  options: RefreshOptions = {},
): Effect.Effect<A, E, R> => {
  const window = options.refreshWindowMs ?? DEFAULT_REFRESH_WINDOW_MS;
  const lock = Semaphore.makeUnsafe(1);
  let cached: Expiring<A> | undefined;

  const cachedIf = (ok: (token: Expiring<A>, now: number) => boolean) =>
    Effect.map(Clock.currentTimeMillis, (now) =>
      cached !== undefined && ok(cached, now) ? cached : undefined,
    );
  const fresh = cachedIf((token, now) => now < token.expiresAt - window);
  const unexpired = cachedIf((token, now) => now < token.expiresAt);

  const remint = Effect.flatMap(fresh, (token) =>
    token !== undefined
      ? Effect.succeed(token.value)
      : mint.pipe(
          Effect.map((minted) => {
            cached = minted;
            return minted.value;
          }),
          Effect.catch((error) =>
            Effect.flatMap(unexpired, (token) =>
              token !== undefined ? Effect.succeed(token.value) : Effect.fail(error),
            ),
          ),
        ),
  );

  return Effect.flatMap(fresh, (token) =>
    token !== undefined ? Effect.succeed(token.value) : Semaphore.withPermit(lock, remint),
  );
};

/**
 * {@link refreshing} per key: one cached token, and one shared mint, for
 * each key `mint` is called with (an OAuth2 scope, for example).
 */
export const refreshingByKey = <A, E, R>(
  mint: (key: string) => Effect.Effect<Expiring<A>, E, R>,
  options: RefreshOptions = {},
): ((key: string) => Effect.Effect<A, E, R>) => {
  const byKey = new Map<string, Effect.Effect<A, E, R>>();
  return (key) => {
    let token = byKey.get(key);
    if (token === undefined) {
      token = refreshing(
        Effect.suspend(() => mint(key)),
        options,
      );
      byKey.set(key, token);
    }
    return token;
  };
};
