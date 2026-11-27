/**
 * Tinybird credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl }` per request; the
 * protocol formats the `Authorization: Bearer <token>` header from it. The
 * token is a Tinybird workspace token (static or JWT) with the scopes the
 * call needs (`ADMIN`, `DATASOURCES:CREATE`, `PIPES:READ:<pipe>`, ...).
 *
 * Every Tinybird workspace lives in one region, and each region has its own
 * API host (https://www.tinybird.co/docs/api-reference#regions-and-endpoints):
 * `https://api.tinybird.co` (GCP europe-west3) is the default,
 * `https://api.us-east.tinybird.co`, `https://api.eu-central-1.aws.tinybird.co`
 * and the rest are set through `TINYBIRD_API_BASE_URL` or `apiBaseUrl`. A
 * token sent to another region's host answers `404`.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as Redacted from "effect/Redacted";

/** The API host of Tinybird's default region (GCP europe-west3). */
export const DEFAULT_API_BASE_URL = "https://api.tinybird.co";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  /** The workspace region's API host, e.g. `https://api.us-east.tinybird.co`. */
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "TinybirdCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  token: /*@__PURE__*/ EffectConfig.Redacted("TINYBIRD_TOKEN"),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("TINYBIRD_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/**
 * Reads `TINYBIRD_TOKEN` and, optionally, `TINYBIRD_API_BASE_URL`.
 *
 * Its configuration is read and checked once, when the layer is built: a
 * problem there fails the layer with `ConfigError`.
 */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.effect(
  Credentials,
  /*@__PURE__*/ Effect.map(
    /*@__PURE__*/ envConfig.pipe(
      /*@__PURE__*/ Effect.mapError(
        () =>
          new ConfigError({
            message: "TINYBIRD_TOKEN environment variable is required",
          }),
      ),
    ),
    (config) => Effect.succeed(config),
  ),
);

/** Credentials from a redacted token and, optionally, the region's API host. */
export const credentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: config.token,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
