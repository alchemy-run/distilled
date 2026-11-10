/**
 * Claude Platform (Anthropic) credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, apiBaseUrl, version }` per
 * request; the protocol formats the `x-api-key` and `anthropic-version`
 * headers from it. The key is a Claude API key, or an Admin API key for the
 * `organizations` operations.
 *
 * The API requires `anthropic-version` on every request. It defaults to the
 * version this package is generated against; an operation's own
 * `anthropic-version` member overrides it for one call.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** The API root (the spec's `servers` entry; routes carry `/v1`). */
export const DEFAULT_API_BASE_URL = "https://api.anthropic.com";

/** The `anthropic-version` this package is generated against. */
export const DEFAULT_ANTHROPIC_VERSION = "2026-10-21";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly version: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "AnthropicCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("ANTHROPIC_API_KEY"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("ANTHROPIC_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
  version: /*@__PURE__*/ EffectConfig.String("ANTHROPIC_VERSION").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_ANTHROPIC_VERSION),
  ),
});

/** Reads ANTHROPIC_API_KEY, and optionally ANTHROPIC_BASE_URL and ANTHROPIC_VERSION. */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "ANTHROPIC_API_KEY environment variable is required",
        }),
    ),
  ),
);

/** Layer from a redacted API key + optional base URL and API version. */
export const credentials = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly version?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      version: config.version ?? DEFAULT_ANTHROPIC_VERSION,
    }),
  );
