/**
 * Credential sources that need the file system or a child process, so they
 * only exist in the Node build: `~/.aws/config` profiles (`fromIni`),
 * `credential_process`, web identity token files, and the default chain
 * that strings them together with the browser-safe sources.
 *
 * Profiles are read through `@smithy/shared-ini-file-loader`, the same
 * loader `auth.ts` uses, so both agree on which files and which profile
 * name apply. STS calls go through the generated `sts` service, loaded on
 * first use so an application that never assumes a role never pays for it.
 */
import {
  loadSharedConfigFiles,
  parseKnownFiles,
} from "@smithy/shared-ini-file-loader";
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as PlatformError from "effect/PlatformError";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import { exec } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import * as Auth from "../auth.ts";
import {
  Credentials,
  fromAwsCredentialIdentity,
} from "../credentials.browser.ts";
import * as Region from "../region.ts";
import {
  type CredentialSource,
  CredentialSourceError,
  chain,
  env,
  ENV_CMDS_FULL_URI,
  ENV_CMDS_RELATIVE_URI,
  ENV_KEY,
  ENV_SECRET,
  fromContainerMetadata,
  fromEnv,
  fromHttp as fromHttpShared,
  fromInstanceMetadata as fromInstanceMetadataShared,
  type FromInstanceMetadataOptions,
  withHttpClient,
} from "./shared.ts";

export * from "./shared.ts";

type Profile = Readonly<Record<string, string | undefined>>;
type Profiles = Readonly<Record<string, Profile | undefined>>;

const ENV_PROFILE = "AWS_PROFILE";
const DEFAULT_PROFILE = "default";

/** `profile`, else `AWS_PROFILE`, else `default` — as the AWS CLI. */
export const getProfileName = (profile?: string): string =>
  profile || env(ENV_PROFILE) || DEFAULT_PROFILE;

