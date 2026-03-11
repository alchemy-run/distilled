import * as ini from "@smithy/shared-ini-file-loader";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Redacted from "effect/Redacted";
import * as ServiceMap from "effect/ServiceMap";
import * as HttpClient from "effect/unstable/http/HttpClient";
import { createHash } from "node:crypto";
import {
  ConflictingSSORegion,
  ConflictingSSOStartUrl,
  ExpiredSSOToken,
  InvalidSSOProfile,
  InvalidSSOToken,
  ProfileNotFound,
  SsoRegion,
  SsoStartUrl,
  type CredentialsError,
  type ResolvedCredentials,
} from "./credentials.ts";
import { parseIni, parseSSOSessionData } from "./util/parse-ini.ts";

/**
 * The time window (5 mins) that SDK will treat the SSO token expires in before the defined expiration date in token.
 * This is needed because server side may have invalidated the token before the defined expiration date.
 */
const EXPIRE_WINDOW_MS = 5 * 60 * 1000;

const REFRESH_MESSAGE = `To refresh this SSO session run 'aws sso login' with the corresponding profile.`;

export class Auth extends ServiceMap.Service<
  Auth,
  {
    loadProfile: (
      profileName: string,
    ) => Effect.Effect<AwsProfileConfig, CredentialsError>;
    loadProfileCredentials: (
      profileName: string,
    ) => Effect.Effect<ResolvedCredentials, CredentialsError>;
  }
>()("distilled-aws/AWS/Auth") {}

export const Default = Effect.serviceOption(Auth).pipe(
  Effect.map(Option.getOrUndefined),
  Effect.flatMap((c) => (c ? Effect.succeed(c) : makeAuthService())),
);

export const loadProfile = (profile: string) =>
  Effect.flatMap(Default, (auth) => auth.loadProfile(profile));

export const loadProfileCredentials = (profile: string) =>
  Effect.flatMap(Default, (auth) => auth.loadProfileCredentials(profile));

export const makeAuthService = () =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const client = yield* HttpClient.HttpClient;

    const loadProfile = Effect.fn(function* (profileName: string) {
      const profiles: {
        [profileName: string]: AwsProfileConfig;
      } = yield* Effect.promise(() =>
        ini.parseKnownFiles({ profile: profileName }),
      );

      const profile = profiles[profileName];

      if (!profile) {
        return yield* new ProfileNotFound({
          message: `Profile ${profileName} not found`,
          profile: profileName,
        });
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
          Effect.flatMap((config) =>
            Effect.promise(async () => parseIni(config)),
          ),
          Effect.map(parseSSOSessionData),
        );
        const session = ssoSessions[profile.sso_session];
        if (ssoRegion && ssoRegion !== session.sso_region) {
          return yield* new ConflictingSSORegion({
            message: `Conflicting SSO region`,
            ssoRegion: ssoRegion,
            profile: profile.sso_session,
          });
        }
        if (ssoStartUrl && ssoStartUrl !== session.sso_start_url) {
          return yield* new ConflictingSSOStartUrl({
            message: `Conflicting SSO start url`,
            ssoStartUrl: ssoStartUrl,
            profile: profile.sso_session,
          });
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
          yield* new InvalidSSOProfile({
            profile: profileName,
            missingFields,
            message:
              `Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", ` +
              `"sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(
                profile,
              ).join(
                ", ",
              )}\nReference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`,
          });
        }
        return profile;
      }

      return yield* new ProfileNotFound({
        message: `Profile ${profileName} not found`,
        profile: profileName,
      });
    });

    const loadProfileCredentials = Effect.fn(function* (profileName: string) {
      const awsDir = path.join(ini.getHomeDir(), ".aws");
      const cachePath = path.join(awsDir, "sso", "cache");

      const profile = yield* loadProfile(profileName);

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
            new InvalidSSOToken({
              message: `The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`,
              sso_session: profile.sso_session!,
            }).asEffect(),
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

      return yield* new ProfileNotFound({
        message: `Profile ${profileName} not found`,
        profile: profileName,
      });
    });

    return Auth.of({
      loadProfile,
      loadProfileCredentials,
    });
  });

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