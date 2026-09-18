/**
 * The assume-role provider with the full Node provider chain, rather than
 * the environment alone, as the credentials that call `sts:AssumeRole`.
 */
import { createLazyProvider } from "../credentials-service.ts";
import type { CredentialSource } from "./credential-source.ts";
import { nodeProviderChainSource } from "./from-node-provider-chain.ts";
import {
  type FromTemporaryCredentialsOptions,
  temporaryCredentialsSource as browserTemporaryCredentialsSource,
} from "./from-temporary-credentials.ts";
import { profileRegion } from "./profile.ts";

export const temporaryCredentialsSource = (
  options: FromTemporaryCredentialsOptions,
): CredentialSource =>
  browserTemporaryCredentialsSource({
    ...options,
    masterCredentials: options.masterCredentials ?? nodeProviderChainSource(),
  });

const hints = ["Check that the source credentials are allowed to sts:AssumeRole the role."];

/**
 * A role assumed with another set of credentials, using the full Node
 * chain as the credentials that call `sts:AssumeRole`.
 */
export const fromTemporaryCredentials = (options: FromTemporaryCredentialsOptions) =>
  createLazyProvider(
    temporaryCredentialsSource(options),
    "temporary",
    hints,
    profileRegion(options.region),
  );
