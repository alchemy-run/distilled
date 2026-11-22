/**
 * Mollie credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, baseUrl }` per request; the
 * protocol sends the key as `Authorization: Bearer <key>`. Every scheme the
 * spec declares for `/v2` is a bearer token: a profile API key (`live_...`
 * or `test_...`), an organization access token (`access_...`), or an OAuth
 * access token. `MOLLIE_API_KEY` holds any of them; `MOLLIE_BASE_URL`
 * points at another API host.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Mollie's public API (the spec's `servers` entry). */
export const DEFAULT_BASE_URL = "https://api.mollie.com";

export interface Config {
  /** API key, organization access token or OAuth access token. */
  readonly apiKey: Redacted.Redacted<string>;
  /** API base URL, without a trailing slash. */
  readonly baseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "MollieCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("MOLLIE_API_KEY"),
  baseUrl: /*@__PURE__*/ EffectConfig.String("MOLLIE_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_BASE_URL),
  ),
});

/** Reads `MOLLIE_API_KEY` (required) and `MOLLIE_BASE_URL` (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.map(({ apiKey, baseUrl }) => ({
      apiKey,
      baseUrl: baseUrl.replace(/\/+$/, ""),
    })),
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "MOLLIE_API_KEY environment variable is required" }),
    ),
  ),
);

/** Credentials from a redacted API key (or access token) and an optional base URL. */
export const fromApiKey = (config: {
  readonly apiKey: Redacted.Redacted<string>;
  readonly baseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      baseUrl: (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, ""),
    }),
  );
