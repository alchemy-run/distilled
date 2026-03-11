import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteSubscriptionsSubscriptionExposedIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription_exposed_id: Schema.String.pipe(T.PathParam()),
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
    expand: Schema.optional(Schema.Array(Schema.String)),
    invoice_now: Schema.optional(Schema.Boolean),
    prorate: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/subscriptions/{subscription_exposed_id}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteSubscriptionsSubscriptionExposedIdInput =
  typeof DeleteSubscriptionsSubscriptionExposedIdInput.Type;

// Output Schema
export const DeleteSubscriptionsSubscriptionExposedIdOutput =
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
export type DeleteSubscriptionsSubscriptionExposedIdOutput =
  typeof DeleteSubscriptionsSubscriptionExposedIdOutput.Type;

// The operation
/**
 * Cancel a subscription
 *
 * <p>Cancels a customer’s subscription immediately. The customer won’t be charged again for the subscription. After it’s canceled, you can no longer update the subscription or its <a href="/metadata">metadata</a>.</p>
 * <p>Any pending invoice items that you’ve created are still charged at the end of the period, unless manually <a href="#delete_invoiceitem">deleted</a>. If you’ve set the subscription to cancel at the end of the period, any pending prorations are also left in place and collected at the end of the period. But if the subscription is set to cancel immediately, pending prorations are removed if <code>invoice_now</code> and <code>prorate</code> are both set to true.</p>
 * <p>By default, upon subscription cancellation, Stripe stops automatic collection of all finalized invoices for the customer. This is intended to prevent unexpected payment attempts after the customer has canceled a subscription. However, you can resume automatic collection of the invoices manually after subscription cancellation to have us proceed. Or, you could check for unpaid invoices before allowing the customer to cancel the subscription at all.</p>
 */
export const DeleteSubscriptionsSubscriptionExposedId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteSubscriptionsSubscriptionExposedIdInput,
    outputSchema: DeleteSubscriptionsSubscriptionExposedIdOutput,
  }));
