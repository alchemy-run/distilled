/**
 * The instance metadata provider with the active profile's IMDS settings
 * (`ec2_metadata_service_endpoint` and friends) read from `~/.aws/config`.
 */
import type { CredentialSource } from "./credential-source.ts";
import {
  fromInstanceMetadata as fromInstanceMetadataBrowser,
  type FromInstanceMetadataOptions,
} from "./from-instance-metadata.ts";
import { loadConfigProfile } from "./profile.ts";

export const fromInstanceMetadata = (
  options: Omit<FromInstanceMetadataOptions, "profileConfig"> & {
    profile?: string;
  } = {},
): CredentialSource =>
  fromInstanceMetadataBrowser({
    ...options,
    profileConfig: loadConfigProfile(options.profile),
  });
