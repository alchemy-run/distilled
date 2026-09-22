/**
 * The STS calls the credential providers make: `sts:AssumeRole` and
 * `sts:AssumeRoleWithWebIdentity`, the region they are made in, and the MFA
 * prompt some roles require.
 *
 * Nothing here touches the file system or a child process, so these work in
 * the browser as well as in Node. The generated `sts` service is imported on
 * first use so an application that never assumes a role never pays for it.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import {
  Credentials,
  fromAwsCredentialIdentity,
} from "../credentials.browser.ts";
import * as Region from "../region.ts";
import type {
  AssumeRoleRequest,
  AssumeRoleWithWebIdentityRequest,
} from "../services/sts.ts";
import {
  type CredentialSource,
  CredentialSourceError,
} from "./credential-source.ts";
import { withHttpClient } from "./http-client.ts";

const unredact = (value: string | Redacted.Redacted<string>): string =>
  Redacted.isRedacted(value) ? Redacted.value(value) : value;

/**
 * The region STS is called in: the explicit one, else the environment, else
 * `fallback` (the profile's `region` in the Node build), else `us-east-1` —
 * the order of the SDK's `stsRegionDefaultResolver`.
 */
export const stsRegion = (
  region: string | undefined,
  fallback: Effect.Effect<string | undefined> = Effect.succeed(undefined),
): Effect.Effect<Region.RegionName> =>
  region
    ? Effect.succeed(region as Region.RegionName)
    : Region.fromEnvironment.pipe(
        Effect.catch(() =>
          Effect.map(
            fallback,
            (resolved) => (resolved ?? "us-east-1") as Region.RegionName,
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

export type AssumeRoleParams = AssumeRoleRequest;

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

export type AssumeRoleWithWebIdentityParams = AssumeRoleWithWebIdentityRequest;

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

/** Answers an `mfa_serial` / `SerialNumber` prompt. */
export type MfaCodeProvider = (
  mfaSerial: string,
) => Effect.Effect<string, unknown>;

/**
 * The `TokenCode` for a role that requires MFA. Without a code provider the
 * failure is final: there is no other source that could answer the prompt.
 */
export const mfaCode = (
  mfaSerial: string,
  subject: string,
  mfaCodeProvider: MfaCodeProvider | undefined,
): Effect.Effect<string, CredentialSourceError> =>
  mfaCodeProvider
    ? mfaCodeProvider(mfaSerial).pipe(
        Effect.mapError(
          (cause) =>
            new CredentialSourceError({
              message: `${subject}: MFA code provider failed.`,
              cause,
              tryNextLink: false,
            }),
        ),
      )
    : Effect.fail(
        new CredentialSourceError({
          message: `${subject} requires multi-factor authentication, but no MFA code callback was provided.`,
          tryNextLink: false,
        }),
      );
