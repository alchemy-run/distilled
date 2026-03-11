import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostSubscriptionSchedulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    default_settings: Schema.optional(
      Schema.Struct({
        application_fee_percent: Schema.optional(Schema.Number),
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
          Schema.Literals(["automatic", "phase_start"]),
        ),
        billing_thresholds: Schema.optional(Schema.Unknown),
        collection_method: Schema.optional(
          Schema.Literals(["charge_automatically", "send_invoice"]),
        ),
        default_payment_method: Schema.optional(Schema.String),
        description: Schema.optional(Schema.Unknown),
        invoice_settings: Schema.optional(
          Schema.Struct({
            account_tax_ids: Schema.optional(Schema.Unknown),
            days_until_due: Schema.optional(Schema.Number),
            issuer: Schema.optional(
              Schema.Struct({
                account: Schema.optional(Schema.String),
                type: Schema.Literals(["account", "self"]),
              }),
            ),
          }),
        ),
        on_behalf_of: Schema.optional(Schema.Unknown),
        transfer_data: Schema.optional(Schema.Unknown),
      }),
    ),
    end_behavior: Schema.optional(
      Schema.Literals(["cancel", "none", "release", "renew"]),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    from_subscription: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Unknown),
    phases: Schema.optional(
      Schema.Array(
        Schema.Struct({
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
                      type: Schema.Literals([
                        "min_item_period_end",
                        "phase_end",
                        "timestamp",
                      ]),
                    }),
                    start: Schema.Struct({
                      timestamp: Schema.optional(Schema.Number),
                      type: Schema.Literals([
                        "max_item_period_start",
                        "phase_start",
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
                      Schema.Literals([
                        "exclusive",
                        "inclusive",
                        "unspecified",
                      ]),
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
          application_fee_percent: Schema.optional(Schema.Number),
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
            Schema.Literals(["automatic", "phase_start"]),
          ),
          billing_thresholds: Schema.optional(Schema.Unknown),
          collection_method: Schema.optional(
            Schema.Literals(["charge_automatically", "send_invoice"]),
          ),
          currency: Schema.optional(Schema.String),
          default_payment_method: Schema.optional(Schema.String),
          default_tax_rates: Schema.optional(Schema.Unknown),
          description: Schema.optional(Schema.Unknown),
          discounts: Schema.optional(Schema.Unknown),
          duration: Schema.optional(
            Schema.Struct({
              interval: Schema.Literals(["day", "month", "week", "year"]),
              interval_count: Schema.optional(Schema.Number),
            }),
          ),
          end_date: Schema.optional(Schema.Number),
          invoice_settings: Schema.optional(
            Schema.Struct({
              account_tax_ids: Schema.optional(Schema.Unknown),
              days_until_due: Schema.optional(Schema.Number),
              issuer: Schema.optional(
                Schema.Struct({
                  account: Schema.optional(Schema.String),
                  type: Schema.Literals(["account", "self"]),
                }),
              ),
            }),
          ),
          items: Schema.Array(
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
          metadata: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          on_behalf_of: Schema.optional(Schema.String),
          proration_behavior: Schema.optional(
            Schema.Literals(["always_invoice", "create_prorations", "none"]),
          ),
          transfer_data: Schema.optional(
            Schema.Struct({
              amount_percent: Schema.optional(Schema.Number),
              destination: Schema.String,
            }),
          ),
          trial: Schema.optional(Schema.Boolean),
          trial_end: Schema.optional(Schema.Number),
        }),
      ),
    ),
    start_date: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/subscription_schedules",
      contentType: "form-urlencoded",
    }),
  );
export type PostSubscriptionSchedulesInput =
  typeof PostSubscriptionSchedulesInput.Type;

