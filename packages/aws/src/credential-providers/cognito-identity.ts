/**
 * The Amazon Cognito Identity calls the two Cognito providers share.
 *
 * `GetId` and `GetCredentialsForIdentity` are public — Cognito ignores the
 * `Authorization` header on them — but the generated operation still
 * requires a `Credentials` service, so a placeholder identity is supplied;
 * only its region is used. The generated `cognito-identity` service is
 * imported on first use.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import {
  Credentials,
  fromAwsCredentialIdentity,
} from "../credentials.browser.ts";
import * as Region from "../region.ts";
import {
  type CredentialSource,
  CredentialSourceError,
} from "./credential-source.ts";
import { withHttpClient } from "./http-client.ts";

/**
 * A login token per provider, e.g.
 * `{ "accounts.google.com": idToken }`. An `Effect` is re-run on every
 * credential resolution, for a token that has to be refreshed.
 */
export type Logins = Readonly<
  Record<string, string | Effect.Effect<string, unknown>>
>;

export const resolveLogins = (
  logins: Logins | undefined,
): Effect.Effect<Record<string, string> | undefined, CredentialSourceError> => {
  if (!logins) return Effect.succeed(undefined);
  const entries = Object.entries(logins);
  if (entries.length === 0) return Effect.succeed(undefined);
  return Effect.forEach(entries, ([provider, token]) =>
    (typeof token === "string" ? Effect.succeed(token) : token).pipe(
      Effect.mapError(
        (cause) =>
          new CredentialSourceError({
            message: `Could not resolve the Cognito login token for ${provider}.`,
            cause,
            tryNextLink: false,
          }),
      ),
      Effect.map((resolved) => [provider, resolved] as const),
    ),
  ).pipe(Effect.map((resolved) => Object.fromEntries(resolved)));
};

/**
 * Identity pool ids and identity ids are both `<region>:<uuid>`, so the
 * region to call Cognito in is normally right there in the id.
 */
export const regionFromId = (
  identifier: string,
): Region.RegionName | undefined => {
  const prefix = identifier.split(":")[0];
  return prefix && prefix !== identifier
    ? (prefix as Region.RegionName)
    : undefined;
};

export const cognitoRegion = (
  region: string | undefined,
  identifier: string,
): Effect.Effect<Region.RegionName, CredentialSourceError> => {
  const resolved = region ?? regionFromId(identifier);
  if (resolved) return Effect.succeed(resolved as Region.RegionName);
  return Region.fromEnvironment.pipe(
    Effect.catch(
      () =>
        new CredentialSourceError({
          message: `Could not determine which region to call Cognito Identity in for ${identifier}. Set AWS_REGION or pass \`region\`.`,
          tryNextLink: false,
        }),
    ),
  );
};

export const cognitoFailure = (cause: unknown) =>
  new CredentialSourceError({
    message:
      typeof cause === "object" && cause !== null && "message" in cause
        ? String((cause as { message: unknown }).message)
        : String(cause),
    cause,
    tryNextLink: false,
  });

export const unsigned =
  (region: Region.RegionName) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>) =>
    Effect.provideService(
      effect,
      Credentials,
      Effect.succeed(
        fromAwsCredentialIdentity(
          { accessKeyId: "", secretAccessKey: "" },
          region,
        ),
      ),
    );

/** `cognito-identity:GetCredentialsForIdentity` for a known identity id. */
export const getCredentialsForIdentity = (
  identityId: string,
  region: Region.RegionName,
  options: {
    readonly logins?: Logins;
    readonly customRoleArn?: string;
  },
): CredentialSource =>
  Effect.gen(function* () {
    const Cognito = yield* Effect.promise(
      () => import("../services/cognito-identity.ts"),
    );
    const logins = yield* resolveLogins(options.logins);
    const response = yield* Cognito.getCredentialsForIdentity({
      IdentityId: identityId,
      ...(logins && { Logins: logins }),
      ...(options.customRoleArn && { CustomRoleArn: options.customRoleArn }),
    }).pipe(unsigned(region), withHttpClient, Effect.mapError(cognitoFailure));
    const credentials = response.Credentials;
    if (!credentials?.AccessKeyId || !credentials.SecretKey) {
      return yield* new CredentialSourceError({
        message: `Cognito Identity returned no credentials for identity ${identityId}.`,
        tryNextLink: false,
      });
    }
    return {
      accessKeyId: credentials.AccessKeyId,
      secretAccessKey: Redacted.isRedacted(credentials.SecretKey)
        ? Redacted.value(credentials.SecretKey)
        : credentials.SecretKey,
      ...(credentials.SessionToken && {
        sessionToken: Redacted.isRedacted(credentials.SessionToken)
          ? Redacted.value(credentials.SessionToken)
          : credentials.SessionToken,
      }),
      ...(credentials.Expiration && { expiration: credentials.Expiration }),
    } satisfies AwsCredentialIdentity;
  });
