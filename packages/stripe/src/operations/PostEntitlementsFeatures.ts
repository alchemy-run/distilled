import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostEntitlementsFeaturesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    lookup_key: Schema.String,
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    name: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/entitlements/features",
      contentType: "form-urlencoded",
    }),
  );
export type PostEntitlementsFeaturesInput =
  typeof PostEntitlementsFeaturesInput.Type;

// Output Schema
export const PostEntitlementsFeaturesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.Boolean,
    id: Schema.String,
    livemode: Schema.Boolean,
    lookup_key: Schema.String,
    metadata: Schema.Record(Schema.String, Schema.String),
    name: Schema.String,
    object: Schema.Literals(["entitlements.feature"]),
  });
export type PostEntitlementsFeaturesOutput =
  typeof PostEntitlementsFeaturesOutput.Type;

// The operation
/**
 * Create a feature
 *
 * <p>Creates a feature</p>
 */
export const PostEntitlementsFeatures = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostEntitlementsFeaturesInput,
    outputSchema: PostEntitlementsFeaturesOutput,
  }),
);
