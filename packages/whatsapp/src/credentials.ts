import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * WhatsApp credentials -- hand-written.
 *
 * The WhatsApp Business Platform authenticates every call with the one
 * scheme its OpenAPI spec declares: an access token sent as
 * `Authorization: Bearer`. That is usually a system user access token with
 * the `whatsapp_business_messaging` and `whatsapp_business_management`
 * permissions, or a business token a Tech Provider obtained through
 * Embedded Signup.
 *
 * Every Graph API path starts with a version (`/v23.0/...`). The protocol
 * puts {@link Config.apiVersion} there; it defaults to
 * {@link DEFAULT_API_VERSION}, the version the mirrored spec describes.
 *
 * Following the core convention the `Credentials` service holds an *effect*
 * resolving the current config, which the protocol layer runs per request on
 * the calling fiber.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** The Graph API origin (the spec's only server). */
export const DEFAULT_API_BASE_URL = "https://graph.facebook.com";

/**
 * The Graph API version the generated operations describe: the spec's
 * `info.version`. Update it with the spec.
 */
export const DEFAULT_API_VERSION = "v23.0";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  /** Graph API version, e.g. `v23.0`, sent as the first path segment. */
  readonly apiVersion: string;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "WhatsAppCredentials",
  ) {}

const trimSlash = (url: string): string => url.replace(/\/+$/, "");

/** Layer from a redacted access token, with an optional version and base URL. */
export const fromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiVersion?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: config.accessToken,
      apiVersion: config.apiVersion ?? DEFAULT_API_VERSION,
      apiBaseUrl: trimSlash(config.apiBaseUrl ?? DEFAULT_API_BASE_URL),
    }),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  accessToken: /*@__PURE__*/ EffectConfig.Redacted("WHATSAPP_ACCESS_TOKEN"),
  apiVersion: /*@__PURE__*/ EffectConfig.String("WHATSAPP_API_VERSION").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_VERSION),
  ),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("WHATSAPP_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/**
 * Reads `WHATSAPP_ACCESS_TOKEN` (required), `WHATSAPP_API_VERSION` and
 * `WHATSAPP_API_BASE_URL` (optional) through Effect `Config` -- so it follows
 * whatever `ConfigProvider` is installed (in a Worker, one built from `env`).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      (e) =>
        new ConfigError({
          message: `WhatsApp credentials require WHATSAPP_ACCESS_TOKEN: ${e.message}`,
        }),
    ),
    /*@__PURE__*/ Effect.map(({ accessToken, apiVersion, apiBaseUrl }): Config => ({
      accessToken,
      apiVersion,
      apiBaseUrl: trimSlash(apiBaseUrl),
    })),
  ),
);
