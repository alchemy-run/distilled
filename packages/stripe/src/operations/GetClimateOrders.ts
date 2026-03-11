import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetClimateOrdersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/climate/orders",
    contentType: "form-urlencoded",
  }),
);
export type GetClimateOrdersInput = typeof GetClimateOrdersInput.Type;

// Output Schema
export const GetClimateOrdersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  },
);
export type GetClimateOrdersOutput = typeof GetClimateOrdersOutput.Type;

// The operation
/**
 * List orders
 *
 * <p>Lists all Climate order objects. The orders are returned sorted by creation date, with the
 * most recently created orders appearing first.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetClimateOrders = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetClimateOrdersInput,
  outputSchema: GetClimateOrdersOutput,
}));
