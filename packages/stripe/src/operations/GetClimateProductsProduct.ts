import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetClimateProductsProductInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    product: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/climate/products/{product}",
      contentType: "form-urlencoded",
    }),
  );
export type GetClimateProductsProductInput =
  typeof GetClimateProductsProductInput.Type;

// Output Schema
export const GetClimateProductsProductOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    current_prices_per_metric_ton: Schema.Record(
      Schema.String,
      Schema.Struct({
        amount_fees: Schema.Number,
        amount_subtotal: Schema.Number,
        amount_total: Schema.Number,
      }),
    ),
    delivery_year: Schema.NullOr(Schema.Number),
    id: Schema.String,
    livemode: Schema.Boolean,
    metric_tons_available: Schema.String,
    name: Schema.String,
    object: Schema.Literals(["climate.product"]),
    suppliers: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        info_url: Schema.String,
        livemode: Schema.Boolean,
        locations: Schema.Array(
          Schema.Struct({
            city: Schema.NullOr(Schema.String),
            country: Schema.String,
            latitude: Schema.NullOr(Schema.Number),
            longitude: Schema.NullOr(Schema.Number),
            region: Schema.NullOr(Schema.String),
          }),
        ),
        name: Schema.String,
        object: Schema.Literals(["climate.supplier"]),
        removal_pathway: Schema.Literals([
          "biomass_carbon_removal_and_storage",
          "direct_air_capture",
          "enhanced_weathering",
        ]),
      }),
    ),
  });
export type GetClimateProductsProductOutput =
  typeof GetClimateProductsProductOutput.Type;

// The operation
/**
 * Retrieve a product
 *
 * <p>Retrieves the details of a Climate product with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetClimateProductsProduct = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetClimateProductsProductInput,
    outputSchema: GetClimateProductsProductOutput,
  }),
);
