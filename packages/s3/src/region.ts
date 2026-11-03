/**
 * The region an operation is dispatched to.
 *
 * {@link ResolvedCredentials.region} is where the region normally comes from
 * and it is never absent. {@link Region} is the OVERRIDE on top of that: an
 * optional service that generated operations do NOT list in their
 * requirements. The protocol reads it with `Effect.serviceOption` and uses the
 * credentials' region when nothing provides it.
 */
import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import type { ProviderError } from "./credentials.ts";

// Annotated so the declaration keeps `ProviderError` unevaluated: an
// inferred base type would be emitted as `never`, and a module augmentation
// of `ProviderErrors` would no longer reach it.
const RegionService: Context.ServiceClass<
  Region,
  "AWS::Region",
  Effect.Effect<RegionName, ProviderError>
> = /*@__PURE__*/ Context.Service<Region, Effect.Effect<RegionName, ProviderError>>()(
  "AWS::Region",
);

export class Region extends RegionService {}

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
