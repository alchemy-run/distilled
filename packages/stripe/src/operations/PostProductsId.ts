import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostProductsIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
  active: Schema.optional(Schema.Boolean),
  default_price: Schema.optional(Schema.String),
  description: Schema.optional(Schema.Unknown),
  expand: Schema.optional(Schema.Array(Schema.String)),
  images: Schema.optional(Schema.Unknown),
  marketing_features: Schema.optional(Schema.Unknown),
  metadata: Schema.optional(Schema.Unknown),
  name: Schema.optional(Schema.String),
  package_dimensions: Schema.optional(Schema.Unknown),
  shippable: Schema.optional(Schema.Boolean),
  statement_descriptor: Schema.optional(Schema.String),
  tax_code: Schema.optional(Schema.Unknown),
  unit_label: Schema.optional(Schema.Unknown),
  url: Schema.optional(Schema.Unknown),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/products/{id}",
    contentType: "form-urlencoded",
  }),
);
export type PostProductsIdInput = typeof PostProductsIdInput.Type;

// Output Schema
export const PostProductsIdOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostProductsIdOutput = typeof PostProductsIdOutput.Type;

// The operation
/**
 * Update a product
 *
 * <p>Updates the specific product by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>
 */
export const PostProductsId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostProductsIdInput,
  outputSchema: PostProductsIdOutput,
}));
