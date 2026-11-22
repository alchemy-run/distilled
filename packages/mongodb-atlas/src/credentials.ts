import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * MongoDB Atlas credentials -- hand-written.
 *
 * Port of the distilled v0 Atlas credentials module: an OAuth2
 * client_credentials service-account flow. `MONGODB_ATLAS_CLIENT_ID` +
 * `MONGODB_ATLAS_CLIENT_SECRET` are exchanged for a bearer access token via
 * a Basic-auth POST to `{base}/api/oauth/token` (grant_type =
 * client_credentials).
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials; the protocol layer resolves it per request on the calling
 * fiber. Unlike v0 (which fetched once and ignored `expires_in`), the token
 * is cached and transparently re-fetched shortly before expiry, so
 * long-running programs keep working past the ~1h token lifetime.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Semaphore from "effect/Semaphore";

export const DEFAULT_API_BASE_URL = "https://cloud.mongodb.com";

/** Refresh this long before the token's reported expiry. */
const TOKEN_REFRESH_WINDOW_MS = 60_000;
/** Assumed lifetime when the token response omits `expires_in`. */
const DEFAULT_TOKEN_TTL_SECONDS = 3600;

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "Mongodb-atlasCredentials",
  ) {}

/** What resolving the credentials can fail with: declared on {@link Credentials}. */
export type CredentialsError = Effect.Error<(typeof Credentials)["Service"]>;

export interface ClientCredentialsConfig {
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}

/** Client credentials with the secret redacted and the base URL resolved. */
interface ResolvedClientCredentials {
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

const TokenResponse = /*@__PURE__*/ Schema.Struct({
  access_token: Schema.String,
  expires_in: /*@__PURE__*/ Schema.optional(Schema.Number),
});

const exchangeFailed = (reason: string) =>
  new ConfigError({ message: `OAuth2 token exchange failed: ${reason}` });

/**
 * Exchange service-account credentials for an OAuth2 access token, through
 * the caller's `HttpClient` (so it is traced, interruptible and testable).
 */
const exchangeToken = (
  client: HttpClient.HttpClient,
  config: ResolvedClientCredentials,
): Effect.Effect<
  { accessToken: Redacted.Redacted<string>; expiresInSeconds: number },
  ConfigError
> =>
  Effect.gen(function* () {
    const response = yield* client
      .execute(
        HttpClientRequest.post(`${config.apiBaseUrl}/api/oauth/token`).pipe(
          HttpClientRequest.basicAuth(config.clientId, config.clientSecret),
          HttpClientRequest.bodyUrlParams({ grant_type: "client_credentials" }),
        ),
      )
      .pipe(Effect.mapError((error) => exchangeFailed(error.message)));

    if (response.status < 200 || response.status >= 300) {
      const body = yield* response.text.pipe(
        Effect.mapError((error) =>
          exchangeFailed(`${response.status}, and its body could not be read: ${error.message}`),
        ),
      );
      return yield* exchangeFailed(`${response.status} ${body}`);
    }

    const token = yield* HttpClientResponse.schemaBodyJson(TokenResponse)(response).pipe(
      Effect.mapError((error) => exchangeFailed(`unexpected token response: ${error.message}`)),
    );
    return {
      accessToken: Redacted.make(token.access_token),
      expiresInSeconds:
        token.expires_in !== undefined && token.expires_in > 0
          ? token.expires_in
          : DEFAULT_TOKEN_TTL_SECONDS,
    };
  });

/**
 * A per-layer cached resolver: exchanges once, reuses the token until
 * shortly before expiry, then re-exchanges. The cache belongs to the layer
 * value, so it outlives each build of the layer; each build only supplies
 * the `HttpClient` to exchange with.
 */
const cachedTokenEffect = (
  load: Effect.Effect<ResolvedClientCredentials, ConfigError>,
): ((client: HttpClient.HttpClient) => Effect.Effect<Config, ConfigError>) => {
  // Concurrent calls on a cold or stale cache share one exchange.
  const lock = Semaphore.makeUnsafe(1);
  let cached: Config | undefined;
  let refreshAt = 0;
  const fresh = () => cached !== undefined && Date.now() < refreshAt;

  return (client) =>
    Effect.suspend(() =>
      fresh()
        ? Effect.succeed(cached!)
        : Semaphore.withPermit(
            lock,
            Effect.suspend(() =>
              fresh()
                ? Effect.succeed(cached!)
                : Effect.gen(function* () {
                    const config = yield* load;
                    const token = yield* exchangeToken(client, config);
                    const next: Config = {
                      accessToken: token.accessToken,
                      apiBaseUrl: config.apiBaseUrl,
                    };
                    cached = next;
                    refreshAt =
                      Date.now() +
                      Math.max(
                        token.expiresInSeconds * 1000 - TOKEN_REFRESH_WINDOW_MS,
                        TOKEN_REFRESH_WINDOW_MS,
                      );
                    return next;
                  }),
            ),
          ),
    );
};

/**
 * A layer whose token cache exchanges `load`'s credentials through the
 * `HttpClient` it is built with.
 */
const cachedTokenLayer = (
  load: Effect.Effect<ResolvedClientCredentials, ConfigError>,
): Layer.Layer<Credentials, never, HttpClient.HttpClient> => {
  const resolveWith = cachedTokenEffect(load);
  return Layer.effect(Credentials, Effect.map(HttpClient.HttpClient, resolveWith));
};

/**
 * Layer from service-account client credentials (OAuth2 client_credentials).
 * Needs an `HttpClient` for the token exchange.
 */
export const fromClientCredentials = (
  config: ClientCredentialsConfig,
): Layer.Layer<Credentials, never, HttpClient.HttpClient> =>
  cachedTokenLayer(
    Effect.succeed({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/** Layer from an already-obtained bearer access token. */
export const fromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: config.accessToken,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Reads MONGODB_ATLAS_CLIENT_ID + MONGODB_ATLAS_CLIENT_SECRET (required) and
 * MONGODB_ATLAS_API_BASE_URL (optional), exchanging them for a cached OAuth2
 * access token on first use.
 */
export const fromEnv = (): Layer.Layer<Credentials, never, HttpClient.HttpClient> =>
  cachedTokenLayer(
    Effect.suspend(() => {
      const clientId = process.env.MONGODB_ATLAS_CLIENT_ID;
      const clientSecret = process.env.MONGODB_ATLAS_CLIENT_SECRET;
      if (!clientId || !clientSecret) {
        return Effect.fail(
          new ConfigError({
            message:
              "MONGODB_ATLAS_CLIENT_ID and MONGODB_ATLAS_CLIENT_SECRET environment variables are required",
          }),
        );
      }
      return Effect.succeed({
        clientId,
        clientSecret: Redacted.make(clientSecret),
        apiBaseUrl: process.env.MONGODB_ATLAS_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      });
    }),
  );

export const CredentialsFromEnv: Layer.Layer<Credentials, never, HttpClient.HttpClient> =
  /*@__PURE__*/ fromEnv();
