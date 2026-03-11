import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProductsProductFeaturesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    product: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/products/{product}/features/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetProductsProductFeaturesIdInput =
  typeof GetProductsProductFeaturesIdInput.Type;

// Output Schema
export const GetProductsProductFeaturesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetProductsProductFeaturesIdOutput =
  typeof GetProductsProductFeaturesIdOutput.Type;

// The operation
/**
 * Retrieve a product_feature
 *
 * <p>Retrieves a product_feature, which represents a feature attachment to a product</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param id - The ID of the product_feature.
 * @param product - The ID of the product.
 */
export const GetProductsProductFeaturesId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetProductsProductFeaturesIdInput,
    outputSchema: GetProductsProductFeaturesIdOutput,
  }));
