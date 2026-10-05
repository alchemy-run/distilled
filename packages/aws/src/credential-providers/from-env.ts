import * as Effect from "effect/Effect";
/**
 * Credentials from the process environment.
 */
import type { AwsCredentialIdentity } from "../credentials-service.ts";
import { createLazyProvider } from "../credentials-service.ts";
import { type CredentialSource, CredentialSourceError, env } from "./credential-source.ts";

export const ENV_KEY = "AWS_ACCESS_KEY_ID";
export const ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
const ENV_SESSION = "AWS_SESSION_TOKEN";
const ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
const ENV_CREDENTIAL_SCOPE = "AWS_CREDENTIAL_SCOPE";
const ENV_ACCOUNT_ID = "AWS_ACCOUNT_ID";

/** `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` and friends. */
export const envSource: CredentialSource = Effect.suspend(() => {
  const accessKeyId = env(ENV_KEY);
  const secretAccessKey = env(ENV_SECRET);
  const sessionToken = env(ENV_SESSION);
  const expiry = env(ENV_EXPIRATION);
  const credentialScope = env(ENV_CREDENTIAL_SCOPE);
  const accountId = env(ENV_ACCOUNT_ID);
  if (accessKeyId && secretAccessKey) {
    return Effect.succeed<AwsCredentialIdentity>({
      accessKeyId,
      secretAccessKey,
      ...(sessionToken && { sessionToken }),
      ...(expiry && { expiration: new Date(expiry) }),
      ...(credentialScope && { credentialScope }),
      ...(accountId && { accountId }),
    });
  }
  return Effect.fail(
    new CredentialSourceError({
      message: "Unable to find environment variable credentials.",
    }),
  );
});

const hints = [
  "Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (and AWS_SESSION_TOKEN if needed).",
];

/** `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` and friends. */
export const fromEnv = () => createLazyProvider(envSource, "env", hints);
