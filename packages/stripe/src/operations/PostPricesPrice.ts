import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPricesPriceInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  price: Schema.String.pipe(T.PathParam()),
  active: Schema.optional(Schema.Boolean),
  currency_options: Schema.optional(Schema.Unknown),
  expand: Schema.optional(Schema.Array(Schema.String)),
  lookup_key: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Unknown),
  nickname: Schema.optional(Schema.String),
  tax_behavior: Schema.optional(
    Schema.Literals(["exclusive", "inclusive", "unspecified"]),
  ),
  transfer_lookup_key: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/prices/{price}",
    contentType: "form-urlencoded",
  }),
);
export type PostPricesPriceInput = typeof PostPricesPriceInput.Type;

// Output Schema
export const PostPricesPriceOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostPricesPriceOutput = typeof PostPricesPriceOutput.Type;

// The operation
/**
 * Update a price
 *
 * <p>Updates the specified price by setting the values of the parameters passed. Any parameters not provided are left unchanged.</p>
 */
export const PostPricesPrice = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostPricesPriceInput,
  outputSchema: PostPricesPriceOutput,
}));
