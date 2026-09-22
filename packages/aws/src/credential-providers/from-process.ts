/**
 * Credentials from the profile's `credential_process` command.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import { exec } from "node:child_process";
import {
  type CredentialSource,
  CredentialSourceError,
} from "./credential-source.ts";
import { getProfileName, loadProfiles, type Profiles } from "./profile.ts";

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

/** The `credential_process` of an already-loaded profile, for `fromIni`. */
export const resolveProcessCredentials = (
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
  Effect.flatMap(loadProfiles(), (profiles) =>
    resolveProcessCredentials(getProfileName(options.profile), profiles),
  );
