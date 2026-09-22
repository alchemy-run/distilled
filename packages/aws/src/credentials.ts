import * as BrowserCredentials from "./credentials.browser.ts";
export * from "./credentials.browser.ts";

import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { Auth } from "./auth.ts";
import { fromHttp as httpSource } from "./credential-providers/from-http.node.ts";
import {
  type FromIniOptions,
  fromIni as iniSource,
} from "./credential-providers/from-ini.ts";
import { fromInstanceMetadata as instanceMetadataSource } from "./credential-providers/from-instance-metadata.node.ts";
import type { FromInstanceMetadataOptions } from "./credential-providers/from-instance-metadata.ts";
import {
  type FromLoginCredentialsOptions,
  fromLoginCredentials as loginCredentialsSource,
} from "./credential-providers/from-login-credentials.ts";
import { fromNodeProviderChain as nodeProviderChainSource } from "./credential-providers/from-node-provider-chain.ts";
import { fromProcess as processSource } from "./credential-providers/from-process.ts";
import { fromTemporaryCredentials as temporaryCredentialsSource } from "./credential-providers/from-temporary-credentials.node.ts";
import type { FromTemporaryCredentialsOptions } from "./credential-providers/from-temporary-credentials.ts";
import {
  type FromTokenFileOptions,
  fromTokenFile as tokenFileSource,
} from "./credential-providers/from-token-file.ts";
import type * as Region from "./region.ts";
import { loadSharedConfigFiles } from "./util/shared-config.ts";

/**
 * The region a node credentials provider authenticated against: the
 * environment first, then the active profile's `region` in `~/.aws/config`
 * — the same order, and the same files, the AWS CLI reads.
 *
 * The profile is only consulted when the environment is silent, so
 * `AWS_REGION` still wins for a one-off override without editing config.
 */
const regionFromEnvOrProfile = (profile?: string) =>
  BrowserCredentials.regionFromEnv.pipe(
    Effect.catchTag("Alchemy::AWS::MissingRegion", (missing) =>
      Effect.flatMap(
        Effect.tryPromise({
          try: () => loadSharedConfigFiles(),
          catch: () => missing,
        }),
        (files) => {
          const profileName =
            profile ??
            process.env.AWS_PROFILE ??
            process.env.AWS_DEFAULT_PROFILE ??
            "default";
          const region = files.configFile?.[profileName]?.region;
          return region === undefined
            ? Effect.fail(
                new BrowserCredentials.MissingRegion({
                  message: missing.message,
                  hints: [
                    ...(missing.hints ?? []),
                    `Or set \`region\` on the [profile ${profileName}] section of ~/.aws/config.`,
                  ],
                }),
              )
            : Effect.succeed(region as Region.RegionName);
        },
      ),
    ),
  );

/**
 * The region a profile-reading provider authenticated against: the one the
 * caller named, else the environment, else the profile's own.
 */
const profileRegion = (region: string | undefined, profile?: string) =>
  region === undefined
    ? regionFromEnvOrProfile(profile)
    : Effect.succeed(region as Region.RegionName);

/**
 * The default Node chain: the environment, the shared config and
 * credentials files, `credential_process`, the web identity token file,
 * then the container or instance metadata endpoints.
 */
export const fromChain = (options: FromIniOptions = {}) =>
  BrowserCredentials.createLazyProvider(
    nodeProviderChainSource(options),
    "chain",
    profileRegion(undefined, options.profile),
  );

/** {@link fromChain}, under the name the AWS SDK gives it. */
export { fromChain as fromNodeProviderChain };

/** The shared config and credentials files. */
export const fromIni = (options: FromIniOptions = {}) =>
  BrowserCredentials.createLazyProvider(
    iniSource(options),
    "ini",
    profileRegion(undefined, options.profile),
  );

/** The token `aws login` cached for the profile's `login_session`. */
export const fromLoginCredentials = (
  options: FromLoginCredentialsOptions = {},
) =>
  BrowserCredentials.createLazyProvider(
    loginCredentialsSource(options),
    "login",
    profileRegion(options.region, options.profile),
  );

/** The profile's `credential_process` command. */
export const fromProcess = (options: { profile?: string } = {}) =>
  BrowserCredentials.createLazyProvider(
    processSource(options),
    "process",
    profileRegion(undefined, options.profile),
  );

/**
 * `sts:AssumeRoleWithWebIdentity` with the token in
 * `AWS_WEB_IDENTITY_TOKEN_FILE`, as on EKS with IAM roles for service
 * accounts.
 */
export const fromTokenFile = (options: FromTokenFileOptions = {}) =>
  BrowserCredentials.createLazyProvider(
    tokenFileSource(options),
    "token-file",
    profileRegion(options.region, options.profile),
  );

/** {@link BrowserCredentials.fromHttp} plus the token file on disk. */
export const fromHttp = (
  options: { timeout?: number; maxRetries?: number } = {},
) => BrowserCredentials.createLazyProvider(httpSource(options), "http");

/**
 * {@link BrowserCredentials.fromInstanceMetadata} plus the profile's IMDS
 * settings (`ec2_metadata_service_endpoint` and friends).
 */
export const fromInstanceMetadata = (
  options: Omit<FromInstanceMetadataOptions, "profileConfig"> & {
    profile?: string;
  } = {},
) =>
  BrowserCredentials.createLazyProvider(
    instanceMetadataSource(options),
    "instance-metadata",
  );

/**
 * {@link BrowserCredentials.fromTemporaryCredentials} with the full Node
 * chain, rather than the environment alone, as the credentials that call
 * `sts:AssumeRole`.
 */
export const fromTemporaryCredentials = (
  options: FromTemporaryCredentialsOptions,
) =>
  BrowserCredentials.createLazyProvider(
    temporaryCredentialsSource(options),
    "temporary",
    profileRegion(options.region),
  );

/**
 * Create a lazy, cached SSO credentials provider.
 * SSO credential resolution is deferred until the Effect is run,
 * and credentials are cached until they expire.
 */
export const fromSSO = (profileName: string = "default") =>
  Layer.effect(
    BrowserCredentials.Credentials,
    Auth.use((auth) =>
      Effect.succeed(
        BrowserCredentials.createCachedCredentialsEffect(
          // The resolved credentials carry the profile's own region — see
          // `loadProfileCredentials` in auth.ts.
          auth.loadProfileCredentials(profileName),
        ),
      ),
    ),
  );
