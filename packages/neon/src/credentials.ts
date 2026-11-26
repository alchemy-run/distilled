import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Neon credentials -- hand-written.
 *
 * API-compatible port of the distilled v0 Neon credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request
 * on the calling fiber).
 *
 * A layer here reads and checks its configuration when it is built: a
 * missing `NEON_API_KEY` is a `ConfigError` at setup, and no call fails for
 * it (`AGENTS.md` rule 18).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://console.neon.tech/api/v2";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()("NeonCredentials") {}

/** Layer from a redacted API key + optional base URL. */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Reads NEON_API_KEY (required) and NEON_API_BASE_URL (optional), once: when
 * the layer is built. A missing key fails the layer with `ConfigError`.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ Layer.effect(
  Credentials,
  /*@__PURE__*/ Effect.gen(function* () {
    const apiKey = process.env.NEON_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "NEON_API_KEY environment variable is required",
      });
    }

    // The service holds an effect; this one can no longer fail.
    return Effect.succeed({
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.NEON_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    });
  }),
);
