import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import { refreshing } from "@distilled.cloud/core/token-cache";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import { TokenRequestFailed } from "./errors.ts";

export const DEFAULT_API_BASE_URL = "https://api.tailscale.com/api/v2";

const TOKEN_REFRESH_WINDOW_MS = 60_000;

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

/**
 * Resolves the current credentials on every request. `CredentialsFromEnv`
 * reads and checks the environment when it is built, so the effect fails
 * only when the OAuth token exchange it makes at run time fails, with
 * {@link TokenRequestFailed}.
 */
export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config, TokenRequestFailed>
>()("TailscaleCredentials") {}

export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  /**
   * The API root, including `/api/v2`, used as given. Default
   * `DEFAULT_API_BASE_URL`. Unlike `TAILSCALE_BASE_URL`, it is not an origin.
   */
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

export interface ClientCredentialsConfig {
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
  readonly scope?: string;
  /**
   * The API root, including `/api/v2`, used as given. Default
   * `DEFAULT_API_BASE_URL`. Unlike `TAILSCALE_BASE_URL`, it is not an origin.
   */
  readonly apiBaseUrl?: string;
  /** Sent as the exchange's `tailnet` parameter to scope the token to an API-only tailnet. */
  readonly tokenTailnet?: string;
}

const TokenResponse = Schema.Struct({
  access_token: Schema.Redacted(Schema.String),
  expires_in: Schema.Number,
});

const exchangeFailed = (reason: string, status: number | undefined) =>
  new TokenRequestFailed({ message: `OAuth token exchange failed: ${reason}`, status });

interface CachedToken {
  readonly config: Config;
  readonly refreshAt: number;
}

/**
 * Builds the OAuth client-credentials token cache. The returned effect posts
 * the exchange through the captured `HttpClient`, reuses the token until
 * 60 seconds before `expires_in`, and concurrent resolutions of a cold or
 * stale token share one exchange (core `refreshing`). A failed exchange
 * fails the returned effect with {@link TokenRequestFailed}.
 */
export const makeClientCredentials = (
  config: ClientCredentialsConfig,
): Effect.Effect<Effect.Effect<Config, TokenRequestFailed>, never, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const apiBaseUrl = config.apiBaseUrl ?? DEFAULT_API_BASE_URL;
    const exchange = client
      .execute(
        HttpClientRequest.post(`${apiBaseUrl}/oauth/token`).pipe(
          HttpClientRequest.bodyUrlParams({
            grant_type: "client_credentials",
            client_id: config.clientId,
            client_secret: Redacted.value(config.clientSecret),
            ...(config.scope ? { scope: config.scope } : {}),
            ...(config.tokenTailnet ? { tailnet: config.tokenTailnet } : {}),
          }),
        ),
      )
      .pipe(
        Effect.flatMap(HttpClientResponse.filterStatusOk),
        Effect.mapError((cause) => exchangeFailed(cause.message, cause.response?.status)),
        Effect.flatMap((response) =>
          HttpClientResponse.schemaBodyJson(TokenResponse)(response).pipe(
            Effect.mapError((cause) => exchangeFailed(cause.message, response.status)),
          ),
        ),
      );
    const mint = Effect.map(exchange, (token): CachedToken => ({
      config: {
        token: token.access_token,
        apiBaseUrl,
      },
      refreshAt: Date.now() + token.expires_in * 1000 - TOKEN_REFRESH_WINDOW_MS,
    }));
    return refreshing(mint, (cached) => cached.refreshAt, {
      onTimeout: (timeoutMs) =>
        new TokenRequestFailed({
          message: `Tailscale OAuth token exchange timed out after ${timeoutMs / 1000} s`,
        }),
    }).pipe(Effect.map((cached) => cached.config));
  });

export const fromClientCredentials = (
  config: ClientCredentialsConfig,
): Layer.Layer<Credentials, never, HttpClient.HttpClient> =>
  Layer.effect(Credentials, makeClientCredentials(config));

/** `TAILSCALE_BASE_URL` is the origin. An explicit API root ending in `/api/v2` is kept. */
const apiBaseUrlFromOrigin = (origin: string): string => {
  const trimmed = origin.replace(/\/+$/, "");
  return trimmed.endsWith("/api/v2") ? trimmed : `${trimmed}/api/v2`;
};

const BOTH_METHODS =
  "TAILSCALE_API_KEY and TAILSCALE_OAUTH_CLIENT_ID/TAILSCALE_OAUTH_CLIENT_SECRET cannot both be set";

/** An empty variable counts as unset. */
const nonEmpty = (value: Option.Option<Redacted.Redacted<string>>) =>
  Option.filter(value, (v) => Redacted.value(v).length > 0);

const EnvConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: EffectConfig.option(EffectConfig.Redacted("TAILSCALE_API_KEY")).pipe(
    EffectConfig.map(nonEmpty),
  ),
  clientId: EffectConfig.option(EffectConfig.String("TAILSCALE_OAUTH_CLIENT_ID")),
  clientSecret: EffectConfig.option(EffectConfig.Redacted("TAILSCALE_OAUTH_CLIENT_SECRET")).pipe(
    EffectConfig.map(nonEmpty),
  ),
  origin: EffectConfig.option(EffectConfig.String("TAILSCALE_BASE_URL")),
});

/**
 * Reads `TAILSCALE_API_KEY`, `TAILSCALE_OAUTH_CLIENT_ID`,
 * `TAILSCALE_OAUTH_CLIENT_SECRET` and `TAILSCALE_BASE_URL`
 * through `@distilled.cloud/core/config`, so a provided `ConfigProvider`
 * supplies them. They are read, and checked, once: when the layer is built.
 * Two methods at once, half an OAuth pair or no method fails the layer with
 * `ConfigError`. The OAuth token cache belongs to the layer.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError, HttpClient.HttpClient> =
  /*@__PURE__*/ Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const env = yield* EnvConfig.pipe(
        Effect.mapError(
          (cause) =>
            new ConfigError({
              message: `Failed to read Tailscale configuration: ${cause.message}`,
            }),
        ),
      );
      const apiKey = Option.getOrUndefined(env.apiKey);
      const clientId = Option.getOrUndefined(env.clientId);
      const clientSecret = Option.getOrUndefined(env.clientSecret);
      const apiBaseUrl = Option.match(env.origin, {
        onNone: () => DEFAULT_API_BASE_URL,
        onSome: apiBaseUrlFromOrigin,
      });
      if (apiKey && (clientId || clientSecret)) {
        return yield* new ConfigError({ message: BOTH_METHODS });
      }
      if (apiKey) {
        return Effect.succeed({
          token: apiKey,
          apiBaseUrl,
        });
      }
      if (clientId && clientSecret) {
        return yield* makeClientCredentials({
          clientId,
          clientSecret,
          apiBaseUrl,
        });
      }
      if (clientId || clientSecret) {
        return yield* new ConfigError({
          message: "TAILSCALE_OAUTH_CLIENT_ID and TAILSCALE_OAUTH_CLIENT_SECRET are both required",
        });
      }
      return yield* new ConfigError({
        message:
          "TAILSCALE_API_KEY or TAILSCALE_OAUTH_CLIENT_ID and TAILSCALE_OAUTH_CLIENT_SECRET is required",
      });
    }),
  );
