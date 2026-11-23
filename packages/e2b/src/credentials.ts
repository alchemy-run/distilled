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
 *
 * A layer here reads and checks what it is given when it is built: an
 * environment without a key, a domain that is not DNS labels, or a sandbox
 * whose host label is not a DNS label ({@link check}, {@link checkVolume}),
 * is a `ConfigError` at setup, and no call fails for it. An envd or volume
 * call without its connection fails on the call: only that call knows it
 * needs one.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import type { Checked } from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import { invalidHostLabelConfig } from "@distilled.cloud/core/protocol-http";
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

/** The domain ends every E2B host name, so it must be DNS labels. */
const invalidDomain = (domain: string): ConfigError | undefined =>
  invalidHostLabelConfig("E2B domain", domain, true);

/** `apiBaseUrl` when given, else the domain's control plane root. */
const resolveApiBaseUrl = (
  domain: string,
  apiBaseUrl: string | undefined,
): Effect.Effect<string, ConfigError> => {
  if (apiBaseUrl !== undefined) return Effect.succeed(apiBaseUrl);
  const invalid = invalidDomain(domain);
  return invalid === undefined ? Effect.succeed(apiBaseUrlFor(domain)) : Effect.fail(invalid);
};

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
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config>>()("E2BCredentials") {}

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

const fromEnvironment: Effect.Effect<Config, ConfigError> = /*@__PURE__*/ envConfig.pipe(
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
    return Effect.map(
      resolveApiBaseUrl(env.domain, optional(env.apiBaseUrl)),
      (apiBaseUrl): Config => ({
        apiKey,
        accessToken,
        teamId: optional(env.teamId),
        domain: env.domain,
        apiBaseUrl,
      }),
    );
  }),
);

/**
 * Reads `E2B_API_KEY`, `E2B_ACCESS_TOKEN`, `E2B_TEAM_ID`, `E2B_DOMAIN` and
 * `E2B_API_URL`, once: when the layer is built. Fails with `ConfigError`
 * there when neither the API key nor the access token is set, or when the
 * domain is not DNS labels.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ Layer.effect(
  Credentials,
  /*@__PURE__*/ Effect.map(fromEnvironment, (config) => Effect.succeed(config)),
);

/**
 * Convenience layer from a redacted API key (and optional access token). The
 * domain is checked when the layer is built.
 */
