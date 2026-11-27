/**
 * Jira Cloud credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ authorization, baseUrl }`; the
 * protocol sends `authorization` as the `Authorization` header and calls
 * `baseUrl` + the spec's `/rest/api/3/...` paths. Jira Cloud takes three
 * kinds of credential:
 *
 * - an API token, sent as HTTP Basic with the Atlassian account email as the
 *   username: `Basic base64(email:apiToken)`
 *   (https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/);
 * - an OAuth 2.0 (3LO) access token, sent as `Bearer <token>`
 *   (https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/);
 * - an OAuth 2.0 (3LO) refresh token, exchanged for access tokens at
 *   `https://auth.atlassian.com/oauth/token`.
 *
 * And two kinds of base URL. The site URL (`https://acme.atlassian.net`, the
 * spec's server) takes an unscoped API token. OAuth tokens and scoped API
 * tokens go through the API gateway, `https://api.atlassian.com/ex/jira/<cloudId>`,
 * where the cloud ID names the site. Every layer takes either `baseUrl` or
 * `cloudId`.
 *
 * A layer reads and checks its configuration when it is built: a missing
 * token, or a malformed base URL or cloud ID, is a `ConfigError` at setup,
 * and no call fails for it. A refresh-token exchange that fails at run time
 * fails the call with {@link TokenRequestFailed}.
 */
import { toBase64 } from "@distilled.cloud/core/base64";
import * as EffectConfig from "@distilled.cloud/core/config";
import type { Checked } from "@distilled.cloud/core/config";
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

/** The Atlassian API gateway that OAuth tokens and scoped API tokens call. */
export const GATEWAY_URL = "https://api.atlassian.com";

/** Atlassian's OAuth 2.0 token endpoint. */
export const TOKEN_URL = "https://auth.atlassian.com/oauth/token";

/** Exchange the refresh token again this long before the access token expires. */
const REFRESH_WINDOW_MS = 60_000;

export interface Config {
  /** The whole `Authorization` header value: `Basic ...` or `Bearer ...`. */
  readonly authorization: Redacted.Redacted<string>;
  /**
   * The site root the `/rest/api/3/...` paths go under, without a trailing
   * slash: `https://acme.atlassian.net` or
   * `https://api.atlassian.com/ex/jira/<cloudId>`.
   */
  readonly baseUrl: string;
}

/** Where calls go: the site URL, or the API gateway for a cloud ID. */
export type Site =
  | { readonly baseUrl: string; readonly cloudId?: undefined }
  | { readonly cloudId: string; readonly baseUrl?: undefined };

/** What the service resolves: a {@link Config} that passed {@link check}. */
export class Credentials
  extends /*@__PURE__*/ Context.Service<
    Credentials,
    Effect.Effect<Checked<Config>, TokenRequestFailed>
  >()("JiraCredentials") {}

/**
 * Check `config`: fails with `ConfigError` unless `baseUrl` is an `http:` or
 * `https:` URL. For a `Credentials` layer of your own, for example one that
 * gets tokens from your own store.
 */
export const check = (config: Config): Effect.Effect<Checked<Config>, ConfigError> => {
  const url = URL.parse(config.baseUrl);
  if (url === null || (url.protocol !== "https:" && url.protocol !== "http:")) {
    return Effect.fail(
      new ConfigError({ message: `Jira base URL is not an http(s) URL: ${config.baseUrl}` }),
    );
  }
  // The one place that says a Config is checked.
  return Effect.succeed({
    ...config,
    baseUrl: config.baseUrl.replace(/\/+$/, ""),
  } as Checked<Config>);
};

/**
 * The base URL for `site`. A cloud ID goes into the gateway path, so it may
 * hold only letters, digits and `-` (Atlassian's are UUIDs).
 */
export const siteBaseUrl = (site: Site): Effect.Effect<string, ConfigError> => {
  if (site.cloudId !== undefined && site.baseUrl !== undefined) {
    return Effect.fail(new ConfigError({ message: "Pass a Jira baseUrl or a cloudId, not both" }));
  }
  if (site.cloudId !== undefined) {
    return /^[A-Za-z0-9-]+$/.test(site.cloudId)
      ? Effect.succeed(`${GATEWAY_URL}/ex/jira/${site.cloudId}`)
      : Effect.fail(new ConfigError({ message: `Invalid Jira cloud ID: ${site.cloudId}` }));
  }
  if (site.baseUrl !== undefined && site.baseUrl !== "") return Effect.succeed(site.baseUrl);
  return Effect.fail(new ConfigError({ message: "A Jira baseUrl or cloudId is required" }));
};

const basic = (email: string, apiToken: Redacted.Redacted<string>): Redacted.Redacted<string> =>
  Redacted.make(`Basic ${toBase64(`${email}:${Redacted.value(apiToken)}`)}`);

const bearer = (accessToken: Redacted.Redacted<string>): Redacted.Redacted<string> =>
  Redacted.make(`Bearer ${Redacted.value(accessToken)}`);

