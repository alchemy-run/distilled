/**
 * Credentials from the shared config and credentials files: static keys,
 * `role_arn` + `source_profile` / `credential_source` (assumed through
 * STS), `web_identity_token_file`, `credential_process`, `aws login`
 * console sessions (`login_session`), and SSO profiles.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as Auth from "../auth.ts";
import {
  chain,
  type CredentialSource,
  CredentialSourceError,
} from "./credential-source.ts";
import { fromContainerMetadata } from "./from-container-metadata.ts";
import { fromEnv } from "./from-env.ts";
import { fromHttp } from "./from-http.node.ts";
import { fromInstanceMetadata } from "./from-instance-metadata.node.ts";
import { fromLoginCredentials } from "./from-login-credentials.ts";
import { resolveProcessCredentials } from "./from-process.ts";
import { fromTokenFile } from "./from-token-file.ts";
import { withHttpClient } from "./http-client.ts";
import { nodeFileSystem } from "./node-file-system.ts";
import {
  getProfileName,
  loadProfiles,
  type Profile,
  type Profiles,
  profileStsRegion,
} from "./profile.ts";
import {
  type AssumeRoleParams,
  assumeRole,
  type MfaCodeProvider,
  mfaCode,
} from "./sts.ts";

export interface FromIniOptions {
  readonly profile?: string;
  /** Answers an `mfa_serial` prompt; without one, MFA profiles fail. */
  readonly mfaCodeProvider?: MfaCodeProvider;
}

const isString = (value: unknown): value is string => typeof value === "string";
const isOptionalString = (value: unknown) =>
  value === undefined || typeof value === "string";

const isStaticCredsProfile = (profile: Profile) =>
  isString(profile.aws_access_key_id) &&
  isString(profile.aws_secret_access_key) &&
  isOptionalString(profile.aws_session_token) &&
  isOptionalString(profile.aws_account_id);

const isAssumeRoleProfile = (profile: Profile) =>
  isString(profile.role_arn) &&
  isOptionalString(profile.role_session_name) &&
  isOptionalString(profile.external_id) &&
  isOptionalString(profile.mfa_serial) &&
  ((isString(profile.source_profile) &&
    profile.credential_source === undefined) ||
    (isString(profile.credential_source) &&
      profile.source_profile === undefined));

const isWebIdentityProfile = (profile: Profile) =>
  isString(profile.web_identity_token_file) &&
  isString(profile.role_arn) &&
  isOptionalString(profile.role_session_name);

const isProcessProfile = (profile: Profile) =>
  isString(profile.credential_process);

/** Signed in with `aws login`; the token lives under `~/.aws/login`. */
const isLoginProfile = (profile: Profile) => isString(profile.login_session);

const isSsoProfile = (profile: Profile) =>
  isString(profile.sso_start_url) ||
  isString(profile.sso_account_id) ||
  isString(profile.sso_session) ||
  isString(profile.sso_region) ||
  isString(profile.sso_role_name);

const isCredentialSourceWithoutRoleArn = (profile: Profile) =>
  !profile.role_arn && !!profile.credential_source;

const staticCredentials = (profile: Profile): AwsCredentialIdentity => ({
  accessKeyId: profile.aws_access_key_id!,
  secretAccessKey: profile.aws_secret_access_key!,
  sessionToken: profile.aws_session_token,
  ...(profile.aws_credential_scope && {
    credentialScope: profile.aws_credential_scope,
  }),
  ...(profile.aws_account_id && { accountId: profile.aws_account_id }),
});

/** The `credential_source` of an assume-role profile. */
const credentialSource = (
  source: string | undefined,
  profileName: string,
): CredentialSource => {
  switch (source) {
    case "EcsContainer":
      return chain([fromHttp(), fromContainerMetadata()]);
    case "Ec2InstanceMetadata":
      return fromInstanceMetadata({ profile: profileName });
    case "Environment":
      return fromEnv;
    default:
      return Effect.fail(
        new CredentialSourceError({
          message:
            `Unsupported credential source in profile ${profileName}. Got ${source}, ` +
            `expected EcsContainer or Ec2InstanceMetadata or Environment.`,
        }),
      );
  }
};

const provideNodeServices = <A, E>(
  effect: Effect.Effect<
    A,
    E,
    FileSystem.FileSystem | Path.Path | HttpClient.HttpClient
  >,
): Effect.Effect<A, E> =>
  effect.pipe(
    Effect.provideService(FileSystem.FileSystem, nodeFileSystem),
    Effect.provide(Path.layer),
    withHttpClient,
  );

/**
 * SSO profiles resolve through `Auth`, the same code path `fromSSO` uses,
 * so the token cache and the role-credentials cache are shared with it.
 */