const loadProfiles = (
  profile?: string,
): Effect.Effect<Profiles, CredentialSourceError> =>
  Effect.tryPromise({
    try: () => parseKnownFiles({ profile }) as Promise<Profiles>,
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

// ---------------------------------------------------------------------------
// File system
// ---------------------------------------------------------------------------

const systemError =
  (method: string, path: string) =>
  (cause: unknown): PlatformError.PlatformError =>
    PlatformError.systemError({
      _tag: "Unknown",
      module: "FileSystem",
      method,
      pathOrDescriptor: path,
      cause,
    });

/**
 * A minimal Node `FileSystem` — just what these providers and `Auth` read
 * and write under `~/.aws`. `Auth.Default` uses an `Auth` already in scope
 * before falling back to constructing one from this.
 */
const nodeFileSystem = FileSystem.makeNoop({
  readFileString: (path) =>
    Effect.tryPromise({
      try: () => readFile(path, "utf8"),
      catch: systemError("readFileString", path),
    }),
  writeFileString: (path, data) =>
    Effect.tryPromise({
      try: () => writeFile(path, data),
      catch: systemError("writeFileString", path),
    }),
});

const readFileString = (path: string) => nodeFileSystem.readFileString(path);

// ---------------------------------------------------------------------------
// fromHttp / fromInstanceMetadata with file-system access
// ---------------------------------------------------------------------------

/** {@link fromHttpShared} plus `AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE`. */
export const fromHttp = (
  options: { timeout?: number; maxRetries?: number } = {},
): CredentialSource => fromHttpShared({ ...options, readFile: readFileString });

/** {@link fromInstanceMetadataShared} plus the profile's IMDS settings. */
export const fromInstanceMetadata = (
  options: Omit<FromInstanceMetadataOptions, "profileConfig"> & {
    profile?: string;
  } = {},
): CredentialSource =>
  fromInstanceMetadataShared({
    ...options,
    profileConfig: loadConfigProfile(options.profile),
  });

// ---------------------------------------------------------------------------
// STS
// ---------------------------------------------------------------------------

const unredact = (value: string | Redacted.Redacted<string>): string =>
  Redacted.isRedacted(value) ? Redacted.value(value) : value;

/**
 * The region STS is called in: the profile's own `region`, else the
 * environment, else the default profile's `region`, else `us-east-1` — the
 * order of the SDK's `stsRegionDefaultResolver`.
 */
const stsRegion = (
  profileRegion: string | undefined,
  profile?: string,
): Effect.Effect<Region.RegionName> =>
  profileRegion
    ? Effect.succeed(profileRegion as Region.RegionName)
    : Region.fromEnvironment.pipe(
        Effect.catch(() =>
          Effect.map(
            loadConfigProfile(profile),
            (config) => (config?.region ?? "us-east-1") as Region.RegionName,
          ),
        ),
      );

interface StsResponse {
  Credentials?: {
    AccessKeyId: string;
    SecretAccessKey: string | Redacted.Redacted<string>;
    SessionToken: string;
    Expiration: Date;
  };
  AssumedRoleUser?: { Arn?: string };
}

const stsCredentials = (
  roleArn: string,
  response: StsResponse,
): Effect.Effect<AwsCredentialIdentity, CredentialSourceError> => {
  const credentials = response.Credentials;
  if (!credentials?.AccessKeyId || !credentials.SecretAccessKey) {
    return Effect.fail(
      new CredentialSourceError({
        message: `Invalid response from STS call with role ${roleArn}`,
        tryNextLink: false,
      }),
    );
  }
  const arn = response.AssumedRoleUser?.Arn?.split(":");
  const accountId = arn && arn.length > 4 && arn[4] !== "" ? arn[4] : undefined;
  return Effect.succeed({
    accessKeyId: credentials.AccessKeyId,
    secretAccessKey: unredact(credentials.SecretAccessKey),
    sessionToken: credentials.SessionToken,
    expiration: credentials.Expiration,
    ...(accountId && { accountId }),
  });
};

/** An STS failure is final: the chain does not move on to another source. */
const stsFailure = (cause: unknown) =>
  new CredentialSourceError({
    message:
      typeof cause === "object" && cause !== null && "message" in cause
        ? String((cause as { message: unknown }).message)
        : String(cause),
    cause,
    tryNextLink: false,
  });

export interface AssumeRoleParams {
  RoleArn: string;
  RoleSessionName: string;
  ExternalId?: string;
  DurationSeconds?: number;
  SerialNumber?: string;
  TokenCode?: string;
}

/** `sts:AssumeRole`, signed with `sourceCredentials`. */
export const assumeRole = (
  sourceCredentials: AwsCredentialIdentity,
  params: AssumeRoleParams,
  region: Region.RegionName,
): CredentialSource =>
  Effect.gen(function* () {
    const STS = yield* Effect.promise(() => import("../services/sts.ts"));
    const response = yield* STS.assumeRole(params).pipe(
      Effect.provideService(
        Credentials,
        Effect.succeed(fromAwsCredentialIdentity(sourceCredentials, region)),
      ),
      withHttpClient,
      Effect.mapError(stsFailure),
    );
    return yield* stsCredentials(params.RoleArn, response);
  });

export interface AssumeRoleWithWebIdentityParams {
  RoleArn: string;
  RoleSessionName: string;
  WebIdentityToken: string;
  ProviderId?: string;
  Policy?: string;
  DurationSeconds?: number;
}

/**
 * `sts:AssumeRoleWithWebIdentity`. The call is unsigned, but the generated
 * operation still requires a `Credentials` service, so a placeholder
 * identity is supplied; only its region is used.
 */
export const assumeRoleWithWebIdentity = (
  params: AssumeRoleWithWebIdentityParams,
  region: Region.RegionName,
): CredentialSource =>
  Effect.gen(function* () {
    const STS = yield* Effect.promise(() => import("../services/sts.ts"));
    const response = yield* STS.assumeRoleWithWebIdentity(params).pipe(
      Effect.provideService(
        Credentials,
        Effect.succeed(
          fromAwsCredentialIdentity(
            { accessKeyId: "", secretAccessKey: "" },
            region,
          ),
        ),
      ),
      withHttpClient,
      Effect.mapError(stsFailure),
    );
    return yield* stsCredentials(params.RoleArn, response);
  });

// ---------------------------------------------------------------------------
// credential_process
// ---------------------------------------------------------------------------

/** Run a shell command and return its stdout; interrupt kills the child. */
const execCommand = (
  command: string,
): Effect.Effect<string, CredentialSourceError> =>
  Effect.callback<string, CredentialSourceError>((resume, signal) => {
    exec(command, { signal }, (error, stdout) => {
      resume(
        error
          ? Effect.fail(
              new CredentialSourceError({
                message: error.message,
                cause: error,
              }),
            )
          : Effect.succeed(stdout),
      );
    });
  });

interface ProcessOutput {
  Version?: number;
  AccessKeyId?: string;
  SecretAccessKey?: string;
  SessionToken?: string;
  Expiration?: string;
  CredentialScope?: string;
  AccountId?: string;
}

const resolveProcessCredentials = (
  profileName: string,
  profiles: Profiles,
): CredentialSource => {
  const profile = profiles[profileName];
  if (!profile) {
    return Effect.fail(
      new CredentialSourceError({
        message: `Profile ${profileName} could not be found in shared credentials file.`,
      }),
    );
  }
  const credentialProcess = profile.credential_process;
  if (credentialProcess === undefined) {
    return Effect.fail(
      new CredentialSourceError({
        message: `Profile ${profileName} did not contain credential_process.`,
      }),
    );
  }
  const invalid = (reason: string, cause?: unknown) =>
    new CredentialSourceError({
      message: `Profile ${profileName} credential_process ${reason}.`,
      cause,
    });
  return execCommand(credentialProcess).pipe(
    Effect.flatMap((stdout) =>
      Effect.try({
        try: (): ProcessOutput => JSON.parse(stdout.trim()),
        catch: (cause) => invalid("returned invalid JSON", cause),
      }),
    ),
    Effect.flatMap((data) => {
      if (data.Version !== 1) {
        return Effect.fail(invalid("did not return Version 1"));
      }
      if (
        data.AccessKeyId === undefined ||
        data.SecretAccessKey === undefined
      ) {
        return Effect.fail(invalid("returned invalid credentials"));
      }
      if (data.Expiration && new Date(data.Expiration) < new Date()) {
        return Effect.fail(invalid("returned expired credentials"));
      }
      const accountId = data.AccountId ?? profile.aws_account_id;
      return Effect.succeed<AwsCredentialIdentity>({
        accessKeyId: data.AccessKeyId,
        secretAccessKey: data.SecretAccessKey,
        ...(data.SessionToken && { sessionToken: data.SessionToken }),
        ...(data.Expiration && { expiration: new Date(data.Expiration) }),
        ...(data.CredentialScope && { credentialScope: data.CredentialScope }),
        ...(accountId && { accountId }),
      });
    }),
  );
};

/** Credentials from the profile's `credential_process` command. */
export const fromProcess = (
  options: { profile?: string } = {},
): CredentialSource =>
  Effect.flatMap(loadProfiles(options.profile), (profiles) =>
    resolveProcessCredentials(getProfileName(options.profile), profiles),
  );

// ---------------------------------------------------------------------------
// Web identity token file
// ---------------------------------------------------------------------------

const ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
const ENV_ROLE_ARN = "AWS_ROLE_ARN";
const ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";

export interface FromTokenFileOptions {
  readonly webIdentityTokenFile?: string;
  readonly roleArn?: string;
  readonly roleSessionName?: string;
  /** Region to call STS in; defaults per {@link stsRegion}. */
  readonly region?: string;
  readonly profile?: string;
}

/**
 * Credentials from `sts:AssumeRoleWithWebIdentity` with the token in
 * `AWS_WEB_IDENTITY_TOKEN_FILE` and the role in `AWS_ROLE_ARN` (or the
 * options), as on EKS with IAM roles for service accounts.
 */
export const fromTokenFile = (
  options: FromTokenFileOptions = {},
): CredentialSource =>
  Effect.gen(function* () {
    const webIdentityTokenFile =
      options.webIdentityTokenFile ?? env(ENV_TOKEN_FILE);
    const roleArn = options.roleArn ?? env(ENV_ROLE_ARN);
    const roleSessionName =
      options.roleSessionName ?? env(ENV_ROLE_SESSION_NAME);
    if (!webIdentityTokenFile || !roleArn) {
      return yield* new CredentialSourceError({
        message: "Web identity configuration not specified",
      });
    }
    const webIdentityToken = yield* readFileString(webIdentityTokenFile).pipe(
      Effect.mapError(
        (cause) =>
          new CredentialSourceError({
            message: `Could not read web identity token file ${webIdentityTokenFile}.`,
            cause,
          }),
      ),
    );
    const region = yield* stsRegion(options.region, options.profile);
    return yield* assumeRoleWithWebIdentity(
      {
        RoleArn: roleArn,
        RoleSessionName: roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
        WebIdentityToken: webIdentityToken,
      },
      region,
    );
  });

// ---------------------------------------------------------------------------
// fromIni
// ---------------------------------------------------------------------------

export interface FromIniOptions {
  readonly profile?: string;
  /** Answers an `mfa_serial` prompt; without one, MFA profiles fail. */
  readonly mfaCodeProvider?: (
    mfaSerial: string,
  ) => Effect.Effect<string, unknown>;
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
      if (!options.mfaCodeProvider) {
        return yield* new CredentialSourceError({
          message: `Profile ${profileName} requires multi-factor authentication, but no MFA code callback was provided.`,
          tryNextLink: false,
        });
      }
      params.SerialNumber = profile.mfa_serial;
      params.TokenCode = yield* options
        .mfaCodeProvider(profile.mfa_serial)
        .pipe(
          Effect.mapError(
            (cause) =>
              new CredentialSourceError({
                message: `MFA code provider failed for profile ${profileName}.`,
                cause,
                tryNextLink: false,
              }),
          ),
        );
    }
    const sourceCredentials = yield* source;
    const region = yield* stsRegion(profile.region, options.profile);
    return yield* assumeRole(sourceCredentials, params, region);
  });

