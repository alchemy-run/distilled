import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostSubscriptionSchedulesScheduleReleaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    schedule: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    preserve_cancel_date: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/subscription_schedules/{schedule}/release",
      contentType: "form-urlencoded",
    }),
  );
export type PostSubscriptionSchedulesScheduleReleaseInput =
  typeof PostSubscriptionSchedulesScheduleReleaseInput.Type;

// Output Schema
export const PostSubscriptionSchedulesScheduleReleaseOutput =
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
export type PostSubscriptionSchedulesScheduleReleaseOutput =
  typeof PostSubscriptionSchedulesScheduleReleaseOutput.Type;

// The operation
/**
 * Release a schedule
 *
 * <p>Releases the subscription schedule immediately, which will stop scheduling of its phases, but leave any existing subscription in place. A schedule can only be released if its status is <code>not_started</code> or <code>active</code>. If the subscription schedule is currently associated with a subscription, releasing it will remove its <code>subscription</code> property and set the subscription’s ID to the <code>released_subscription</code> property.</p>
 */
export const PostSubscriptionSchedulesScheduleRelease =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostSubscriptionSchedulesScheduleReleaseInput,
    outputSchema: PostSubscriptionSchedulesScheduleReleaseOutput,
  }));
