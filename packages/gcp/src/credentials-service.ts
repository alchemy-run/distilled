/**
 * The `Credentials` service every GCP operation authenticates with. It holds
 * an effect that resolves an OAuth2 bearer access token on every request,
 * so a provider can refresh or rotate the token. Each provider under
 * `credential-providers/` builds its layer from this module.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Redacted from "effect/Redacted";
import * as Semaphore from "effect/Semaphore";
import type { GCPCredentialsError } from "./errors.ts";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly project?: string;
  /**
   * Default region that comes with the credentials (e.g. a profile's
   * region). `Region` overrides it; see `./region.ts`.
   */
  readonly region?: string;
  /**
   * Project billed for quota, sent as `X-Goog-User-Project`. User
   * credentials from `gcloud auth application-default login` need one for
   * many APIs.
   */
  readonly quotaProject?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config, GCPCredentialsError>
>()("GCPCredentials") {}

/** An access token a provider minted, and what it learned on the way. */
export interface Token {
  readonly accessToken: Redacted.Redacted<string>;
  /** Epoch milliseconds. */
  readonly expiresAt: number;
  readonly project?: string;
  readonly quotaProject?: string;
}

/** Mints a {@link Token}; a refreshing provider runs it when the cache is stale. */
export type TokenSource = Effect.Effect<Token, GCPCredentialsError, HttpClient.HttpClient>;

/** Values the caller sets explicitly; each wins over what the source learned. */
export interface ProviderOverrides {
  readonly project?: string;
  readonly region?: string;
  readonly quotaProject?: string;
}

/** Refresh this long before the access token expires. */
export const REFRESH_WINDOW_MS = 5 * 60 * 1000;

/**
 * Run `effect` with the fiber's `HttpClient` when one is in scope (an
 * operation always has one), else with `fetch`, so a credentials layer has
 * no requirements.
 */
export const withHttpClient = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
): Effect.Effect<A, E> =>
  Effect.serviceOption(HttpClient.HttpClient).pipe(
    Effect.flatMap((client) =>
      Option.isSome(client)
        ? Effect.provideService(effect, HttpClient.HttpClient, client.value)
        : Effect.provide(effect, FetchHttpClient.layer),
    ),
  );

/**
 * A `Credentials` layer over a {@link TokenSource}. The layer itself does no
 * I/O: the first request mints a token, later requests reuse it until five
 * minutes before it expires, and concurrent requests share one mint. A
 * failure surfaces on the operation as `GCPCredentialsError`.
 */
export const createRefreshingProvider = (
  source: TokenSource,
  overrides: ProviderOverrides = {},
): Layer.Layer<Credentials> => {
  const lock = Semaphore.makeUnsafe(1);
  let cached: Token | undefined;
  const fresh = () => cached !== undefined && Date.now() < cached.expiresAt - REFRESH_WINDOW_MS;

  const resolve = Effect.suspend(() =>
    fresh()
      ? Effect.succeed(cached!)
      : Semaphore.withPermit(
          lock,
          Effect.suspend(() =>
            fresh()
              ? Effect.succeed(cached!)
              : withHttpClient(source).pipe(
                  Effect.tap((token) =>
                    Effect.sync(() => {
                      cached = token;
                    }),
                  ),
                ),
          ),
        ),
  ).pipe(
    Effect.map((token): Config => ({
      accessToken: token.accessToken,
      project: overrides.project ?? token.project,
      region: overrides.region,
      quotaProject: overrides.quotaProject ?? token.quotaProject,
    })),
  );

  return Layer.succeed(Credentials, resolve);
};