export const credentials = (config: {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly accessToken?: Redacted.Redacted<string>;
  readonly teamId?: string;
  readonly domain?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials, ConfigError> => {
  const domain = config.domain ?? DEFAULT_DOMAIN;
  return Layer.effect(
    Credentials,
    Effect.map(resolveApiBaseUrl(domain, config.apiBaseUrl), (apiBaseUrl) =>
      Effect.succeed({
        apiKey: config.apiKey,
        accessToken: config.accessToken,
        teamId: config.teamId,
        domain,
        apiBaseUrl,
      }),
    ),
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
 * The sandbox the envd services (`envd`, `process`, `filesystem`) address: a
 * {@link SandboxConnectionConfig} that passed {@link check}. Provide it
 * around the calls for one sandbox.
 */
export class SandboxConnection
  extends /*@__PURE__*/ Context.Service<SandboxConnection, Checked<SandboxConnectionConfig>>()(
    "E2BSandboxConnection",
  ) {}

/** Domains that serve every sandbox at `https://sandbox.<domain>` (routed by header). */
const SHARED_SANDBOX_HOST_DOMAINS: ReadonlySet<string> = /*@__PURE__*/ new Set([DEFAULT_DOMAIN]);

/**
 * Check a sandbox connection: fails with `ConfigError` when the domain is
 * not DNS labels, or when the sandbox is addressed by host name
 * (`<port>-<id>.<domain>`) and that label is not one DNS label. For a
 * {@link SandboxConnection} layer of your own.
 */
export const check = (
  config: SandboxConnectionConfig,
): Effect.Effect<Checked<SandboxConnectionConfig>, ConfigError> => {
  const domain = config.domain ?? DEFAULT_DOMAIN;
  const invalid =
    invalidDomain(domain) ??
    (SHARED_SANDBOX_HOST_DOMAINS.has(domain)
      ? undefined
      : invalidHostLabelConfig(
          "E2B sandbox host label (<port>-<sandboxId>)",
          `${config.port ?? ENVD_PORT}-${config.sandboxId}`,
        ));
  // The one place that says a SandboxConnectionConfig is checked.
  return invalid === undefined
    ? Effect.succeed(config as Checked<SandboxConnectionConfig>)
    : Effect.fail(invalid);
};

/**
 * Addresses the envd services below it to one sandbox. The sandbox is
 * checked once, when the layer is built ({@link check}).
 */
export const sandboxConnection = (
  config: SandboxConnectionConfig,
): Layer.Layer<SandboxConnection, ConfigError> => Layer.effect(SandboxConnection, check(config));

/** envd's root for a sandbox: the shared host on E2B Cloud, else `<port>-<id>.<domain>`. */
export const envdBaseUrlFor = (config: SandboxConnectionConfig): string => {
  const domain = config.domain ?? DEFAULT_DOMAIN;
  const port = config.port ?? ENVD_PORT;
  return SHARED_SANDBOX_HOST_DOMAINS.has(domain)
    ? `https://sandbox.${domain}`
    : `https://${port}-${config.sandboxId}.${domain}`;
};

/**
 * The {@link SandboxConnection} on the calling fiber, for the envd calls.
 * Fails with `ConfigError` when none is provided: only an envd call knows it
 * needs one. Its domain and host label were checked when the layer was built.
 */
export const resolveSandboxConnection: Effect.Effect<
  Checked<SandboxConnectionConfig>,
  ConfigError
> = /*@__PURE__*/ Effect.flatMap(Effect.serviceOption(SandboxConnection), (option) =>
  option._tag === "Some"
    ? Effect.succeed(option.value)
    : Effect.fail(
        new ConfigError({
          message:
            "E2B envd operations address one sandbox -- provide E2B.sandboxConnection({ sandboxId, accessToken })",
        }),
      ),
);

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
 * The volume token the `volumeContent` service authenticates with: a
 * {@link VolumeConnectionConfig} that passed {@link checkVolume}. Provide it
 * around the calls for one volume.
 */
export class VolumeConnection
  extends /*@__PURE__*/ Context.Service<VolumeConnection, Checked<VolumeConnectionConfig>>()(
    "E2BVolumeConnection",
  ) {}

/**
 * Check a volume connection: fails with `ConfigError` when its domain is not
 * DNS labels. For a {@link VolumeConnection} layer of your own.
 */
export const checkVolume = (
  config: VolumeConnectionConfig,
): Effect.Effect<Checked<VolumeConnectionConfig>, ConfigError> => {
  const invalid = invalidDomain(config.domain ?? DEFAULT_DOMAIN);
  // The one place that says a VolumeConnectionConfig is checked.
  return invalid === undefined
    ? Effect.succeed(config as Checked<VolumeConnectionConfig>)
    : Effect.fail(invalid);
};

/**
 * Authenticates the `volumeContent` calls below it with one volume's token.
 * The volume is checked once, when the layer is built ({@link checkVolume}).
 */
export const volumeConnection = (
  config: VolumeConnectionConfig,
): Layer.Layer<VolumeConnection, ConfigError> =>
  Layer.effect(VolumeConnection, checkVolume(config));

/**
 * The {@link VolumeConnection} on the calling fiber, for the volume content
 * calls. Fails with `ConfigError` when none is provided: only a volume
 * content call knows it needs one. Its domain was checked when the layer was
 * built.
 */
export const resolveVolumeConnection: Effect.Effect<
  Checked<VolumeConnectionConfig>,
  ConfigError
> = /*@__PURE__*/ Effect.flatMap(Effect.serviceOption(VolumeConnection), (option) =>
  option._tag === "Some"
    ? Effect.succeed(option.value)
    : Effect.fail(
        new ConfigError({
          message:
            "E2B volume content operations authenticate with the volume's token -- provide E2B.volumeConnection({ token })",
        }),
      ),
);
