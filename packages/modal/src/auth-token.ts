/**
 * Modal auth tokens -- hand-written.
 *
 * Modal's V2 sandbox RPCs and its input plane (function calls) want a
 * short-lived JWT in `x-modal-auth-token` on top of the token pair. The
 * official clients fetch it with `AuthTokenGet` and reuse it until half its
 * lifetime has passed; {@link withAuthToken} does the same for any
 * `Credentials`.
 */
import { refreshing } from "@distilled.cloud/core/token-cache";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { authTokenError, Credentials, type Config } from "./credentials.ts";
import * as Retry from "./retry.ts";
import { getAuthToken } from "./services/auth.ts";

/** Which identity a cached token belongs to: the token id, or the container. */
const identityOf = (config: Config) =>
  config.container ? "container" : Redacted.value(config.tokenId);

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
 * token pair (or as the container, inside one), then refreshed when half
 * its lifetime has passed. Requests to a task command router (a bearer
 * token) and anonymous requests are left as they are.
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

      /** A token cache for one identity; `config` is that identity's latest. */
      const cacheFor = (config: Config) => {
        const identity = { id: identityOf(config), config };
        let last:
          | {
              readonly token: string;
              readonly refreshAt: number;
              readonly expiresAt: number;
            }
          | undefined;
        const fetch = Effect.gen(function* () {
          // No retries here: the call that needs the token retries itself, and
          // nesting this fetch's retries inside each of its attempts would
          // multiply the wait.
          const { token } = yield* getAuthToken({}).pipe(
            Retry.none,
            Effect.provideService(Credentials, Effect.succeed(identity.config)),
            Effect.provideService(HttpClient.HttpClient, http),
          );
          if (!token) return yield* Effect.fail(new Error("Modal returned an empty auth token"));
          const now = Date.now();
          const expiresAt = (expiryOf(token) ?? now / 1000 + FALLBACK_LIFETIME_SECONDS) * 1000;
          last = { token, refreshAt: now + (expiresAt - now) * REFRESH_FRACTION, expiresAt };
          return last;
        }).pipe(
          // As Modal's clients do: a failed refresh keeps a token that has not
          // expired, with a warning; with no such token the call fails with
          // the reason, before it reaches Modal without the header.
          Effect.catch((cause) =>
            last !== undefined && Date.now() < last.expiresAt
              ? Effect.as(Effect.logWarning("Could not refresh the Modal auth token", cause), last)
              : Effect.fail(authTokenError(cause)),
          ),
        );
        return { identity, cache: refreshing(fetch, (minted) => minted.refreshAt) };
      };
      // One cache, for the identity in use; another identity starts a new one.
      let current: ReturnType<typeof cacheFor> | undefined;

      return Effect.gen(function* () {
        const config = yield* base;
        if (
          config.bearerToken !== undefined ||
          (Redacted.value(config.tokenId) === "" && !config.container)
        ) {
          return config;
        }
        if (current === undefined || current.identity.id !== identityOf(config)) {
          current = cacheFor(config);
        } else {
          current.identity.config = config;
        }
        const { token } = yield* current.cache;
        return { ...config, authToken: Redacted.make(token) };
      });
    }),
  );
