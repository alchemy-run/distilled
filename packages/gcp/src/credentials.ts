/**
 * GCP credentials — hand-written.
 *
 * API-compatible port of the distilled repo's gcp credentials module: a
 * plain externally-supplied OAuth2 bearer access token (no ADC, no
 * service-account signing, no refresh flow — the token is minted outside
 * the SDK, e.g. `gcloud auth print-access-token`).
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly project?: string;
  /**
   * Default region resolved with the credentials (profile, environment).
   * `Region` overrides it; see `./region.ts`.
   */
  readonly region?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("GCPCredentials") {}

const envConfig = EffectConfig.all({
  accessToken: EffectConfig.String("GOOGLE_ACCESS_TOKEN"),
  project: EffectConfig.option(EffectConfig.String("GOOGLE_PROJECT_ID")),
  region: EffectConfig.option(
    EffectConfig.String("GOOGLE_CLOUD_REGION").pipe(
      EffectConfig.orElse(() => EffectConfig.String("CLOUDSDK_COMPUTE_REGION")),
    ),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "GOOGLE_ACCESS_TOKEN environment variable is required",
        }),
    ),
    Effect.map(({ accessToken, project, region }) => ({
      accessToken: Redacted.make(accessToken),
      project: Option.getOrUndefined(project),
      region: Option.getOrUndefined(region),
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain access token (+ optional project id). */
export const fromAccessToken = (config: {
  readonly accessToken: string;
  readonly project?: string;
  readonly region?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: Redacted.make(config.accessToken),
      project: config.project,
      region: config.region,
    }),
  );
