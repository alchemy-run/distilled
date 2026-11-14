import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

export const DEFAULT_REGION = "us";
export const DEFAULT_GLOBAL_BASE_URL = "https://global.namespaceapis.com";
export const DEFAULT_PRIVATE_API_BASE_URL = "https://private-api.global.namespaceapis.com";
/** Where a Namespace instance or runner mounts its workload token. */
export const DEFAULT_TOKEN_FILE = "/var/run/nsc/token.json";

export const computeBaseUrlFor = (region: string): string =>
  `https://${region}.compute.namespaceapis.com`;
export const storageBaseUrlFor = (region: string): string =>
  `https://${region}.storage.namespaceapis.com`;

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly region: string;
  /** `namespace.cloud.compute.*`, `builder`, `experimental.compute`: `https://<region>.compute.namespaceapis.com`. */
  readonly computeBaseUrl: string;
  /** `namespace.cloud.storage.*` (artifacts): `https://<region>.storage.namespaceapis.com`. */
  readonly storageBaseUrl: string;
  /** IAM, registry, vault, images, caches, egress and everything else global. */
  readonly globalBaseUrl: string;
  /** `namespace.private.*` (devboxes, sessions) and `namespace.cloud.github.*`. */
  readonly privateApiBaseUrl: string;
}

export interface Hosts {
  readonly region?: string;
  readonly computeBaseUrl?: string;
  readonly storageBaseUrl?: string;
  readonly globalBaseUrl?: string;
  readonly privateApiBaseUrl?: string;
}

export interface Options extends Hosts {
  readonly token: Redacted.Redacted<string>;
}

export const resolveConfig = (options: Options): Config => {
  const region = options.region ?? DEFAULT_REGION;
  return {
    token: options.token,
    region,
    computeBaseUrl: options.computeBaseUrl ?? computeBaseUrlFor(region),
    storageBaseUrl: options.storageBaseUrl ?? storageBaseUrlFor(region),
    globalBaseUrl: options.globalBaseUrl ?? DEFAULT_GLOBAL_BASE_URL,
    privateApiBaseUrl: options.privateApiBaseUrl ?? DEFAULT_PRIVATE_API_BASE_URL,
  };
};

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "NamespaceLabsCredentials",
  ) {}

const optionalString = (name: string) =>
  EffectConfig.option(EffectConfig.String(name)).pipe(EffectConfig.map(Option.getOrUndefined));

/**
 * `NSC_REGION` (default `us`) selects the compute and storage hosts.
 * `NSC_COMPUTE_URL` (or `NSC_ENDPOINT`, which Namespace sets inside an
 * instance), `NSC_STORAGE_URL`, `NSC_GLOBAL_URL` and `NSC_PRIVATE_API_URL`
 * override a host.
 */
const hostsConfig = /*@__PURE__*/ EffectConfig.all({
  region: /*@__PURE__*/ EffectConfig.String("NSC_REGION").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_REGION),
  ),
  computeBaseUrl: /*@__PURE__*/ EffectConfig.String("NSC_COMPUTE_URL").pipe(
    /*@__PURE__*/ EffectConfig.orElse(() => EffectConfig.String("NSC_ENDPOINT")),
    EffectConfig.option,
    /*@__PURE__*/ EffectConfig.map(Option.getOrUndefined),
  ),
  storageBaseUrl: /*@__PURE__*/ optionalString("NSC_STORAGE_URL"),
  globalBaseUrl: /*@__PURE__*/ optionalString("NSC_GLOBAL_URL"),
  privateApiBaseUrl: /*@__PURE__*/ optionalString("NSC_PRIVATE_API_URL"),
});

const configError = (message: string) => () => new ConfigError({ message });

/** Credentials from the environment: `NSC_TOKEN` (required) plus the host variables. */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ EffectConfig.all({
    token: /*@__PURE__*/ EffectConfig.Redacted("NSC_TOKEN"),
    hosts: hostsConfig,
  }).pipe(
    /*@__PURE__*/ Effect.map(({ token, hosts }) => resolveConfig({ token, ...hosts })),
    /*@__PURE__*/ Effect.mapError(configError("NSC_TOKEN environment variable is required")),
  ),
);

const readTokenFile = (
  fs: FileSystem.FileSystem,
  path: string,
): Effect.Effect<Redacted.Redacted<string>, ConfigError> =>
  fs.readFileString(path).pipe(
    Effect.mapError(configError(`Namespace token file ${path} could not be read`)),
    Effect.flatMap((text) => {
      const parsed = Effect.try({
        try: () => JSON.parse(text) as { readonly bearer_token?: unknown },
        catch: configError(`Namespace token file ${path} is not JSON`),
      });
      return Effect.flatMap(parsed, ({ bearer_token }) =>
        typeof bearer_token === "string" && bearer_token.length > 0
          ? Effect.succeed(Redacted.make(bearer_token))
          : Effect.fail(
              new ConfigError({
                message: `Namespace token file ${path} has no bearer_token; exchange a session token with privateUserSessions.issueTenantTokenFromSession`,
              }),
            ),
      );
    }),
  );

/**
 * Credentials from the token file a Namespace workload is given: `NSC_TOKEN_FILE`,
 * else `/var/run/nsc/token.json`. The file is re-read on every resolution because
 * Namespace refreshes it; host variables as in {@link CredentialsFromEnv}.
 */
export const CredentialsFromTokenFile: Layer.Layer<Credentials, never, FileSystem.FileSystem> =
  /*@__PURE__*/ Layer.effect(
    Credentials,
    /*@__PURE__*/ Effect.map(FileSystem.FileSystem, (fs) =>
      EffectConfig.all({
        path: EffectConfig.String("NSC_TOKEN_FILE").pipe(
          EffectConfig.withDefault(DEFAULT_TOKEN_FILE),
        ),
        hosts: hostsConfig,
      }).pipe(
        Effect.mapError(configError("Namespace host configuration could not be read")),
        Effect.flatMap(({ path, hosts }) =>
          Effect.map(readTokenFile(fs, path), (token) => resolveConfig({ token, ...hosts })),
        ),
      ),
    ),
  );

/** Convenience layer from a tenant token, an optional region and host overrides. */
export const credentials = (options: Options): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, Effect.succeed(resolveConfig(options)));

/** Convenience layer from a tenant token alone. */
export const fromToken = (token: Redacted.Redacted<string>): Layer.Layer<Credentials> =>
  credentials({ token });

/** Convenience layer reading `bearer_token` from a token file on every resolution. */
export const fromTokenFile = (
  path: string,
  hosts: Hosts = {},
): Layer.Layer<Credentials, never, FileSystem.FileSystem> =>
  Layer.effect(
    Credentials,
    Effect.map(FileSystem.FileSystem, (fs) =>
      Effect.map(readTokenFile(fs, path), (token) => resolveConfig({ token, ...hosts })),
    ),
  );
