import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * UniFi credentials -- hand-written.
 *
 * UniFi has two kinds of API, and they are reached differently:
 *
 *   - Console-hosted apps (Network, Protect, InnerSpace) run on the console
 *     itself. They are reached directly on the local network
 *     (`https://<console>/proxy/<app>/integration`) or relayed through the
 *     cloud connector on `api.ui.com`
 *     (`/v1/connector/consoles/<consoleId>/proxy/<app>/integration`). Locally
 *     the key is created in the application under Settings > Control Plane >
 *     Integrations; through the connector it is a Site Manager key
 *     (unifi.ui.com/settings/api-keys), which also needs console firmware
 *     >= 5.0.3. {@link ConsoleCredentials} holds the key and where the
 *     console is.
 *   - Cloud-only APIs (Site Manager, Mobility, Carrier Fabric) are served by
 *     `api.ui.com` alone with a Site Manager key. {@link CloudCredentials}
 *     holds the key.
 *
 * Both services hold an *effect* that resolves the current credentials on
 * every request (the protocol resolves it per request on the calling fiber),
 * so one layer may provide either or both: an unused one is never resolved.
 * Both send the key as `X-API-KEY`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Origin of the UniFi cloud: Site Manager, Mobility, Carrier Fabric and the connector. */
export const DEFAULT_CLOUD_BASE_URL = "https://api.ui.com";

/** The console-hosted applications, as they appear in `/proxy/<app>/integration`. */
export type ConsoleApp = "network" | "protect" | "innerspace";

/** Where a console is reached. */
export type ConsoleLocation =
  /**
   * Directly on the local network: a host (`192.168.0.1`, `udm.lan:8443`) or
   * an origin (`https://192.168.0.1`). The console serves a self-signed
   * certificate; trust it in the runtime's TLS settings.
   */
  | { readonly _tag: "Local"; readonly host: string }
  /** Through the cloud connector, by the console's ID (Site Manager `listHosts`). */
  | { readonly _tag: "Cloud"; readonly consoleId: string; readonly apiBaseUrl?: string };

export interface ConsoleConfig {
  readonly apiKey: Redacted.Redacted<string>;
  readonly location: ConsoleLocation;
}

export interface CloudConfig {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

/** `ConsoleLocation` for a console on the local network. */
export const localConsole = (host: string): ConsoleLocation => ({ _tag: "Local", host });

/** `ConsoleLocation` for a console behind the cloud connector. */
export const cloudConsole = (consoleId: string, apiBaseUrl?: string): ConsoleLocation => ({
  _tag: "Cloud",
  consoleId,
  ...(apiBaseUrl === undefined ? {} : { apiBaseUrl }),
});

/** Base URL (everything before `/v1/...`) of one application on a console. */
export const consoleBaseUrl = (location: ConsoleLocation, app: ConsoleApp): string => {
  if (location._tag === "Local") {
    const origin = location.host.includes("://") ? location.host : `https://${location.host}`;
    return `${origin.replace(/\/+$/, "")}/proxy/${app}/integration`;
  }
  const origin = (location.apiBaseUrl ?? DEFAULT_CLOUD_BASE_URL).replace(/\/+$/, "");
  // `:` is legal in a path segment, and console IDs are `<hex>:<number>`.
  const id = encodeURIComponent(location.consoleId).replace(/%3A/gi, ":");
  return `${origin}/v1/connector/consoles/${id}/proxy/${app}/integration`;
};

export class ConsoleCredentials
  extends /*@__PURE__*/ Context.Service<
    ConsoleCredentials,
    Effect.Effect<ConsoleConfig, ConfigError>
  >()("UniFiConsoleCredentials") {}

export class CloudCredentials
  extends /*@__PURE__*/ Context.Service<
    CloudCredentials,
    Effect.Effect<CloudConfig, ConfigError>
  >()("UniFiCloudCredentials") {}

/** Layer for the console-hosted apps: a redacted key and where the console is. */
export const fromConsoleApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly location: ConsoleLocation;
}): Layer.Layer<ConsoleCredentials> =>
  Layer.succeed(
    ConsoleCredentials,
    Effect.succeed({ apiKey: config.apiKey, location: config.location }),
  );

/** Layer for the cloud-only APIs: a redacted Site Manager key. */
export const fromCloudApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<CloudCredentials> =>
  Layer.succeed(
    CloudCredentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_CLOUD_BASE_URL,
    }),
  );

/**
 * Reads `UNIFI_API_KEY` and where the console is: `UNIFI_CONSOLE_HOST`
 * (local) or, failing that, `UNIFI_CONSOLE_ID` (cloud connector, on
 * `UNIFI_CLOUD_API_BASE_URL` when set).
 */
export const ConsoleCredentialsFromEnv: Layer.Layer<ConsoleCredentials> =
  /*@__PURE__*/ Layer.succeed(
    ConsoleCredentials,
    /*@__PURE__*/ Effect.gen(function* () {
      const apiKey = process.env.UNIFI_API_KEY;
      if (!apiKey) {
        return yield* new ConfigError({
          message: "UNIFI_API_KEY environment variable is required",
        });
      }
      const host = process.env.UNIFI_CONSOLE_HOST;
      const consoleId = process.env.UNIFI_CONSOLE_ID;
      if (!host && !consoleId) {
        return yield* new ConfigError({
          message: "UNIFI_CONSOLE_HOST (local) or UNIFI_CONSOLE_ID (cloud connector) is required",
        });
      }
      return {
        apiKey: Redacted.make(apiKey),
        location: host
          ? localConsole(host)
          : cloudConsole(consoleId!, process.env.UNIFI_CLOUD_API_BASE_URL),
      };
    }),
  );

/** Reads `UNIFI_CLOUD_API_KEY` (required) and `UNIFI_CLOUD_API_BASE_URL` (optional). */
export const CloudCredentialsFromEnv: Layer.Layer<CloudCredentials> = /*@__PURE__*/ Layer.succeed(
  CloudCredentials,
  /*@__PURE__*/ Effect.gen(function* () {
    const apiKey = process.env.UNIFI_CLOUD_API_KEY;
    if (!apiKey) {
      return yield* new ConfigError({
        message: "UNIFI_CLOUD_API_KEY environment variable is required",
      });
    }
    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.UNIFI_CLOUD_API_BASE_URL ?? DEFAULT_CLOUD_BASE_URL,
    };
  }),
);

/** Both environment layers; each is only resolved by the calls that need it. */
export const CredentialsFromEnv: Layer.Layer<ConsoleCredentials | CloudCredentials> =
  /*@__PURE__*/ Layer.mergeAll(ConsoleCredentialsFromEnv, CloudCredentialsFromEnv);
