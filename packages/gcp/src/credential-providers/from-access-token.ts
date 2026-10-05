/**
 * An access token minted outside the SDK, e.g. with
 * `gcloud auth print-access-token`.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as Redacted from "effect/Redacted";
import { Credentials } from "../credentials-service.ts";

/** Convenience layer from a redacted access token (+ optional project id). */
export const fromAccessToken = (config: {
  readonly accessToken: Redacted.Redacted<string>;
  readonly project?: string;
  readonly region?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: config.accessToken,
      project: config.project,
      region: config.region,
    }),
  );
