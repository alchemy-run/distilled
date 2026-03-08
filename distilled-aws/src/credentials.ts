import {
  fromContainerMetadata as _fromContainerMetadata,
  fromEnv as _fromEnv,
  fromHttp as _fromHttp,
  fromIni as _fromIni,
  fromNodeProviderChain as _fromNodeProviderChain,
  fromProcess as _fromProcess,
  fromTokenFile as _fromTokenFile,
} from "@aws-sdk/credential-providers";
import * as ini from "@smithy/shared-ini-file-loader";
import {
  type AwsCredentialIdentity,
  type AwsCredentialIdentityProvider,
} from "@smithy/types";
import * as Console from "effect/Console";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type { PlatformError } from "effect/PlatformError";
import * as Redacted from "effect/Redacted";
import * as ServiceMap from "effect/ServiceMap";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type { HttpClientError } from "effect/unstable/http/HttpClientError";
import { createHash } from "node:crypto";
import * as path from "node:path";
import { parseIni, parseSSOSessionData } from "./util/parse-ini.ts";
export * as AWSTypes from "@aws-sdk/types";

export interface AwsCredentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly sessionToken?: string;
}

/**
 * Resolved credential values ready for request signing.
 */
export interface ResolvedCredentials {
  readonly accessKeyId: Redacted.Redacted<string>;
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly sessionToken: Redacted.Redacted<string> | undefined;
  readonly expiration?: number;
}

/**
 * The requirements for resolving credentials (HttpClient for SSO, FileSystem for cache).
 */

/**
 * Error types that can occur during credential resolution.
 */
export type CredentialsError =
  | AwsCredentialProviderError
  | ProfileNotFound
  | InvalidSSOProfile
  | InvalidSSOToken
  | ExpiredSSOToken
  | ConflictingSSORegion
  | ConflictingSSOStartUrl
  | HttpClientError
  | PlatformError;

export class Credentials extends ServiceMap.Service<
  Credentials,
  Effect.Effect<ResolvedCredentials, CredentialsError>
>()("AWS::Credentials") {}

export const mock = Layer.succeed(
  Credentials,
  Effect.succeed({
    accessKeyId: Redacted.make("test"),
    secretAccessKey: Redacted.make("test"),
    sessionToken: Redacted.make("test"),
  }),
);

/**
 * Create resolved credentials from an AWS credential identity.
 */
export const fromAwsCredentialIdentity = (
  identity: AwsCredentialIdentity,
): ResolvedCredentials => ({
  accessKeyId: Redacted.make(identity.accessKeyId),
  secretAccessKey: Redacted.make(identity.secretAccessKey),
  sessionToken: identity.sessionToken
    ? Redacted.make(identity.sessionToken)
    : undefined,
  expiration: identity.expiration?.getTime(),
});

type ProviderName =
  | "env"
  | "ini"
  | "chain"
  | "container"
  | "http"
  | "process"
  | "token-file";

const providerHints = (
  provider: ProviderName,
): ReadonlyArray<string> | undefined => {
  switch (provider) {
    case "env":
      return [
        "Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (and AWS_SESSION_TOKEN if needed).",
      ];
    case "ini":
      return ["Check ~/.aws/credentials and ~/.aws/config for the profile."];
    case "chain":
      return [
        "Configure at least one credential source for the default chain.",
        "If using SSO, run `aws sso login` for the profile.",
      ];
    case "container":
      return ["Ensure a container credential endpoint is available."];
    case "http":
      return ["Ensure the configured credential endpoint is reachable."];
    case "process":
      return [
        "Set AWS_CREDENTIAL_PROCESS to a valid command and ensure it exits successfully.",
      ];
    case "token-file":
      return [
        "Set AWS_WEB_IDENTITY_TOKEN_FILE and ensure the file is readable.",
      ];
    default:
      return;
  }
};

export const _providerHints = providerHints;

/**
 * Time window (5 mins) to refresh credentials before they actually expire.
 * This prevents using credentials that are about to expire.
 */
const CREDENTIAL_REFRESH_WINDOW_MS = 5 * 60 * 1000;

/**
 * Create a credentials effect with lazy resolution and expiration-aware caching.
 * Uses Effect.cachedWithTTL where the TTL is computed from the credentials' expiration.
 */
