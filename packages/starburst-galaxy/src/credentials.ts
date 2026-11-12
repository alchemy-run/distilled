import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Starburst Galaxy credentials -- hand-written.
 *
 * Galaxy's public API is served from each account's own host
 * (`https://<account>.galaxy.starburst.io`) and authenticates with OAuth 2.0
 * client credentials: a service account's client ID and secret are
 * exchanged at `POST https://<account-domain>/oauth/v2/token` (HTTP Basic
 * auth, `grant_type=client_credentials`) for an access token sent as
 * `Authorization: Bearer <token>`. Access tokens last 10 minutes
 * (https://docs.starburst.io/starburst-galaxy/developer-tools/api/api-auth-token.html).
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials; the protocol layer resolves it per request on the calling
 * fiber. The client-credentials layers exchange through the provided
 * `HttpClient` on first use, reuse the token, and exchange again shortly
 * before it expires, so long-running programs keep working past the token
 * lifetime. Each layer owns its cache, and concurrent resolutions of a cold
 * or stale cache share one exchange.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Equal from "effect/Equal";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as SynchronizedRef from "effect/SynchronizedRef";

/** The token endpoint, relative to the account's origin. */
const TOKEN_PATH = "/oauth/v2/token";

/** Reuse a token until this long before its reported expiry. */
const TOKEN_REFRESH_WINDOW_MS = 60_000;

/** What every request is built from. */
export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  /** `https://<account-domain>`, no trailing slash. */
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "StarburstGalaxyCredentials",
  ) {}

/** A Galaxy service account's OAuth client credentials. */
export interface ClientCredentials {
  /** The account domain (`yourco.galaxy.starburst.io`) or its `https://` origin. */
  readonly domain: string;
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
}

const LOOPBACK = new Set(["127.0.0.1", "localhost", "[::1]"]);

/**
 * `yourco.galaxy.starburst.io` or `https://yourco.galaxy.starburst.io/` →
 * `https://yourco.galaxy.starburst.io`. The client secret and every token
 * travel to this origin, so it must be HTTPS with no path, query or user
 * info; plain HTTP is accepted on the loopback interface only, for local
 * test servers.
 */
const apiBaseUrlFor = (domain: string): Effect.Effect<string, ConfigError> => {
  const invalid = (reason: string) =>
    Effect.fail(new ConfigError({ message: `Starburst Galaxy domain ${reason}` }));
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(domain) ? domain : `https://${domain}`;
  if (!URL.canParse(candidate)) return invalid("is not a host name or URL");
  const url = new URL(candidate);
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    return invalid("must be a host such as yourco.galaxy.starburst.io, without a path");
  }
  if (url.protocol !== "https:" && !(url.protocol === "http:" && LOOPBACK.has(url.hostname))) {
    return invalid("must use HTTPS");
  }
  return Effect.succeed(url.origin);
};

/** A successful token response; `access_token` is redacted as it is decoded. */
const TokenResponse = Schema.Struct({
  access_token: Schema.Redacted(Schema.String),
  expires_in: Schema.Number,
});

/**
 * How long a token is reused: until 60 seconds before `expires_in`, but at
 * least half its lifetime, so a short-lived token is not exchanged on every
 * call.
 */
const reuseFor = (expiresInSeconds: number): number => {
  const lifetimeMs = expiresInSeconds * 1000;
  return Math.max(lifetimeMs - TOKEN_REFRESH_WINDOW_MS, lifetimeMs / 2);
};

/**
 * Builds the OAuth client-credentials token cache. The returned effect posts
 * the exchange through the captured `HttpClient` and reuses the token for
 * {@link reuseFor} its `expires_in`. `Effect.cachedWithTTL` shares one
 * in-flight exchange between concurrent resolutions of a cold or stale cache
 * and holds no lock across the request; a failed exchange is not cached.
 * Exchange errors carry the status, never the secret or a token.
 */
