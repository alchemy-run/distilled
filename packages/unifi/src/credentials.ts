import type { Checked } from "@distilled.cloud/core/config";
import { ConfigError, InvalidInput } from "@distilled.cloud/core/errors";
import { invalidLabel, originFromConfig } from "@distilled.cloud/core/protocol-http";
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
 * (the protocol resolves it per request on the calling fiber). Swap the
 * {@link Console} layer to move the same key between consoles, or between
 * local and remote.
 *
 * A layer here reads and checks what it is given when it is built: a missing
 * key, a local host that is more than a host, or a console ID that can't be
 * a URL path segment ({@link check}) is a `ConfigError` at setup, and no
 * call fails for it. An environment without
 * a console is fine until a console-hosted call needs one: only that call
 * fails.
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

/**
 * Builds a {@link ConsoleLocation}, for one call's `console` member or for
 * {@link consoleLayer}.
 *
 * @example
 * ```ts
 * const office = Unifi.ConsoleLocation.remote("<consoleId>");
 * Unifi.getSiteOverviewPage({ console: office });
 * ```
 */
export const ConsoleLocation = {
  /** A console on the local network: a host (`192.168.0.1`, `udm.lan:8443`) or an origin. */
  local: (host: string): ConsoleLocation => ({ _tag: "Local", host }),
  /** A console behind the cloud connector, by its ID (`id` in Site Manager's `listHosts`). */
  remote: (consoleId: string): ConsoleLocation => ({ _tag: "Remote", consoleId }),
};

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
 * `location`, checked, or the `ConfigError` refusing it. The checked location
 * of a local console holds its origin as `host`.
 */
const checked = (location: ConsoleLocation): Checked<ConsoleLocation> | ConfigError => {
  // The one place that says a ConsoleLocation is checked.
  if (location._tag === "Local") {
    const origin = originFromConfig("UniFi console host", location.host);
    return origin instanceof ConfigError
      ? origin
      : ({ _tag: "Local", host: origin } as Checked<ConsoleLocation>);
  }
  return invalidLabel("consoleId", location.consoleId) === undefined
    ? (location as Checked<ConsoleLocation>)
    : new ConfigError({
        message: `The configured UniFi console ID ${JSON.stringify(location.consoleId)} cannot be a URL path segment`,
      });
};

/**
 * Check `location`: fails with `ConfigError` for a local host that is more
 * than a host or origin (core `originFromConfig`), or a console ID that
 * can't be a URL path segment (`.`, `..`, a lone UTF-16 surrogate). For a
 * {@link Console} layer of your own.
 */
export const check = (
  location: ConsoleLocation,
): Effect.Effect<Checked<ConsoleLocation>, ConfigError> => {
  const result = checked(location);
  return result instanceof ConfigError ? Effect.fail(result) : Effect.succeed(result);
};

/**
 * Base URL (everything before `/v1/...`) of one application on a console.
 * {@link check} made the local host an origin, and made sure the console ID
 * can be a path segment.
 */
export const consoleBaseUrl = (location: Checked<ConsoleLocation>, app: ConsoleApp): string => {
  if (location._tag === "Local") return `${location.host}/proxy/${app}/integration`;
  const origin = (location.apiBaseUrl ?? DEFAULT_CLOUD_BASE_URL).replace(/\/+$/, "");
  // `:` is legal in a path segment, and console IDs are `<hex>:<number>`.
  const id = encodeURIComponent(location.consoleId).replace(/%3A/gi, ":");
  return `${origin}/v1/connector/consoles/${id}/proxy/${app}/integration`;
};

/**
 * A `console` given on a call, checked: a Local location with a host that
 * is a host or origin, or a Remote one with a console ID that can be a path
 * segment. Anything else is an {@link InvalidInput} on the `console` member:
 * the value is an input of the call.
 */
export const checkConsoleLocation = (value: unknown): Checked<ConsoleLocation> | InvalidInput => {
  const invalid = (why: string) =>
    new InvalidInput({
      member: "console",
      message: `Input member console ${why}: expected ConsoleLocation.local(host) or ConsoleLocation.remote(consoleId)`,
    });
  if (value === null || typeof value !== "object") return invalid("is not an object");
  const location = value as Record<string, unknown>;
  if (location._tag === "Local") {
    if (typeof location.host !== "string" || location.host.trim() === "") {
      return invalid("has no host");
    }
    const local = checked({ _tag: "Local", host: location.host });
    return local instanceof ConfigError
      ? new InvalidInput({ member: "console", message: `Input member console: ${local.message}` })
      : local;
  }
  if (location._tag !== "Remote") return invalid("has no Local or Remote _tag");
  if (typeof location.consoleId !== "string" || location.consoleId.trim() === "") {
    return invalid("has no consoleId");
  }
  if (location.apiBaseUrl !== undefined && typeof location.apiBaseUrl !== "string") {
    return invalid("has an apiBaseUrl that is not a string");
  }
  const refused = invalidLabel("console", location.consoleId);
  if (refused !== undefined) return refused;
  const remote = checked(
    location.apiBaseUrl === undefined
      ? { _tag: "Remote", consoleId: location.consoleId }
      : { _tag: "Remote", consoleId: location.consoleId, apiBaseUrl: location.apiBaseUrl },
  );
  return remote instanceof ConfigError
    ? invalid("has a consoleId that is not a path segment")
    : remote;
};

