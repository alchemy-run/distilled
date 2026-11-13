/**
 * boxd credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl }` per request; the
 * protocol sends the token as `authorization: Bearer <token>`. The token is a
 * boxd API key (`bxd_...`) or a session token: boxd takes an API key as the
 * bearer itself over TLS, as the official SDKs send it.
 *
 * The environment variables are the official SDKs': `BOXD_API_KEY` or
 * `BOXD_TOKEN`, and `BOXD_BASE_URL` (or its deprecated alias
 * `BOXD_API_URL`) for another endpoint.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as Redacted from "effect/Redacted";

/** boxd's production API endpoint (the official SDKs' default). */
export const DEFAULT_API_BASE_URL = "https://boxd.sh:9443";

export interface Config {
  /** An API key (`bxd_...`) or a session token, sent as the bearer. */
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "BoxdCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  token: /*@__PURE__*/ EffectConfig.Redacted("BOXD_API_KEY").pipe(
    /*@__PURE__*/ EffectConfig.orElse(() => EffectConfig.Redacted("BOXD_TOKEN")),
  ),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("BOXD_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.orElse(() =>
      EffectConfig.String("BOXD_API_URL").pipe(EffectConfig.withDefault(DEFAULT_API_BASE_URL)),
    ),
  ),
});

/**
 * Reads `BOXD_API_KEY` (or `BOXD_TOKEN`), and optionally `BOXD_BASE_URL`
 * (or `BOXD_API_URL`).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "BOXD_API_KEY (or BOXD_TOKEN) environment variable is required",
        }),
    ),
  ),
);

/** Layer from a redacted API key or token, and an optional endpoint. */
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
