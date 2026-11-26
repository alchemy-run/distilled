import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import { invalidHostLabelConfig } from "@distilled.cloud/core/protocol-http";
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

/**
 * `hosts`, failing with `ConfigError` when the region is not one DNS label:
 * it becomes a label of the compute and storage host names. The layers run
 * this once, when they are built.
 */
const checkHosts = <H extends Hosts>(hosts: H): Effect.Effect<H, ConfigError> => {
  const invalid =
    hosts.region === undefined
      ? undefined
      : invalidHostLabelConfig("Namespace region", hosts.region);
  return invalid === undefined ? Effect.succeed(hosts) : Effect.fail(invalid);
};

/**
 * Resolves the current credentials on every request. A layer here reads and
 * checks the region and host settings when it is built, so the effect fails
 * with `ConfigError` only for what it does at run time: the token-file
 * layers read the file again on every resolution.
 */
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

/**
 * Credentials from the environment: `NSC_TOKEN` (required) plus the host
 * variables. The environment is read, and the region checked, once: when
 * the layer is built.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials, ConfigError> = /*@__PURE__*/ Layer.effect(
  Credentials,
  /*@__PURE__*/ EffectConfig.all({
    token: /*@__PURE__*/ EffectConfig.Redacted("NSC_TOKEN"),
    hosts: hostsConfig,
  }).pipe(
    /*@__PURE__*/ Effect.mapError(configError("NSC_TOKEN environment variable is required")),
    /*@__PURE__*/ Effect.flatMap(({ token, hosts }) => checkHosts({ token, ...hosts })),
    /*@__PURE__*/ Effect.map((options) => Effect.succeed(resolveConfig(options))),
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

/** A layer for checked `hosts` that reads `bearer_token` from `path` on every resolution. */
const tokenFileLayer = (
  settings: Effect.Effect<{ readonly path: string; readonly hosts: Hosts }, ConfigError>,
): Layer.Layer<Credentials, ConfigError, FileSystem.FileSystem> =>
  Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const { path, hosts: unchecked } = yield* settings;
      const hosts = yield* checkHosts(unchecked);
      return Effect.map(readTokenFile(fs, path), (token) => resolveConfig({ token, ...hosts }));
    }),
  );

/**
 * Credentials from the token file a Namespace workload is given: `NSC_TOKEN_FILE`,
 * else `/var/run/nsc/token.json`. The file is re-read on every resolution because
 * Namespace refreshes it; host variables as in {@link CredentialsFromEnv}. The
 * variables are read, and the region checked, once: when the layer is built.
 */
export const CredentialsFromTokenFile: Layer.Layer<
  Credentials,
  ConfigError,
  FileSystem.FileSystem
> = /*@__PURE__*/ tokenFileLayer(
  /*@__PURE__*/ EffectConfig.all({
    path: /*@__PURE__*/ EffectConfig.String("NSC_TOKEN_FILE").pipe(
      /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_TOKEN_FILE),
    ),
    hosts: hostsConfig,
  }).pipe(
    /*@__PURE__*/ Effect.mapError(configError("Namespace host configuration could not be read")),
  ),
);

/**
 * Convenience layer from a tenant token, an optional region and host
 * overrides. The region is checked when the layer is built.
 */
export const credentials = (options: Options): Layer.Layer<Credentials, ConfigError> =>
  Layer.effect(
    Credentials,
    Effect.map(checkHosts(options), (checked) => Effect.succeed(resolveConfig(checked))),
  );

/** Convenience layer from a tenant token alone. */
export const fromToken = (token: Redacted.Redacted<string>): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, Effect.succeed(resolveConfig({ token })));

/**
 * Convenience layer reading `bearer_token` from a token file on every
 * resolution. The region is checked when the layer is built.
 */
export const fromTokenFile = (
  path: string,
  hosts: Hosts = {},
): Layer.Layer<Credentials, ConfigError, FileSystem.FileSystem> =>
  tokenFileLayer(Effect.succeed({ path, hosts }));