/** The API key, redacted. */
export class ApiKey
  extends /*@__PURE__*/ Context.Service<ApiKey, Effect.Effect<Redacted.Redacted<string>>>()(
    "UniFiApiKey",
  ) {}

/**
 * Where the console is, for Network, Protect and InnerSpace: a
 * {@link ConsoleLocation} that passed {@link check}. Optional, like AWS's
 * `Region`: operations do not list it, and a call's own `console` member
 * takes its place. A call with neither fails with {@link ConfigError}, and so
 * does one whose environment names no console ({@link ConsoleFromEnv}).
 */
export class Console
  extends /*@__PURE__*/ Context.Service<
    Console,
    Effect.Effect<Checked<ConsoleLocation>, ConfigError>
  >()("UniFiConsole") {}

/**
 * Layer from a redacted API key and, for Network, Protect and InnerSpace, the
 * console every call in its scope goes to. Site Manager, Mobility and Carrier
 * Fabric need no console.
 *
 * @example
 * ```ts
 * Unifi.fromApiKey({ apiKey, console: Unifi.ConsoleLocation.local("192.168.0.1") });
 * ```
 */
export function fromApiKey(config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly console: ConsoleLocation;
}): Layer.Layer<ApiKey | Console>;
export function fromApiKey(config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly console?: undefined;
}): Layer.Layer<ApiKey>;
export function fromApiKey(config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly console?: ConsoleLocation | undefined;
}): Layer.Layer<ApiKey> | Layer.Layer<ApiKey | Console> {
  const key = Layer.succeed(ApiKey, Effect.succeed(config.apiKey));
  return config.console === undefined ? key : Layer.mergeAll(key, consoleLayer(config.console));
}

/**
 * Layer that sends every call in its scope to one console, built with
 * {@link ConsoleLocation}. The location is checked once, when the layer is
 * built ({@link check}).
 */
export const consoleLayer = (location: ConsoleLocation): Layer.Layer<Console, ConfigError> =>
  Layer.effect(
    Console,
    Effect.map(check(location), (location) => Effect.succeed(location)),
  );

/**
 * Layer for a console on the local network: a host (`192.168.0.1`) or an
 * origin (`https://192.168.0.1`). Use with a key created in the console. A
 * host that is more than a host fails the layer with `ConfigError`.
 */
export const localConsole = (host: string): Layer.Layer<Console, ConfigError> =>
  consoleLayer(ConsoleLocation.local(host));

/**
 * Layer for a console behind the cloud connector, by its ID (`id` in Site
 * Manager's `listHosts`). Use with a Site Manager key. `apiBaseUrl` replaces
 * `https://api.ui.com`. A console ID that can't be a URL path segment fails
 * the layer with `ConfigError`.
 */
export const remoteConsole = (
  consoleId: string,
  apiBaseUrl?: string,
): Layer.Layer<Console, ConfigError> =>
  consoleLayer(
    apiBaseUrl === undefined
      ? ConsoleLocation.remote(consoleId)
      : { _tag: "Remote", consoleId, apiBaseUrl },
  );

/**
 * Reads `UNIFI_API_KEY`, once: when the layer is built. Every call needs
 * the key, so a missing one fails the layer with `ConfigError`.
 */
export const ApiKeyFromEnv: Layer.Layer<ApiKey, ConfigError> = /*@__PURE__*/ Layer.effect(
  ApiKey,
  /*@__PURE__*/ Effect.gen(function* () {
    const key = process.env.UNIFI_API_KEY;
    if (!key) {
      return yield* new ConfigError({ message: "UNIFI_API_KEY environment variable is required" });
    }
    return Effect.succeed(Redacted.make(key));
  }),
);

/**
 * Reads where the console is: `UNIFI_CONSOLE_HOST` (local) or, failing that,
 * `UNIFI_CONSOLE_ID` (cloud connector, on `UNIFI_CLOUD_API_BASE_URL` when set).
 * The environment is read, and the console ID checked, once: when the layer
 * is built. With neither variable set the layer still builds, because the
 * cloud-only APIs need no console; a console-hosted call then fails with
 * `ConfigError`.
 */
export const ConsoleFromEnv: Layer.Layer<Console, ConfigError> = /*@__PURE__*/ Layer.effect(
  Console,
  /*@__PURE__*/ Effect.gen(function* () {
    const host = process.env.UNIFI_CONSOLE_HOST;
    if (host) return Effect.succeed(yield* check({ _tag: "Local", host }));
    const consoleId = process.env.UNIFI_CONSOLE_ID;
    if (!consoleId) {
      // Only a console-hosted call knows it needs a console: it fails with this.
      return Effect.fail(
        new ConfigError({
          message: "UNIFI_CONSOLE_HOST (local) or UNIFI_CONSOLE_ID (cloud connector) is required",
        }),
      );
    }
    const apiBaseUrl = process.env.UNIFI_CLOUD_API_BASE_URL;
    return Effect.succeed(
      yield* check({
        _tag: "Remote",
        consoleId,
        ...(apiBaseUrl === undefined ? {} : { apiBaseUrl }),
      }),
    );
  }),
);

/** Both environment layers, each read once: when the layer is built. */
export const CredentialsFromEnv: Layer.Layer<ApiKey | Console, ConfigError> =
  /*@__PURE__*/ Layer.mergeAll(ApiKeyFromEnv, ConsoleFromEnv);
