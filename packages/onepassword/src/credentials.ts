import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * 1Password credentials -- hand-written. One credentials service per API,
 * because each authenticates differently:
 *
 *   Connect      `ConnectCredentials`     Connect token, self-hosted server
 *   Events       `EventsCredentials`      Events Reporting bearer token
 *   Users        `UsersCredentials`       OAuth 2.0 access token (client credentials grant)
 *   OAuth        `OAuthCredentials`       OAuth application client ID + secret (Basic)
 *   Partnership  `PartnershipCredentials` partner bearer token
 *
 * Each service holds an *effect* that resolves the current credentials; the
 * protocol layer resolves it per request on the calling fiber.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";

// ---------------------------------------------------------------------------
// Connect -- access token for a self-hosted Connect server
// ---------------------------------------------------------------------------

/** Base URL of a Connect server running locally on its default port. */
export const DEFAULT_CONNECT_API_BASE_URL = "http://localhost:8080/v1";

export interface ConnectConfig {
  readonly token: Redacted.Redacted<string>;
  /** The Connect server's API root, including `/v1`. */
  readonly apiBaseUrl: string;
}

export class ConnectCredentials
  extends /*@__PURE__*/ Context.Service<
    ConnectCredentials,
    Effect.Effect<ConnectConfig, ConfigError>
  >()("OnepasswordConnectCredentials") {}

/** What resolving the credentials can fail with: declared on {@link ConnectCredentials}. */
export type ConnectCredentialsError = Effect.Error<(typeof ConnectCredentials)["Service"]>;

/** `OP_CONNECT_HOST` is the server root without `/v1`; append it when missing. */
const connectHostToBaseUrl = (host: string): string => {
  const trimmed = host.replace(/\/+$/, "");
  return /\/v1$/i.test(trimmed) ? trimmed : `${trimmed}/v1`;
};

/** Layer from a Connect token + optional API root (including `/v1`). */
export const connectCredentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<ConnectCredentials> =>
  Layer.succeed(
    ConnectCredentials,
    Effect.succeed({
      token: config.token,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_CONNECT_API_BASE_URL,
    }),
  );

/**
 * Reads OP_CONNECT_TOKEN (required) and OP_CONNECT_API_BASE_URL or
 * OP_CONNECT_HOST (optional). `OP_CONNECT_HOST` is the official Connect
 * variable (no `/v1` suffix); `/v1` is appended when missing.
 */
export const ConnectCredentialsFromEnv: Layer.Layer<ConnectCredentials> =
  /*@__PURE__*/ Layer.succeed(
    ConnectCredentials,
    /*@__PURE__*/ EffectConfig.all({
      token: /*@__PURE__*/ EffectConfig.Redacted("OP_CONNECT_TOKEN"),
      // OP_CONNECT_API_BASE_URL is used as-is; OP_CONNECT_HOST gains `/v1`.
      apiBaseUrl: /*@__PURE__*/ EffectConfig.String("OP_CONNECT_API_BASE_URL").pipe(
        /*@__PURE__*/ EffectConfig.orElse(() =>
          EffectConfig.String("OP_CONNECT_HOST").pipe(EffectConfig.map(connectHostToBaseUrl)),
        ),
        /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_CONNECT_API_BASE_URL),
      ),
    }).pipe(
      /*@__PURE__*/ Effect.mapError(
        () => new ConfigError({ message: "OP_CONNECT_TOKEN environment variable is required" }),
      ),
    ),
  );

// ---------------------------------------------------------------------------
// Events API -- bearer token from an Events Reporting integration
// ---------------------------------------------------------------------------

/** Events API host for 1Password.com accounts (US). */
export const DEFAULT_EVENTS_API_BASE_URL = "https://events.1password.com";

export interface EventsConfig {
  readonly token: Redacted.Redacted<string>;
  /**
   * The account's Events API host: `https://events.1password.com`,
   * `https://events.1password.ca`, `https://events.1password.eu` or
   * `https://events.ent.1password.com`.
   */
  readonly apiBaseUrl: string;
}

export class EventsCredentials
  extends /*@__PURE__*/ Context.Service<
    EventsCredentials,
    Effect.Effect<EventsConfig, ConfigError>
  >()("OnepasswordEventsCredentials") {}

