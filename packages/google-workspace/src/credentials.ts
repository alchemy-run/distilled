import * as EffectConfig from "@distilled.cloud/core/config";
/**
 * Google Workspace credentials -- hand-written.
 *
 * API-compatible port of the distilled gcp credentials module: a
 * plain externally-supplied OAuth2 bearer access token (no ADC, no
 * service-account signing, no refresh flow -- the token is minted outside
 * the SDK, e.g. `gcloud auth print-access-token`).
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly project?: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()(
    "GoogleWorkspaceCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  accessToken: /*@__PURE__*/ EffectConfig.String("GOOGLE_ACCESS_TOKEN"),
  project: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("GOOGLE_PROJECT_ID"),
  ),
});

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
      accessToken: Redacted.make(accessToken),
      project: Option.getOrUndefined(project),
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a redacted access token (+ optional project id). */
export const fromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly project?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: config.accessToken,
      project: config.project,
    }),
  );
