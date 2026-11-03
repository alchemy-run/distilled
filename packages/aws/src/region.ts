/**
 * The region an operation is dispatched to.
 *
 * Every credentials layer resolves a region as part of authenticating -- the
 * environment variables, the profile, the SSO session all carry one -- so
 * {@link ResolvedCredentials.region} is where the region normally comes from
 * and it is never absent.
 *
 * {@link Region} is the OVERRIDE on top of that: an optional service that
 * generated operations do NOT list in their requirements. The protocol reads
 * it with `Effect.serviceOption` and uses the credentials' region when
 * nothing provides it, so a caller who already said "authenticate with the
 * `dev` profile" doesn't have to repeat which region `dev` uses, but a caller
 * who wants one call in another region can still say so.
 *
 * The `Region` service and `RegionName` come from `@distilled.cloud/s3`;
 * this module adds the environment and the helpers.
 */
import * as Config from "@distilled.cloud/core/config";
import { Region, type RegionName } from "@distilled.cloud/s3/Region";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export * from "@distilled.cloud/s3/Region";

/**
 * No region is configured: a credentials layer resolved a set of credentials
 * without one, or `Region.fromEnv()` found neither variable set.
 *
 * A credential-resolution failure like any other, rather than a defect: the
 * caller's fix is the same shape as for a missing key -- configure the
 * environment, the profile, or pass it explicitly.
 */
export class MissingRegion
  extends /*@__PURE__*/ Data.TaggedError("Alchemy::AWS::MissingRegion")<{
    message: string;
    hints?: ReadonlyArray<string>;
  }> {}

/**
 * `AWS_REGION`, then `AWS_DEFAULT_REGION` -- the variables every AWS tool
 * reads. Credentials providers use this as their region source; it fails
 * (rather than dying) so a provider can turn it into a typed
 * `MissingRegion` alongside its other credential-resolution failures.
 */
export const fromEnvironment = /*@__PURE__*/ Config.String("AWS_REGION").pipe(
  /*@__PURE__*/ Config.orElse(() => Config.String("AWS_DEFAULT_REGION")),
  /*@__PURE__*/ Effect.map((region) => region as RegionName),
);

/**
 * Override the region with whatever the environment names. Each operation
 * fails with {@link MissingRegion} when neither variable is set.
 */
export const fromEnv = () =>
  Layer.succeed(
    Region,
    fromEnvironment.pipe(
      Effect.catchTag(
        "ConfigError",
        () =>
          new MissingRegion({
            message: "Region.fromEnv() found no region in the environment.",
            hints: [
              "Set AWS_REGION (or AWS_DEFAULT_REGION).",
              'Or provide one explicitly with Region.of("us-east-1").',
            ],
          }),
      ),
    ),
  );

/** Override the region for a scope, e.g. `Region.of("us-west-2")`. */
export const of = (region: RegionName) => Layer.succeed(Region, Effect.succeed(region));
