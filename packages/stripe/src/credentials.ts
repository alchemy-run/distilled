import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.stripe.com";

export interface Config {
  readonly apiKey: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "StripeCredentials",
) {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.STRIPE_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "STRIPE_API_KEY environment variable is required",
      });
    }

    return { apiKey, apiBaseUrl: DEFAULT_API_BASE_URL };
  }),
);
