import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostClimateOrdersOrderCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    order: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/climate/orders/{order}/cancel",
      contentType: "form-urlencoded",
    }),
  );
export type PostClimateOrdersOrderCancelInput =
  typeof PostClimateOrdersOrderCancelInput.Type;

// Output Schema
export const PostClimateOrdersOrderCancelOutput =
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
export type PostClimateOrdersOrderCancelOutput =
  typeof PostClimateOrdersOrderCancelOutput.Type;

// The operation
/**
 * Cancel an order
 *
 * <p>Cancels a Climate order. You can cancel an order within 24 hours of creation. Stripe refunds the
 * reservation <code>amount_subtotal</code>, but not the <code>amount_fees</code> for user-triggered cancellations. Frontier
 * might cancel reservations if suppliers fail to deliver. If Frontier cancels the reservation, Stripe
 * provides 90 days advance notice and refunds the <code>amount_total</code>.</p>
 *
 * @param order - Unique identifier of the order.
 */
export const PostClimateOrdersOrderCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostClimateOrdersOrderCancelInput,
    outputSchema: PostClimateOrdersOrderCancelOutput,
  }));
