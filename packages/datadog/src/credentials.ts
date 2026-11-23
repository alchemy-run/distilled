import { ConfigError } from "@distilled.cloud/core/errors";
import { invalidHostLabelConfig } from "@distilled.cloud/core/protocol-http";
/**
 * Datadog credentials -- hand-written.
 *
 * API-compatible port of the distilled v0 Neon credentials module, adapted
 * for Datadog's dual-header auth (`DD-API-KEY` + optional
 * `DD-APPLICATION-KEY`) and regional sites. The `Credentials` service holds
 * an *effect* that resolves the current credentials on every request (the
 * protocol resolves it per request on the calling fiber).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Default Datadog site (US1). */
export const DEFAULT_SITE = "datadoghq.com";

/** US1 REST API root -- `https://api.${DEFAULT_SITE}`. */
export const DEFAULT_API_BASE_URL = "https://api.datadoghq.com";

/** Map a Datadog site (`datadoghq.eu`, `us3.datadoghq.com`, ...) to its API origin. */
export const apiBaseUrlForSite = (site: string): string => `https://api.${site}`;

/**
 * `apiBaseUrl` when given, else the site's API origin. The site becomes the
 * end of the host name, so it must be DNS labels.
 */
const resolveApiBaseUrl = (
  site: string,
  apiBaseUrl: string | undefined,
): Effect.Effect<string, ConfigError> => {
  if (apiBaseUrl !== undefined) return Effect.succeed(apiBaseUrl);
  const invalid = invalidHostLabelConfig("Datadog site", site, true);
  return invalid === undefined ? Effect.succeed(apiBaseUrlForSite(site)) : Effect.fail(invalid);
};

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly applicationKey?: Redacted.Redacted<string>;
  readonly site: string;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "DatadogCredentials",
  ) {}

/** Layer from a redacted API key + optional application key / site / base URL. */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly applicationKey?: Redacted.Redacted<string>;
  readonly site?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> => {
  const site = config.site ?? DEFAULT_SITE;
  return Layer.succeed(
    Credentials,
    Effect.map(resolveApiBaseUrl(site, config.apiBaseUrl), (apiBaseUrl) => ({
      apiKey: config.apiKey,
      applicationKey: config.applicationKey,
      site,
      apiBaseUrl,
    })),
  );
};

/**
 * Reads DD_API_KEY (required), DD_APP_KEY (optional), DD_SITE (optional)
 * and DD_API_BASE_URL (optional override of `https://api.${site}`).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ Effect.gen(function* () {
    const apiKey = process.env.DD_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "DD_API_KEY environment variable is required",
      });
    }

    const site = process.env.DD_SITE ?? DEFAULT_SITE;
    const applicationKey = process.env.DD_APP_KEY;

    return {
      apiKey: Redacted.make(apiKey),
      applicationKey: applicationKey !== undefined ? Redacted.make(applicationKey) : undefined,
      site,
      apiBaseUrl: yield* resolveApiBaseUrl(site, process.env.DD_API_BASE_URL),
    };
  }),
);
