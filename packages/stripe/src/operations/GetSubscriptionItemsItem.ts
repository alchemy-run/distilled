import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSubscriptionItemsItemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    item: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/subscription_items/{item}",
      contentType: "form-urlencoded",
    }),
  );
export type GetSubscriptionItemsItemInput =
  typeof GetSubscriptionItemsItemInput.Type;

// Output Schema
export const GetSubscriptionItemsItemOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billing_thresholds: Schema.Unknown,
    created: Schema.Number,
    current_period_end: Schema.Number,
    current_period_start: Schema.Number,
    discounts: Schema.Array(Schema.Unknown),
    id: Schema.String,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["subscription_item"]),
    plan: Schema.Struct({
      active: Schema.Boolean,
      amount: Schema.NullOr(Schema.Number),
      amount_decimal: Schema.NullOr(Schema.String),
      billing_scheme: Schema.Literals(["per_unit", "tiered"]),
      created: Schema.Number,
      currency: Schema.String,
      id: Schema.String,
      interval: Schema.Literals(["day", "month", "week", "year"]),
      interval_count: Schema.Number,
      livemode: Schema.Boolean,
      metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
      meter: Schema.NullOr(Schema.String),
      nickname: Schema.NullOr(Schema.String),
      object: Schema.Literals(["plan"]),
      product: Schema.Unknown,
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
      transform_usage: Schema.Unknown,
      trial_period_days: Schema.NullOr(Schema.Number),
      usage_type: Schema.Literals(["licensed", "metered"]),
    }),
    price: Schema.Struct({
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
    }),
    quantity: Schema.optional(Schema.Number),
    subscription: Schema.String,
    tax_rates: Schema.NullOr(
      Schema.Array(
        Schema.Struct({
          active: Schema.Boolean,
          country: Schema.NullOr(Schema.String),
          created: Schema.Number,
          description: Schema.NullOr(Schema.String),
          display_name: Schema.String,
          effective_percentage: Schema.NullOr(Schema.Number),
          flat_amount: Schema.Unknown,
          id: Schema.String,
          inclusive: Schema.Boolean,
          jurisdiction: Schema.NullOr(Schema.String),
          jurisdiction_level: Schema.NullOr(
            Schema.Literals([
              "city",
              "country",
              "county",
              "district",
              "multiple",
              "state",
            ]),
          ),
          livemode: Schema.Boolean,
          metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
          object: Schema.Literals(["tax_rate"]),
          percentage: Schema.Number,
          rate_type: Schema.NullOr(
            Schema.Literals(["flat_amount", "percentage"]),
          ),
          state: Schema.NullOr(Schema.String),
          tax_type: Schema.NullOr(
            Schema.Literals([
              "amusement_tax",
              "communications_tax",
              "gst",
              "hst",
              "igst",
              "jct",
              "lease_tax",
              "pst",
              "qst",
              "retail_delivery_fee",
              "rst",
              "sales_tax",
              "service_tax",
              "vat",
            ]),
          ),
        }),
      ),
    ),
  });
export type GetSubscriptionItemsItemOutput =
  typeof GetSubscriptionItemsItemOutput.Type;

// The operation
/**
 * Retrieve a subscription item
 *
 * <p>Retrieves the subscription item with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetSubscriptionItemsItem = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetSubscriptionItemsItemInput,
    outputSchema: GetSubscriptionItemsItemOutput,
  }),
);
