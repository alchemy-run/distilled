/**
 * Twitch credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ accessToken, clientId, apiBaseUrl }` per
 * request; the protocol sends them as `Authorization: Bearer <accessToken>` and
 * `Client-Id: <clientId>`. Every Helix call needs both headers, and the client
 * ID must be the one the token was issued to
 * (https://dev.twitch.tv/docs/api/get-started/).
 *
 * The token is a user access token or an app access token
 * (https://dev.twitch.tv/docs/authentication/#access-tokens); each operation's
 * documentation lists which it accepts and the scopes it needs. Getting and
 * refreshing a token is up to the caller.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as Redacted from "effect/Redacted";

/** The Helix API host. */
export const DEFAULT_API_BASE_URL = "https://api.twitch.tv/helix";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  /** The client ID of the app the token belongs to. */
  readonly clientId: string;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "TwitchCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  accessToken: /*@__PURE__*/ EffectConfig.Redacted("TWITCH_ACCESS_TOKEN"),
  clientId: /*@__PURE__*/ EffectConfig.String("TWITCH_CLIENT_ID"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("TWITCH_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/** Reads `TWITCH_ACCESS_TOKEN`, `TWITCH_CLIENT_ID` and, optionally, `TWITCH_API_BASE_URL`. */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "TWITCH_ACCESS_TOKEN and TWITCH_CLIENT_ID environment variables are required",
        }),
    ),
  ),
);

/** Credentials from a redacted access token and its app's client ID. */
export const credentials = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly clientId: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: config.accessToken,
      clientId: config.clientId,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
