import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProductsSearchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    page: Schema.optional(Schema.String),
    query: Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/v1/products/search",
    contentType: "form-urlencoded",
  }),
);
export type GetProductsSearchInput = typeof GetProductsSearchInput.Type;

// Output Schema
export const GetProductsSearchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    next_page: Schema.NullOr(Schema.String),
    object: Schema.Literals(["search_result"]),
    total_count: Schema.optional(Schema.Number),
    url: Schema.String,
  });
export type GetProductsSearchOutput = typeof GetProductsSearchOutput.Type;

// The operation
/**
 * Search products
 *
 * <p>Search for products you’ve previously created using Stripe’s <a href="/docs/search#search-query-language">Search Query Language</a>.
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param page - A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.
 * @param query - The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for products](https://docs.stripe.com/search#query-fields-for-products).
 */
export const GetProductsSearch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProductsSearchInput,
  outputSchema: GetProductsSearchOutput,
}));
