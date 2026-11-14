/**
 * Microsoft Graph credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request on the
 * calling fiber). Graph authenticates with an Entra ID OAuth2 bearer token
 * for the scope `https://graph.microsoft.com/.default`, sent as
 * `Authorization: Bearer <token>` against `https://graph.microsoft.com/v1.0`.
 *
 * Two sources:
 *
 * - {@link fromBearerToken}: a token the caller already holds.
 * - {@link fromClientSecret}: a service principal's client secret. The
 *   effect mints a token with the OAuth2 client-credentials grant over the
 *   calling fiber's `HttpClient`, caches it, and mints a new one 5 minutes
 *   before it expires.
 *
 * {@link CredentialsFromEnv} picks one of the two from the environment.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import { refreshing } from "@distilled.cloud/core/token-cache";
import * as Clock from "effect/Clock";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { TokenAcquisitionFailed } from "./errors.ts";

/** Default base URL: the Microsoft Graph v1.0 endpoint. */
export const DEFAULT_API_BASE_URL = "https://graph.microsoft.com/v1.0";

/** Default Entra ID authority (the public cloud). */
export const DEFAULT_AUTHORITY_HOST = "https://login.microsoftonline.com";

/** OAuth2 scope for an application token that calls Microsoft Graph. */
export const GRAPH_SCOPE = "https://graph.microsoft.com/.default";

export interface Config {
  /** OAuth2 bearer token for Microsoft Graph. */
  readonly bearerToken: Redacted.Redacted<string>;
  /** Base URL for Graph requests (defaults to https://graph.microsoft.com/v1.0). */
  readonly apiBaseUrl: string;
}

/** Errors resolving credentials can raise. */
export type CredentialsError =
  | ConfigError
  | TokenAcquisitionFailed
  | HttpClientError.HttpClientError;

export class Credentials
  extends /*@__PURE__*/ Context.Service<
    Credentials,
    Effect.Effect<Config, CredentialsError, HttpClient.HttpClient>
  >()("MicrosoftGraphCredentials") {}

/** Layer from a token the caller already holds. */
export const fromBearerToken = (config: {
  readonly bearerToken: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      bearerToken: config.bearerToken,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

export interface ClientSecretConfig {
  /** Entra ID tenant (directory) ID. */
  readonly tenantId: string;
  /** Application (client) ID of the service principal. */
  readonly clientId: string;
  /** The service principal's client secret. */
  readonly clientSecret: Redacted.Redacted<string>;
  /** Entra ID authority host (defaults to https://login.microsoftonline.com). */
  readonly authorityHost?: string;
  /** Base URL for Graph requests (defaults to https://graph.microsoft.com/v1.0). */
  readonly apiBaseUrl?: string;
}

/** `text` parsed as a JSON object, or `undefined` when it is not one. */
const parseJsonObject = (text: string): Record<string, unknown> | undefined => {
  try {
    const value: unknown = JSON.parse(text);
    return value !== null && typeof value === "object"
      ? (value as Record<string, unknown>)
      : undefined;
  } catch {
    // Not JSON (a gateway error page): the status reports the failure.
    return undefined;
  }
};

/**
 * An effect that returns a Graph token for `config`, minted with the
 * client-credentials grant and cached (core `refreshing`) until 5 minutes
 * before it expires. The cache lives in this closure, created once per
 * layer.
 */
const clientSecretCredentials = (
  config: ClientSecretConfig,
): Effect.Effect<Config, CredentialsError, HttpClient.HttpClient> => {
  const apiBaseUrl = config.apiBaseUrl ?? DEFAULT_API_BASE_URL;
  const authority = (config.authorityHost ?? DEFAULT_AUTHORITY_HOST).replace(/\/+$/, "");
  const tokenUrl = `${authority}/${encodeURIComponent(config.tenantId)}/oauth2/v2.0/token`;

  const mint = Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const request = HttpClientRequest.post(tokenUrl).pipe(
      HttpClientRequest.bodyUrlParams({
        grant_type: "client_credentials",
        client_id: config.clientId,
        client_secret: Redacted.value(config.clientSecret),
        scope: GRAPH_SCOPE,
      }),
    );
    const issuedAt = yield* Clock.currentTimeMillis;
    const response = yield* client.execute(request);
    const body = parseJsonObject(yield* response.text);
    const accessToken = body?.access_token;
    if (response.status !== 200 || typeof accessToken !== "string") {
      return yield* new TokenAcquisitionFailed({
        status: response.status,
        code: typeof body?.error === "string" ? body.error : undefined,
        message:
          typeof body?.error_description === "string"
            ? body.error_description
            : `token endpoint returned HTTP ${response.status}`,
      });
    }
    const expiresIn = Number(body?.expires_in);
    return {
      value: Redacted.make(accessToken),
      expiresAt: issuedAt + (Number.isFinite(expiresIn) && expiresIn > 0 ? expiresIn : 3600) * 1000,
    };
  });

  return Effect.map(refreshing(mint), (bearerToken) => ({ bearerToken, apiBaseUrl }));
};

