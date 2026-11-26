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
 *
 * A layer here reads and checks its configuration when it is built: a
 * missing API key or a site that is not a host name is a `ConfigError` at
 * setup, and no call fails for it.
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
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "DatadogCredentials",
  ) {}

/** A layer that resolves and checks `config` once, when it is built. */
const layer = (config: Effect.Effect<Config, ConfigError>): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(config, (resolved) => Effect.succeed(resolved)),
  );

/**
 * Layer from a redacted API key + optional application key / site / base
 * URL. The site is checked when the layer is built.
 */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly applicationKey?: Redacted.Redacted<string>;
  readonly site?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials, ConfigError> => {
  const site = config.site ?? DEFAULT_SITE;
  return layer(
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
 * and DD_API_BASE_URL (optional override of `https://api.${site}`). The
 * environment is read, and the site checked, once: when the layer is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ layer(
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
