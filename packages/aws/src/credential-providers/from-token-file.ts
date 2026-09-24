/**
 * Credentials from a web identity token file, as on EKS with IAM roles for
 * service accounts.
 */
import * as Effect from "effect/Effect";
import {
  type CredentialSource,
  CredentialSourceError,
  env,
} from "./credential-source.ts";
import { readFileString } from "./node-file-system.ts";
import { profileStsRegion } from "./profile.ts";
import { assumeRoleWithWebIdentity } from "./sts.ts";

const ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
const ENV_ROLE_ARN = "AWS_ROLE_ARN";
const ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";

export interface FromTokenFileOptions {
  readonly webIdentityTokenFile?: string;
  readonly roleArn?: string;
  readonly roleSessionName?: string;
  /** Region to call STS in; defaults per {@link profileStsRegion}. */
  readonly region?: string;
  readonly profile?: string;
}

/**
 * Credentials from `sts:AssumeRoleWithWebIdentity` with the token in
 * `AWS_WEB_IDENTITY_TOKEN_FILE` and the role in `AWS_ROLE_ARN` (or the
 * options).
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
    const region = yield* profileStsRegion(options.region, options.profile);
    return yield* assumeRoleWithWebIdentity(
      {
        RoleArn: roleArn,
        RoleSessionName: roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
        WebIdentityToken: webIdentityToken,
      },
      region,
    );
  });
