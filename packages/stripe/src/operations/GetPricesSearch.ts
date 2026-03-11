import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPricesSearchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  page: Schema.optional(Schema.String),
  query: Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/prices/search",
    contentType: "form-urlencoded",
  }),
);
export type GetPricesSearchInput = typeof GetPricesSearchInput.Type;

// Output Schema
export const GetPricesSearchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  next_page: Schema.NullOr(Schema.String),
  object: Schema.Literals(["search_result"]),
  total_count: Schema.optional(Schema.Number),
  url: Schema.String,
});
export type GetPricesSearchOutput = typeof GetPricesSearchOutput.Type;

// The operation
/**
 * Search prices
 *
 * <p>Search for prices you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param page - A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.
 * @param query - The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for prices](https://docs.stripe.com/search#query-fields-for-prices).
 */
export const GetPricesSearch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetPricesSearchInput,
  outputSchema: GetPricesSearchOutput,
}));
