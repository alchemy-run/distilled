import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPricesPriceInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  price: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/prices/{price}",
    contentType: "form-urlencoded",
  }),
);
export type GetPricesPriceInput = typeof GetPricesPriceInput.Type;

// Output Schema
export const GetPricesPriceOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
});
export type GetPricesPriceOutput = typeof GetPricesPriceOutput.Type;

// The operation
/**
 * Retrieve a price
 *
 * <p>Retrieves the price with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetPricesPrice = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetPricesPriceInput,
  outputSchema: GetPricesPriceOutput,
}));
