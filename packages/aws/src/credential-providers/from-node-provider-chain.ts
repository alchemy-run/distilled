/**
 * The default Node credential chain, in the SDK's order: environment,
 * shared config / credentials files, `credential_process`, web identity
 * token file, then the container or instance metadata endpoints.
 */
import * as Effect from "effect/Effect";
import { createLazyProvider } from "../credentials-service.ts";
import { chain, type CredentialSource, CredentialSourceError, env } from "./credential-source.ts";
import { containerMetadataSource } from "./from-container-metadata.ts";
import { ENV_KEY, ENV_SECRET, envSource } from "./from-env.ts";
import { httpSource } from "./from-http.node.ts";
import { ENV_CMDS_FULL_URI, ENV_CMDS_RELATIVE_URI } from "./from-http.ts";
import { type FromIniOptions, iniSource } from "./from-ini.ts";
import { instanceMetadataSource } from "./from-instance-metadata.node.ts";
import { processSource } from "./from-process.ts";
import { tokenFileSource } from "./from-token-file.ts";
import { ENV_PROFILE, profileRegion } from "./profile.ts";

const ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";

let multipleCredentialSourceWarningEmitted = false;

/** The environment, unless `AWS_PROFILE` says to go to the profile first. */
const envUnlessProfile = (profile?: string): CredentialSource =>
  Effect.suspend(() => {
    const profileName = profile ?? env(ENV_PROFILE);
    if (profileName) {
      if (env(ENV_KEY) && env(ENV_SECRET) && !multipleCredentialSourceWarningEmitted) {
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
    return envSource;
  });

/** The container endpoint if configured, else IMDS unless disabled. */
const remoteProvider = (profile?: string): CredentialSource =>
  Effect.suspend(() => {
    if (env(ENV_CMDS_RELATIVE_URI) || env(ENV_CMDS_FULL_URI)) {
      return chain([httpSource(), containerMetadataSource()]);
    }
    const disabled = env(ENV_IMDS_DISABLED);
    if (disabled && disabled !== "false") {
      return Effect.fail(
        new CredentialSourceError({
          message: "EC2 Instance Metadata Service access disabled",
        }),
      );
    }
    return instanceMetadataSource({ profile });
  });

export const nodeProviderChainSource = (options: FromIniOptions = {}): CredentialSource =>
  chain([
    envUnlessProfile(options.profile),
    iniSource(options),
    processSource(options),
    tokenFileSource(options),
    remoteProvider(options.profile),
    Effect.fail(
      new CredentialSourceError({
        message: "Could not load credentials from any providers",
        tryNextLink: false,
      }),
    ),
  ]);

const hints = [
  "Configure at least one credential source for the default chain.",
  "If using SSO, run `aws sso login` for the profile.",
];

/**
 * The default Node chain: the environment, the shared config and
 * credentials files, `credential_process`, the web identity token file,
 * then the container or instance metadata endpoints.
 */
export const fromChain = (options: FromIniOptions = {}) =>
  createLazyProvider(
    nodeProviderChainSource(options),
    "chain",
    hints,
    profileRegion(undefined, options.profile),
  );

/** {@link fromChain}, under the name the AWS SDK gives it. */
export { fromChain as fromNodeProviderChain };
