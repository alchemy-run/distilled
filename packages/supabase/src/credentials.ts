import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.supabase.com";

export interface Config {
  readonly accessToken: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "SupabaseCredentials",
) {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

    if (!accessToken) {
      return yield* new ConfigError({
        message: "SUPABASE_ACCESS_TOKEN environment variable is required",
      });
    }

    return { accessToken, apiBaseUrl: DEFAULT_API_BASE_URL };
  }),
);
