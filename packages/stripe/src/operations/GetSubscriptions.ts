import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSubscriptionsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  automatic_tax: Schema.optional(Schema.String),
  collection_method: Schema.optional(
    Schema.Literals(["charge_automatically", "send_invoice"]),
  ),
  created: Schema.optional(Schema.String),
  current_period_end: Schema.optional(Schema.String),
  current_period_start: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  customer_account: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  plan: Schema.optional(Schema.String),
  price: Schema.optional(Schema.String),
  starting_after: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Literals([
      "active",
      "all",
      "canceled",
      "ended",
      "incomplete",
      "incomplete_expired",
      "past_due",
      "paused",
      "trialing",
      "unpaid",
    ]),
  ),
  test_clock: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/subscriptions",
    contentType: "form-urlencoded",
  }),
);
export type GetSubscriptionsInput = typeof GetSubscriptionsInput.Type;

// Output Schema
export const GetSubscriptionsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    data: Schema.Array(
      Schema.Struct({
        application: Schema.Unknown,
        application_fee_percent: Schema.NullOr(Schema.Number),
        automatic_tax: Schema.Struct({
          disabled_reason: Schema.NullOr(
            Schema.Literals(["requires_location_inputs"]),
          ),
          enabled: Schema.Boolean,
          liability: Schema.Unknown,
        }),
        billing_cycle_anchor: Schema.Number,
        billing_cycle_anchor_config: Schema.Unknown,
        billing_mode: Schema.Struct({
          flexible: Schema.Unknown,
          type: Schema.Literals(["classic", "flexible"]),
          updated_at: Schema.optional(Schema.Number),
        }),
        billing_thresholds: Schema.Unknown,
        cancel_at: Schema.NullOr(Schema.Number),
        cancel_at_period_end: Schema.Boolean,
        canceled_at: Schema.NullOr(Schema.Number),
        cancellation_details: Schema.Unknown,
        collection_method: Schema.Literals([
          "charge_automatically",
          "send_invoice",
        ]),
        created: Schema.Number,
        currency: Schema.String,
        customer: Schema.Unknown,
        customer_account: Schema.NullOr(Schema.String),
        days_until_due: Schema.NullOr(Schema.Number),
        default_payment_method: Schema.Unknown,
        default_source: Schema.Unknown,
        default_tax_rates: Schema.optional(
          Schema.NullOr(
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
        ),
        description: Schema.NullOr(Schema.String),
        discounts: Schema.Array(Schema.Unknown),
        ended_at: Schema.NullOr(Schema.Number),
        id: Schema.String,
        invoice_settings: Schema.Struct({
          account_tax_ids: Schema.NullOr(Schema.Array(Schema.Unknown)),
          issuer: Schema.Struct({
            account: Schema.optional(Schema.Unknown),
            type: Schema.Literals(["account", "self"]),
          }),
        }),
        items: Schema.Struct({
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
                metadata: Schema.NullOr(
                  Schema.Record(Schema.String, Schema.String),
                ),
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
                tiers_mode: Schema.NullOr(
                  Schema.Literals(["graduated", "volume"]),
                ),
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
                        Schema.Literals([
                          "exclusive",
                          "inclusive",
                          "unspecified",
                        ]),
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
                tiers_mode: Schema.NullOr(
                  Schema.Literals(["graduated", "volume"]),
                ),
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
        }),
        latest_invoice: Schema.Unknown,
        livemode: Schema.Boolean,
        metadata: Schema.Record(Schema.String, Schema.String),
        next_pending_invoice_item_invoice: Schema.NullOr(Schema.Number),
        object: Schema.Literals(["subscription"]),
        on_behalf_of: Schema.Unknown,
        pause_collection: Schema.Unknown,
        payment_settings: Schema.Unknown,
        pending_invoice_item_interval: Schema.Unknown,
        pending_setup_intent: Schema.Unknown,
        pending_update: Schema.Unknown,
        schedule: Schema.Unknown,
        start_date: Schema.Number,
        status: Schema.Literals([
          "active",
          "canceled",
          "incomplete",
          "incomplete_expired",
          "past_due",
          "paused",
          "trialing",
          "unpaid",
        ]),
        test_clock: Schema.Unknown,
        transfer_data: Schema.Unknown,
        trial_end: Schema.NullOr(Schema.Number),
        trial_settings: Schema.Unknown,
        trial_start: Schema.NullOr(Schema.Number),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  },
);
export type GetSubscriptionsOutput = typeof GetSubscriptionsOutput.Type;

// The operation
/**
 * List subscriptions
 *
 * <p>By default, returns a list of subscriptions that have not been canceled. In order to list canceled subscriptions, specify <code>status=canceled</code>.</p>
 *
 * @param automatic_tax - Filter subscriptions by their automatic tax settings.
 * @param collection_method - The collection method of the subscriptions to retrieve. Either `charge_automatically` or `send_invoice`.
 * @param created - Only return subscriptions that were created during the given date interval.
 * @param current_period_end - Only return subscriptions whose minimum item current_period_end falls within the given date interval.
 * @param current_period_start - Only return subscriptions whose maximum item current_period_start falls within the given date interval.
 * @param customer - The ID of the customer whose subscriptions you're retrieving.
 * @param customer_account - The ID of the account representing the customer whose subscriptions you're retrieving.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param plan - The ID of the plan whose subscriptions will be retrieved.
 * @param price - Filter for subscriptions that contain this recurring price ID.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - The status of the subscriptions to retrieve. Passing in a value of `canceled` will return all canceled subscriptions, including those belonging to deleted customers. Pass `ended` to find subscriptions that are canceled and subscriptions that are expired due to [incomplete payment](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses). Passing in a value of `all` will return subscriptions of all statuses. If no value is supplied, all subscriptions that have not been canceled are returned.
 * @param test_clock - Filter for subscriptions that are associated with the specified test clock. The response will not include subscriptions with test clocks if this and the customer parameter is not set.
 */
export const GetSubscriptions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSubscriptionsInput,
  outputSchema: GetSubscriptionsOutput,
}));
