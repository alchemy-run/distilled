/**
 * ClickHouse Cloud credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ keyId, keySecret, apiBaseUrl }` per
 * request; the protocol sends them as `Authorization: Basic` (key ID as the
 * username, key secret as the password), the scheme the OpenAPI document
 * declares as `basicAuth`. Keys are created in the ClickHouse Cloud console or
 * with `apiKeys.createApiKey`; the secret is shown once, at creation.
 *
 * Every operation path already carries the `/v1` prefix, so `apiBaseUrl` is
 * the API origin.
 *
 * @see https://clickhouse.com/docs/cloud/manage/openapi
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** ClickHouse Cloud's API origin (the spec's `servers` entry). */
export const DEFAULT_API_BASE_URL = "https://api.clickhouse.cloud";

export interface Config {
  /** API key ID, sent as the Basic-auth username. */
  readonly keyId: string;
  /** API key secret, sent as the Basic-auth password. */
  readonly keySecret: Redacted.Redacted<string>;
  /** API origin, without a trailing slash. */
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "ClickHouseCloudCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  keyId: /*@__PURE__*/ EffectConfig.String("CLICKHOUSE_CLOUD_API_KEY_ID"),
  keySecret: /*@__PURE__*/ EffectConfig.Redacted("CLICKHOUSE_CLOUD_API_KEY_SECRET"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("CLICKHOUSE_CLOUD_API_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/**
 * Reads `CLICKHOUSE_CLOUD_API_KEY_ID` and `CLICKHOUSE_CLOUD_API_KEY_SECRET`
 * (both required) and `CLICKHOUSE_CLOUD_API_URL` (optional).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.map(({ keyId, keySecret, apiBaseUrl }) => ({
      keyId,
      keySecret,
      apiBaseUrl: apiBaseUrl.replace(/\/+$/, ""),
    })),
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message:
            "CLICKHOUSE_CLOUD_API_KEY_ID and CLICKHOUSE_CLOUD_API_KEY_SECRET environment variables are required",
        }),
    ),
  ),
);

/** Credentials from an API key ID, its redacted secret and an optional origin. */
export const credentials = (config: {
  readonly keyId: string;
  readonly keySecret: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      keyId: config.keyId,
      keySecret: config.keySecret,
      apiBaseUrl: (config.apiBaseUrl ?? DEFAULT_API_BASE_URL).replace(/\/+$/, ""),
    }),
  );
