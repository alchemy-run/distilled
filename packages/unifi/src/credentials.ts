import { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { encodeLabel } from "@distilled.cloud/core/protocol-http";
/**
 * UniFi credentials -- hand-written.
 *
 * A call is described by two independent layers:
 *
 *   - {@link ApiKey}: who you are. Every UniFi API takes a key in `X-API-KEY`.
 *     A key created in a console's application (Settings > Control Plane >
 *     Integrations) works on that console only; a Site Manager key
 *     (unifi.ui.com/settings/api-keys) works against `api.ui.com`, including
 *     the cloud connector, which also needs console firmware >= 5.0.3.
 *   - {@link Console}: where the console is. Only the console-hosted apps
 *     (Network, Protect, InnerSpace) need it; they run on the console and are
 *     reached either directly on the local network
 *     (`https://<host>/proxy/<app>/integration`) or relayed through the cloud
 *     connector on `api.ui.com`
 *     (`/v1/connector/consoles/<consoleId>/proxy/<app>/integration`).
 *     Site Manager, Mobility and Carrier Fabric are served by `api.ui.com`
 *     alone, so they need the key and no console.
 *
 * Each service holds an *effect* that resolves its value on every request
 * (the protocol resolves it per request on the calling fiber), so a layer
 * that is never used is never resolved. Swap the {@link Console} layer to
 * move the same key between consoles, or between local and remote.
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
  | { readonly _tag: "Remote"; readonly consoleId: string; readonly apiBaseUrl?: string };

/** What a console-hosted call needs: the key and where the console is. */
export interface ConsoleConfig {
  readonly apiKey: Redacted.Redacted<string>;
  readonly location: ConsoleLocation;
}

/** What a cloud-only call needs: the key. */
export interface CloudConfig {
  readonly apiKey: Redacted.Redacted<string>;
}

/**
 * Base URL (everything before `/v1/...`) of one application on a console.
 * Returns a {@link ConfigError} for a console ID that can't be a path segment
 * (`.`, `..`, a lone UTF-16 surrogate); the protocol fails the call with it.
 */
export const consoleBaseUrl = (
  location: ConsoleLocation,
  app: ConsoleApp,
): string | ConfigError => {
  if (location._tag === "Local") {
    const origin = location.host.includes("://") ? location.host : `https://${location.host}`;
    return `${origin.replace(/\/+$/, "")}/proxy/${app}/integration`;
  }
  const origin = (location.apiBaseUrl ?? DEFAULT_CLOUD_BASE_URL).replace(/\/+$/, "");
  const encoded = encodeLabel("consoleId", location.consoleId);
  if (encoded instanceof InvalidInput) {
    return new ConfigError({
      message: `The configured UniFi console ID ${JSON.stringify(location.consoleId)} cannot be a URL path segment`,
    });
  }
  // `:` is legal in a path segment, and console IDs are `<hex>:<number>`.
  const id = encoded.replace(/%3A/gi, ":");
  return `${origin}/v1/connector/consoles/${id}/proxy/${app}/integration`;
};

/**
 * A `console` given on a call, checked: a Local location with a host, or a
 * Remote one with a console ID that can be a path segment. Anything else is
 * an {@link InvalidInput} on the `console` member.
 */
export const checkConsoleLocation = (value: unknown): ConsoleLocation | InvalidInput => {
  const invalid = (why: string) =>
    new InvalidInput({
      member: "console",
      message: `Input member console ${why}: expected { _tag: "Local", host } or { _tag: "Remote", consoleId }`,
    });
  if (value === null || typeof value !== "object") return invalid("is not an object");
  const location = value as Record<string, unknown>;
  if (location._tag === "Local") {
    return typeof location.host === "string" && location.host.trim() !== ""
      ? { _tag: "Local", host: location.host }
      : invalid("has no host");
  }
  if (location._tag !== "Remote") return invalid("has no Local or Remote _tag");
  if (typeof location.consoleId !== "string" || location.consoleId.trim() === "") {
    return invalid("has no consoleId");
  }
  if (location.apiBaseUrl !== undefined && typeof location.apiBaseUrl !== "string") {
    return invalid("has an apiBaseUrl that is not a string");
  }
  const encoded = encodeLabel("console", location.consoleId);
  if (encoded instanceof InvalidInput) return encoded;
  return location.apiBaseUrl === undefined
    ? { _tag: "Remote", consoleId: location.consoleId }
    : { _tag: "Remote", consoleId: location.consoleId, apiBaseUrl: location.apiBaseUrl };
};

/** The API key, redacted. */
export class ApiKey
  extends /*@__PURE__*/ Context.Service<
    ApiKey,
    Effect.Effect<Redacted.Redacted<string>, ConfigError>
  >()("UniFiApiKey") {}

/** Where the console is. Needed by Network, Protect and InnerSpace only. */
export class Console
  extends /*@__PURE__*/ Context.Service<Console, Effect.Effect<ConsoleLocation, ConfigError>>()(
    "UniFiConsole",
  ) {}

/** Layer providing the key. */
export const apiKey = (key: Redacted.Redacted<string>): Layer.Layer<ApiKey> =>
  Layer.succeed(ApiKey, Effect.succeed(key));

/**
 * Layer for a console on the local network: a host (`192.168.0.1`) or an
 * origin (`https://192.168.0.1`). Use with a key created in the console.
 */
export const localConsole = (host: string): Layer.Layer<Console> =>
  Layer.succeed(Console, Effect.succeed({ _tag: "Local", host }));

/**
 * Layer for a console behind the cloud connector, by its ID (`id` in Site
 * Manager's `listHosts`). Use with a Site Manager key. `apiBaseUrl` replaces
 * `https://api.ui.com`.
 */
export const remoteConsole = (consoleId: string, apiBaseUrl?: string): Layer.Layer<Console> =>
  Layer.succeed(
    Console,
    Effect.succeed({
      _tag: "Remote",
      consoleId,
      ...(apiBaseUrl === undefined ? {} : { apiBaseUrl }),
    }),
  );

/** Reads `UNIFI_API_KEY`. */
export const ApiKeyFromEnv: Layer.Layer<ApiKey> = /*@__PURE__*/ Layer.succeed(
  ApiKey,
  /*@__PURE__*/ Effect.gen(function* () {
    const key = process.env.UNIFI_API_KEY;
    if (!key) {
      return yield* new ConfigError({ message: "UNIFI_API_KEY environment variable is required" });
    }
    return Redacted.make(key);
  }),
);

/**
 * Reads where the console is: `UNIFI_CONSOLE_HOST` (local) or, failing that,
 * `UNIFI_CONSOLE_ID` (cloud connector, on `UNIFI_CLOUD_API_BASE_URL` when set).
 */
export const ConsoleFromEnv: Layer.Layer<Console> = /*@__PURE__*/ Layer.succeed(
  Console,
  /*@__PURE__*/ Effect.gen(function* () {
    const host = process.env.UNIFI_CONSOLE_HOST;
    if (host) return { _tag: "Local", host } as const;
    const consoleId = process.env.UNIFI_CONSOLE_ID;
    if (!consoleId) {
      return yield* new ConfigError({
        message: "UNIFI_CONSOLE_HOST (local) or UNIFI_CONSOLE_ID (cloud connector) is required",
      });
    }
    const apiBaseUrl = process.env.UNIFI_CLOUD_API_BASE_URL;
    return {
      _tag: "Remote",
      consoleId,
      ...(apiBaseUrl === undefined ? {} : { apiBaseUrl }),
    } as const;
  }),
);

/** Both environment layers; each is only resolved by the calls that need it. */
export const CredentialsFromEnv: Layer.Layer<ApiKey | Console> = /*@__PURE__*/ Layer.mergeAll(
  ApiKeyFromEnv,
  ConsoleFromEnv,
);