const checkedFor = (
  site: Site,
  authorization: Redacted.Redacted<string>,
): Effect.Effect<Checked<Config>, ConfigError> =>
  Effect.flatMap(siteBaseUrl(site), (baseUrl) => check({ authorization, baseUrl }));

/** A layer that resolves and checks `config` once, when it is built. */
const layer = (
  config: Effect.Effect<Checked<Config>, ConfigError>,
): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(config, (checked) => Effect.succeed(checked)),
  );

const apiTokenConfig = (
  email: string,
  apiToken: Redacted.Redacted<string>,
  site: Site,
): Effect.Effect<Checked<Config>, ConfigError> =>
  email === ""
    ? Effect.fail(new ConfigError({ message: "Jira API token credentials need an email" }))
    : checkedFor(site, basic(email, apiToken));

/**
 * Credentials from an API token and the Atlassian account email it belongs
 * to, sent as HTTP Basic. Pass the site URL (`baseUrl`) for an unscoped
 * token, or the site's `cloudId` for a scoped one.
 */
export const fromApiToken = (
  config: {
    readonly email: string;
    readonly apiToken: Redacted.Redacted<string>;
  } & Site,
): Layer.Layer<Credentials, ConfigError> =>
  layer(apiTokenConfig(config.email, config.apiToken, config));

/**
 * Credentials from an OAuth 2.0 (3LO) access token, sent as `Bearer`, for
 * the site with `cloudId` (from
 * `GET https://api.atlassian.com/oauth/token/accessible-resources`). The
 * token is not refreshed; {@link fromRefreshToken} does that.
 */
export const fromAccessToken = (
  config: { readonly accessToken: Redacted.Redacted<string> } & Site,
): Layer.Layer<Credentials, ConfigError> => layer(checkedFor(config, bearer(config.accessToken)));

/** One refresh-token exchange. */
export interface Tokens {
  readonly accessToken: Redacted.Redacted<string>;
  /**
   * The refresh token to exchange next. Atlassian rotates refresh tokens:
   * the one just used stops working (after a 10-minute grace period).
   */
  readonly refreshToken: Redacted.Redacted<string>;
  readonly expiresInSeconds: number;
}

export interface RefreshTokenConfig {
  readonly clientId: string;
  readonly clientSecret: Redacted.Redacted<string>;
  readonly refreshToken: Redacted.Redacted<string>;
  /** The site the access tokens call, from `accessible-resources`. */
  readonly cloudId: string;
  /** Called with every exchange, to store `tokens.refreshToken`. */
  readonly onRefresh?: (tokens: Tokens) => Effect.Effect<void>;
  /** Default {@link TOKEN_URL}. */
  readonly tokenUrl?: string;
}

const TokenResponse = /*@__PURE__*/ Schema.Struct({
  access_token: Schema.String,
  refresh_token: /*@__PURE__*/ Schema.optional(Schema.String),
  expires_in: /*@__PURE__*/ Schema.optional(Schema.Number),
});

const exchangeFailed = (reason: string, status?: number) =>
  new TokenRequestFailed({
    message: `Jira OAuth refresh token exchange failed: ${reason}`,
    status,
  });

/**
 * Builds the refresh-token cache. The returned effect exchanges the refresh
 * token through the captured `HttpClient` on first use, reuses the access
 * token until 60 seconds before it expires, then exchanges the refresh token
 * the last exchange returned. Concurrent calls on a cold or stale cache
 * share one exchange (core `refreshing`), so no refresh token is spent twice.
 */
export const makeRefreshToken = (
  config: RefreshTokenConfig,
): Effect.Effect<
  Effect.Effect<Checked<Config>, TokenRequestFailed>,
  ConfigError,
  HttpClient.HttpClient
> =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    if (config.clientId === "") {
      return yield* new ConfigError({ message: "Jira OAuth credentials need a clientId" });
    }
    const baseUrl = yield* siteBaseUrl({ cloudId: config.cloudId });
    let next = config.refreshToken;
    const exchange = Effect.gen(function* () {
      const response = yield* client
        .execute(
          HttpClientRequest.post(config.tokenUrl ?? TOKEN_URL).pipe(
            HttpClientRequest.bodyJsonUnsafe({
              grant_type: "refresh_token",
              client_id: config.clientId,
              client_secret: Redacted.value(config.clientSecret),
              refresh_token: Redacted.value(next),
            }),
          ),
        )
        .pipe(
          Effect.flatMap(HttpClientResponse.filterStatusOk),
          Effect.mapError((cause) => exchangeFailed(cause.message, cause.response?.status)),
        );
      const body = yield* HttpClientResponse.schemaBodyJson(TokenResponse)(response).pipe(
        Effect.mapError(() => exchangeFailed("the answer has no access_token", response.status)),
      );
      const tokens: Tokens = {
        accessToken: Redacted.make(body.access_token),
        refreshToken: body.refresh_token === undefined ? next : Redacted.make(body.refresh_token),
        expiresInSeconds:
          body.expires_in !== undefined && body.expires_in > 0 ? body.expires_in : 3600,
      };
      next = tokens.refreshToken;
      if (config.onRefresh) yield* config.onRefresh(tokens);
      return {
        config: { authorization: bearer(tokens.accessToken), baseUrl } as Checked<Config>,
        refreshAt:
          Date.now() +
          Math.max(tokens.expiresInSeconds * 1000 - REFRESH_WINDOW_MS, REFRESH_WINDOW_MS),
      };
    });
    return refreshing(exchange, (cached) => cached.refreshAt, {
      onTimeout: (timeoutMs) =>
        new TokenRequestFailed({
          message: `Jira OAuth refresh token exchange timed out after ${timeoutMs / 1000} s`,
        }),
    }).pipe(Effect.map((cached) => cached.config));
  });