/**
 * Credentials from the shared config and credentials files: static keys,
 * `role_arn` + `source_profile` / `credential_source` (assumed through
 * STS), `web_identity_token_file`, `credential_process`, and SSO profiles.
 */
export const fromIni = (options: FromIniOptions = {}): CredentialSource =>
  Effect.flatMap(loadProfiles(options.profile), (profiles) =>
    resolveProfileData(
      getProfileName(options.profile),
      profiles,
      options,
      new Set(),
    ),
  );

// ---------------------------------------------------------------------------
// Default chain
// ---------------------------------------------------------------------------

const ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";

let multipleCredentialSourceWarningEmitted = false;

/** The environment, unless `AWS_PROFILE` says to go to the profile first. */
const envUnlessProfile = (profile?: string): CredentialSource =>
  Effect.suspend(() => {
    const profileName = profile ?? env(ENV_PROFILE);
    if (profileName) {
      if (
        env(ENV_KEY) &&
        env(ENV_SECRET) &&
        !multipleCredentialSourceWarningEmitted
      ) {
        multipleCredentialSourceWarningEmitted = true;
        console.warn(`WARNING:
    Multiple credential sources detected:
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.

    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`);
      }
      return Effect.fail(
        new CredentialSourceError({
          message: "AWS_PROFILE is set, skipping fromEnv provider.",
        }),
      );
    }
    return fromEnv;
  });

/** The container endpoint if configured, else IMDS unless disabled. */
const remoteProvider = (profile?: string): CredentialSource =>
  Effect.suspend(() => {
    if (env(ENV_CMDS_RELATIVE_URI) || env(ENV_CMDS_FULL_URI)) {
      return chain([fromHttp(), fromContainerMetadata()]);
    }
    const disabled = env(ENV_IMDS_DISABLED);
    if (disabled && disabled !== "false") {
      return Effect.fail(
        new CredentialSourceError({
          message: "EC2 Instance Metadata Service access disabled",
        }),
      );
    }
    return fromInstanceMetadata({ profile });
  });

/**
 * The default Node credential chain, in the SDK's order: environment,
 * shared config / credentials files, `credential_process`, web identity
 * token file, then the container or instance metadata endpoints.
 */
export const fromNodeProviderChain = (
  options: FromIniOptions = {},
): CredentialSource =>
  chain([
    envUnlessProfile(options.profile),
    fromIni(options),
    fromProcess(options),
    fromTokenFile(options),
    remoteProvider(options.profile),
    Effect.fail(
      new CredentialSourceError({
        message: "Could not load credentials from any providers",
        tryNextLink: false,
      }),
    ),
  ]);
