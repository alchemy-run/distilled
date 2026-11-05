/**
 * Proxmox VE credentials (hand-written).
 *
 * The `Credentials` service resolves `{ endpoint, tokenId, tokenSecret }` per
 * request; the protocol formats the
 * `Authorization: PVEAPIToken=<tokenId>=<tokenSecret>` header from it. The
 * token ID has the form `<user>@<realm>!<token name>`.
 *
 * TLS settings are not part of the credentials. A node with a certificate
 * from a private CA needs an HTTP client that trusts that CA (see the
 * README).
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as Redacted from "effect/Redacted";

export interface Config {
  /** The API root, `https://<host>:8006/api2/json`. */
  readonly endpoint: string;
  readonly tokenId: Redacted.Redacted<string>;
  readonly tokenSecret: Redacted.Redacted<string>;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "ProxmoxCredentials",
  ) {}

/**
 * The API root for an endpoint given as `https://<host>:8006` or
 * `https://<host>:8006/api2/json`. Throws for anything else, so a token is
 * never sent over plain HTTP or to another path.
 */
export const normalizeEndpoint = (endpoint: string): string => {
  const url = new URL(endpoint);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new Error("Proxmox endpoint must be HTTPS without credentials, query or fragment");
  }
  const path = url.pathname.replace(/\/+$/, "");
  if (path !== "" && path !== "/api2/json") {
    throw new Error("Proxmox endpoint path must be /api2/json");
  }
  url.pathname = "/api2/json";
  return url.href;
};

const resolve = (config: Config): Effect.Effect<Config, ConfigError> => {
  try {
    return Effect.succeed({ ...config, endpoint: normalizeEndpoint(config.endpoint) });
  } catch (error) {
    return Effect.fail(
      new ConfigError({
        message: error instanceof Error ? error.message : "Invalid Proxmox endpoint",
      }),
    );
  }
};

const envConfig = /*@__PURE__*/ EffectConfig.all({
  endpoint: /*@__PURE__*/ EffectConfig.String("PROXMOX_ENDPOINT"),
  tokenId: /*@__PURE__*/ EffectConfig.Redacted("PROXMOX_TOKEN_ID"),
  tokenSecret: /*@__PURE__*/ EffectConfig.Redacted("PROXMOX_TOKEN_SECRET"),
});

/** Reads `PROXMOX_ENDPOINT`, `PROXMOX_TOKEN_ID` and `PROXMOX_TOKEN_SECRET`. */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message:
            "PROXMOX_ENDPOINT, PROXMOX_TOKEN_ID and PROXMOX_TOKEN_SECRET environment variables are required",
        }),
    ),
    /*@__PURE__*/ Effect.flatMap(resolve),
  ),
);

/** Convenience layer from an endpoint and a token. */
export const credentials = (config: Config): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, resolve(config));
