import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPricesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  active: Schema.optional(Schema.Boolean),
  billing_scheme: Schema.optional(Schema.Literals(["per_unit", "tiered"])),
  currency: Schema.String,
  currency_options: Schema.optional(
    Schema.Record(
      Schema.String,
      Schema.Struct({
        custom_unit_amount: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            maximum: Schema.optional(Schema.Number),
            minimum: Schema.optional(Schema.Number),
            preset: Schema.optional(Schema.Number),
          }),
        ),
        tax_behavior: Schema.optional(
          Schema.Literals(["exclusive", "inclusive", "unspecified"]),
        ),
        tiers: Schema.optional(
          Schema.Array(
            Schema.Struct({
              flat_amount: Schema.optional(Schema.Number),
              flat_amount_decimal: Schema.optional(Schema.String),
              unit_amount: Schema.optional(Schema.Number),
              unit_amount_decimal: Schema.optional(Schema.String),
              up_to: Schema.Unknown,
            }),
          ),
        ),
        unit_amount: Schema.optional(Schema.Number),
        unit_amount_decimal: Schema.optional(Schema.String),
      }),
    ),
  ),
  custom_unit_amount: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
      maximum: Schema.optional(Schema.Number),
      minimum: Schema.optional(Schema.Number),
      preset: Schema.optional(Schema.Number),
    }),
  ),
  expand: Schema.optional(Schema.Array(Schema.String)),
  lookup_key: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  nickname: Schema.optional(Schema.String),
  product: Schema.optional(Schema.String),
  product_data: Schema.optional(
    Schema.Struct({
      active: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.String,
      statement_descriptor: Schema.optional(Schema.String),
      tax_code: Schema.optional(Schema.String),
      unit_label: Schema.optional(Schema.String),
    }),
  ),
  recurring: Schema.optional(
    Schema.Struct({
      interval: Schema.Literals(["day", "month", "week", "year"]),
      interval_count: Schema.optional(Schema.Number),
      meter: Schema.optional(Schema.String),
      trial_period_days: Schema.optional(Schema.Number),
      usage_type: Schema.optional(Schema.Literals(["licensed", "metered"])),
    }),
  ),
  tax_behavior: Schema.optional(
    Schema.Literals(["exclusive", "inclusive", "unspecified"]),
  ),
  tiers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        flat_amount: Schema.optional(Schema.Number),
        flat_amount_decimal: Schema.optional(Schema.String),
        unit_amount: Schema.optional(Schema.Number),
        unit_amount_decimal: Schema.optional(Schema.String),
        up_to: Schema.Unknown,
      }),
    ),
  ),
  tiers_mode: Schema.optional(Schema.Literals(["graduated", "volume"])),
  transfer_lookup_key: Schema.optional(Schema.Boolean),
  transform_quantity: Schema.optional(
    Schema.Struct({
      divide_by: Schema.Number,
      round: Schema.Literals(["down", "up"]),
    }),
  ),
  unit_amount: Schema.optional(Schema.Number),
  unit_amount_decimal: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/prices",
    contentType: "form-urlencoded",
  }),
);
export type PostPricesInput = typeof PostPricesInput.Type;

// Output Schema
export const PostPricesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostPricesOutput = typeof PostPricesOutput.Type;

// The operation
/**
 * Create a price
 *
 * <p>Creates a new <a href="https://docs.stripe.com/api/prices">Price</a> for an existing <a href="https://docs.stripe.com/api/products">Product</a>. The Price can be recurring or one-time.</p>
 */
export const PostPrices = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostPricesInput,
  outputSchema: PostPricesOutput,
}));
