import { Context, Effect, Layer } from "effect";
import { ConfigError } from "./errors";

export const DEFAULT_API_BASE_URL = "https://console.neon.tech/api/v2";

export interface Config {
  readonly apiKey: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Tag("Credentials")<Credentials, Config>() {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.NEON_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "NEON_API_KEY environment variable is required",
      });
    }

    return { apiKey, apiBaseUrl: DEFAULT_API_BASE_URL };
  }),
);
