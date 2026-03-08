import {
  fromContainerMetadata as _fromContainerMetadata,
  fromEnv as _fromEnv,
  fromHttp as _fromHttp,
  fromIni as _fromIni,
  fromNodeProviderChain as _fromNodeProviderChain,
  fromProcess as _fromProcess,
  fromTokenFile as _fromTokenFile,
} from "@aws-sdk/credential-providers";

import {
  type AwsCredentialIdentity,
  type AwsCredentialIdentityProvider,
} from "@smithy/types";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type { PlatformError } from "effect/PlatformError";
import * as Redacted from "effect/Redacted";
import * as ServiceMap from "effect/ServiceMap";
import type { HttpClientError } from "effect/unstable/http/HttpClientError";
import { Auth } from "./auth.ts";
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

/**
 * Create a lazy, cached SSO credentials provider.
 * SSO credential resolution is deferred until the Effect is run,
 * and credentials are cached until they expire.
 */
export const fromSSO = (profileName: string = "default") =>
  Layer.effect(
    Credentials,
    Auth.use((auth) =>
      Effect.succeed(
        createCachedCredentialsEffect(auth.loadProfileCredentials(profileName)),
      ),
    ),
  );
