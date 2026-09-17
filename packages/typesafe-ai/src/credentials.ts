/**
 * TypeSafe AI credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). TypeSafe authenticates with an API key as
 * `Authorization: Bearer <apiKey>`.
 *
 * Environment variable names match the official JS SDK (`TYPESAFE_API_KEY`,
 * `TYPESAFE_BASE_URL`, `TYPESAFE_DEFAULT_MODEL`).
 */
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

/**
 * Reads `TYPESAFE_API_KEY` (required), `TYPESAFE_BASE_URL` (optional) and
 * `TYPESAFE_DEFAULT_MODEL` (optional).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.TYPESAFE_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "TYPESAFE_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.TYPESAFE_BASE_URL ?? DEFAULT_API_BASE_URL,
      defaultModel: process.env.TYPESAFE_DEFAULT_MODEL ?? DEFAULT_MODEL,
    };
  }).pipe(Effect.orDie),
);
