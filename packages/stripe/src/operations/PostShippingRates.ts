import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostShippingRatesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    delivery_estimate: Schema.optional(
      Schema.Struct({
        maximum: Schema.optional(
          Schema.Struct({
            unit: Schema.Literals([
              "business_day",
              "day",
              "hour",
              "month",
              "week",
            ]),
            value: Schema.Number,
          }),
        ),
        minimum: Schema.optional(
          Schema.Struct({
            unit: Schema.Literals([
              "business_day",
              "day",
              "hour",
              "month",
              "week",
            ]),
            value: Schema.Number,
          }),
        ),
      }),
    ),
    display_name: Schema.String,
    expand: Schema.optional(Schema.Array(Schema.String)),
    fixed_amount: Schema.optional(
      Schema.Struct({
        amount: Schema.Number,
        currency: Schema.String,
        currency_options: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              amount: Schema.Number,
              tax_behavior: Schema.optional(
                Schema.Literals(["exclusive", "inclusive", "unspecified"]),
              ),
            }),
          ),
        ),
      }),
    ),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    tax_behavior: Schema.optional(
      Schema.Literals(["exclusive", "inclusive", "unspecified"]),
    ),
    tax_code: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Literals(["fixed_amount"])),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/shipping_rates",
    contentType: "form-urlencoded",
  }),
);
export type PostShippingRatesInput = typeof PostShippingRatesInput.Type;

// Output Schema
export const PostShippingRatesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.Boolean,
    created: Schema.Number,
    delivery_estimate: Schema.Unknown,
    display_name: Schema.NullOr(Schema.String),
    fixed_amount: Schema.optional(
      Schema.Struct({
        amount: Schema.Number,
        currency: Schema.String,
        currency_options: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              amount: Schema.Number,
              tax_behavior: Schema.Literals([
                "exclusive",
                "inclusive",
                "unspecified",
              ]),
            }),
          ),
        ),
      }),
    ),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["shipping_rate"]),
    tax_behavior: Schema.NullOr(
      Schema.Literals(["exclusive", "inclusive", "unspecified"]),
    ),
    tax_code: Schema.Unknown,
    type: Schema.Literals(["fixed_amount"]),
  });
export type PostShippingRatesOutput = typeof PostShippingRatesOutput.Type;

// The operation
/**
 * Create a shipping rate
 *
 * <p>Creates a new shipping rate object.</p>
 */
export const PostShippingRates = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostShippingRatesInput,
  outputSchema: PostShippingRatesOutput,
}));