export const makeClientCredentials = (
  config: ClientCredentials,
): Effect.Effect<Effect.Effect<Config, ConfigError>, never, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const exchange = Effect.gen(function* () {
      const apiBaseUrl = yield* apiBaseUrlFor(config.domain);
      const url = `${apiBaseUrl}${TOKEN_PATH}`;
      const token = yield* client
        .execute(
          HttpClientRequest.post(url).pipe(
            HttpClientRequest.acceptJson,
            HttpClientRequest.basicAuth(config.clientId, config.clientSecret),
            HttpClientRequest.bodyUrlParams({ grant_type: "client_credentials" }),
          ),
        )
        .pipe(
          Effect.flatMap(HttpClientResponse.filterStatusOk),
          Effect.flatMap(HttpClientResponse.schemaBodyJson(TokenResponse)),
          Effect.mapError(
            (cause) =>
              new ConfigError({
                message: `Starburst Galaxy token request to ${url} failed: ${cause.message}`,
              }),
          ),
        );
      return {
        config: { accessToken: token.access_token, apiBaseUrl },
        expiresIn: token.expires_in,
      };
    });
    const cached = yield* Effect.cachedWithTTL(exchange, (exit) =>
      Exit.isSuccess(exit) ? reuseFor(exit.value.expiresIn) : 0,
    );
    return Effect.map(cached, (token) => token.config);
  });

/**
 * Layer from a service account's client credentials. The access token is
 * requested through the provided `HttpClient` on first use and refreshed
 * shortly before it expires.
 */
export const fromClientCredentials = (
  config: ClientCredentials,
): Layer.Layer<Credentials, never, HttpClient.HttpClient> =>
  Layer.effect(Credentials, makeClientCredentials(config));

/** Layer from an access token already held (no refresh). */
export const fromAccessToken = (config: {
  readonly domain: string;
  readonly accessToken: Redacted.Redacted<string>;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.map(apiBaseUrlFor(config.domain), (apiBaseUrl) => ({
      accessToken: config.accessToken,
      apiBaseUrl,
    })),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  domain: /*@__PURE__*/ EffectConfig.String("STARBURST_GALAXY_DOMAIN"),
  clientId: /*@__PURE__*/ EffectConfig.String("STARBURST_GALAXY_CLIENT_ID"),
  clientSecret: /*@__PURE__*/ EffectConfig.Redacted("STARBURST_GALAXY_CLIENT_SECRET"),
}).pipe(
  /*@__PURE__*/ Effect.mapError(
    () =>
      new ConfigError({
        message:
          "STARBURST_GALAXY_DOMAIN, STARBURST_GALAXY_CLIENT_ID and STARBURST_GALAXY_CLIENT_SECRET environment variables are required",
      }),
  ),
);

interface EnvClient {
  readonly config: ClientCredentials;
  readonly resolve: Effect.Effect<Config, ConfigError>;
}

/**
 * Reads STARBURST_GALAXY_DOMAIN, STARBURST_GALAXY_CLIENT_ID and
 * STARBURST_GALAXY_CLIENT_SECRET through `@distilled.cloud/core/config` on
 * every resolution, so a provided `ConfigProvider` supplies them, and
 * exchanges them for a cached access token on first use. The token cache
 * belongs to the built layer and is rebuilt when any of the three variables
 * changes, so a token is never sent to another account's domain.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, never, HttpClient.HttpClient> =
  /*@__PURE__*/ Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      const current = yield* SynchronizedRef.make(Option.none<EnvClient>());
      const resolveFor = (config: ClientCredentials) =>
        SynchronizedRef.modifyEffect(current, (env) =>
          Option.isSome(env) && Equal.equals(env.value.config, config)
            ? Effect.succeed([env.value.resolve, env] as const)
            : makeClientCredentials(config).pipe(
                Effect.provideService(HttpClient.HttpClient, client),
                Effect.map((resolve) => [resolve, Option.some({ config, resolve })] as const),
              ),
        ).pipe(Effect.flatten);
      return Effect.flatMap(envConfig, resolveFor);
    }),
  );
