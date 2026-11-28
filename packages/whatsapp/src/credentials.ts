import * as EffectConfig from "@distilled.cloud/core/config";
import type { Checked } from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import { invalidLabel } from "@distilled.cloud/core/protocol-http";
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
 * resolving the current config, which the protocol runs per request on
 * the calling fiber.
 *
 * A layer here reads and checks its configuration when it is built
 * ({@link check}): a missing access token or a version that can't be a URL
 * path segment is a `ConfigError` at setup, and no call fails for it.
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

/** What the service resolves: a {@link Config} that passed {@link check}. */
export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Checked<Config>>>()(
    "WhatsAppCredentials",
  ) {}

/**
 * Check `config`: fails with `ConfigError` for a version that can't be a
 * URL path segment (`""`, `.`, `..`, a lone UTF-16 surrogate). For a
 * `Credentials` layer of your own, for example one that rotates tokens.
 */
export const check = (config: Config): Effect.Effect<Checked<Config>, ConfigError> =>
  invalidLabel("apiVersion", config.apiVersion) === undefined
    ? // The one place that says a Config is checked.
      Effect.succeed(config as Checked<Config>)
    : Effect.fail(
        new ConfigError({
          message: `The configured WhatsApp API version ${JSON.stringify(String(config.apiVersion))} cannot be a URL path segment`,
        }),
      );

/** A layer that resolves and checks `config` once, when it is built. */
const layer = (config: Effect.Effect<Config, ConfigError>): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(Effect.flatMap(config, check), (checked) => Effect.succeed(checked)),
  );

const trimSlash = (url: string): string => url.replace(/\/+$/, "");

/** Layer from a redacted access token, with an optional version and base URL. */
export const fromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiVersion?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials, ConfigError> =>
  layer(
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
 * The environment is read, and the values checked, once: when the layer is
 * built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ layer(
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
