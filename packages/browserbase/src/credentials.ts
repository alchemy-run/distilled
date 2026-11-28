/**
 * Browserbase credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, baseUrl }` per request; the
 * protocol sends the key as the `X-BB-API-Key` header (the spec's
 * `BrowserbaseAuth` apiKey scheme). The env names match Browserbase's
 * official clients: `BROWSERBASE_API_KEY`, and `BROWSERBASE_BASE_URL` to
 * point at another API host.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** Browserbase's public API (the spec's `servers` entry). */
export const DEFAULT_BASE_URL = "https://api.browserbase.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  /** API base URL, without a trailing slash. */
  readonly baseUrl: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "BrowserbaseCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("BROWSERBASE_API_KEY"),
  baseUrl: /*@__PURE__*/ EffectConfig.String("BROWSERBASE_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_BASE_URL),
  ),
});

/**
 * Reads `BROWSERBASE_API_KEY` (required) and `BROWSERBASE_BASE_URL` (optional).
 *
 * Its configuration is read and checked once, when the layer is built: a
 * problem there fails the layer with `ConfigError`.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ Layer.effect(
  Credentials,
  /*@__PURE__*/ Effect.map(
    /*@__PURE__*/ envConfig.pipe(
      /*@__PURE__*/ Effect.map(({ apiKey, baseUrl }) => ({
        apiKey,
        baseUrl: baseUrl.replace(/\/+$/, ""),
      })),
      /*@__PURE__*/ Effect.mapError(
        () => new ConfigError({ message: "BROWSERBASE_API_KEY environment variable is required" }),
      ),
    ),
    (config) => Effect.succeed(config),
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
