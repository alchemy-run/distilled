/**
 * OpenRouter credentials — hand-written.
 *
 * The `Credentials` service resolves `{ apiKey, apiBaseUrl }` per request; the
 * protocol layer formats the `Authorization: Bearer <apiKey>` header from it.
 * The key is an OpenRouter API key (`sk-or-v1-…`); the management endpoints
 * (`/keys`, `/guardrails`, …) need a management key, which is sent the same
 * way.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** The spec's production server — every path lives under `/api/v1`. */
export const DEFAULT_API_BASE_URL = "https://openrouter.ai/api/v1";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("OpenRouterCredentials") {}

const envConfig = EffectConfig.all({
  // `OPENROUTER_API_KEY` is what OpenRouter's own SDKs and docs read.
  apiKey: EffectConfig.String("OPENROUTER_API_KEY"),
  apiBaseUrl: EffectConfig.String("OPENROUTER_API_BASE_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "OPENROUTER_API_KEY environment variable is required",
        }),
    ),
    Effect.map(({ apiKey, apiBaseUrl }) => ({
      apiKey: Redacted.make(apiKey),
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain API key + optional base URL. */
export const credentials = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
