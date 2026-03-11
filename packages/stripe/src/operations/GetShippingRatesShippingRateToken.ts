import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetShippingRatesShippingRateTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shipping_rate_token: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/shipping_rates/{shipping_rate_token}",
      contentType: "form-urlencoded",
    }),
  );
export type GetShippingRatesShippingRateTokenInput =
  typeof GetShippingRatesShippingRateTokenInput.Type;

// Output Schema
export const GetShippingRatesShippingRateTokenOutput =
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
export type GetShippingRatesShippingRateTokenOutput =
  typeof GetShippingRatesShippingRateTokenOutput.Type;

// The operation
/**
 * Retrieve a shipping rate
 *
 * <p>Returns the shipping rate object with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetShippingRatesShippingRateToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetShippingRatesShippingRateTokenInput,
    outputSchema: GetShippingRatesShippingRateTokenOutput,
  }));
