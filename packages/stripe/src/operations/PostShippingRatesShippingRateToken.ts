import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostShippingRatesShippingRateTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    shipping_rate_token: Schema.String.pipe(T.PathParam()),
    active: Schema.optional(Schema.Boolean),
    expand: Schema.optional(Schema.Array(Schema.String)),
    fixed_amount: Schema.optional(
      Schema.Struct({
        currency_options: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              amount: Schema.optional(Schema.Number),
              tax_behavior: Schema.optional(
                Schema.Literals(["exclusive", "inclusive", "unspecified"]),
              ),
            }),
          ),
        ),
      }),
    ),
    metadata: Schema.optional(Schema.Unknown),
    tax_behavior: Schema.optional(
      Schema.Literals(["exclusive", "inclusive", "unspecified"]),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/shipping_rates/{shipping_rate_token}",
      contentType: "form-urlencoded",
    }),
  );
export type PostShippingRatesShippingRateTokenInput =
  typeof PostShippingRatesShippingRateTokenInput.Type;

// Output Schema
export const PostShippingRatesShippingRateTokenOutput =
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
export type PostShippingRatesShippingRateTokenOutput =
  typeof PostShippingRatesShippingRateTokenOutput.Type;

// The operation
/**
 * Update a shipping rate
 *
 * <p>Updates an existing shipping rate object.</p>
 */
export const PostShippingRatesShippingRateToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostShippingRatesShippingRateTokenInput,
    outputSchema: PostShippingRatesShippingRateTokenOutput,
  }));
