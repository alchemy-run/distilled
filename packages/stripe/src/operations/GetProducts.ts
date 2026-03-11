import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProductsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  active: Schema.optional(Schema.Boolean),
  created: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  ids: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  shippable: Schema.optional(Schema.Boolean),
  starting_after: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literals(["good", "service"])),
  url: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/products",
    contentType: "form-urlencoded",
  }),
);
export type GetProductsInput = typeof GetProductsInput.Type;

// Output Schema
export const GetProductsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetProductsOutput = typeof GetProductsOutput.Type;

// The operation
/**
 * List all products
 *
 * <p>Returns a list of your products. The products are returned sorted by creation date, with the most recently created products appearing first.</p>
 *
 * @param active - Only return products that are active or inactive (e.g., pass `false` to list all inactive products).
 * @param created - Only return products that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param ids - Only return products with the given IDs. Cannot be used with [starting_after](https://api.stripe.com#list_products-starting_after) or [ending_before](https://api.stripe.com#list_products-ending_before).
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param shippable - Only return products that can be shipped (i.e., physical, not digital products).
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param type - Only return products of this type.
 * @param url - Only return products with the given url.
 */
export const GetProducts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProductsInput,
  outputSchema: GetProductsOutput,
}));
