/**
 * E2B credentials -- hand-written.
 *
 * E2B speaks from three places, each with its own credential:
 *
 *   * The control plane (`https://api.e2b.app`): sandboxes, templates,
 *     volumes, secrets, snapshots, webhooks. Authenticated with the team API
 *     key (`X-API-Key`, `E2B_API_KEY`). The team's API keys and the auth
 *     endpoints take a personal access token instead (`Authorization: Bearer`,
 *     `E2B_ACCESS_TOKEN`) plus the team id (`X-Team-ID`, `E2B_TEAM_ID`).
 *     {@link Credentials} resolves those per request.
 *   * envd, the daemon inside a running sandbox (`https://sandbox.e2b.app`):
 *     processes and files. Addressed to one sandbox with that sandbox's envd
 *     access token, returned when the sandbox is created or connected. Provide
 *     it per call with {@link sandboxConnection}; no team key is sent.
 *   * Volume content (`https://api.e2b.app/volumecontent/...`): a volume's
 *     files. Authenticated with the volume's own token, returned by
 *     `volumes.getVolume`. Provide it per call with {@link volumeConnection};
 *     no team key is sent.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** E2B Cloud's domain. Sandboxes and the API live under it. */
export const DEFAULT_DOMAIN = "e2b.app";

/** The port envd listens on inside every sandbox. */
export const ENVD_PORT = 49983;

/** The control plane root for a domain. */
export const apiBaseUrlFor = (domain: string): string => `https://api.${domain}`;

export interface Config {
  /** Team API key, sent as `X-API-Key`. Every control-plane call except API keys and auth takes it. */
  readonly apiKey?: Redacted.Redacted<string>;
  /** Personal access token, sent as `Authorization: Bearer`. Needed for `apiKeys` and `auth`. */
  readonly accessToken?: Redacted.Redacted<string>;
  /** Team id, sent as `X-Team-ID` with the access token. */
  readonly teamId?: string;
  /** Control plane root. @default `https://api.${domain}` */
  readonly apiBaseUrl: string;
  /** E2B domain; sandboxes are addressed under it. @default "e2b.app" */
  readonly domain: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "E2BCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  apiKey: /*@__PURE__*/ EffectConfig.Redacted("E2B_API_KEY").pipe(EffectConfig.option),
  accessToken: /*@__PURE__*/ EffectConfig.Redacted("E2B_ACCESS_TOKEN").pipe(EffectConfig.option),
  teamId: /*@__PURE__*/ EffectConfig.String("E2B_TEAM_ID").pipe(EffectConfig.option),
  domain: /*@__PURE__*/ EffectConfig.String("E2B_DOMAIN").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_DOMAIN),
  ),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("E2B_API_URL").pipe(EffectConfig.option),
});

const optional = <A>(
  option: { readonly _tag: "Some"; readonly value: A } | { readonly _tag: "None" },
) => (option._tag === "Some" ? option.value : undefined);

/**
 * Reads `E2B_API_KEY`, `E2B_ACCESS_TOKEN`, `E2B_TEAM_ID`, `E2B_DOMAIN` and
 * `E2B_API_URL`. Fails with `ConfigError` when neither the API key nor the
 * access token is set.
 */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () => new ConfigError({ message: "invalid E2B environment configuration" }),
    ),
    /*@__PURE__*/ Effect.flatMap((env) => {
      const apiKey = optional(env.apiKey);
      const accessToken = optional(env.accessToken);
      if (apiKey === undefined && accessToken === undefined) {
        return Effect.fail(
          new ConfigError({
            message: "E2B_API_KEY (or E2B_ACCESS_TOKEN) environment variable is required",
          }),
        );
      }
      return Effect.succeed<Config>({
        apiKey,
        accessToken,
        teamId: optional(env.teamId),
        domain: env.domain,
        apiBaseUrl: optional(env.apiBaseUrl) ?? apiBaseUrlFor(env.domain),
      });
    }),
  ),
);

/** Convenience layer from a redacted API key (and optional access token). */
export const credentials = (config: {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly accessToken?: Redacted.Redacted<string>;
  readonly teamId?: string;
  readonly domain?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> => {
  const domain = config.domain ?? DEFAULT_DOMAIN;
  return Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      accessToken: config.accessToken,
      teamId: config.teamId,
      domain,
      apiBaseUrl: config.apiBaseUrl ?? apiBaseUrlFor(domain),
    }),
  );
};

// =============================================================================
// envd: one sandbox
// =============================================================================

export interface SandboxConnectionConfig {
  /** The sandbox to address. */
  readonly sandboxId: string;
  /** The sandbox's envd access token (`envdAccessToken` from create/connect). */
  readonly accessToken?: Redacted.Redacted<string>;
  /** The sandbox's domain (`domain` from create/connect). @default "e2b.app" */
  readonly domain?: string;
  /** envd's port. @default 49983 */
  readonly port?: number;
}

/**
 * The sandbox the envd services (`envd`, `process`, `filesystem`) address.
 * Provide it around the calls for one sandbox.
 */
export class SandboxConnection
  extends /*@__PURE__*/ Context.Service<SandboxConnection, SandboxConnectionConfig>()(
    "E2BSandboxConnection",
  ) {}

/** Addresses the envd services below it to one sandbox. */
export const sandboxConnection = (
  config: SandboxConnectionConfig,
): Layer.Layer<SandboxConnection> => Layer.succeed(SandboxConnection, config);

/** Domains that serve every sandbox at `https://sandbox.<domain>` (routed by header). */
const SHARED_SANDBOX_HOST_DOMAINS: ReadonlySet<string> = /*@__PURE__*/ new Set([DEFAULT_DOMAIN]);

/** envd's root for a sandbox: the shared host on E2B Cloud, else `<port>-<id>.<domain>`. */
export const envdBaseUrlFor = (config: SandboxConnectionConfig): string => {
  const domain = config.domain ?? DEFAULT_DOMAIN;
  const port = config.port ?? ENVD_PORT;
  return SHARED_SANDBOX_HOST_DOMAINS.has(domain)
    ? `https://sandbox.${domain}`
    : `https://${port}-${config.sandboxId}.${domain}`;
};

// =============================================================================
// Volume content: one volume
// =============================================================================

export interface VolumeConnectionConfig {
  /** The volume's content token (`token` from `volumes.getVolume`). */
  readonly token: Redacted.Redacted<string>;
  /** The volume's domain (`domain` from `volumes.getVolume`). @default "e2b.app" */
  readonly domain?: string;
}

/**
 * The volume token the `volumeContent` service authenticates with. Provide
 * it around the calls for one volume.
 */
export class VolumeConnection
  extends /*@__PURE__*/ Context.Service<VolumeConnection, VolumeConnectionConfig>()(
    "E2BVolumeConnection",
  ) {}

/** Authenticates the `volumeContent` calls below it with one volume's token. */
export const volumeConnection = (config: VolumeConnectionConfig): Layer.Layer<VolumeConnection> =>
  Layer.succeed(VolumeConnection, config);
