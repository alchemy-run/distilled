/**
 * Credentials for a role assumed with an OIDC or OAuth token.
 */
import * as Effect from "effect/Effect";
import type { CredentialSource } from "./credential-source.ts";
import {
  type AssumeRoleWithWebIdentityParams,
  assumeRoleWithWebIdentity,
  stsRegion,
} from "./sts.ts";

export interface FromWebTokenOptions {
  readonly roleArn: string;
  readonly webIdentityToken: string;
  readonly roleSessionName?: string;
  readonly providerId?: string;
  readonly policyArns?: AssumeRoleWithWebIdentityParams["PolicyArns"];
  readonly policy?: string;
  readonly durationSeconds?: number;
  /** Region to call STS in; defaults per {@link stsRegion}. */
  readonly region?: string;
}

/**
 * Credentials for a role assumed with an OIDC or OAuth token the caller
 * already holds — the same exchange `fromTokenFile` performs, without the
 * token having to come from a file.
 */
export const fromWebToken = (options: FromWebTokenOptions): CredentialSource =>
  Effect.gen(function* () {
    const region = yield* stsRegion(options.region);
    return yield* assumeRoleWithWebIdentity(
      {
        RoleArn: options.roleArn,
        RoleSessionName:
          options.roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
        WebIdentityToken: options.webIdentityToken,
        ...(options.providerId && { ProviderId: options.providerId }),
        ...(options.policyArns && { PolicyArns: options.policyArns }),
        ...(options.policy && { Policy: options.policy }),
        ...(options.durationSeconds !== undefined && {
          DurationSeconds: options.durationSeconds,
        }),
      },
      region,
    );
  });
