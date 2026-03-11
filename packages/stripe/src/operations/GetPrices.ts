import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPricesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  active: Schema.optional(Schema.Boolean),
  created: Schema.optional(Schema.String),
  currency: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  lookup_keys: Schema.optional(Schema.String),
  product: Schema.optional(Schema.String),
  recurring: Schema.optional(Schema.String),
  starting_after: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Literals(["one_time", "recurring"])),
}).pipe(
  T.Http({ method: "GET", path: "/v1/prices", contentType: "form-urlencoded" }),
);
export type GetPricesInput = typeof GetPricesInput.Type;

// Output Schema
export const GetPricesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      active: Schema.Boolean,
      billing_scheme: Schema.Literals(["per_unit", "tiered"]),
      created: Schema.Number,
      currency: Schema.String,
      currency_options: Schema.optional(
        Schema.Record(
          Schema.String,
          Schema.Struct({
            custom_unit_amount: Schema.Unknown,
            tax_behavior: Schema.NullOr(
              Schema.Literals(["exclusive", "inclusive", "unspecified"]),
            ),
            tiers: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  flat_amount: Schema.NullOr(Schema.Number),
                  flat_amount_decimal: Schema.NullOr(Schema.String),
                  unit_amount: Schema.NullOr(Schema.Number),
                  unit_amount_decimal: Schema.NullOr(Schema.String),
                  up_to: Schema.NullOr(Schema.Number),
                }),
              ),
            ),
            unit_amount: Schema.NullOr(Schema.Number),
            unit_amount_decimal: Schema.NullOr(Schema.String),
          }),
        ),
      ),
      custom_unit_amount: Schema.Unknown,
      id: Schema.String,
      livemode: Schema.Boolean,
      lookup_key: Schema.NullOr(Schema.String),
      metadata: Schema.Record(Schema.String, Schema.String),
      nickname: Schema.NullOr(Schema.String),
      object: Schema.Literals(["price"]),
      product: Schema.Unknown,
      recurring: Schema.Unknown,
      tax_behavior: Schema.NullOr(
        Schema.Literals(["exclusive", "inclusive", "unspecified"]),
      ),
      tiers: Schema.optional(
        Schema.Array(
          Schema.Struct({
            flat_amount: Schema.NullOr(Schema.Number),
            flat_amount_decimal: Schema.NullOr(Schema.String),
            unit_amount: Schema.NullOr(Schema.Number),
            unit_amount_decimal: Schema.NullOr(Schema.String),
            up_to: Schema.NullOr(Schema.Number),
          }),
        ),
      ),
      tiers_mode: Schema.NullOr(Schema.Literals(["graduated", "volume"])),
      transform_quantity: Schema.Unknown,
      type: Schema.Literals(["one_time", "recurring"]),
      unit_amount: Schema.NullOr(Schema.Number),
      unit_amount_decimal: Schema.NullOr(Schema.String),
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetPricesOutput = typeof GetPricesOutput.Type;

// The operation
/**
 * List all prices
 *
 * <p>Returns a list of your active prices, excluding <a href="/docs/products-prices/pricing-models#inline-pricing">inline prices</a>. For the list of inactive prices, set <code>active</code> to false.</p>
 *
 * @param active - Only return prices that are active or inactive (e.g., pass `false` to list all inactive prices).
 * @param created - A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.
 * @param currency - Only return prices for the given currency.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param lookup_keys - Only return the price with these lookup_keys, if any exist. You can specify up to 10 lookup_keys.
 * @param product - Only return prices for the given product.
 * @param recurring - Only return prices with these recurring fields.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param type - Only return prices of type `recurring` or `one_time`.
 */
export const GetPrices = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetPricesInput,
  outputSchema: GetPricesOutput,
}));
