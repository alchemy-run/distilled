/**
 * The shared config and credentials files (`~/.aws/config`,
 * `~/.aws/credentials`) the Node providers read.
 *
 * Profiles come from `../util/shared-config.ts`, the same loader `auth.ts`
 * uses, so both agree on which files and which profile name apply.
 */
import * as Effect from "effect/Effect";
import {
  type CredentialsError,
  MissingRegion,
  regionFromEnv,
} from "../credentials-service.ts";
import type * as Region from "../region.ts";
import {
  loadSharedConfigFiles,
  parseKnownFiles,
} from "../util/shared-config.ts";
import { CredentialSourceError, env } from "./credential-source.ts";
import { stsRegion } from "./sts.ts";

export type Profile = Readonly<Record<string, string | undefined>>;
export type Profiles = Readonly<Record<string, Profile | undefined>>;

export const ENV_PROFILE = "AWS_PROFILE";
const DEFAULT_PROFILE = "default";

/** `profile`, else `AWS_PROFILE`, else `default` — as the AWS CLI. */
export const getProfileName = (profile?: string): string =>
  profile || env(ENV_PROFILE) || DEFAULT_PROFILE;

export const loadProfiles = (): Effect.Effect<
  Profiles,
  CredentialSourceError
> =>
  Effect.tryPromise({
    try: () => parseKnownFiles() as Promise<Profiles>,
    catch: (cause) =>
      new CredentialSourceError({
        message: `Could not read the shared config and credentials files: ${String(cause)}`,
        cause,
      }),
  });

/**
 * The `[profile <name>]` section of `~/.aws/config` alone (no credentials
 * file), for settings that the config file owns such as `region` and the
 * IMDS options.
 */
export const loadConfigProfile = (
  profile?: string,
): Effect.Effect<Profile | undefined> =>
  Effect.promise(() => loadSharedConfigFiles()).pipe(
    Effect.map(
      (files) =>
        files.configFile?.[getProfileName(profile)] as Profile | undefined,
    ),
    Effect.orElseSucceed(() => undefined),
  );

/**
 * The region STS is called in for a profile: the profile's own `region`,
 * else the environment, else the default profile's `region`, else
 * `us-east-1` — the order of the SDK's `stsRegionDefaultResolver`.
 */
export const profileStsRegion = (
  profileRegion: string | undefined,
  profile?: string,
): Effect.Effect<Region.RegionName> =>
  stsRegion(
    profileRegion,
    Effect.map(loadConfigProfile(profile), (config) => config?.region),
  );

/**
 * The region a profile-reading provider authenticated against: the one the
 * caller named, else the environment, else the profile's own `region`.
 * The profile is only consulted when the environment is silent, so
 * `AWS_REGION` still wins for a one-off override without editing config.
 */
export const profileRegion = (
  region: string | undefined,
  profile?: string,
): Effect.Effect<Region.RegionName, CredentialsError> =>
  region !== undefined
    ? Effect.succeed(region as Region.RegionName)
    : regionFromEnv.pipe(
        Effect.catchTag("Alchemy::AWS::MissingRegion", (missing) =>
          Effect.flatMap(
            Effect.tryPromise({
              try: () => loadSharedConfigFiles(),
              catch: () => missing,
            }),
            (files) => {
              const profileName =
                profile ??
                env(ENV_PROFILE) ??
                env("AWS_DEFAULT_PROFILE") ??
                DEFAULT_PROFILE;
              const configured = files.configFile?.[profileName]?.region;
              return configured === undefined
                ? Effect.fail(
                    new MissingRegion({
                      message: missing.message,
                      hints: [
                        ...(missing.hints ?? []),
                        `Or set \`region\` on the [profile ${profileName}] section of ~/.aws/config.`,
                      ],
                    }),
                  )
                : Effect.succeed(configured as Region.RegionName);
            },
          ),
        ),
      );
