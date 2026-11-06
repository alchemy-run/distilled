import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Clock from "effect/Clock";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Equal from "effect/Equal";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as SynchronizedRef from "effect/SynchronizedRef";

export const DEFAULT_API_BASE_URL = "https://api.tailscale.com/api/v2";
export const DEFAULT_TAILNET = "-";

const TOKEN_REFRESH_WINDOW_MS = 60_000;

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly tailnet: string;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
  "TailscaleCredentials",
) {}

export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  /**
   * The API root, including `/api/v2`, used as given. Default
   * `DEFAULT_API_BASE_URL`. Unlike `TAILSCALE_BASE_URL`, it is not an origin.
   */
  readonly apiBaseUrl?: string;
  readonly tailnet?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      tailnet: config.tailnet ?? DEFAULT_TAILNET,
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
  readonly tailnet?: string;
  /** Sent as the exchange's `tailnet` parameter to scope the token to an API-only tailnet. */
  readonly tokenTailnet?: string;
}

const TokenResponse = Schema.Struct({
  access_token: Schema.Redacted(Schema.String),
  expires_in: Schema.Number,
});

interface CachedToken {
  readonly config: Config;
  readonly refreshAt: number;
}

/**
 * Builds the OAuth client-credentials token cache. The returned effect posts
 * the exchange through the captured `HttpClient`, reuses the token until
 * 60 seconds before `expires_in`, and serializes refreshes so concurrent
 * resolutions of a stale token make one exchange.
 */
export const makeClientCredentials = (
  config: ClientCredentialsConfig,
): Effect.Effect<Effect.Effect<Config, ConfigError>, never, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const apiBaseUrl = config.apiBaseUrl ?? DEFAULT_API_BASE_URL;
    const tailnet = config.tailnet ?? DEFAULT_TAILNET;
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
        Effect.flatMap(HttpClientResponse.schemaBodyJson(TokenResponse)),
        Effect.mapError(
          (cause) =>
            new ConfigError({
              message: `OAuth token exchange failed: ${cause.message}`,
            }),
        ),
      );
    const cache = yield* SynchronizedRef.make(Option.none<CachedToken>());
    return SynchronizedRef.modifyEffect(cache, (cached) =>
      Effect.gen(function* () {
        const now = yield* Clock.currentTimeMillis;
        if (Option.isSome(cached) && now < cached.value.refreshAt) {
          return [cached.value.config, cached] as const;
        }
        const token = yield* exchange;
        const next: CachedToken = {
          config: {
            token: token.access_token,
            apiBaseUrl,
            tailnet,
          },
          refreshAt: now + token.expires_in * 1000 - TOKEN_REFRESH_WINDOW_MS,
        };
        return [next.config, Option.some(next)] as const;
      }),
    );
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

const EnvConfig = EffectConfig.all({
  apiKey: EffectConfig.option(EffectConfig.Redacted("TAILSCALE_API_KEY")).pipe(
    EffectConfig.map(nonEmpty),
  ),
  clientId: EffectConfig.option(EffectConfig.String("TAILSCALE_OAUTH_CLIENT_ID")),
  clientSecret: EffectConfig.option(EffectConfig.Redacted("TAILSCALE_OAUTH_CLIENT_SECRET")).pipe(
    EffectConfig.map(nonEmpty),
  ),
  tailnet: EffectConfig.String("TAILSCALE_TAILNET").pipe(EffectConfig.withDefault(DEFAULT_TAILNET)),
  origin: EffectConfig.option(EffectConfig.String("TAILSCALE_BASE_URL")),
});

interface EnvOAuthConfig {
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly tailnet: string;
}

interface EnvOAuth {
  readonly config: EnvOAuthConfig;
  readonly resolve: Effect.Effect<Config, ConfigError>;
}

/**
 * Reads `TAILSCALE_API_KEY`, `TAILSCALE_OAUTH_CLIENT_ID`,
 * `TAILSCALE_OAUTH_CLIENT_SECRET`, `TAILSCALE_TAILNET` and `TAILSCALE_BASE_URL`
 * through `@distilled.cloud/core/config` on every resolution, so a provided
 * `ConfigProvider` supplies them. The OAuth token cache belongs to the layer
 * and is rebuilt when the OAuth variables change.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, never, HttpClient.HttpClient> =
  Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      const oauth = yield* SynchronizedRef.make(Option.none<EnvOAuth>());
      const resolveOAuth = (config: EnvOAuthConfig) =>
        SynchronizedRef.modifyEffect(oauth, (current) =>
          Option.isSome(current) && Equal.equals(current.value.config, config)
            ? Effect.succeed([current.value.resolve, current] as const)
            : makeClientCredentials(config).pipe(
                Effect.provideService(HttpClient.HttpClient, client),
                Effect.map((resolve) => [resolve, Option.some({ config, resolve })] as const),
              ),
        ).pipe(Effect.flatten);
      return Effect.gen(function* () {
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
          return {
            token: apiKey,
            apiBaseUrl,
            tailnet: env.tailnet,
          };
        }
        if (clientId && clientSecret) {
          return yield* resolveOAuth({
            clientId,
            clientSecret,
            apiBaseUrl,
            tailnet: env.tailnet,
          });
        }
        if (clientId || clientSecret) {
          return yield* new ConfigError({
            message:
              "TAILSCALE_OAUTH_CLIENT_ID and TAILSCALE_OAUTH_CLIENT_SECRET are both required",
          });
        }
        return yield* new ConfigError({
          message:
            "TAILSCALE_API_KEY or TAILSCALE_OAUTH_CLIENT_ID and TAILSCALE_OAUTH_CLIENT_SECRET is required",
        });
      });
    }),
  );