/**
 * Layer that mints Graph tokens from a service principal's client secret.
 * Tokens are fetched over the calling fiber's `HttpClient` and cached per
 * layer value: provide the same layer to every run to reuse its token.
 */
export const fromClientSecret = (config: ClientSecretConfig): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, clientSecretCredentials(config));

const envBaseUrl = /*@__PURE__*/ EffectConfig.String("MICROSOFT_GRAPH_API_BASE_URL").pipe(
  /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
);

const envConfig = /*@__PURE__*/ EffectConfig.all({
  bearerToken: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.Redacted("MICROSOFT_GRAPH_BEARER_TOKEN"),
  ),
  tenantId: /*@__PURE__*/ EffectConfig.option(/*@__PURE__*/ EffectConfig.String("AZURE_TENANT_ID")),
  clientId: /*@__PURE__*/ EffectConfig.option(/*@__PURE__*/ EffectConfig.String("AZURE_CLIENT_ID")),
  clientSecret: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.Redacted("AZURE_CLIENT_SECRET"),
  ),
  authorityHost: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("AZURE_AUTHORITY_HOST"),
  ),
  apiBaseUrl: envBaseUrl,
});

/**
 * Reads Microsoft Graph credentials from environment variables:
 *
 * - `MICROSOFT_GRAPH_BEARER_TOKEN` -- a Graph access token; or
 * - `AZURE_TENANT_ID` + `AZURE_CLIENT_ID` + `AZURE_CLIENT_SECRET` -- a
 *   service principal (the Azure SDK names); tokens are minted on demand.
 *   `AZURE_AUTHORITY_HOST` overrides the authority for sovereign clouds.
 * - `MICROSOFT_GRAPH_API_BASE_URL` -- optional override of the API base URL.
 *
 * The bearer token wins when both are set.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ (() => {
  // One token cache for the process: the environment names one identity.
  let fromSecret: Effect.Effect<Config, CredentialsError, HttpClient.HttpClient> | undefined;
  return Layer.succeed(
    Credentials,
    Effect.gen(function* () {
      // Every variable is optional here; only a ConfigProvider that cannot
      // read its source fails.
      const env = yield* envConfig.pipe(
        Effect.mapError(
          (cause) => new ConfigError({ message: `cannot read the environment: ${cause.message}` }),
        ),
      );
      if (Option.isSome(env.bearerToken)) {
        return { bearerToken: env.bearerToken.value, apiBaseUrl: env.apiBaseUrl };
      }
      if (
        Option.isNone(env.tenantId) ||
        Option.isNone(env.clientId) ||
        Option.isNone(env.clientSecret)
      ) {
        return yield* new ConfigError({
          message:
            "MICROSOFT_GRAPH_BEARER_TOKEN, or AZURE_TENANT_ID + AZURE_CLIENT_ID + AZURE_CLIENT_SECRET, environment variables are required",
        });
      }
      fromSecret ??= clientSecretCredentials({
        tenantId: env.tenantId.value,
        clientId: env.clientId.value,
        clientSecret: env.clientSecret.value,
        authorityHost: Option.getOrUndefined(env.authorityHost),
        apiBaseUrl: env.apiBaseUrl,
      });
      return yield* fromSecret;
    }),
  );
})();