const ssoCredentials = (profileName: string): CredentialSource =>
  Auth.loadProfileCredentials(profileName).pipe(
    Effect.map((resolved): AwsCredentialIdentity => ({
      accessKeyId: Redacted.value(resolved.accessKeyId),
      secretAccessKey: Redacted.value(resolved.secretAccessKey),
      sessionToken: resolved.sessionToken
        ? Redacted.value(resolved.sessionToken)
        : undefined,
      expiration:
        resolved.expiration === undefined
          ? undefined
          : new Date(resolved.expiration),
    })),
    Effect.mapError(
      (cause) =>
        new CredentialSourceError({
          message: "message" in cause ? cause.message : String(cause),
          cause,
          // The SDK never falls through past an SSO profile that fails.
          tryNextLink: false,
        }),
    ),
    provideNodeServices,
  );

const resolveProfileData = (
  profileName: string,
  profiles: Profiles,
  options: FromIniOptions,
  visited: ReadonlySet<string>,
  isAssumeRoleRecursiveCall = false,
): CredentialSource => {
  const profile = profiles[profileName];
  if (!profile) {
    return Effect.fail(
      new CredentialSourceError({
        message: `Could not resolve credentials using profile: [${profileName}] in configuration/credentials file(s).`,
      }),
    );
  }
  if (visited.size > 0 && isStaticCredsProfile(profile)) {
    return Effect.succeed(staticCredentials(profile));
  }
  if (isAssumeRoleRecursiveCall || isAssumeRoleProfile(profile)) {
    return resolveAssumeRoleCredentials(
      profileName,
      profiles,
      options,
      visited,
    );
  }
  if (isStaticCredsProfile(profile)) {
    return Effect.succeed(staticCredentials(profile));
  }
  if (isWebIdentityProfile(profile)) {
    return fromTokenFile({
      webIdentityTokenFile: profile.web_identity_token_file,
      roleArn: profile.role_arn,
      roleSessionName: profile.role_session_name,
      profile: profileName,
    });
  }
  if (isProcessProfile(profile)) {
    return resolveProcessCredentials(profileName, profiles);
  }
  if (isLoginProfile(profile)) {
    return fromLoginCredentials({ profile: profileName });
  }
  if (isSsoProfile(profile)) {
    return ssoCredentials(profileName);
  }
  return Effect.fail(
    new CredentialSourceError({
      message: `Could not resolve credentials using profile: [${profileName}] in configuration/credentials file(s).`,
    }),
  );
};

const resolveAssumeRoleCredentials = (
  profileName: string,
  profiles: Profiles,
  options: FromIniOptions,
  visited: ReadonlySet<string>,
): CredentialSource =>
  Effect.gen(function* () {
    const profile = profiles[profileName]!;
    const sourceProfile = profile.source_profile;
    if (sourceProfile && visited.has(sourceProfile)) {
      return yield* new CredentialSourceError({
        message:
          `Detected a cycle attempting to resolve credentials for profile` +
          ` ${getProfileName(options.profile)}. Profiles visited: ` +
          [...visited].join(", "),
      });
    }
    const source = sourceProfile
      ? resolveProfileData(
          sourceProfile,
          profiles,
          options,
          new Set([...visited, sourceProfile]),
          isCredentialSourceWithoutRoleArn(profiles[sourceProfile] ?? {}),
        )
      : credentialSource(profile.credential_source, profileName);

    if (isCredentialSourceWithoutRoleArn(profile)) {
      return yield* source;
    }

    const params: AssumeRoleParams = {
      RoleArn: profile.role_arn!,
      RoleSessionName: profile.role_session_name || `aws-sdk-js-${Date.now()}`,
      ExternalId: profile.external_id,
      DurationSeconds: parseInt(profile.duration_seconds || "3600", 10),
    };
    if (profile.mfa_serial) {
      params.SerialNumber = profile.mfa_serial;
      params.TokenCode = yield* mfaCode(
        profile.mfa_serial,
        `Profile ${profileName}`,
        options.mfaCodeProvider,
      );
    }
    const sourceCredentials = yield* source;
    const region = yield* profileStsRegion(profile.region, options.profile);
    return yield* assumeRole(sourceCredentials, params, region);
  });

/**
 * Credentials from the shared config and credentials files: static keys,
 * `role_arn` + `source_profile` / `credential_source` (assumed through
 * STS), `web_identity_token_file`, `credential_process`, and SSO profiles.
 */
export const fromIni = (options: FromIniOptions = {}): CredentialSource =>
  Effect.flatMap(loadProfiles(), (profiles) =>
    resolveProfileData(
      getProfileName(options.profile),
      profiles,
      options,
      new Set(),
    ),
  );
