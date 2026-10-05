/**
 * An access token from the process environment.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import { Credentials } from "../credentials-service.ts";

const envConfig = EffectConfig.all({
  accessToken: EffectConfig.Redacted("GOOGLE_ACCESS_TOKEN"),
  project: EffectConfig.option(EffectConfig.String("GOOGLE_PROJECT_ID")),
});

/** Reads `GOOGLE_ACCESS_TOKEN` (required) and `GOOGLE_PROJECT_ID` (optional). */
export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "GOOGLE_ACCESS_TOKEN environment variable is required",
        }),
    ),
    Effect.map(({ accessToken, project }) => ({
      accessToken,
      project: Option.getOrUndefined(project),
    })),
    Effect.orDie,
  ),
);
