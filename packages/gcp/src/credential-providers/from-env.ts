import * as EffectConfig from "@distilled.cloud/core/config";
/**
 * An access token from the process environment.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import { Credentials } from "../credentials-service.ts";

const envConfig = /*@__PURE__*/ EffectConfig.all({
  accessToken: /*@__PURE__*/ EffectConfig.Redacted("GOOGLE_ACCESS_TOKEN"),
  project: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("GOOGLE_PROJECT_ID"),
  ),
});

/** Reads `GOOGLE_ACCESS_TOKEN` (required) and `GOOGLE_PROJECT_ID` (optional). */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message: "GOOGLE_ACCESS_TOKEN environment variable is required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ accessToken, project }) => ({
      accessToken,
      project: Option.getOrUndefined(project),
    })),
    Effect.orDie,
  ),
);