/** What resolving the credentials can fail with: declared on {@link EventsCredentials}. */
export type EventsCredentialsError = Effect.Error<(typeof EventsCredentials)["Service"]>;

/** Layer from an Events Reporting bearer token + optional regional host. */
export const eventsCredentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<EventsCredentials> =>
  Layer.succeed(
    EventsCredentials,
    Effect.succeed({
      token: config.token,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_EVENTS_API_BASE_URL,
    }),
  );

/** Reads OP_EVENTS_API_TOKEN (required) and OP_EVENTS_API_BASE_URL (optional). */
export const EventsCredentialsFromEnv: Layer.Layer<EventsCredentials> = /*@__PURE__*/ Layer.succeed(
  EventsCredentials,
  /*@__PURE__*/ EffectConfig.all({
    token: /*@__PURE__*/ EffectConfig.Redacted("OP_EVENTS_API_TOKEN"),
    apiBaseUrl: /*@__PURE__*/ EffectConfig.String("OP_EVENTS_API_BASE_URL").pipe(
      /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_EVENTS_API_BASE_URL),
    ),
  }).pipe(
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "OP_EVENTS_API_TOKEN environment variable is required" }),
    ),
  ),
);

// ---------------------------------------------------------------------------
// OAuth API -- the Users API's OAuth application client credentials
// ---------------------------------------------------------------------------

/** Users and OAuth API host for 1Password.com accounts (US). */
export const DEFAULT_USERS_API_BASE_URL = "https://api.1password.com";

export interface OAuthConfig {
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
  /**
   * The account's API host: `https://api.1password.com`,
   * `https://api.1password.ca`, `https://api.1password.eu` or
   * `https://api.ent.1password.com`.
   */
  readonly apiBaseUrl: string;
}

/**
 * Client credentials of a 1Password OAuth application, sent as HTTP Basic
 * auth to the OAuth API (`requestAccessToken`, `introspectAccessToken`,
 * `revokeAccessToken`).
 */
export class OAuthCredentials
  extends /*@__PURE__*/ Context.Service<
    OAuthCredentials,
    Effect.Effect<OAuthConfig, ConfigError>
  >()("OnepasswordOAuthCredentials") {}

/** What resolving the credentials can fail with: declared on {@link OAuthCredentials}. */
export type OAuthCredentialsError = Effect.Error<(typeof OAuthCredentials)["Service"]>;