/**
 * Credentials from an OAuth 2.0 (3LO) refresh token (the app asked for the
 * `offline_access` scope), exchanged at Atlassian's token endpoint on first
 * use and again before each access token expires. Pass `onRefresh` to store
 * each new refresh token: a program that does not keep it cannot start
 * again from the one it was given.
 */
export const fromRefreshToken = (
  config: RefreshTokenConfig,
): Layer.Layer<Credentials, ConfigError, HttpClient.HttpClient> =>
  Layer.effect(Credentials, makeRefreshToken(config));

const optionalString = (name: string) =>
  EffectConfig.option(EffectConfig.String(name)).pipe(
    EffectConfig.map((v) => Option.getOrUndefined(Option.filter(v, (s) => s !== ""))),
  );

const optionalRedacted = (name: string) =>
  EffectConfig.option(EffectConfig.Redacted(name)).pipe(
    EffectConfig.map((v) =>
      Option.getOrUndefined(Option.filter(v, (s) => Redacted.value(s) !== "")),
    ),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  baseUrl: /*@__PURE__*/ optionalString("JIRA_BASE_URL"),
  cloudId: /*@__PURE__*/ optionalString("JIRA_CLOUD_ID"),
  email: /*@__PURE__*/ optionalString("JIRA_EMAIL"),
  apiToken: /*@__PURE__*/ optionalRedacted("JIRA_API_TOKEN"),
  accessToken: /*@__PURE__*/ optionalRedacted("JIRA_ACCESS_TOKEN"),
  clientId: /*@__PURE__*/ optionalString("JIRA_CLIENT_ID"),
  clientSecret: /*@__PURE__*/ optionalRedacted("JIRA_CLIENT_SECRET"),
  refreshToken: /*@__PURE__*/ optionalRedacted("JIRA_REFRESH_TOKEN"),
});

const MISSING =
  "Set JIRA_ACCESS_TOKEN, JIRA_EMAIL and JIRA_API_TOKEN, or JIRA_CLIENT_ID, " +
  "JIRA_CLIENT_SECRET and JIRA_REFRESH_TOKEN, with JIRA_BASE_URL or JIRA_CLOUD_ID";

/**
 * Reads, in this order of precedence:
 *
 * 1. `JIRA_ACCESS_TOKEN` (an OAuth access token, sent as `Bearer`);
 * 2. `JIRA_EMAIL` and `JIRA_API_TOKEN` (an API token, sent as Basic);
 * 3. `JIRA_CLIENT_ID`, `JIRA_CLIENT_SECRET` and `JIRA_REFRESH_TOKEN` (an
 *    OAuth refresh token; the rotated refresh tokens are kept in memory
 *    only -- use {@link fromRefreshToken} with `onRefresh` to store them).
 *
 * plus `JIRA_BASE_URL` (the site URL) or `JIRA_CLOUD_ID` (the API gateway;
 * required for a refresh token). The environment is read, and checked,
 * once: when the layer is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError, HttpClient.HttpClient> =
  /*@__PURE__*/ Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const env = yield* envConfig.pipe(
        Effect.mapError(
          (cause) =>
            new ConfigError({ message: `Failed to read Jira configuration: ${cause.message}` }),
        ),
      );
      if (env.cloudId !== undefined && env.baseUrl !== undefined) {
        return yield* new ConfigError({
          message: "Set JIRA_BASE_URL or JIRA_CLOUD_ID, not both",
        });
      }
      const site: Site =
        env.cloudId !== undefined ? { cloudId: env.cloudId } : { baseUrl: env.baseUrl ?? "" };
      if (env.accessToken !== undefined) {
        return Effect.succeed(yield* checkedFor(site, bearer(env.accessToken)));
      }
      if (env.email !== undefined && env.apiToken !== undefined) {
        return Effect.succeed(yield* apiTokenConfig(env.email, env.apiToken, site));
      }
      if (
        env.clientId !== undefined &&
        env.clientSecret !== undefined &&
        env.refreshToken !== undefined
      ) {
        if (env.cloudId === undefined) {
          return yield* new ConfigError({
            message: "JIRA_CLOUD_ID is required with JIRA_REFRESH_TOKEN",
          });
        }
        return yield* makeRefreshToken({
          clientId: env.clientId,
          clientSecret: env.clientSecret,
          refreshToken: env.refreshToken,
          cloudId: env.cloudId,
        });
      }
      return yield* new ConfigError({ message: MISSING });
    }),
  );
