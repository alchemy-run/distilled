/**
 * The default Node credential chain, in the SDK's order: environment,
 * shared config / credentials files, `credential_process`, web identity
 * token file, then the container or instance metadata endpoints.
 */
import * as Effect from "effect/Effect";
import {
  chain,
  type CredentialSource,
  CredentialSourceError,
  env,
} from "./credential-source.ts";
import { fromContainerMetadata } from "./from-container-metadata.ts";
import { ENV_KEY, ENV_SECRET, fromEnv } from "./from-env.ts";
import { fromHttp } from "./from-http.node.ts";
import { ENV_CMDS_FULL_URI, ENV_CMDS_RELATIVE_URI } from "./from-http.ts";
import { type FromIniOptions, fromIni } from "./from-ini.ts";
import { fromInstanceMetadata } from "./from-instance-metadata.node.ts";
import { fromProcess } from "./from-process.ts";
import { fromTokenFile } from "./from-token-file.ts";
import { ENV_PROFILE } from "./profile.ts";

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
