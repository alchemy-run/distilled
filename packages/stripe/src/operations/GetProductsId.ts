import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProductsIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/products/{id}",
    contentType: "form-urlencoded",
  }),
);
export type GetProductsIdInput = typeof GetProductsIdInput.Type;

// Output Schema
export const GetProductsIdOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  active: Schema.Boolean,
  created: Schema.Number,
  default_price: Schema.optional(Schema.Unknown),
  description: Schema.NullOr(Schema.String),
  id: Schema.String,
  images: Schema.Array(Schema.String),
  livemode: Schema.Boolean,
  marketing_features: Schema.Array(
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ),
  metadata: Schema.Record(Schema.String, Schema.String),
  name: Schema.String,
  object: Schema.Literals(["product"]),
  package_dimensions: Schema.Unknown,
  shippable: Schema.NullOr(Schema.Boolean),
  statement_descriptor: Schema.optional(Schema.NullOr(Schema.String)),
  tax_code: Schema.optional(Schema.Unknown),
  type: Schema.Literals(["good", "service"]),
  unit_label: Schema.optional(Schema.NullOr(Schema.String)),
  updated: Schema.Number,
  url: Schema.NullOr(Schema.String),
});
export type GetProductsIdOutput = typeof GetProductsIdOutput.Type;

// The operation
/**
 * Retrieve a product
 *
 * <p>Retrieves the details of an existing product. Supply the unique product ID from either a product creation request or the product list, and Stripe will return the corresponding product information.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetProductsId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProductsIdInput,
  outputSchema: GetProductsIdOutput,
}));
