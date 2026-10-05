/**
 * Credentials the caller already holds.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, regionFromEnv } from "../credentials-service.ts";
import type { RegionName } from "../region.ts";

/** Static credentials, each value already redacted. */
export interface StaticCredentials {
  readonly accessKeyId: Redacted.Redacted<string>;
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly sessionToken?: Redacted.Redacted<string>;
  readonly expiration?: Date;
}

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
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      region: resolved,
      expiration: credentials.expiration?.getTime(),
    })),
  );
