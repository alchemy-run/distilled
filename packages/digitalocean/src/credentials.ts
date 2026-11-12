import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * DigitalOcean credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). A Personal Access Token is sent as
 * `Authorization: Bearer <apiKey>`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.digitalocean.com";
/** Host of the Serverless Inference operations (`T.Http({ server: "inference" })`). */
export const DEFAULT_INFERENCE_BASE_URL = "https://inference.do-ai.run";
/** Host of the Action Gateway operations (`T.Http({ server: "actions" })`). */
export const DEFAULT_ACTIONS_BASE_URL = "https://actions.do-ai.run";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /** Serverless Inference base URL. Default {@link DEFAULT_INFERENCE_BASE_URL}. */
  readonly inferenceBaseUrl?: string | undefined;
  /** Action Gateway base URL. Default {@link DEFAULT_ACTIONS_BASE_URL}. */
  readonly actionsBaseUrl?: string | undefined;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "DigitalOceanCredentials",
  ) {}

/** Layer from a redacted API token + optional base URLs. */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly inferenceBaseUrl?: string;
  readonly actionsBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      inferenceBaseUrl: config.inferenceBaseUrl,
      actionsBaseUrl: config.actionsBaseUrl,
    }),
  );

/**
 * Reads the API token from DIGITALOCEAN_TOKEN, DIGITALOCEAN_ACCESS_TOKEN or
 * DIGITALOCEAN_API_KEY (first set wins; one is required) and
 * DIGITALOCEAN_API_BASE_URL (optional). DIGITALOCEAN_TOKEN is what the
 * Terraform provider reads; `doctl` uses DIGITALOCEAN_ACCESS_TOKEN.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ Effect.gen(function* () {
    const apiKey =
      process.env.DIGITALOCEAN_TOKEN ??
      process.env.DIGITALOCEAN_ACCESS_TOKEN ??
      process.env.DIGITALOCEAN_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message:
          "DIGITALOCEAN_TOKEN, DIGITALOCEAN_ACCESS_TOKEN or DIGITALOCEAN_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.DIGITALOCEAN_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }),
);
