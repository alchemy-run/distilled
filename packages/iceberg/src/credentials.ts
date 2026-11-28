import * as EffectConfig from "@distilled.cloud/core/config";
import type { Checked } from "@distilled.cloud/core/config";
/**
 * Iceberg REST Catalog credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ uri, token, prefix }` per request;
 * the protocol builds every URL from it.
 *
 * - `uri` is the catalog's REST endpoint -- what Iceberg clients call the
 *   catalog URI (`https://catalog.cloudflarestorage.com/<account>/<bucket>`
 *   for Basin Catalog, `http://localhost:8181` for a local REST catalog).
 *   Routes are `<uri>/v1/...`.
 * - `prefix` is the per-warehouse path segment a catalog hands out from
 *   `GET /v1/config` (`overrides.prefix`). It is CLIENT configuration, not
 *   an operation input: every catalog route is `<uri>/v1/<prefix>/...`, and a
 *   catalog with no prefix serves `<uri>/v1/...`. {@link fromCatalogConfig}
 *   resolves it for you from a warehouse name.
 * - `token` is sent as `Authorization: Bearer <token>`. It is optional
 *   because some catalogs (a local REST catalog, a sidecar) take none.
 *
 * A layer here reads and checks its configuration when it is built
 * ({@link check}): a missing catalog URI or a prefix that can't be a URL
 * path is a `ConfigError` at setup, and no call fails for it.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

export interface Config {
  /** Catalog REST endpoint, without the `/v1` suffix. */
  readonly uri: string;
  /** Per-warehouse route prefix from `GET /v1/config` (`overrides.prefix`). */
  readonly prefix?: string;
  /** Bearer token, when the catalog requires one. */
  readonly token?: Redacted.Redacted<string>;
}

/** What the service resolves: a {@link Config} that passed {@link check}. */
export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Checked<Config>>>()(
    "IcebergCredentials",
  ) {}

/** A `.` or `..` path segment, also percent-encoded (`%2e%2E`): URL parsers resolve both. */
const DOT_SEGMENT = /^(?:\.|%2e){1,2}$/i;

/**
 * Check `config`: fails with `ConfigError` for a prefix with a `.` or `..`
 * segment or a lone UTF-16 surrogate, which can't be a URL path. For a
 * `Credentials` layer of your own, for example one that rotates tokens.
 */
export const check = (config: Config): Effect.Effect<Checked<Config>, ConfigError> => {
  const prefix = config.prefix?.replace(/^\/+|\/+$/g, "");
  return !prefix || (prefix.isWellFormed() && !prefix.split("/").some((s) => DOT_SEGMENT.test(s)))
    ? // The one place that says a Config is checked.
      Effect.succeed(config as Checked<Config>)
    : Effect.fail(
        new ConfigError({
          message: `The configured Iceberg prefix ${JSON.stringify(String(config.prefix))} cannot be a URL path`,
        }),
      );
};

/** A layer that resolves and checks `config` once, when it is built. */
const layer = <R>(
  config: Effect.Effect<Config, ConfigError, R>,
): Layer.Layer<Credentials, ConfigError, R> =>
  Layer.effect(
    Credentials,
    Effect.map(Effect.flatMap(config, check), (checked) => Effect.succeed(checked)),
  );

const envConfig = /*@__PURE__*/ EffectConfig.all({
  uri: /*@__PURE__*/ EffectConfig.String("ICEBERG_CATALOG_URI"),
  prefix: /*@__PURE__*/ EffectConfig.String("ICEBERG_PREFIX").pipe(EffectConfig.option),
  token: /*@__PURE__*/ EffectConfig.Redacted("ICEBERG_TOKEN").pipe(EffectConfig.option),
});

/**
 * `ICEBERG_CATALOG_URI` (required), `ICEBERG_PREFIX` and `ICEBERG_TOKEN`
 * (optional). The environment is read, and the values checked, once: when
 * the layer is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ layer(
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "ICEBERG_CATALOG_URI environment variable is required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ uri, prefix, token }) => ({
      uri,
      prefix: Option.getOrUndefined(prefix),
      token: Option.getOrUndefined(token),
    })),
  ),
);

/** Convenience layer from a catalog URI, optional prefix and optional token. */
export const credentials = (config: Config): Layer.Layer<Credentials, ConfigError> =>
  layer(Effect.succeed(config));

/**
 * Resolve a warehouse to its catalog configuration once, at layer build:
 * `GET <uri>/v1/config?warehouse=<warehouse>`, then use the catalog's
 * `overrides` -- `prefix`, and `uri` when the catalog redirects clients to
 * another endpoint -- exactly as Iceberg clients do. The prefix the catalog
 * hands out is checked there too.
 *
 * @example
 * ```ts
 * const Catalog = Iceberg.fromCatalogConfig({
 *   uri: "https://catalog.cloudflarestorage.com/<account>/<bucket>",
 *   warehouse: "<account>_<bucket>",
 *   token: Redacted.make(process.env.CLOUDFLARE_API_TOKEN!),
 * });
 * ```
 */
export const fromCatalogConfig = (options: {
  readonly uri: string;
  readonly warehouse: string;
  readonly token?: Redacted.Redacted<string>;
}): Layer.Layer<Credentials, ConfigError, HttpClient.HttpClient> => {
  const failure = (message: string) =>
    new ConfigError({
      message: `Iceberg catalog config for warehouse ${options.warehouse}: ${message}`,
    });

  const resolve: Effect.Effect<Config, ConfigError, HttpClient.HttpClient> = Effect.gen(
    function* () {
      const client = yield* HttpClient.HttpClient;
      let request = HttpClientRequest.get(`${trimTrailingSlash(options.uri)}/v1/config`).pipe(
        HttpClientRequest.setUrlParam("warehouse", options.warehouse),
        HttpClientRequest.acceptJson,
      );
      if (options.token) {
        request = HttpClientRequest.bearerToken(request, Redacted.value(options.token));
      }
      const response = yield* client.execute(request);
      const body: unknown = yield* response.json;
      if (response.status < 200 || response.status >= 300) {
        return yield* Effect.fail(failure(errorMessage(body) ?? `HTTP ${response.status}`));
      }
      const overrides = readOverrides(body);
      return {
        uri: overrides.uri ?? options.uri,
        prefix: overrides.prefix,
        token: options.token,
      };
    },
  ).pipe(Effect.catchTag("HttpClientError", (error) => Effect.fail(failure(error.message))));

  return layer(resolve);
};

const trimTrailingSlash = (uri: string): string => uri.replace(/\/+$/, "");

const readOverrides = (body: unknown): { prefix?: string; uri?: string } => {
  const overrides =
    body !== null && typeof body === "object"
      ? (body as { overrides?: Record<string, unknown> }).overrides
      : undefined;
  return {
    prefix: typeof overrides?.prefix === "string" ? overrides.prefix : undefined,
    uri: typeof overrides?.uri === "string" ? overrides.uri : undefined,
  };
};

const errorMessage = (body: unknown): string | undefined => {
  const error =
    body !== null && typeof body === "object" ? (body as { error?: unknown }).error : undefined;
  const message =
    error !== null && typeof error === "object"
      ? (error as { message?: unknown }).message
      : undefined;
  return typeof message === "string" ? message : undefined;
};
