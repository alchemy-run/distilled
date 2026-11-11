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

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /** Spaces access key id, for the S3-compatible API (`Spaces.layerS3`). */
  readonly spacesAccessKeyId?: Redacted.Redacted<string> | undefined;
  /** Spaces secret access key, for the S3-compatible API. */
  readonly spacesSecretAccessKey?: Redacted.Redacted<string> | undefined;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "DigitalOceanCredentials",
  ) {}

/** Layer from a redacted API token + optional base URL. */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly spacesAccessKeyId?: Redacted.Redacted<string>;
  readonly spacesSecretAccessKey?: Redacted.Redacted<string>;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      spacesAccessKeyId: config.spacesAccessKeyId,
      spacesSecretAccessKey: config.spacesSecretAccessKey,
    }),
  );

/**
 * Reads the API token from DIGITALOCEAN_TOKEN, DIGITALOCEAN_ACCESS_TOKEN or
 * DIGITALOCEAN_API_KEY (first set wins; one is required) and
 * DIGITALOCEAN_API_BASE_URL (optional), and the Spaces keys from
 * SPACES_ACCESS_KEY_ID and SPACES_SECRET_ACCESS_KEY (optional). DIGITALOCEAN_TOKEN is what the
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

    const spacesAccessKeyId = process.env.SPACES_ACCESS_KEY_ID;
    const spacesSecretAccessKey = process.env.SPACES_SECRET_ACCESS_KEY;
    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.DIGITALOCEAN_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      spacesAccessKeyId: spacesAccessKeyId ? Redacted.make(spacesAccessKeyId) : undefined,
      spacesSecretAccessKey: spacesSecretAccessKey
        ? Redacted.make(spacesSecretAccessKey)
        : undefined,
    };
  }),
);

/**
 * Credentials for one Functions namespace's OpenWhisk API: its `api_host`
 * and a basic-auth pair, either a namespace access key (`id` + `secret`
 * from `createFunctionsAccessKey`) or the namespace's `uuid` + `key`.
 */
export interface FunctionsConfig {
  readonly apiHost: string;
  readonly user: string;
  readonly secret: Redacted.Redacted<string>;
}

export class FunctionsCredentials
  extends /*@__PURE__*/ Context.Service<
    FunctionsCredentials,
    Effect.Effect<FunctionsConfig, ConfigError>
  >()("DigitalOceanFunctionsCredentials") {}

/** Layer for one namespace's OpenWhisk API. */
export const fromFunctionsKey = (config: FunctionsConfig): Layer.Layer<FunctionsCredentials> =>
  Layer.succeed(FunctionsCredentials, Effect.succeed(config));
