/**
 * Coinflow credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, apiBaseUrl }` per request;
 * the protocol sends the merchant API key as the raw `Authorization` header
 * value (the spec's `merchant` and `admin` security schemes).
 *
 * Coinflow runs two environments with separate API keys: sandbox
 * (`https://api-sandbox.coinflow.cash/api`, the spec's `servers` entry) and
 * production (`https://api.coinflow.cash/api`). Sandbox is the default, so a
 * missing setting never moves real money.
 *
 * End-user identity (`x-coinflow-auth-wallet`, `-blockchain`, `-user-id`,
 * `-session-key`) is per call, not per client: it is an input member of each
 * operation that needs it (`authWallet`, `authUserId`, ...).
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** Sandbox API root (the spec's `servers` entry). */
export const SANDBOX_API_BASE_URL = "https://api-sandbox.coinflow.cash/api";

/** Production API root. */
export const PRODUCTION_API_BASE_URL = "https://api.coinflow.cash/api";

export type Environment = "sandbox" | "production";

const BASE_URLS: Record<Environment, string> = {
  sandbox: SANDBOX_API_BASE_URL,
  production: PRODUCTION_API_BASE_URL,
};

export interface Config {
  /** The merchant API key, sent as `Authorization`. */
  readonly apiKey: Redacted.Redacted<string>;
  /** API root, without a trailing slash. */
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "CoinflowCredentials",
  ) {}

const isEnvironment = (value: string): value is Environment =>
  value === "sandbox" || value === "production";

const trimSlash = (url: string): string => url.replace(/\/+$/, "");

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("COINFLOW_API_KEY").pipe(EffectConfig.option),
  env: /*@__PURE__*/ EffectConfig.String("COINFLOW_ENV").pipe(EffectConfig.option),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("COINFLOW_API_BASE_URL").pipe(EffectConfig.option),
});

/**
 * Reads `COINFLOW_API_KEY` (required), `COINFLOW_ENV` (`sandbox` |
 * `production`, default `sandbox`) and `COINFLOW_API_BASE_URL` (overrides
 * the environment's URL).
 */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "could not read the COINFLOW_* environment variables" }),
    ),
    /*@__PURE__*/ Effect.flatMap(({ apiKey, env, apiBaseUrl }) => {
      if (Option.isNone(apiKey)) {
        return Effect.fail(
          new ConfigError({ message: "COINFLOW_API_KEY environment variable is required" }),
        );
      }
      const environment = Option.getOrElse(env, () => "sandbox");
      if (!isEnvironment(environment)) {
        return Effect.fail(
          new ConfigError({ message: "COINFLOW_ENV must be `sandbox` or `production`" }),
        );
      }
      return Effect.succeed({
        apiKey: apiKey.value,
        apiBaseUrl: trimSlash(Option.getOrElse(apiBaseUrl, () => BASE_URLS[environment])),
      });
    }),
  ),
);

/** Credentials from a merchant API key, for sandbox unless told otherwise. */
export const credentials = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly environment?: Environment;
  /** Overrides the environment's URL. */
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: trimSlash(config.apiBaseUrl ?? BASE_URLS[config.environment ?? "sandbox"]),
    }),
  );
