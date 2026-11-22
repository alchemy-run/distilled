/**
 * Steel credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, baseUrl }` per request; the
 * protocol sends the key as the `steel-api-key` header (the spec's `apiKey`
 * security scheme). The env names match Steel's official clients:
 * `STEEL_API_KEY`, and `STEEL_BASE_URL` for a self-hosted Steel browser
 * instead of Steel Cloud.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Steel Cloud's API (the spec's `servers` entry). */
export const DEFAULT_BASE_URL = "https://api.steel.dev";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  /** API base URL, without a trailing slash. */
  readonly baseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "SteelCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("STEEL_API_KEY"),
  baseUrl: /*@__PURE__*/ EffectConfig.String("STEEL_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_BASE_URL),
  ),
});

/** Reads `STEEL_API_KEY` (required) and `STEEL_BASE_URL` (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.map(({ apiKey, baseUrl }) => ({
      apiKey,
      baseUrl: baseUrl.replace(/\/+$/, ""),
    })),
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "STEEL_API_KEY environment variable is required" }),
    ),
  ),
);

/** Credentials from a redacted API key and an optional base URL. */
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
