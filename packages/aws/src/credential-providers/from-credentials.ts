/**
 * Credentials the caller already holds.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, regionFromEnv } from "../credentials-service.ts";
import type { RegionName } from "../region.ts";

type SecretValue = string | Redacted.Redacted<string>;

/**
 * Static credentials. An `AwsCredentialIdentity` fits; each secret may also
 * be a `Redacted` string, so it never has to be unwrapped to get here.
 */
export interface StaticCredentials {
  readonly accessKeyId: SecretValue;
  readonly secretAccessKey: SecretValue;
  readonly sessionToken?: SecretValue;
  readonly expiration?: Date;
}

const redact = (value: SecretValue): Redacted.Redacted<string> =>
  Redacted.isRedacted(value) ? value : Redacted.make(value);

/**
 * Create a credentials provider from static credentials.
 * No lazy loading or caching needed since credentials are already available.
 */
export const fromCredentials = (
  credentials: StaticCredentials,
  /** Defaults to the environment, like every other provider. */
  region?: RegionName,
): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.map(region === undefined ? regionFromEnv : Effect.succeed(region), (resolved) => ({
      accessKeyId: redact(credentials.accessKeyId),
      secretAccessKey: redact(credentials.secretAccessKey),
      sessionToken: credentials.sessionToken ? redact(credentials.sessionToken) : undefined,
      region: resolved,
      expiration: credentials.expiration?.getTime(),
    })),
  );
