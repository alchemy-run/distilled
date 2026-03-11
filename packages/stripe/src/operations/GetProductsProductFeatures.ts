import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProductsProductFeaturesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    product: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/products/{product}/features",
      contentType: "form-urlencoded",
    }),
  );
export type GetProductsProductFeaturesInput =
  typeof GetProductsProductFeaturesInput.Type;

// Output Schema
export const GetProductsProductFeaturesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        entitlement_feature: Schema.Struct({
          active: Schema.Boolean,
          id: Schema.String,
          livemode: Schema.Boolean,
          lookup_key: Schema.String,
          metadata: Schema.Record(Schema.String, Schema.String),
          name: Schema.String,
          object: Schema.Literals(["entitlements.feature"]),
        }),
        id: Schema.String,
        livemode: Schema.Boolean,
        object: Schema.Literals(["product_feature"]),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetProductsProductFeaturesOutput =
  typeof GetProductsProductFeaturesOutput.Type;

// The operation
/**
 * List all features attached to a product
 *
 * <p>Retrieve a list of features for a product</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetProductsProductFeatures = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetProductsProductFeaturesInput,
    outputSchema: GetProductsProductFeaturesOutput,
  }),
);
