import * as EffectConfig from "@distilled.cloud/core/config";
/**
 * EAS (Expo Application Services) credentials -- hand-written.
 *
 * API-compatible port of the distilled v0 expo-eas credentials module. The
 * EAS backend is a single GraphQL endpoint. Authentication is via a
 * Personal/Organization Access Token issued from
 * https://expo.dev/settings/access-tokens, sent as
 * `Authorization: Bearer <token>`.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Default EAS GraphQL host. The endpoint path (`/graphql`) is set per operation. */
export const DEFAULT_API_BASE_URL = "https://api.expo.dev";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()("EasCredentials") {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  accessToken: /*@__PURE__*/ EffectConfig.String("EXPO_TOKEN"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("EXPO_API_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/**
 * Build credentials from environment variables.
 *
 * - `EXPO_TOKEN` -- Personal/Organization access token from
 *   https://expo.dev/settings/access-tokens (required)
 * - `EXPO_API_URL` -- override the API host (optional, defaults to
 *   https://api.expo.dev). Set to `https://staging-api.expo.dev` to target
 *   staging, mirroring eas-cli's `EXPO_STAGING=1` flag.
 */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "EXPO_TOKEN environment variable is required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ accessToken, apiBaseUrl }) => ({
      accessToken: Redacted.make(accessToken),
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);
