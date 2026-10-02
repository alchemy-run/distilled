/**
 * Credentials for a role assumed with another set of credentials.
 */
import * as Effect from "effect/Effect";
import { createLazyProvider, regionFromEnv } from "../credentials-service.ts";
import type { RegionName } from "../region.ts";
import type { CredentialSource } from "./credential-source.ts";
import { envSource } from "./from-env.ts";
import {
  type AssumeRoleParams,
  assumeRole,
  type MfaCodeProvider,
  mfaCode,
  stsRegion,
} from "./sts.ts";

export interface FromTemporaryCredentialsOptions {
  /** `sts:AssumeRole` input; `RoleSessionName` is generated when omitted. */
  readonly params: Omit<AssumeRoleParams, "RoleSessionName"> & {
    RoleSessionName?: string;
  };
  /**
   * The credentials that call `sts:AssumeRole`. Defaults to the
   * environment; the Node build defaults to the full provider chain.
   */
  readonly masterCredentials?: CredentialSource;
  /** Region to call STS in; defaults per {@link stsRegion}. */
  readonly region?: string;
  readonly mfaCodeProvider?: MfaCodeProvider;
}

/**
 * Credentials for a role assumed with another set of credentials, the
 * programmatic form of a `role_arn` + `source_profile` profile.
 */
export const temporaryCredentialsSource = (
  options: FromTemporaryCredentialsOptions,
): CredentialSource =>
  Effect.gen(function* () {
    const params: AssumeRoleParams = {
      ...options.params,
      RoleSessionName: options.params.RoleSessionName ?? `aws-sdk-js-${Date.now()}`,
    };
    if (params.SerialNumber && params.TokenCode === undefined) {
      params.TokenCode = yield* mfaCode(
        params.SerialNumber,
        "Temporary credentials",
        options.mfaCodeProvider,
      );
    }
    const sourceCredentials = yield* options.masterCredentials ?? envSource;
    const region = yield* stsRegion(options.region);
    return yield* assumeRole(sourceCredentials, params, region);
  });

const hints = ["Check that the source credentials are allowed to sts:AssumeRole the role."];

/** A role assumed with another set of credentials. */
export const fromTemporaryCredentials = (options: FromTemporaryCredentialsOptions) =>
  createLazyProvider(
    temporaryCredentialsSource(options),
    "temporary",
    hints,
    options.region === undefined ? regionFromEnv : Effect.succeed(options.region as RegionName),
  );
