import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostEntitlementsFeaturesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    active: Schema.optional(Schema.Boolean),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
    name: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/entitlements/features/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type PostEntitlementsFeaturesIdInput =
  typeof PostEntitlementsFeaturesIdInput.Type;

// Output Schema
export const PostEntitlementsFeaturesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.Boolean,
    id: Schema.String,
    livemode: Schema.Boolean,
    lookup_key: Schema.String,
    metadata: Schema.Record(Schema.String, Schema.String),
    name: Schema.String,
    object: Schema.Literals(["entitlements.feature"]),
  });
export type PostEntitlementsFeaturesIdOutput =
  typeof PostEntitlementsFeaturesIdOutput.Type;

// The operation
/**
 * Updates a feature
 *
 * <p>Update a feature’s metadata or permanently deactivate it.</p>
 */
export const PostEntitlementsFeaturesId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostEntitlementsFeaturesIdInput,
    outputSchema: PostEntitlementsFeaturesIdOutput,
  }),
);
