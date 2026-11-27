import * as EffectConfig from "@distilled.cloud/core/config";
/**
 * Coinbase CDP credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request; the protocol resolves it per request and
 * signs a fresh JWT bearer token.
 *
 * What it resolves is already checked ({@link CheckedConfig}): a layer here
 * parses the API Key Secret and the base URL when it is built, so a bad
 * value is a `ConfigError` at setup and no call can fail for it.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { signingKey, type SigningKey } from "./signing.ts";

export const DEFAULT_API_BASE_URL = "https://api.cdp.coinbase.com/platform";

export interface Config {
  /**
   * CDP API Key ID (UUID format or legacy `organizations/.../apiKeys/...` format).
   */
  readonly apiKeyId: string;

  /**
   * CDP API Key Secret (Ed25519 base64 or EC PEM private key).
   * Used to sign JWT bearer tokens for API authentication.
   */
  readonly apiKeySecret: Redacted.Redacted<string>;

  /**
   * CDP Wallet Secret (base64-encoded DER EC private key).
   * Required only for sensitive wallet operations (POST/DELETE/PUT to account endpoints).
   * If not provided, wallet-auth-requiring operations will fail.
   */
  readonly walletSecret?: Redacted.Redacted<string> | undefined;

  /**
   * Base URL for the Coinbase CDP API.
   * @default "https://api.cdp.coinbase.com/platform"
   */
  readonly apiBaseUrl: string;
}

/** {@link Config}, checked: the secret is a key that signs and the base URL is a URL. */
export interface CheckedConfig {
  readonly apiKeyId: string;
  /** The API Key Secret, parsed. */
  readonly signingKey: SigningKey;
  readonly walletSecret?: Redacted.Redacted<string> | undefined;
  /** An absolute URL. */
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<CheckedConfig>>()(
    "CoinbaseCredentials",
  ) {}

/**
 * Check `config`: fails with `ConfigError` for an API Key Secret that is not
 * a usable key, or a base URL that is not an absolute http(s) URL. For a
 * `Credentials` layer of your own, for example one that rotates keys.
 */
export const check = (config: Config): Effect.Effect<CheckedConfig, ConfigError> =>
  // `localhost:8080` parses as a URL with the scheme `localhost:`, so the
  // scheme is checked too.
  URL.canParse(config.apiBaseUrl) && /^https?:$/.test(new URL(config.apiBaseUrl).protocol)
    ? Effect.map(signingKey(Redacted.value(config.apiKeySecret)), (key) => ({
        apiKeyId: config.apiKeyId,
        signingKey: key,
        walletSecret: config.walletSecret,
        apiBaseUrl: config.apiBaseUrl,
      }))
    : Effect.fail(
        new ConfigError({
          message: `Coinbase apiBaseUrl must be an absolute URL such as ${DEFAULT_API_BASE_URL}; got ${JSON.stringify(String(config.apiBaseUrl))}`,
        }),
      );

/**
 * Credentials from an API key. Building the layer checks them
 * ({@link check}), so it fails with `ConfigError` for a bad secret or base
 * URL.
 */
export const fromApiKey = (
  config: Omit<Config, "apiBaseUrl"> & { readonly apiBaseUrl?: string | undefined },
): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(
      check({ ...config, apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL }),
      (checked) => Effect.succeed(checked),
    ),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKeyId: /*@__PURE__*/ EffectConfig.option(/*@__PURE__*/ EffectConfig.String("CDP_API_KEY_ID")),
  apiKeyName: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("CDP_API_KEY_NAME"),
  ),
  apiKeySecret: /*@__PURE__*/ EffectConfig.Redacted("CDP_API_KEY_SECRET"),
  walletSecret: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("CDP_WALLET_SECRET"),
  ).pipe(
    /*@__PURE__*/ EffectConfig.map((value) =>
      value.pipe(
        Option.filter((secret) => secret.length > 0),
        Option.map(Redacted.make),
      ),
    ),
  ),
});

const fromEnvironment: Effect.Effect<Config, ConfigError> = /*@__PURE__*/ Effect.gen(function* () {
  const config = yield* envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "CDP_API_KEY_SECRET environment variable is required",
        }),
    ),
  );

  const apiKeyId =
    Option.getOrUndefined(config.apiKeyId) ?? Option.getOrUndefined(config.apiKeyName);

  if (!apiKeyId) {
    return yield* new ConfigError({
      message: "CDP_API_KEY_ID (or CDP_API_KEY_NAME) environment variable is required",
    });
  }

  return {
    apiKeyId,
    apiKeySecret: config.apiKeySecret,
    walletSecret: Option.getOrUndefined(config.walletSecret),
    apiBaseUrl: DEFAULT_API_BASE_URL,
  };
});

/**
 * Credentials from `CDP_API_KEY_ID` (or `CDP_API_KEY_NAME`),
 * `CDP_API_KEY_SECRET` and `CDP_WALLET_SECRET`. The environment is read, and
 * the values checked, once: when the layer is built. It fails with
 * `ConfigError` for a missing variable or a secret that is not a usable key.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ Layer.effect(
  Credentials,
  /*@__PURE__*/ Effect.map(/*@__PURE__*/ Effect.flatMap(fromEnvironment, check), (checked) =>
    Effect.succeed(checked),
  ),
);
