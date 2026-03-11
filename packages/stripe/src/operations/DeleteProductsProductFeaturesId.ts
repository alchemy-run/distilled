import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteProductsProductFeaturesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    product: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/products/{product}/features/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteProductsProductFeaturesIdInput =
  typeof DeleteProductsProductFeaturesIdInput.Type;

// Output Schema
export const DeleteProductsProductFeaturesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["product_feature"]),
  });
export type DeleteProductsProductFeaturesIdOutput =
  typeof DeleteProductsProductFeaturesIdOutput.Type;

// The operation
/**
 * Remove a feature from a product
 *
 * <p>Deletes the feature attachment to a product</p>
 */
export const DeleteProductsProductFeaturesId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteProductsProductFeaturesIdInput,
    outputSchema: DeleteProductsProductFeaturesIdOutput,
  }));
