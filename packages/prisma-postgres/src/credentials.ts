import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.prisma.io";

export interface Config {
  readonly apiToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "PrismaPostgresCredentials",
) {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const apiToken = process.env.PRISMA_POSTGRES_API_TOKEN;

    if (!apiToken) {
      return yield* new ConfigError({
        message: "PRISMA_POSTGRES_API_TOKEN environment variable is required",
      });
    }

    return {
      apiToken: Redacted.make(apiToken),
      apiBaseUrl: DEFAULT_API_BASE_URL,
    };
  }),
);