const createCachedCredentialsEffect = <E, R>(
  resolve: Effect.Effect<ResolvedCredentials, E, R>,
): Effect.Effect<ResolvedCredentials, E, R> => {
  let cachedCreds: ResolvedCredentials | undefined;
  let expiresAt: number | undefined;

  return Effect.suspend(() => {
    const now = Date.now();
    if (cachedCreds && expiresAt && now < expiresAt) {
      return Effect.succeed(cachedCreds);
    }
    return Effect.map(resolve, (creds) => {
      cachedCreds = creds;
      expiresAt = creds.expiration
        ? creds.expiration - CREDENTIAL_REFRESH_WINDOW_MS
        : undefined;
      return creds;
    });
  });
};

/**
 * Create a lazy, cached credentials provider from an AWS SDK credential provider.
 * Credentials are resolved on first access and cached based on their expiration time.
 */
const createLazyProvider = (
  provider: (config: {}) => AwsCredentialIdentityProvider,
  providerName: ProviderName,
): Layer.Layer<Credentials> => {
  const resolve = Effect.gen(function* () {
    const hints = providerHints(providerName);
    const identity = yield* Effect.tryPromise({
      try: () => provider({})(),
      catch: (cause) =>
        new AwsCredentialProviderError({
          message: `Failed to resolve credentials from ${providerName}.`,
          provider: providerName,
          cause,
          hints,
        }),
    });
    return fromAwsCredentialIdentity(identity);
  });

  return Layer.succeed(Credentials, createCachedCredentialsEffect(resolve));
};

/**
 * Create a credentials provider from static credentials.
 * No lazy loading or caching needed since credentials are already available.
 */
export const fromCredentials = (
  credentials: AwsCredentialIdentity,
): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed(fromAwsCredentialIdentity(credentials)),
  );

export const fromEnv = () => createLazyProvider(_fromEnv, "env");

export const fromChain = () =>
  createLazyProvider(() => _fromNodeProviderChain(), "chain");

// export const fromSSO = () => createLazyProvider(_fromSSO);

export const fromIni = () => createLazyProvider(_fromIni, "ini");

export const fromContainerMetadata = () =>
  createLazyProvider(_fromContainerMetadata, "container");

export const fromHttp = () => createLazyProvider(_fromHttp, "http");

export const fromProcess = () => createLazyProvider(_fromProcess, "process");

export const fromTokenFile = () =>
  createLazyProvider(_fromTokenFile, "token-file");

export const ssoRegion = (region: string) => Layer.succeed(SsoRegion, region);

/**
 * The time window (5 mins) that SDK will treat the SSO token expires in before the defined expiration date in token.
 * This is needed because server side may have invalidated the token before the defined expiration date.
 */
const EXPIRE_WINDOW_MS = 5 * 60 * 1000;

const REFRESH_MESSAGE = `To refresh this SSO session run 'aws sso login' with the corresponding profile.`;

export class SsoRegion extends ServiceMap.Service<SsoRegion, string>()(
  "AWS::SsoRegion",
) {}
export class SsoStartUrl extends ServiceMap.Service<SsoStartUrl, string>()(
  "AWS::SsoStartUrl",
) {}

export class ProfileNotFound extends Data.TaggedError(
  "Alchemy::AWS::ProfileNotFound",
)<{
  message: string;
  profile: string;
}> {}

export class ConflictingSSORegion extends Data.TaggedError(
  "Alchemy::AWS::ConflictingSSORegion",
)<{
  message: string;
  ssoRegion: string;
  profile: string;
}> {}

export class ConflictingSSOStartUrl extends Data.TaggedError(
  "Alchemy::AWS::ConflictingSSOStartUrl",
)<{
  message: string;
  ssoStartUrl: string;
  profile: string;
}> {}

export class InvalidSSOProfile extends Data.TaggedError(
  "Alchemy::AWS::InvalidSSOProfile",
)<{
  message: string;
  profile: string;
  missingFields: string[];
}> {}

export class InvalidSSOToken extends Data.TaggedError(
  "Alchemy::AWS::InvalidSSOToken",
)<{
  message: string;
  sso_session: string;
}> {}

export class ExpiredSSOToken extends Data.TaggedError(
  "Alchemy::AWS::ExpiredSSOToken",
)<{
  message: string;
  profile: string;
}> {}

