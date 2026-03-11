import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEntitlementsFeaturesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/entitlements/features/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetEntitlementsFeaturesIdInput =
  typeof GetEntitlementsFeaturesIdInput.Type;

// Output Schema
export const GetEntitlementsFeaturesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.Boolean,
    id: Schema.String,
    livemode: Schema.Boolean,
    lookup_key: Schema.String,
    metadata: Schema.Record(Schema.String, Schema.String),
    name: Schema.String,
    object: Schema.Literals(["entitlements.feature"]),
  });
export type GetEntitlementsFeaturesIdOutput =
  typeof GetEntitlementsFeaturesIdOutput.Type;

// The operation
/**
 * Retrieve a feature
 *
 * <p>Retrieves a feature</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param id - The ID of the feature.
 */
export const GetEntitlementsFeaturesId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetEntitlementsFeaturesIdInput,
    outputSchema: GetEntitlementsFeaturesIdOutput,
  }),
);
