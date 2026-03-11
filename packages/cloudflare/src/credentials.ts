import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.cloudflare.com/client/v4";

export interface Config {
  readonly apiToken: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "CloudflareCredentials",
) {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!apiToken) {
      return yield* new ConfigError({
        message: "CLOUDFLARE_API_TOKEN environment variable is required",
      });
    }

    return { apiToken, apiBaseUrl: DEFAULT_API_BASE_URL };
  }),
);