export class AwsCredentialProviderError extends Data.TaggedError(
  "AWS::CredentialProviderError",
)<{
  message: string;
  provider: string;
  cause?: unknown;
  hints?: ReadonlyArray<string>;
}> {}

export interface AwsProfileConfig {
  sso_session?: string;
  sso_account_id?: string;
  sso_role_name?: string;
  region?: string;
  output?: string;
  sso_start_url?: string;
  sso_region?: string;
}
export interface SsoProfileConfig extends AwsProfileConfig {
  sso_start_url: string;
  sso_region: string;
  sso_account_id: string;
  sso_role_name: string;
}

/**
 * Cached SSO token retrieved from SSO login flow.
 * @public
 */
export interface SSOToken {
  /**
   * A base64 encoded string returned by the sso-oidc service.
   */
  accessToken: string;

  /**
   * The expiration time of the accessToken as an RFC 3339 formatted timestamp.
   */
  expiresAt: string;

  /**
   * The token used to obtain an access token in the event that the accessToken is invalid or expired.
   */
  refreshToken?: string;

  /**
   * The unique identifier string for each client. The client ID generated when performing the registration
   * portion of the OIDC authorization flow. This is used to refresh the accessToken.
   */
  clientId?: string;

  /**
   * A secret string generated when performing the registration portion of the OIDC authorization flow.
   * This is used to refresh the accessToken.
   */
  clientSecret?: string;

  /**
   * The expiration time of the client registration (clientId and clientSecret) as an RFC 3339 formatted timestamp.
   */
  registrationExpiresAt?: string;

  /**
   * The configured sso_region for the profile that credentials are being resolved for.
   */
  region?: string;

  /**
   * The configured sso_start_url for the profile that credentials are being resolved for.
   */
  startUrl?: string;
}

/**
 * Create a lazy, cached SSO credentials provider.
 * SSO credential resolution is deferred until the Effect is run,
 * and credentials are cached until they expire.
 */
export const fromSSO = (profileName: string = "default") =>
  Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      const fs = yield* FileSystem.FileSystem;

      return createCachedCredentialsEffect(
        _loadCredentials(profileName, fs, client),
      );
    }),
  );

/**
 * Load SSO credentials for the given profile.
 * Returns an Effect that resolves credentials lazily when run.
 */
export const loadSSOCredentials = Effect.fn(function* (profileName: string) {
  const client = yield* HttpClient.HttpClient;
  const fs = yield* FileSystem.FileSystem;

  return yield* _loadCredentials(profileName, fs, client);
});

const _loadCredentials = Effect.fn(function* (
  profileName: string,
  fs: FileSystem.FileSystem,
  client: HttpClient.HttpClient,
) {
  const awsDir = path.join(ini.getHomeDir(), ".aws");
  const cachePath = path.join(awsDir, "sso", "cache");

  const profile = yield* _loadProfile(profileName, fs);

  if (profile.sso_session) {
    const hasher = createHash("sha1");
    const cacheName = hasher.update(profile.sso_session).digest("hex");
    const ssoTokenFilepath = path.join(cachePath, `${cacheName}.json`);
    const cachedCredsFilePath = path.join(
      cachePath,
      `${cacheName}.credentials.json`,
    );

    const cachedCreds = yield* fs.readFileString(cachedCredsFilePath).pipe(
      Effect.map((text) => JSON.parse(text)),
      Effect.catch(() => Effect.void),
    );

    const isExpired = (expiry: number | string | undefined) => {
      return (
        expiry === undefined ||
        new Date(expiry).getTime() - Date.now() <= EXPIRE_WINDOW_MS
      );
    };

    if (cachedCreds && !isExpired(cachedCreds.expiry)) {
      return {
        accessKeyId: Redacted.make(cachedCreds.accessKeyId),
        secretAccessKey: Redacted.make(cachedCreds.secretAccessKey),
        sessionToken: cachedCreds.sessionToken
          ? Redacted.make(cachedCreds.sessionToken)
          : undefined,
        expiration: cachedCreds.expiry,
      } satisfies ResolvedCredentials;
    }

    const ssoToken = yield* fs.readFileString(ssoTokenFilepath).pipe(
      Effect.map((text) => JSON.parse(text) as SSOToken),
      Effect.catch(() =>
        Effect.fail(
          new InvalidSSOToken({
            message: `The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`,
            sso_session: profile.sso_session!,
          }),
        ),
      ),
    );

    if (isExpired(ssoToken.expiresAt)) {
      yield* Console.log(
        `The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`,
      );
      return yield* new ExpiredSSOToken({
        message: `The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`,
        profile: profileName,
      });
    }

    const response = yield* client.get(
      `https://portal.sso.${profile.sso_region}.amazonaws.com/federation/credentials?account_id=${profile.sso_account_id}&role_name=${profile.sso_role_name}`,
      {
        headers: {
          "User-Agent": "alchemy.run",
          "Content-Type": "application/json",
          "x-amz-sso_bearer_token": ssoToken.accessToken,
        },
      },
    );

    const credentials = (
      (yield* response.json) as {
        roleCredentials: {
          accessKeyId: string;
          secretAccessKey: string;
          sessionToken: string;
          expiration: number;
        };
      }
    ).roleCredentials;

    yield* fs.writeFileString(
      cachedCredsFilePath,
      JSON.stringify({
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        expiry: credentials.expiration,
      }),
    );

    return {
      accessKeyId: Redacted.make(credentials.accessKeyId),
      secretAccessKey: Redacted.make(credentials.secretAccessKey),
      sessionToken: Redacted.make(credentials.sessionToken),
      expiration: credentials.expiration,
    } satisfies ResolvedCredentials;
  }

  return yield* Effect.fail(
    new ProfileNotFound({
      message: `Profile ${profileName} not found`,
      profile: profileName,
    }),
  );
});

