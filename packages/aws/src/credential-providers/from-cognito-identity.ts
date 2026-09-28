/**
 * Credentials for an Amazon Cognito identity whose id the caller has.
 */
import * as Effect from "effect/Effect";
import { createLazyProvider, regionFromEnv } from "../credentials-service.ts";
import type { RegionName } from "../region.ts";
import {
  cognitoRegion,
  getCredentialsForIdentity,
  type Logins,
  regionFromId,
} from "./cognito-identity.ts";
import type { CredentialSource } from "./credential-source.ts";

export interface FromCognitoIdentityOptions {
  readonly identityId: string;
  readonly logins?: Logins;
  readonly customRoleArn?: string;
  /** Region to call Cognito in; defaults to the identity id's prefix. */
  readonly region?: string;
}

export const cognitoIdentitySource = (
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

const hints = [
  "Check the identity pool id and that its unauthenticated (or logins) role is configured.",
];

/** Credentials for a Cognito identity whose id the caller already has. */
export const fromCognitoIdentity = (options: FromCognitoIdentityOptions) => {
  const region = options.region ?? regionFromId(options.identityId);
  return createLazyProvider(
    cognitoIdentitySource(options),
    "cognito-identity",
    hints,
    region === undefined ? regionFromEnv : Effect.succeed(region as RegionName),
  );
};
