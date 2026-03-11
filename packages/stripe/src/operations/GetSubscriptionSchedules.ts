import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSubscriptionSchedulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    canceled_at: Schema.optional(Schema.String),
    completed_at: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    released_at: Schema.optional(Schema.String),
    scheduled: Schema.optional(Schema.Boolean),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/subscription_schedules",
      contentType: "form-urlencoded",
    }),
  );
export type GetSubscriptionSchedulesInput =
  typeof GetSubscriptionSchedulesInput.Type;

// Output Schema
export const GetSubscriptionSchedulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
            metadata: Schema.NullOr(
              Schema.Record(Schema.String, Schema.String),
            ),
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetSubscriptionSchedulesOutput =
  typeof GetSubscriptionSchedulesOutput.Type;

// The operation
/**
 * List all schedules
 *
 * <p>Retrieves the list of your subscription schedules.</p>
 *
 * @param canceled_at - Only return subscription schedules that were created canceled the given date interval.
 * @param completed_at - Only return subscription schedules that completed during the given date interval.
 * @param created - Only return subscription schedules that were created during the given date interval.
 * @param customer - Only return subscription schedules for the given customer.
 * @param customer_account - Only return subscription schedules for the given account.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param released_at - Only return subscription schedules that were released during the given date interval.
 * @param scheduled - Only return subscription schedules that have not started yet.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetSubscriptionSchedules = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetSubscriptionSchedulesInput,
    outputSchema: GetSubscriptionSchedulesOutput,
  }),
);
