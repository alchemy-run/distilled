import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSubscriptionItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
    subscription: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/subscription_items",
      contentType: "form-urlencoded",
    }),
  );
export type GetSubscriptionItemsInput = typeof GetSubscriptionItemsInput.Type;

// Output Schema
export const GetSubscriptionItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
              metadata: Schema.NullOr(
                Schema.Record(Schema.String, Schema.String),
              ),
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetSubscriptionItemsOutput = typeof GetSubscriptionItemsOutput.Type;

// The operation
/**
 * List all subscription items
 *
 * <p>Returns a list of your subscription items for a given subscription.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param subscription - The ID of the subscription whose items will be retrieved.
 */
export const GetSubscriptionItems = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetSubscriptionItemsInput,
    outputSchema: GetSubscriptionItemsOutput,
  }),
);
