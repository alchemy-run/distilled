import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostSubscriptionsSubscriptionExposedIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription_exposed_id: Schema.String.pipe(T.PathParam()),
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
    billing_cycle_anchor: Schema.optional(
      Schema.Literals(["now", "unchanged"]),
    ),
    billing_thresholds: Schema.optional(Schema.Unknown),
    cancel_at: Schema.optional(Schema.Unknown),
    cancel_at_period_end: Schema.optional(Schema.Boolean),
    cancellation_details: Schema.optional(
      Schema.Struct({
        comment: Schema.optional(Schema.Unknown),
        feedback: Schema.optional(
          Schema.Literals([
            "",
            "customer_service",
            "low_quality",
            "missing_features",
            "other",
            "switched_service",
            "too_complex",
            "too_expensive",
            "unused",
          ]),
        ),
      }),
    ),
    collection_method: Schema.optional(
      Schema.Literals(["charge_automatically", "send_invoice"]),
    ),
    days_until_due: Schema.optional(Schema.Number),
    default_payment_method: Schema.optional(Schema.String),
    default_source: Schema.optional(Schema.Unknown),
    default_tax_rates: Schema.optional(Schema.Unknown),
    description: Schema.optional(Schema.Unknown),
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
          clear_usage: Schema.optional(Schema.Boolean),
          deleted: Schema.optional(Schema.Boolean),
          discounts: Schema.optional(Schema.Unknown),
          id: Schema.optional(Schema.String),
          metadata: Schema.optional(Schema.Unknown),
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
    pause_collection: Schema.optional(Schema.Unknown),
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
    proration_date: Schema.optional(Schema.Number),
    transfer_data: Schema.optional(Schema.Unknown),
    trial_end: Schema.optional(Schema.Unknown),
    trial_from_plan: Schema.optional(Schema.Boolean),
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
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/subscriptions/{subscription_exposed_id}",
      contentType: "form-urlencoded",
    }),
  );
export type PostSubscriptionsSubscriptionExposedIdInput =
  typeof PostSubscriptionsSubscriptionExposedIdInput.Type;

// Output Schema
export const PostSubscriptionsSubscriptionExposedIdOutput =
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
export type PostSubscriptionsSubscriptionExposedIdOutput =
  typeof PostSubscriptionsSubscriptionExposedIdOutput.Type;

// The operation
/**
 * Update a subscription
 *
 * <p>Updates an existing subscription to match the specified parameters.
 * When changing prices or quantities, we optionally prorate the price we charge next month to make up for any price changes.
 * To preview how the proration is calculated, use the <a href="/docs/api/invoices/create_preview">create preview</a> endpoint.</p>
 * <p>By default, we prorate subscription changes. For example, if a customer signs up on May 1 for a <currency>100</currency> price, they’ll be billed <currency>100</currency> immediately. If on May 15 they switch to a <currency>200</currency> price, then on June 1 they’ll be billed <currency>250</currency> (<currency>200</currency> for a renewal of her subscription, plus a <currency>50</currency> prorating adjustment for half of the previous month’s <currency>100</currency> difference). Similarly, a downgrade generates a credit that is applied to the next invoice. We also prorate when you make quantity changes.</p>
 * <p>Switching prices does not normally change the billing date or generate an immediate charge unless:</p>
 * <ul>
 * <li>The billing interval is changed (for example, from monthly to yearly).</li>
 * <li>The subscription moves from free to paid.</li>
 * <li>A trial starts or ends.</li>
 * </ul>
 * <p>In these cases, we apply a credit for the unused time on the previous price, immediately charge the customer using the new price, and reset the billing date. Learn about how <a href="/docs/billing/subscriptions/upgrade-downgrade#immediate-payment">Stripe immediately attempts payment for subscription changes</a>.</p>
 * <p>If you want to charge for an upgrade immediately, pass <code>proration_behavior</code> as <code>always_invoice</code> to create prorations, automatically invoice the customer for those proration adjustments, and attempt to collect payment. If you pass <code>create_prorations</code>, the prorations are created but not automatically invoiced. If you want to bill the customer for the prorations before the subscription’s renewal date, you need to manually <a href="/docs/api/invoices/create">invoice the customer</a>.</p>
 * <p>If you don’t want to prorate, set the <code>proration_behavior</code> option to <code>none</code>. With this option, the customer is billed <currency>100</currency> on May 1 and <currency>200</currency> on June 1. Similarly, if you set <code>proration_behavior</code> to <code>none</code> when switching between different billing intervals (for example, from monthly to yearly), we don’t generate any credits for the old subscription’s unused time. We still reset the billing date and bill immediately for the new subscription.</p>
 * <p>Updating the quantity on a subscription many times in an hour may result in <a href="/docs/rate-limits">rate limiting</a>. If you need to bill for a frequently changing quantity, consider integrating <a href="/docs/billing/subscriptions/usage-based">usage-based billing</a> instead.</p>
 */
export const PostSubscriptionsSubscriptionExposedId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostSubscriptionsSubscriptionExposedIdInput,
    outputSchema: PostSubscriptionsSubscriptionExposedIdOutput,
  }));
