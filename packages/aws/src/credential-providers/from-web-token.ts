/**
 * Credentials for a role assumed with an OIDC or OAuth token.
 */
import * as Effect from "effect/Effect";
import { createLazyProvider, regionFromEnv } from "../credentials-service.ts";
import type { RegionName } from "../region.ts";
import { type CredentialSource, resolveSecret, type Secret } from "./credential-source.ts";
import {
  type AssumeRoleWithWebIdentityParams,
  assumeRoleWithWebIdentity,
  stsRegion,
} from "./sts.ts";

export interface FromWebTokenOptions {
  readonly roleArn: string;
  /**
   * The OIDC or OAuth token. Pass an `Effect` for a token that has to be
   * fetched or refreshed; it runs on every credential resolution.
   */
  readonly webIdentityToken: Secret;
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
export const webTokenSource = (options: FromWebTokenOptions): CredentialSource =>
  Effect.gen(function* () {
    const region = yield* stsRegion(options.region);
    const webIdentityToken = yield* resolveSecret(
      options.webIdentityToken,
      "Could not resolve the web identity token.",
    );
    return yield* assumeRoleWithWebIdentity(
      {
        RoleArn: options.roleArn,
        RoleSessionName: options.roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
        WebIdentityToken: webIdentityToken,
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

const hints = [
  "Check that the web identity token is valid and trusted by the role's trust policy.",
];

/** A role assumed with an OIDC or OAuth token the caller already holds. */
export const fromWebToken = (options: FromWebTokenOptions) =>
  createLazyProvider(
    webTokenSource(options),
    "web-token",
    hints,
    options.region === undefined ? regionFromEnv : Effect.succeed(options.region as RegionName),
  );
