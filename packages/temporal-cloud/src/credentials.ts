/**
 * Temporal Cloud credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * The Cloud Ops API accepts `Authorization: Bearer <apiKey>` at
 * https://saas-api.tmprl.cloud; spec paths already include `/cloud`.
 * `apiVersion`, when set, is sent as the `temporal-cloud-api-version`
 * header; without it the HTTP API answers with its latest version.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Temporal Cloud Ops HTTP API origin. */
export const DEFAULT_API_BASE_URL = "https://saas-api.tmprl.cloud";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly apiVersion?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("TemporalCloudCredentials") {}

/** Layer from a plain API key, plus an optional base URL and API version. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly apiVersion?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      apiVersion: config.apiVersion,
    }),
  );

/**
 * Reads TEMPORAL_CLOUD_API_KEY (required), TEMPORAL_CLOUD_API_BASE_URL and
 * TEMPORAL_CLOUD_API_VERSION (optional).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.TEMPORAL_CLOUD_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "TEMPORAL_CLOUD_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl:
        process.env.TEMPORAL_CLOUD_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      apiVersion: process.env.TEMPORAL_CLOUD_API_VERSION || undefined,
    };
  }).pipe(Effect.orDie),
);
