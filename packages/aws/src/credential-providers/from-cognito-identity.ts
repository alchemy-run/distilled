/**
 * Credentials for an Amazon Cognito identity whose id the caller has.
 */
import * as Effect from "effect/Effect";
import {
  cognitoRegion,
  getCredentialsForIdentity,
  type Logins,
} from "./cognito-identity.ts";
import type { CredentialSource } from "./credential-source.ts";

export interface FromCognitoIdentityOptions {
  readonly identityId: string;
  readonly logins?: Logins;
  readonly customRoleArn?: string;
  /** Region to call Cognito in; defaults to the identity id's prefix. */
  readonly region?: string;
}

/** Credentials for an identity whose id the caller already has. */
export const fromCognitoIdentity = (
  options: FromCognitoIdentityOptions,
): CredentialSource =>
  Effect.gen(function* () {
    const region = yield* cognitoRegion(options.region, options.identityId);
    return yield* getCredentialsForIdentity(
      options.identityId,
      region,
      options,
    );
  });
