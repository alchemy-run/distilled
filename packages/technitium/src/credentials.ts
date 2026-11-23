/**
 * Technitium credentials -- hand-written.
 *
 * The `Credentials` service holds an effect that resolves the credentials on every request; the
 * protocol sends the token as `Authorization: Bearer <token>`, never as a query or form
 * parameter. Use a non-expiring API token (`user/createToken` or Administration > Sessions >
 * Create Token in the web console) of a user that has only the permissions it needs.
 *
 * A layer here reads and checks its configuration when it is built: a missing variable or an
 * address that is not an HTTPS origin is a `ConfigError` at setup, and no call fails for it.
 *
 * Every Technitium server is self-hosted, so there is no default address. Operation paths start
 * with `/api`, so the address is an origin without a path, such as `https://dns.example.com:53443`.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as Redacted from "effect/Redacted";

export interface Config {
  /** API token, sent as `Authorization: Bearer <token>`. */
  readonly apiToken: Redacted.Redacted<string>;
  /** Origin of the web service, such as `https://dns.example.com:53443`. */
  readonly apiUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "TechnitiumCredentials",
  ) {}

const LOOPBACK = new Set(["127.0.0.1", "localhost", "[::1]"]);

/**
 * Checks a web service address and returns its origin. It must be HTTPS and have no path, query
 * or user info, because the token travels in a header that plain HTTP exposes on the network.
 * Plain HTTP is accepted on the loopback interface only, for a local server or an SSH tunnel.
 */
export function normalizeApiUrl(value: string): Effect.Effect<string, ConfigError> {
  const invalid = (reason: string) =>
    Effect.fail(new ConfigError({ message: `Technitium API URL ${reason}` }));
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return invalid("is not a URL");
  }
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/")
    return invalid("must be an origin such as https://dns.example.com:53443, without a path");
  if (url.protocol !== "https:" && !(url.protocol === "http:" && LOOPBACK.has(url.hostname)))
    return invalid("must use HTTPS unless it is a loopback address");
  return Effect.succeed(url.origin);
}

/** A layer that resolves and checks `config` once, when it is built. */
const layer = (config: Effect.Effect<Config, ConfigError>): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(config, (resolved) => Effect.succeed(resolved)),
  );

/** Credentials from a token and the web service origin, which is checked when the layer is built. */
export const fromApiToken = (config: {
  readonly apiToken: Redacted.Redacted<string>;
  readonly apiUrl: string;
}): Layer.Layer<Credentials, ConfigError> =>
  layer(
    Effect.map(normalizeApiUrl(config.apiUrl), (apiUrl) => ({ apiToken: config.apiToken, apiUrl })),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiToken: /*@__PURE__*/ EffectConfig.Redacted("TECHNITIUM_API_TOKEN"),
  apiUrl: /*@__PURE__*/ EffectConfig.String("TECHNITIUM_API_URL"),
});

/**
 * Reads `TECHNITIUM_API_TOKEN` and `TECHNITIUM_API_URL`, both required. The environment is read,
 * and the values checked, once: when the layer is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ layer(
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "TECHNITIUM_API_TOKEN and TECHNITIUM_API_URL environment variables are required",
        }),
    ),
    /*@__PURE__*/ Effect.flatMap(({ apiToken, apiUrl }) =>
      Effect.map(normalizeApiUrl(apiUrl), (origin) => ({ apiToken, apiUrl: origin })),
    ),
  ),
);
