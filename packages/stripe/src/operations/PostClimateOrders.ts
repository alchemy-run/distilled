import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostClimateOrdersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    amount: Schema.optional(Schema.Number),
    beneficiary: Schema.optional(
      Schema.Struct({
        public_name: Schema.String,
      }),
    ),
    currency: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    metric_tons: Schema.optional(Schema.String),
    product: Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/climate/orders",
    contentType: "form-urlencoded",
  }),
);
export type PostClimateOrdersInput = typeof PostClimateOrdersInput.Type;

// Output Schema
export const PostClimateOrdersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount_fees: Schema.Number,
    amount_subtotal: Schema.Number,
    amount_total: Schema.Number,
    beneficiary: Schema.optional(
      Schema.Struct({
        public_name: Schema.String,
      }),
    ),
    canceled_at: Schema.NullOr(Schema.Number),
    cancellation_reason: Schema.NullOr(
      Schema.Literals(["expired", "product_unavailable", "requested"]),
    ),
    certificate: Schema.NullOr(Schema.String),
    confirmed_at: Schema.NullOr(Schema.Number),
    created: Schema.Number,
    currency: Schema.String,
    delayed_at: Schema.NullOr(Schema.Number),
    delivered_at: Schema.NullOr(Schema.Number),
    delivery_details: Schema.Array(
      Schema.Struct({
        delivered_at: Schema.Number,
        location: Schema.Unknown,
        metric_tons: Schema.String,
        registry_url: Schema.NullOr(Schema.String),
        supplier: Schema.Struct({
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
      }),
    ),
    expected_delivery_year: Schema.Number,
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    metric_tons: Schema.String,
    object: Schema.Literals(["climate.order"]),
    product: Schema.Unknown,
    product_substituted_at: Schema.NullOr(Schema.Number),
    status: Schema.Literals([
      "awaiting_funds",
      "canceled",
      "confirmed",
      "delivered",
      "open",
    ]),
  });
export type PostClimateOrdersOutput = typeof PostClimateOrdersOutput.Type;

// The operation
/**
 * Create an order
 *
 * <p>Creates a Climate order object for a given Climate product. The order will be processed immediately
 * after creation and payment will be deducted your Stripe balance.</p>
 */
export const PostClimateOrders = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostClimateOrdersInput,
  outputSchema: PostClimateOrdersOutput,
}));