export const loadProfile = Effect.fn(function* (profileName: string) {
  const fs = yield* FileSystem.FileSystem;
  return yield* _loadProfile(profileName, fs);
});
const _loadProfile = Effect.fn(function* (
  profileName: string,
  fs: FileSystem.FileSystem,
) {
  const profiles: {
    [profileName: string]: AwsProfileConfig;
  } = yield* Effect.promise(() =>
    ini.parseKnownFiles({ profile: profileName }),
  );

  const profile = profiles[profileName];

  if (!profile) {
    yield* Effect.fail(
      new ProfileNotFound({
        message: `Profile ${profileName} not found`,
        profile: profileName,
      }),
    );
  }

  const awsDir = path.join(ini.getHomeDir(), ".aws");
  const configPath = path.join(awsDir, "config");

  if (profile.sso_session) {
    const ssoRegion = Option.getOrUndefined(
      yield* Effect.serviceOption(SsoRegion),
    );
    const ssoStartUrl = Option.getOrElse(
      yield* Effect.serviceOption(SsoStartUrl),
      () => profile.sso_start_url,
    );

    const ssoSessions = yield* fs.readFileString(configPath).pipe(
      Effect.flatMap((config) => Effect.promise(async () => parseIni(config))),
      Effect.map(parseSSOSessionData),
    );
    const session = ssoSessions[profile.sso_session];
    if (ssoRegion && ssoRegion !== session.sso_region) {
      yield* Effect.fail(
        new ConflictingSSORegion({
          message: `Conflicting SSO region`,
          ssoRegion: ssoRegion,
          profile: profile.sso_session,
        }),
      );
    }
    if (ssoStartUrl && ssoStartUrl !== session.sso_start_url) {
      yield* Effect.fail(
        new ConflictingSSOStartUrl({
          message: `Conflicting SSO start url`,
          ssoStartUrl: ssoStartUrl,
          profile: profile.sso_session,
        }),
      );
    }
    profile.sso_region = session.sso_region;
    profile.sso_start_url = session.sso_start_url;

    const ssoFields = [
      "sso_start_url",
      "sso_account_id",
      "sso_region",
      "sso_role_name",
    ] as const satisfies (keyof SsoProfileConfig)[];
    const missingFields = ssoFields.filter((field) => !profile[field]);
    if (missingFields.length > 0) {
      yield* Effect.fail(
        new InvalidSSOProfile({
          profile: profileName,
          missingFields,
          message:
            `Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", ` +
            `"sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(
              profile,
            ).join(
              ", ",
            )}\nReference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`,
        }),
      );
    }
    return profile;
  }

  return yield* Effect.fail(
    new ProfileNotFound({
      message: `Profile ${profileName} not found`,
      profile: profileName,
    }),
  );
});
