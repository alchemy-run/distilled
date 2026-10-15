import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Scaleway credentials — hand-written.
 *
 * The `Credentials` service resolves {@link Config} per request; the
 * protocol sends the secret key as `X-Auth-Token` (and as
 * `Authorization: Bearer` to Generative APIs on `api.scaleway.ai`, which
 * speaks the OpenAI convention) and fills an operation's `{region}` /
 * `{zone}` path segment from the defaults here when the caller leaves it
 * out.
 *
 * {@link CredentialsFromEnv} reads the same `SCW_*` variables as the
 * official Go/JS/Python SDKs, the `scw` CLI and the Terraform provider.
 * The `~/.config/scw/config.yaml` profile file is not read: export the
 * profile's values instead (`scw config dump`).
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** Scaleway's API host — what `SCW_API_URL` overrides. */
export const DEFAULT_API_URL = "https://api.scaleway.com";
/** Region used when neither the call nor `SCW_DEFAULT_REGION` names one (the CLI's and Terraform's default). */
export const DEFAULT_REGION = "fr-par";
/** Zone used when neither the call nor `SCW_DEFAULT_ZONE` names one (the CLI's and Terraform's default). */
export const DEFAULT_ZONE = "fr-par-1";

export interface Config {
  /** API secret key (a UUID), sent as `X-Auth-Token`. */
  readonly secretKey: Redacted.Redacted<string>;
  /** Region filled into `{region}` when a call omits `region`. */
  readonly region: string;
  /** Zone filled into `{zone}` when a call omits `zone`. */
  readonly zone: string;
  /** Default Organization ID (`SCW_DEFAULT_ORGANIZATION_ID`), for callers building requests. */
  readonly organizationId?: string;
  /** Default Project ID (`SCW_DEFAULT_PROJECT_ID`), for callers building requests. */
  readonly projectId?: string;
  /** Replaces {@link DEFAULT_API_URL} for every `api.scaleway.com` operation. */
  readonly apiUrl?: string;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config>>()(
  "ScalewayCredentials",
) {}

const optional = (name: string) => EffectConfig.String(name).pipe(EffectConfig.option);

const envConfig = EffectConfig.all({
  secretKey: EffectConfig.Redacted("SCW_SECRET_KEY"),
  region: EffectConfig.String("SCW_DEFAULT_REGION").pipe(EffectConfig.withDefault(DEFAULT_REGION)),
  zone: EffectConfig.String("SCW_DEFAULT_ZONE").pipe(EffectConfig.withDefault(DEFAULT_ZONE)),
  organizationId: optional("SCW_DEFAULT_ORGANIZATION_ID"),
  projectId: optional("SCW_DEFAULT_PROJECT_ID"),
  apiUrl: optional("SCW_API_URL"),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "SCW_SECRET_KEY environment variable is required",
        }),
    ),
    Effect.map((env): Config => ({
      secretKey: env.secretKey,
      region: env.region,
      zone: env.zone,
      organizationId: Option.getOrUndefined(env.organizationId),
      projectId: Option.getOrUndefined(env.projectId),
      apiUrl: Option.getOrUndefined(env.apiUrl),
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a redacted secret key and optional defaults. */
export const credentials = (config: {
  readonly secretKey: Redacted.Redacted<string>;
  readonly region?: string;
  readonly zone?: string;
  readonly organizationId?: string;
  readonly projectId?: string;
  readonly apiUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      ...config,
      region: config.region ?? DEFAULT_REGION,
      zone: config.zone ?? DEFAULT_ZONE,
    }),
  );
