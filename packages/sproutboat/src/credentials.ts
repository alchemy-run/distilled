/**
 * Sproutboat credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, baseUrl }` per request; the
 * protocol sends the key as `Authorization: Bearer <key>`. The key is a team
 * API key (`sbk_...`) from the dashboard's Settings, API keys; it belongs to
 * one team and every call acts on that team's apps. `SPROUTBOAT_API_KEY`
 * holds it; `SPROUTBOAT_BASE_URL` points at another Cloud.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Sproutboat Cloud (the spec's `servers` entry, and the CLI's default). */
export const DEFAULT_BASE_URL = "https://dash.sproutboat.com";

export interface Config {
  /** Team API key, `sbk_...`. */
  readonly apiKey: Redacted.Redacted<string>;
  /** API base URL, without a trailing slash. */
  readonly baseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "SproutboatCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("SPROUTBOAT_API_KEY"),
  baseUrl: /*@__PURE__*/ EffectConfig.String("SPROUTBOAT_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_BASE_URL),
  ),
});

/** Reads `SPROUTBOAT_API_KEY` (required) and `SPROUTBOAT_BASE_URL` (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.map(({ apiKey, baseUrl }) => ({
      apiKey,
      baseUrl: baseUrl.replace(/\/+$/, ""),
    })),
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "SPROUTBOAT_API_KEY environment variable is required" }),
    ),
  ),
);

/** Credentials from a redacted team API key and an optional base URL. */
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
