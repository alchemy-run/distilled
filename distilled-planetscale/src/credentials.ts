import { Context, Effect, Layer } from "effect";
import { ConfigError } from "./errors";

export const DEFAULT_API_BASE_URL = "https://api.planetscale.com/v1";

export interface Config {
  readonly token: string;
  readonly organization: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Tag("Credentials")<
  Credentials,
  Config
>() {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const token = process.env.PLANETSCALE_API_TOKEN;
    const organization = process.env.PLANETSCALE_ORGANIZATION;

    if (!token) {
      return yield* new ConfigError({
        message: "PLANETSCALE_API_TOKEN environment variable is required",
      });
    }

    if (!organization) {
      return yield* new ConfigError({
        message: "PLANETSCALE_ORGANIZATION environment variable is required",
      });
    }

    return { token, organization, apiBaseUrl: DEFAULT_API_BASE_URL };
  }),
);
