/**
 * The instance metadata provider with the active profile's IMDS settings
 * (`ec2_metadata_service_endpoint` and friends) read from `~/.aws/config`.
 */
import { createLazyProvider } from "../credentials-service.ts";
import type { CredentialSource } from "./credential-source.ts";
import {
  type FromInstanceMetadataOptions,
  instanceMetadataSource as browserInstanceMetadataSource,
} from "./from-instance-metadata.ts";
import { loadConfigProfile } from "./profile.ts";

type Options = Omit<FromInstanceMetadataOptions, "profileConfig"> & {
  profile?: string;
};

export const instanceMetadataSource = (
  options: Options = {},
): CredentialSource =>
  browserInstanceMetadataSource({
    ...options,
    profileConfig: loadConfigProfile(options.profile),
  });

const hints = [
  "Ensure the EC2 instance metadata service is reachable and the instance has a role.",
];

/**
 * The EC2 instance role, from the instance metadata service, with the
 * profile's IMDS settings.
 */
export const fromInstanceMetadata = (options: Options = {}) =>
  createLazyProvider(
    instanceMetadataSource(options),
    "instance-metadata",
    hints,
  );