/** Layer from OAuth application client credentials + optional regional host. */
export const oauthCredentials = (config: {
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<OAuthCredentials> =>
  Layer.succeed(
    OAuthCredentials,
    Effect.succeed({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_USERS_API_BASE_URL,
    }),
  );

const usersEnvConfig = /*@__PURE__*/ EffectConfig.all({
  clientId: /*@__PURE__*/ EffectConfig.String("OP_USERS_API_CLIENT_ID"),
  clientSecret: /*@__PURE__*/ EffectConfig.Redacted("OP_USERS_API_CLIENT_SECRET"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("OP_USERS_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_USERS_API_BASE_URL),
  ),
}).pipe(
  /*@__PURE__*/ Effect.mapError(
    () =>
      new ConfigError({
        message:
          "OP_USERS_API_CLIENT_ID and OP_USERS_API_CLIENT_SECRET environment variables are required",
      }),
  ),
);

/**
 * Reads OP_USERS_API_CLIENT_ID + OP_USERS_API_CLIENT_SECRET (required) and
 * OP_USERS_API_BASE_URL (optional).
 */
export const OAuthCredentialsFromEnv: Layer.Layer<OAuthCredentials> = /*@__PURE__*/ Layer.succeed(
  OAuthCredentials,
  /*@__PURE__*/ usersEnvConfig,
);

// ---------------------------------------------------------------------------
// Users API -- OAuth 2.0 access token (client credentials grant)
// ---------------------------------------------------------------------------

/** Refresh this long before the token's reported expiry. */
const TOKEN_REFRESH_WINDOW_MS = 60_000;
/** Users API access tokens last 15 minutes; assumed when `expires_in` is absent. */
const DEFAULT_TOKEN_TTL_SECONDS = 900;

export interface UsersConfig {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class UsersCredentials
  extends /*@__PURE__*/ Context.Service<
    UsersCredentials,
    Effect.Effect<UsersConfig, ConfigError>
  >()("OnepasswordUsersCredentials") {}

/** What resolving the credentials can fail with: declared on {@link UsersCredentials}. */
export type UsersCredentialsError = Effect.Error<(typeof UsersCredentials)["Service"]>;

const TokenResponse = /*@__PURE__*/ Schema.Struct({
  access_token: Schema.String,
  expires_in: /*@__PURE__*/ Schema.optional(Schema.Number),
});

/** The OAuth error body (RFC 6749 section 5.2). */
const decodeOAuthError = /*@__PURE__*/ Schema.decodeUnknownOption(
  /*@__PURE__*/ Schema.fromJsonString(
    /*@__PURE__*/ Schema.Struct({
      error: /*@__PURE__*/ Schema.optional(Schema.String),
      error_description: /*@__PURE__*/ Schema.optional(Schema.String),
    }),
  ),
);

const tokenRequestFailed = (reason: string) =>
  new ConfigError({ message: `1Password OAuth token request failed${reason}` });

/**
 * Exchange OAuth application client credentials for an access token at
 * `POST {apiBaseUrl}/v1/oauth/token` (client credentials grant, HTTP Basic
 * auth), through the caller's `HttpClient`. Errors carry the status and
 * OAuth error code, never the secret.
 */
export const exchangeAccessToken = (
  config: OAuthConfig,
): Effect.Effect<
  { readonly accessToken: Redacted.Redacted<string>; readonly expiresInSeconds: number },
  ConfigError,
  HttpClient.HttpClient
> =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const response = yield* client
      .execute(
        HttpClientRequest.post(`${config.apiBaseUrl.replace(/\/+$/, "")}/v1/oauth/token`).pipe(
          HttpClientRequest.acceptJson,
          HttpClientRequest.basicAuth(config.clientId, config.clientSecret),
          HttpClientRequest.bodyUrlParams({ grant_type: "client_credentials" }),
        ),
      )
      .pipe(Effect.mapError((error) => tokenRequestFailed(`: ${error.message}`)));

    if (response.status < 200 || response.status >= 300) {
      const body = yield* response.text.pipe(
        Effect.mapError((error) =>
          tokenRequestFailed(
            ` with ${response.status}, and its body could not be read: ${error.message}`,
          ),
        ),
      );
      const oauth = Option.getOrUndefined(decodeOAuthError(body));
      const code = oauth?.error !== undefined ? ` ${oauth.error}` : "";
      const description =
        oauth?.error_description !== undefined ? `: ${oauth.error_description}` : "";
      return yield* tokenRequestFailed(` with ${response.status}${code}${description}`);
    }

    const token = yield* HttpClientResponse.schemaBodyJson(TokenResponse)(response).pipe(
      Effect.mapError((error) =>
        tokenRequestFailed(`: unexpected token response: ${error.message}`),
      ),
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
 * A per-layer token cache: exchanges on first use, reuses the token until
 * shortly before expiry, then exchanges again. The cache belongs to the
 * layer value, so it outlives each build of the layer; each build only
 * supplies the `HttpClient` to exchange with.
 */
const cachedAccessToken = (
  load: Effect.Effect<OAuthConfig, ConfigError>,
  exchange: (config: OAuthConfig) => ReturnType<typeof exchangeAccessToken>,
): ((client: HttpClient.HttpClient) => Effect.Effect<UsersConfig, ConfigError>) => {
  let cached: UsersConfig | undefined;
  let refreshAt = 0;

  return (client) =>
    Effect.suspend(() => {
      if (cached !== undefined && Date.now() < refreshAt) {
        return Effect.succeed(cached);
      }
      return Effect.gen(function* () {
        const config = yield* load;
        const token = yield* exchange(config).pipe(
          Effect.provideService(HttpClient.HttpClient, client),
        );
        cached = { accessToken: token.accessToken, apiBaseUrl: config.apiBaseUrl };
        refreshAt =
          Date.now() +
          Math.max(
            token.expiresInSeconds * 1000 - TOKEN_REFRESH_WINDOW_MS,
            TOKEN_REFRESH_WINDOW_MS,
          );
        return cached;
      });
    });
};

/** A layer whose token cache exchanges through the `HttpClient` it is built with. */
const cachedAccessTokenLayer = (
  load: Effect.Effect<OAuthConfig, ConfigError>,
  exchange: (config: OAuthConfig) => ReturnType<typeof exchangeAccessToken>,
): Layer.Layer<UsersCredentials, never, HttpClient.HttpClient> => {
  const resolveWith = cachedAccessToken(load, exchange);
  return Layer.effect(UsersCredentials, Effect.map(HttpClient.HttpClient, resolveWith));
};

/**
 * Layer from OAuth application client credentials. The access token is
 * requested on first use, through the layer's `HttpClient`, and refreshed
 * shortly before it expires.
 */
export const usersCredentials = (
  config: {
    readonly clientId: string;
    readonly clientSecret: Redacted.Redacted<string>;
    readonly apiBaseUrl?: string;
  },
  /** Token exchange; override in tests. */
  exchange: (config: OAuthConfig) => ReturnType<typeof exchangeAccessToken> = exchangeAccessToken,
): Layer.Layer<UsersCredentials, never, HttpClient.HttpClient> =>
  cachedAccessTokenLayer(
    Effect.succeed({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_USERS_API_BASE_URL,
    }),
    exchange,
  );

/** Layer from an access token you already hold (no refresh). */
export const usersCredentialsFromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<UsersCredentials> =>
  Layer.succeed(
    UsersCredentials,
    Effect.succeed({
      accessToken: config.accessToken,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_USERS_API_BASE_URL,
    }),
  );

/**
 * Reads OP_USERS_API_CLIENT_ID + OP_USERS_API_CLIENT_SECRET (required) and
 * OP_USERS_API_BASE_URL (optional), and exchanges them for a cached access
 * token on first use.
 */
export const UsersCredentialsFromEnv: Layer.Layer<UsersCredentials, never, HttpClient.HttpClient> =
  /*@__PURE__*/ cachedAccessTokenLayer(usersEnvConfig, exchangeAccessToken);

// ---------------------------------------------------------------------------
// Partnership API -- bearer token issued by the 1Password partnerships team
// ---------------------------------------------------------------------------

/** Partnership API production host (`https://billing.b5test.eu` is the test host). */
export const DEFAULT_PARTNERSHIP_API_BASE_URL = "https://billing.1password.com";

export interface PartnershipConfig {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class PartnershipCredentials
  extends /*@__PURE__*/ Context.Service<
    PartnershipCredentials,
    Effect.Effect<PartnershipConfig, ConfigError>
  >()("OnepasswordPartnershipCredentials") {}

/** What resolving the credentials can fail with: declared on {@link PartnershipCredentials}. */
export type PartnershipCredentialsError = Effect.Error<(typeof PartnershipCredentials)["Service"]>;

/** Layer from a partner bearer token + optional host. */
export const partnershipCredentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<PartnershipCredentials> =>
  Layer.succeed(
    PartnershipCredentials,
    Effect.succeed({
      token: config.token,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_PARTNERSHIP_API_BASE_URL,
    }),
  );

/** Reads OP_PARTNERSHIP_API_TOKEN (required) and OP_PARTNERSHIP_API_BASE_URL (optional). */
export const PartnershipCredentialsFromEnv: Layer.Layer<PartnershipCredentials> =
  /*@__PURE__*/ Layer.succeed(
    PartnershipCredentials,
    /*@__PURE__*/ EffectConfig.all({
      token: /*@__PURE__*/ EffectConfig.Redacted("OP_PARTNERSHIP_API_TOKEN"),
      apiBaseUrl: /*@__PURE__*/ EffectConfig.String("OP_PARTNERSHIP_API_BASE_URL").pipe(
        /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_PARTNERSHIP_API_BASE_URL),
      ),
    }).pipe(
      /*@__PURE__*/ Effect.mapError(
        () =>
          new ConfigError({ message: "OP_PARTNERSHIP_API_TOKEN environment variable is required" }),
      ),
    ),
  );
