/**
 * Exa credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, serviceApiKey?, apiBaseUrl,
 * teamManagementBaseUrl }` per request; the protocols send the key as the
 * `x-api-key` header.
 *
 * Exa serves two APIs from two hosts:
 *
 *   * the public API (`https://api.exa.ai`) -- search, contents, answer,
 *     monitors, agent runs, batches and Websets -- with an API key from
 *     https://dashboard.exa.ai/api-keys (`EXA_API_KEY`, what the official
 *     SDKs read);
 *   * the Team Management API (`https://admin-api.exa.ai/team-management`)
 *     -- API keys and credits -- with a service API key from the dashboard's
 *     "Service keys" tab. Set `serviceApiKey` (`EXA_SERVICE_API_KEY`) to call
 *     both APIs from one program; without it, Team Management calls send
 *     `apiKey`.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as Redacted from "effect/Redacted";

/** The public API root (the public document's `servers` entry). */
export const DEFAULT_API_BASE_URL = "https://api.exa.ai";

/** The Team Management API root (its document's `servers` entry). */
export const DEFAULT_TEAM_MANAGEMENT_BASE_URL = "https://admin-api.exa.ai/team-management";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  /** Service API key for the Team Management API. Defaults to `apiKey`. */
  readonly serviceApiKey?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly teamManagementBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "ExaCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("EXA_API_KEY"),
  serviceApiKey: /*@__PURE__*/ EffectConfig.Redacted("EXA_SERVICE_API_KEY").pipe(
    EffectConfig.option,
  ),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("EXA_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "EXA_API_KEY environment variable is required" }),
    ),
    /*@__PURE__*/ Effect.map(({ apiKey, serviceApiKey, apiBaseUrl }) => ({
      apiKey,
      serviceApiKey: Option.getOrUndefined(serviceApiKey),
      apiBaseUrl,
      teamManagementBaseUrl: DEFAULT_TEAM_MANAGEMENT_BASE_URL,
    })),
  ),
);

/** Credentials from a redacted API key, with optional service key and endpoints. */
export const credentials = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly serviceApiKey?: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly teamManagementBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      serviceApiKey: config.serviceApiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      teamManagementBaseUrl: config.teamManagementBaseUrl ?? DEFAULT_TEAM_MANAGEMENT_BASE_URL,
    }),
  );
