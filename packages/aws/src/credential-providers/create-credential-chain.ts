/**
 * Several credential sources tried in order.
 */
import { createLazyProvider } from "../credentials-service.ts";
import { chain, type CredentialSource } from "./credential-source.ts";

const hints = [
  "Configure at least one credential source for the default chain.",
  "If using SSO, run `aws sso login` for the profile.",
];

/**
 * Try each source in turn, as `createCredentialChain` does: the first one
 * to resolve wins, and a source whose failure is final (an MFA prompt that
 * cannot be answered, say) stops the chain there.
 */
export const createCredentialChain = (
  ...sources: ReadonlyArray<CredentialSource>
) => createLazyProvider(chain(sources), "chain", hints);

/** {@link createCredentialChain}, under the AWS SDK's other name for it. */
export { createCredentialChain as propertyProviderChain };
