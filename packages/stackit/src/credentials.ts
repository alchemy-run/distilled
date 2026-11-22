/**
 * STACKIT credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ token, region }` per request; the
 * protocol formats the `Authorization: Bearer <token>` header from it
 * and rewrites each operation's spec `servers` URL for the region. The token
 * is a STACKIT service-account access token -- the same value the official
 * Go SDK, CLI and Terraform provider read from
 * `STACKIT_SERVICE_ACCOUNT_TOKEN`. Key-file exchange
 * (`STACKIT_SERVICE_ACCOUNT_KEY_PATH`) is not modelled: mint the token
 * outside the SDK.
 *
 * Each STACKIT product has its own host (`iaas.api.eu01.stackit.cloud`,
 * `ske.api.eu01.stackit.cloud`, ...). The per-operation host is baked into
 * the generated `T.Http` trait from the OpenAPI `servers` entry; `region`
 * (default `eu01`) is substituted at request time. An explicit `apiBaseUrl`
 * overrides that host for every call -- a proxy, not a per-product map.
 *
 * A layer here reads and checks its configuration when it is built
 * ({@link check}): a missing token or a region that can't be a host label
 * is a `ConfigError` at setup, and no call fails for it.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import type { Checked } from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import { invalidHostLabelConfig } from "@distilled.cloud/core/protocol-http";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** STACKIT's primary public region (Schwarz IT / Germany). */
export const DEFAULT_REGION = "eu01";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  /**
   * Region inserted into product hosts (`eu01` ->
   * `https://iaas.api.eu01.stackit.cloud`). `"global"` leaves the spec URL
   * unchanged.
   */
  readonly region: string;
  /** When set, every operation uses this host instead of the spec's. */
  readonly apiBaseUrl?: string;
}

/** What the service resolves: a {@link Config} that passed {@link check}. */
export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Checked<Config>>>()(
    "StackitCredentials",
  ) {}

/**
 * Check `config`: fails with `ConfigError` for a region that can't be a
 * label of the product host name. An `apiBaseUrl` replaces that host, so
 * the region is not checked with one. For a `Credentials` layer of your
 * own, for example one that rotates tokens.
 */
export const check = (config: Config): Effect.Effect<Checked<Config>, ConfigError> => {
  // The region becomes a label of the host name (`applyRegion` accepts the
  // spec's glued `eu01.` form too).
  const invalid =
    config.apiBaseUrl !== undefined && config.apiBaseUrl !== ""
      ? undefined
      : invalidHostLabelConfig(
          "STACKIT region",
          config.region.endsWith(".") ? config.region.slice(0, -1) : config.region,
        );
  // The one place that says a Config is checked.
  return invalid === undefined ? Effect.succeed(config as Checked<Config>) : Effect.fail(invalid);
};

/** A layer that resolves and checks `config` once, when it is built. */
const layer = (config: Effect.Effect<Config, ConfigError>): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(Effect.flatMap(config, check), (checked) => Effect.succeed(checked)),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  // `STACKIT_SERVICE_ACCOUNT_TOKEN` / `STACKIT_REGION` are what the
  // official Go SDK, CLI and Terraform provider read.
  token: /*@__PURE__*/ EffectConfig.String("STACKIT_SERVICE_ACCOUNT_TOKEN"),
  region: /*@__PURE__*/ EffectConfig.String("STACKIT_REGION").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_REGION),
  ),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("STACKIT_API_BASE_URL").pipe(EffectConfig.option),
});

/**
 * Credentials from `STACKIT_SERVICE_ACCOUNT_TOKEN`, `STACKIT_REGION` and
 * `STACKIT_API_BASE_URL`. The environment is read, and the values checked,
 * once: when the layer is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ layer(
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "STACKIT_SERVICE_ACCOUNT_TOKEN environment variable is required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ token, region, apiBaseUrl }) => ({
      token: Redacted.make(token),
      region,
      apiBaseUrl: apiBaseUrl._tag === "Some" ? apiBaseUrl.value : undefined,
    })),
  ),
);

/** Convenience layer from a redacted token + optional region / base URL. */
export const credentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly region?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials, ConfigError> =>
  layer(
    Effect.succeed({
      token: config.token,
      region: config.region ?? DEFAULT_REGION,
      apiBaseUrl: config.apiBaseUrl,
    }),
  );
