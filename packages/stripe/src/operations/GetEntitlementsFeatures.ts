import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEntitlementsFeaturesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    archived: Schema.optional(Schema.Boolean),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    lookup_key: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/entitlements/features",
      contentType: "form-urlencoded",
    }),
  );
export type GetEntitlementsFeaturesInput =
  typeof GetEntitlementsFeaturesInput.Type;

// Output Schema
export const GetEntitlementsFeaturesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        active: Schema.Boolean,
        id: Schema.String,
        livemode: Schema.Boolean,
        lookup_key: Schema.String,
        metadata: Schema.Record(Schema.String, Schema.String),
        name: Schema.String,
        object: Schema.Literals(["entitlements.feature"]),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetEntitlementsFeaturesOutput =
  typeof GetEntitlementsFeaturesOutput.Type;

// The operation
/**
 * List all features
 *
 * <p>Retrieve a list of features</p>
 *
 * @param archived - If set, filter results to only include features with the given archive status.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param lookup_key - If set, filter results to only include features with the given lookup_key.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetEntitlementsFeatures = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetEntitlementsFeaturesInput,
    outputSchema: GetEntitlementsFeaturesOutput,
  }),
);
