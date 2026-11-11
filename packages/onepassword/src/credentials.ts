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
import * as Base64 from "effect/encoding/Base64";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

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

/**
 * Exchange OAuth application client credentials for an access token at
 * `POST {apiBaseUrl}/v1/oauth/token` (client credentials grant, HTTP Basic
 * auth). Errors carry the status and OAuth error code, never the secret.
 */
export const exchangeAccessToken = (
  config: OAuthConfig,
): Effect.Effect<
  { readonly accessToken: Redacted.Redacted<string>; readonly expiresInSeconds: number },
  ConfigError
> =>
  Effect.gen(function* () {
    const basic = Base64.encode(`${config.clientId}:${Redacted.value(config.clientSecret)}`);
    const res = yield* Effect.tryPromise(() =>
      fetch(`${config.apiBaseUrl.replace(/\/+$/, "")}/v1/oauth/token`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basic}`,
        },
        body: "grant_type=client_credentials",
      }),
    ).pipe(
      Effect.mapError(
        (cause) =>
          new ConfigError({
            message: `1Password OAuth token request failed: ${String(cause)}`,
          }),
      ),
    );

    const data = (yield* Effect.tryPromise(() => res.json()).pipe(
      Effect.orElseSucceed(() => undefined),
    )) as
      | {
          access_token?: unknown;
          expires_in?: unknown;
          error?: unknown;
          error_description?: unknown;
        }
      | undefined;

    if (!res.ok) {
      const code = typeof data?.error === "string" ? ` ${data.error}` : "";
      const description =
        typeof data?.error_description === "string" ? `: ${data.error_description}` : "";
      return yield* new ConfigError({
        message: `1Password OAuth token request failed with ${res.status}${code}${description}`,
      });
    }

    if (typeof data?.access_token !== "string") {
      return yield* new ConfigError({
        message: "1Password OAuth token response is missing access_token",
      });
    }

    return {
      accessToken: Redacted.make(data.access_token),
      expiresInSeconds:
        typeof data.expires_in === "number" && data.expires_in > 0
          ? data.expires_in
          : DEFAULT_TOKEN_TTL_SECONDS,
    };
  });

/**
 * A per-layer token cache: exchanges on first use, reuses the token until
 * shortly before expiry, then exchanges again.
 */
const cachedAccessToken = (
  load: Effect.Effect<OAuthConfig, ConfigError>,
  exchange: (config: OAuthConfig) => ReturnType<typeof exchangeAccessToken>,
): Effect.Effect<UsersConfig, ConfigError> => {
  let cached: UsersConfig | undefined;
  let refreshAt = 0;

  return Effect.suspend(() => {
    if (cached !== undefined && Date.now() < refreshAt) {
      return Effect.succeed(cached);
    }
    return Effect.gen(function* () {
      const config = yield* load;
      const token = yield* exchange(config);
      cached = { accessToken: token.accessToken, apiBaseUrl: config.apiBaseUrl };
      refreshAt =
        Date.now() +
        Math.max(token.expiresInSeconds * 1000 - TOKEN_REFRESH_WINDOW_MS, TOKEN_REFRESH_WINDOW_MS);
      return cached;
    });
  });
};

/**
 * Layer from OAuth application client credentials. The access token is
 * requested on first use and refreshed shortly before it expires.
 */
export const usersCredentials = (
  config: {
    readonly clientId: string;
    readonly clientSecret: Redacted.Redacted<string>;
    readonly apiBaseUrl?: string;
  },
  /** Token exchange; override in tests. */
  exchange: (config: OAuthConfig) => ReturnType<typeof exchangeAccessToken> = exchangeAccessToken,
): Layer.Layer<UsersCredentials> =>
  Layer.succeed(
    UsersCredentials,
    cachedAccessToken(
      Effect.succeed({
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        apiBaseUrl: config.apiBaseUrl ?? DEFAULT_USERS_API_BASE_URL,
      }),
      exchange,
    ),
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
export const UsersCredentialsFromEnv: Layer.Layer<UsersCredentials> = /*@__PURE__*/ Layer.succeed(
  UsersCredentials,
  /*@__PURE__*/ cachedAccessToken(usersEnvConfig, exchangeAccessToken),
);

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
