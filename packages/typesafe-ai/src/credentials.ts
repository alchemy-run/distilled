/**
 * TypeSafe AI credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that the protocol layer runs
 * per request on the calling fiber, so a layer backed by a rotating source
 * (a token broker, say) can hand out fresh credentials. The two layers here
 * are static: both resolve once and serve a constant. TypeSafe
 * authenticates with an API key as `Authorization: Bearer <apiKey>`.
 *
 * Environment variable names match the official JS SDK (`TYPESAFE_API_KEY`,
 * `TYPESAFE_BASE_URL`, `TYPESAFE_DEFAULT_MODEL`).
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.typesafe.ai";

/** Flagship System One model; used when a call omits `model`. */
export const DEFAULT_MODEL = "jev-latest";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly defaultModel: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("TypesafeAiCredentials") {}

/** Layer from a plain API key + optional base URL and default model. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly defaultModel?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      defaultModel: config.defaultModel ?? DEFAULT_MODEL,
    }),
  );

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.Redacted("TYPESAFE_API_KEY"),
  apiBaseUrl: EffectConfig.String("TYPESAFE_BASE_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
  defaultModel: EffectConfig.String("TYPESAFE_DEFAULT_MODEL").pipe(
    EffectConfig.withDefault(DEFAULT_MODEL),
  ),
});

/**
 * Reads `TYPESAFE_API_KEY` (required), `TYPESAFE_BASE_URL` (optional) and
 * `TYPESAFE_DEFAULT_MODEL` (optional) through Effect's `Config`, so the
 * values resolve from whatever provider is ambient — the process
 * environment on Node/Bun, the platform's own seam elsewhere (a Worker's
 * secret bindings, for instance, which never reach `process.env`).
 *
 * The read happens when the LAYER BUILDS, not per request. Deploy
 * frameworks that bind env by watching `Config` reads during a Worker's
 * construction (Alchemy, for one) only see a read that happens while the
 * layer stack is being built; a lazily-resolved key would never be bound
 * and would be missing at runtime.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.effect(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "TYPESAFE_API_KEY environment variable is required",
        }),
    ),
    Effect.orDie,
    Effect.map(Effect.succeed),
  ),
);
