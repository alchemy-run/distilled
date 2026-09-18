/**
 * Credentials the caller already holds.
 */
import type { AwsCredentialIdentity } from "@smithy/types";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { Credentials, fromAwsCredentialIdentity, regionFromEnv } from "../credentials-service.ts";
import type { RegionName } from "../region.ts";

/**
 * Create a credentials provider from static credentials.
 * No lazy loading or caching needed since credentials are already available.
 */
export const fromCredentials = (
  credentials: AwsCredentialIdentity,
  /** Defaults to the environment, like every other provider. */
  region?: RegionName,
): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.map(region === undefined ? regionFromEnv : Effect.succeed(region), (resolved) =>
      fromAwsCredentialIdentity(credentials, resolved),
    ),
  );
