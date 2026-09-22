/**
 * The assume-role provider with the full Node provider chain, rather than
 * the environment alone, as the credentials that call `sts:AssumeRole`.
 */
import type { CredentialSource } from "./credential-source.ts";
import { fromNodeProviderChain } from "./from-node-provider-chain.ts";
import {
  fromTemporaryCredentials as fromTemporaryCredentialsBrowser,
  type FromTemporaryCredentialsOptions,
} from "./from-temporary-credentials.ts";

export const fromTemporaryCredentials = (
  options: FromTemporaryCredentialsOptions,
): CredentialSource =>
  fromTemporaryCredentialsBrowser({
    ...options,
    masterCredentials: options.masterCredentials ?? fromNodeProviderChain(),
  });
