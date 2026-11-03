/**
 * Modal auth tokens -- hand-written.
 *
 * Modal's V2 sandbox RPCs and its input plane (function calls) want a
 * short-lived JWT in `x-modal-auth-token` on top of the token pair. The
 * official clients fetch it with `AuthTokenGet` and reuse it until half its
 * lifetime has passed; {@link withAuthToken} does the same for any
 * `Credentials`.
 */
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Semaphore from "effect/Semaphore";
import { Credentials, type Config } from "./credentials.ts";
import { getAuthToken } from "./services/auth.ts";

/** Seconds of a token's lifetime used before it is refreshed. */
const REFRESH_FRACTION = 0.5;

/** Lifetime assumed for a token whose `exp` can't be read. */
const FALLBACK_LIFETIME_SECONDS = 5 * 60;

/** The `exp` claim of a JWT, in seconds, without verifying it. */
const expiryOf = (jwt: string): number | undefined => {
  try {
    const payload = jwt.split(".")[1];
    if (payload === undefined) return undefined;
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: unknown;
    };
    return typeof claims.exp === "number" ? claims.exp : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Add Modal's auth token to every request made with the `Credentials` (and
 * `HttpClient`) already in context. The token is fetched once with the
 * token pair, then refreshed when half its lifetime has passed. Requests to
 * a task command router (a bearer token) and anonymous requests are left as
 * they are.
 *
 * @example
 * ```ts
 * Layer.provideMerge(Modal.withAuthToken, Layer.mergeAll(Modal.credentials({ tokenId, tokenSecret }), FetchHttpClient.layer))
 * ```
 */
export const withAuthToken: Layer.Layer<Credentials, never, Credentials | HttpClient.HttpClient> =
  /*@__PURE__*/ Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const base = yield* Credentials;
      const http = yield* HttpClient.HttpClient;
      const lock = yield* Semaphore.make(1);
      let cached:
        | { readonly tokenId: string; readonly token: string; readonly refreshAt: number }
        | undefined;

      const fetch = Effect.fn(function* (config: Config) {
        const { token } = yield* getAuthToken({}).pipe(
          Effect.provideService(Credentials, Effect.succeed(config)),
          Effect.provideService(HttpClient.HttpClient, http),
        );
        if (!token) return undefined;
        const now = (yield* Clock.currentTimeMillis) / 1000;
        const lifetime = (expiryOf(token) ?? now + FALLBACK_LIFETIME_SECONDS) - now;
        cached = {
          tokenId: Redacted.value(config.tokenId),
          token,
          refreshAt: now + lifetime * REFRESH_FRACTION,
        };
        return token;
      });

      return Effect.gen(function* () {
        const config = yield* base;
        if (config.bearerToken !== undefined || Redacted.value(config.tokenId) === "") {
          return config;
        }
        const token = yield* lock.withPermits(1)(
          Effect.gen(function* () {
            const now = (yield* Clock.currentTimeMillis) / 1000;
            if (
              cached !== undefined &&
              cached.tokenId === Redacted.value(config.tokenId) &&
              now < cached.refreshAt
            ) {
              return cached.token;
            }
            // A failed fetch leaves the request without the header; the
            // calls that need it then fail with Modal's own auth error.
            return yield* fetch(config).pipe(Effect.catch(() => Effect.succeed(cached?.token)));
          }),
        );
        return token === undefined ? config : { ...config, authToken: Redacted.make(token) };
      });
    }),
  );
