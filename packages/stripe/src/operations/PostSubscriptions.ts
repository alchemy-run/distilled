import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostSubscriptionsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    add_invoice_items: Schema.optional(
      Schema.Array(
        Schema.Struct({
          discounts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                coupon: Schema.optional(Schema.String),
                discount: Schema.optional(Schema.String),
                promotion_code: Schema.optional(Schema.String),
              }),
            ),
          ),
          metadata: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          period: Schema.optional(
            Schema.Struct({
              end: Schema.Struct({
                timestamp: Schema.optional(Schema.Number),
                type: Schema.Literals(["min_item_period_end", "timestamp"]),
              }),
              start: Schema.Struct({
                timestamp: Schema.optional(Schema.Number),
                type: Schema.Literals([
                  "max_item_period_start",
                  "now",
                  "timestamp",
                ]),
              }),
            }),
          ),
          price: Schema.optional(Schema.String),
          price_data: Schema.optional(
            Schema.Struct({
              currency: Schema.String,
              product: Schema.String,
              tax_behavior: Schema.optional(
                Schema.Literals(["exclusive", "inclusive", "unspecified"]),
              ),
              unit_amount: Schema.optional(Schema.Number),
              unit_amount_decimal: Schema.optional(Schema.String),
            }),
          ),
          quantity: Schema.optional(Schema.Number),
          tax_rates: Schema.optional(Schema.Unknown),
        }),
      ),
    ),
    application_fee_percent: Schema.optional(Schema.Unknown),
    automatic_tax: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
        liability: Schema.optional(
          Schema.Struct({
            account: Schema.optional(Schema.String),
            type: Schema.Literals(["account", "self"]),
          }),
        ),
      }),
    ),
    backdate_start_date: Schema.optional(Schema.Number),
    billing_cycle_anchor: Schema.optional(Schema.Number),
    billing_cycle_anchor_config: Schema.optional(
      Schema.Struct({
        day_of_month: Schema.Number,
        hour: Schema.optional(Schema.Number),
        minute: Schema.optional(Schema.Number),
        month: Schema.optional(Schema.Number),
        second: Schema.optional(Schema.Number),
      }),
    ),
    billing_mode: Schema.optional(
      Schema.Struct({
        flexible: Schema.optional(
          Schema.Struct({
            proration_discounts: Schema.optional(
              Schema.Literals(["included", "itemized"]),
            ),
          }),
        ),
        type: Schema.Literals(["classic", "flexible"]),
      }),
    ),
    billing_thresholds: Schema.optional(Schema.Unknown),
    cancel_at: Schema.optional(Schema.Unknown),
    cancel_at_period_end: Schema.optional(Schema.Boolean),
    collection_method: Schema.optional(
      Schema.Literals(["charge_automatically", "send_invoice"]),
    ),
    currency: Schema.optional(Schema.String),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    days_until_due: Schema.optional(Schema.Number),
    default_payment_method: Schema.optional(Schema.String),
    default_source: Schema.optional(Schema.String),
    default_tax_rates: Schema.optional(Schema.Unknown),
    description: Schema.optional(Schema.String),
    discounts: Schema.optional(Schema.Unknown),
    expand: Schema.optional(Schema.Array(Schema.String)),
    invoice_settings: Schema.optional(
      Schema.Struct({
        account_tax_ids: Schema.optional(Schema.Unknown),
        issuer: Schema.optional(
          Schema.Struct({
            account: Schema.optional(Schema.String),
            type: Schema.Literals(["account", "self"]),
          }),
        ),
      }),
    ),
    items: Schema.optional(
      Schema.Array(
        Schema.Struct({
          billing_thresholds: Schema.optional(Schema.Unknown),
          discounts: Schema.optional(Schema.Unknown),
          metadata: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          plan: Schema.optional(Schema.String),
          price: Schema.optional(Schema.String),
          price_data: Schema.optional(
            Schema.Struct({
              currency: Schema.String,
              product: Schema.String,
              recurring: Schema.Struct({
                interval: Schema.Literals(["day", "month", "week", "year"]),
                interval_count: Schema.optional(Schema.Number),
              }),
              tax_behavior: Schema.optional(
                Schema.Literals(["exclusive", "inclusive", "unspecified"]),
              ),
              unit_amount: Schema.optional(Schema.Number),
              unit_amount_decimal: Schema.optional(Schema.String),
            }),
          ),
          quantity: Schema.optional(Schema.Number),
          tax_rates: Schema.optional(Schema.Unknown),
        }),
      ),
    ),
    metadata: Schema.optional(Schema.Unknown),
    off_session: Schema.optional(Schema.Boolean),
    on_behalf_of: Schema.optional(Schema.Unknown),
    payment_behavior: Schema.optional(
      Schema.Literals([
        "allow_incomplete",
        "default_incomplete",
        "error_if_incomplete",
        "pending_if_incomplete",
      ]),
    ),
    payment_settings: Schema.optional(
      Schema.Struct({
        payment_method_options: Schema.optional(
          Schema.Struct({
            acss_debit: Schema.optional(Schema.Unknown),
            bancontact: Schema.optional(Schema.Unknown),
            card: Schema.optional(Schema.Unknown),
            customer_balance: Schema.optional(Schema.Unknown),
            konbini: Schema.optional(Schema.Unknown),
            payto: Schema.optional(Schema.Unknown),
            sepa_debit: Schema.optional(Schema.Unknown),
            us_bank_account: Schema.optional(Schema.Unknown),
          }),
        ),
        payment_method_types: Schema.optional(Schema.Unknown),
        save_default_payment_method: Schema.optional(
          Schema.Literals(["off", "on_subscription"]),
        ),
      }),
    ),
    pending_invoice_item_interval: Schema.optional(Schema.Unknown),
    proration_behavior: Schema.optional(
      Schema.Literals(["always_invoice", "create_prorations", "none"]),
    ),
    transfer_data: Schema.optional(
      Schema.Struct({
        amount_percent: Schema.optional(Schema.Number),
        destination: Schema.String,
      }),
    ),
    trial_end: Schema.optional(Schema.Unknown),
    trial_from_plan: Schema.optional(Schema.Boolean),
    trial_period_days: Schema.optional(Schema.Number),
    trial_settings: Schema.optional(
      Schema.Struct({
        end_behavior: Schema.Struct({
          missing_payment_method: Schema.Literals([
            "cancel",
            "create_invoice",
            "pause",
          ]),
        }),
      }),
    ),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/subscriptions",
    contentType: "form-urlencoded",
  }),
);
export type PostSubscriptionsInput = typeof PostSubscriptionsInput.Type;

// Output Schema
export const PostSubscriptionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type PostSubscriptionsOutput = typeof PostSubscriptionsOutput.Type;

// The operation
/**
 * Create a subscription
 *
 * <p>Creates a new subscription on an existing customer. Each customer can have up to 500 active or scheduled subscriptions.</p>
 * <p>When you create a subscription with <code>collection_method=charge_automatically</code>, the first invoice is finalized as part of the request.
 * The <code>payment_behavior</code> parameter determines the exact behavior of the initial payment.</p>
 * <p>To start subscriptions where the first invoice always begins in a <code>draft</code> status, use <a href="/docs/billing/subscriptions/subscription-schedules#managing">subscription schedules</a> instead.
 * Schedules provide the flexibility to model more complex billing configurations that change over time.</p>
 */
export const PostSubscriptions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostSubscriptionsInput,
  outputSchema: PostSubscriptionsOutput,
}));
