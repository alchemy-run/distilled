/**
 * Temporal credentials — hand-written.
 *
 * API-compatible port of the distilled v0 credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Temporal Cloud and JWT-configured self-hosted servers accept
 * `Authorization: Bearer <apiKey>`. The SDK talks to two hosts:
 *
 * - `apiBaseUrl` — the WorkflowService frontend HTTP origin (default
 *   `http://localhost:7243`); its paths already include `/api/v1`.
 * - `cloudApiBaseUrl` — the Temporal Cloud Ops API (default
 *   `https://saas-api.tmprl.cloud`); its paths already include `/cloud`.
 *   Only Temporal Cloud serves it, so self-hosted users never call it.
 *
 * `cloudApiVersion`, when set, is sent as the `temporal-cloud-api-version`
 * header; without it the Cloud Ops API answers with its latest version.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Default Temporal frontend HTTP listen address (`grpcPort + 10`). */
export const DEFAULT_API_BASE_URL = "http://localhost:7243";

/** Temporal Cloud Ops HTTP API origin. */
export const DEFAULT_CLOUD_API_BASE_URL = "https://saas-api.tmprl.cloud";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly cloudApiBaseUrl: string;
  readonly cloudApiVersion?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("TemporalCredentials") {}

/** Layer from a plain API key, plus optional base URLs and Cloud API version. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly cloudApiBaseUrl?: string;
  readonly cloudApiVersion?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      cloudApiBaseUrl: config.cloudApiBaseUrl ?? DEFAULT_CLOUD_API_BASE_URL,
      cloudApiVersion: config.cloudApiVersion,
    }),
  );

/**
 * Reads TEMPORAL_API_KEY (required), plus TEMPORAL_API_BASE_URL,
 * TEMPORAL_CLOUD_API_BASE_URL and TEMPORAL_CLOUD_API_VERSION (optional).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.TEMPORAL_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "TEMPORAL_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.TEMPORAL_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      cloudApiBaseUrl:
        process.env.TEMPORAL_CLOUD_API_BASE_URL ?? DEFAULT_CLOUD_API_BASE_URL,
      cloudApiVersion: process.env.TEMPORAL_CLOUD_API_VERSION || undefined,
    };
  }).pipe(Effect.orDie),
);
