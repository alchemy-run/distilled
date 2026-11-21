import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * UniFi Network credentials -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Auth is an API key sent as `X-API-KEY`, created in
 * the Network application under Settings → Control Plane → Integrations.
 *
 * The Integration API is served from the console itself, or relayed through
 * Ubiquiti's cloud connector; both carry the paths in the spec after
 * `/proxy/network/integration`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  /** Everything before `/v1/...`; see {@link localConsoleUrl} and {@link cloudConsoleUrl}. */
  readonly apiBaseUrl: string;
}

/** Base URL of a console reached directly on the local network (`192.168.0.1`). */
export const localConsoleUrl = (host: string): string =>
  `https://${host}/proxy/network/integration`;

/**
 * Base URL of a console relayed through the UniFi Cloud Connector
 * (`https://api.ui.com`). `consoleId` is the console's ID as listed by
 * Ubiquiti's Site Manager API.
 */
export const cloudConsoleUrl = (consoleId: string): string =>
  `https://api.ui.com/v1/connector/consoles/${encodeURIComponent(consoleId)}/proxy/network/integration`;

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "UniFiNetworkCredentials",
  ) {}

/** Layer from a redacted API key and the console's base URL. */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({ apiKey: config.apiKey, apiBaseUrl: config.apiBaseUrl }),
  );

/**
 * Reads `UNIFI_API_KEY` (required) and where the console is, by the first of
 * `UNIFI_API_BASE_URL`, `UNIFI_CONSOLE_HOST` (local) or `UNIFI_CONSOLE_ID`
 * (cloud connector) that is set.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ Effect.gen(function* () {
    const apiKey = process.env.UNIFI_API_KEY;
    if (!apiKey) {
      return yield* new ConfigError({
        message: "UNIFI_API_KEY environment variable is required",
      });
    }

    const baseUrl = process.env.UNIFI_API_BASE_URL;
    const host = process.env.UNIFI_CONSOLE_HOST;
    const consoleId = process.env.UNIFI_CONSOLE_ID;
    const apiBaseUrl = baseUrl
      ? baseUrl
      : host
        ? localConsoleUrl(host)
        : consoleId
          ? cloudConsoleUrl(consoleId)
          : undefined;
    if (apiBaseUrl === undefined) {
      return yield* new ConfigError({
        message:
          "UNIFI_API_BASE_URL, UNIFI_CONSOLE_HOST or UNIFI_CONSOLE_ID environment variable is required",
      });
    }

    return { apiKey: Redacted.make(apiKey), apiBaseUrl };
  }),
);
