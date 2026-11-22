import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Mux credentials -- hand-written.
 *
 * The Mux API accepts the two schemes its OpenAPI document declares:
 *
 *   - an Access Token: its ID and Secret sent as HTTP Basic auth
 *     (`accessToken`), created under Settings -> Access Tokens in the Mux
 *     dashboard, scoped to one environment;
 *   - an OAuth authorization token sent as `Authorization: Bearer`
 *     (`authorizationToken`).
 *
 * The environment variables are the ones Mux's official SDKs read
 * (`MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`, `MUX_AUTHORIZATION_TOKEN`,
 * `MUX_BASE_URL`); like them, an authorization token wins when both are set.
 *
 * Following the core convention the `Credentials` service holds an *effect*
 * resolving the current config, which the protocol layer runs per request on
 * the calling fiber.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Base64 from "effect/encoding/Base64";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** The Mux API origin (the document's only server). */
export const DEFAULT_API_BASE_URL = "https://api.mux.com";

export type Auth =
  | {
      readonly _tag: "AccessToken";
      /** Access Token ID -- an identifier, sent as the Basic username. */
      readonly tokenId: string;
      readonly tokenSecret: Redacted.Redacted<string>;
    }
  | {
      readonly _tag: "AuthorizationToken";
      readonly authorizationToken: Redacted.Redacted<string>;
    };

export interface Config {
  readonly auth: Auth;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "MuxCredentials",
  ) {}

const trimSlash = (url: string): string => url.replace(/\/+$/, "");

/** Layer from an Access Token ID and Secret (HTTP Basic auth). */
export const fromAccessToken = (config: {
  readonly tokenId: string;
  readonly tokenSecret: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      auth: { _tag: "AccessToken", tokenId: config.tokenId, tokenSecret: config.tokenSecret },
      apiBaseUrl: trimSlash(config.apiBaseUrl ?? DEFAULT_API_BASE_URL),
    }),
  );

/** Layer from an OAuth authorization token (`Authorization: Bearer`). */
export const fromAuthorizationToken = (config: {
  readonly authorizationToken: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      auth: { _tag: "AuthorizationToken", authorizationToken: config.authorizationToken },
      apiBaseUrl: trimSlash(config.apiBaseUrl ?? DEFAULT_API_BASE_URL),
    }),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  tokenId: /*@__PURE__*/ EffectConfig.String("MUX_TOKEN_ID").pipe(EffectConfig.option),
  tokenSecret: /*@__PURE__*/ EffectConfig.Redacted("MUX_TOKEN_SECRET").pipe(EffectConfig.option),
  authorizationToken: /*@__PURE__*/ EffectConfig.Redacted("MUX_AUTHORIZATION_TOKEN").pipe(
    EffectConfig.option,
  ),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("MUX_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

const MISSING =
  "Mux credentials require MUX_TOKEN_ID and MUX_TOKEN_SECRET, or MUX_AUTHORIZATION_TOKEN";

/**
 * Reads `MUX_TOKEN_ID` + `MUX_TOKEN_SECRET`, or `MUX_AUTHORIZATION_TOKEN`,
 * and the optional `MUX_BASE_URL`, through Effect `Config` -- so it follows
 * whatever `ConfigProvider` is installed (in a Worker, one built from `env`).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError((e) => new ConfigError({ message: `${MISSING}: ${e.message}` })),
    /*@__PURE__*/ Effect.flatMap(
      ({
        tokenId,
        tokenSecret,
        authorizationToken,
        apiBaseUrl,
      }): Effect.Effect<Config, ConfigError> => {
        const base = trimSlash(apiBaseUrl);
        if (Option.isSome(authorizationToken)) {
          return Effect.succeed({
            auth: { _tag: "AuthorizationToken", authorizationToken: authorizationToken.value },
            apiBaseUrl: base,
          });
        }
        if (Option.isSome(tokenId) && Option.isSome(tokenSecret)) {
          return Effect.succeed({
            auth: { _tag: "AccessToken", tokenId: tokenId.value, tokenSecret: tokenSecret.value },
            apiBaseUrl: base,
          });
        }
        return Effect.fail(new ConfigError({ message: MISSING }));
      },
    ),
  ),
);

/** The `Authorization` header value for a resolved config. */
export const authorizationHeader = (auth: Auth): string =>
  auth._tag === "AuthorizationToken"
    ? `Bearer ${Redacted.value(auth.authorizationToken)}`
    : `Basic ${Base64.encode(`${auth.tokenId}:${Redacted.value(auth.tokenSecret)}`)}`;