// Output Schema
export const PostSubscriptionSchedulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    application: Schema.Unknown,
    billing_mode: Schema.Struct({
      flexible: Schema.Unknown,
      type: Schema.Literals(["classic", "flexible"]),
      updated_at: Schema.optional(Schema.Number),
    }),
    canceled_at: Schema.NullOr(Schema.Number),
    completed_at: Schema.NullOr(Schema.Number),
    created: Schema.Number,
    current_phase: Schema.Unknown,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    default_settings: Schema.Struct({
      application_fee_percent: Schema.NullOr(Schema.Number),
      automatic_tax: Schema.optional(
        Schema.Struct({
          disabled_reason: Schema.NullOr(
            Schema.Literals(["requires_location_inputs"]),
          ),
          enabled: Schema.Boolean,
          liability: Schema.Unknown,
        }),
      ),
      billing_cycle_anchor: Schema.Literals(["automatic", "phase_start"]),
      billing_thresholds: Schema.Unknown,
      collection_method: Schema.NullOr(
        Schema.Literals(["charge_automatically", "send_invoice"]),
      ),
      default_payment_method: Schema.Unknown,
      description: Schema.NullOr(Schema.String),
      invoice_settings: Schema.Struct({
        account_tax_ids: Schema.NullOr(Schema.Array(Schema.Unknown)),
        days_until_due: Schema.NullOr(Schema.Number),
        issuer: Schema.Struct({
          account: Schema.optional(Schema.Unknown),
          type: Schema.Literals(["account", "self"]),
        }),
      }),
      on_behalf_of: Schema.Unknown,
      transfer_data: Schema.Unknown,
    }),
    end_behavior: Schema.Literals(["cancel", "none", "release", "renew"]),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["subscription_schedule"]),
    phases: Schema.Array(
      Schema.Struct({
        add_invoice_items: Schema.Array(
          Schema.Struct({
            discounts: Schema.Array(
              Schema.Struct({
                coupon: Schema.Unknown,
                discount: Schema.Unknown,
                promotion_code: Schema.Unknown,
              }),
            ),
            metadata: Schema.NullOr(
              Schema.Record(Schema.String, Schema.String),
            ),
            period: Schema.Struct({
              end: Schema.Struct({
                timestamp: Schema.optional(Schema.Number),
                type: Schema.Literals([
                  "min_item_period_end",
                  "phase_end",
                  "timestamp",
                ]),
              }),
              start: Schema.Struct({
                timestamp: Schema.optional(Schema.Number),
                type: Schema.Literals([
                  "max_item_period_start",
                  "phase_start",
                  "timestamp",
                ]),
              }),
            }),
            price: Schema.Unknown,
            quantity: Schema.NullOr(Schema.Number),
            tax_rates: Schema.optional(
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
          }),
        ),
        application_fee_percent: Schema.NullOr(Schema.Number),
        automatic_tax: Schema.optional(
          Schema.Struct({
            disabled_reason: Schema.NullOr(
              Schema.Literals(["requires_location_inputs"]),
            ),
            enabled: Schema.Boolean,
            liability: Schema.Unknown,
          }),
        ),
        billing_cycle_anchor: Schema.NullOr(
          Schema.Literals(["automatic", "phase_start"]),
        ),
        billing_thresholds: Schema.Unknown,
        collection_method: Schema.NullOr(
          Schema.Literals(["charge_automatically", "send_invoice"]),
        ),
        currency: Schema.String,
        default_payment_method: Schema.Unknown,
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
        discounts: Schema.Array(
          Schema.Struct({
            coupon: Schema.Unknown,
            discount: Schema.Unknown,
            promotion_code: Schema.Unknown,
          }),
        ),
        end_date: Schema.Number,
        invoice_settings: Schema.Unknown,
        items: Schema.Array(
          Schema.Struct({
            billing_thresholds: Schema.Unknown,
            discounts: Schema.Array(
              Schema.Struct({
                coupon: Schema.Unknown,
                discount: Schema.Unknown,
                promotion_code: Schema.Unknown,
              }),
            ),
            metadata: Schema.NullOr(
              Schema.Record(Schema.String, Schema.String),
            ),
            plan: Schema.Unknown,
            price: Schema.Unknown,
            quantity: Schema.optional(Schema.Number),
            tax_rates: Schema.optional(
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
          }),
        ),
        metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
        on_behalf_of: Schema.Unknown,
        proration_behavior: Schema.Literals([
          "always_invoice",
          "create_prorations",
          "none",
        ]),
        start_date: Schema.Number,
        transfer_data: Schema.Unknown,
        trial_end: Schema.NullOr(Schema.Number),
      }),
    ),
    released_at: Schema.NullOr(Schema.Number),
    released_subscription: Schema.NullOr(Schema.String),
    status: Schema.Literals([
      "active",
      "canceled",
      "completed",
      "not_started",
      "released",
    ]),
    subscription: Schema.Unknown,
    test_clock: Schema.Unknown,
  });
export type PostSubscriptionSchedulesOutput =
  typeof PostSubscriptionSchedulesOutput.Type;

// The operation
/**
 * Create a schedule
 *
 * <p>Creates a new subscription schedule object. Each customer can have up to 500 active or scheduled subscriptions.</p>
 */
export const PostSubscriptionSchedules = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostSubscriptionSchedulesInput,
    outputSchema: PostSubscriptionSchedulesOutput,
  }),
);
