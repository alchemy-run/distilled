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
 */
import * as Config from "@distilled.cloud/core/config";
import type { SourceError } from "effect/ConfigProvider";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

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

export class Region
  extends /*@__PURE__*/ Context.Service<
    Region,
    Effect.Effect<RegionName, MissingRegion | SourceError>
  >()("AWS::Region") {}

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

export type RegionName =
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | "af-south-1"
  | "ap-east-1"
  | "ap-south-2"
  | "ap-southeast-3"
  | "ap-southeast-5"
  | "ap-southeast-4"
  | "ap-south-1"
  | "ap-southeast-6"
  | "ap-northeast-3"
  | "ap-northeast-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-east-2"
  | "ap-southeast-7"
  | "ap-northeast-1"
  | "ca-central-1"
  | "ca-west-1"
  | "eu-central-1"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-south-1"
  | "eu-west-3"
  | "eu-south-2"
  | "eu-north-1"
  | "eu-central-2"
  | "il-central-1"
  | "mx-central-1"
  | "me-south-1"
  | "me-central-1"
  | "sa-east-1"
  | (string & {});
