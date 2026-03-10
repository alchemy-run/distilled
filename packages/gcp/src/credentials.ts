import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

export interface Config {
  readonly accessToken: string;
  readonly project?: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "GCPCredentials",
) {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

    if (!accessToken) {
      return yield* new ConfigError({
        message: "GOOGLE_ACCESS_TOKEN environment variable is required",
      });
    }

    return {
      accessToken,
      project: process.env.GOOGLE_PROJECT_ID,
    };
  }),
);
