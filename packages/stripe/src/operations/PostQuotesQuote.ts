import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostQuotesQuoteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  quote: Schema.String.pipe(T.PathParam()),
  application_fee_amount: Schema.optional(Schema.Unknown),
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
  collection_method: Schema.optional(
    Schema.Literals(["charge_automatically", "send_invoice"]),
  ),
  customer: Schema.optional(Schema.String),
  customer_account: Schema.optional(Schema.String),
  default_tax_rates: Schema.optional(Schema.Unknown),
  description: Schema.optional(Schema.Unknown),
  discounts: Schema.optional(Schema.Unknown),
  expand: Schema.optional(Schema.Array(Schema.String)),
  expires_at: Schema.optional(Schema.Number),
  footer: Schema.optional(Schema.Unknown),
  header: Schema.optional(Schema.Unknown),
  invoice_settings: Schema.optional(
    Schema.Struct({
      days_until_due: Schema.optional(Schema.Number),
      issuer: Schema.optional(
        Schema.Struct({
          account: Schema.optional(Schema.String),
          type: Schema.Literals(["account", "self"]),
        }),
      ),
    }),
  ),
  line_items: Schema.optional(
    Schema.Array(
      Schema.Struct({
        discounts: Schema.optional(Schema.Unknown),
        id: Schema.optional(Schema.String),
        price: Schema.optional(Schema.String),
        price_data: Schema.optional(
          Schema.Struct({
            currency: Schema.String,
            product: Schema.String,
            recurring: Schema.optional(
              Schema.Struct({
                interval: Schema.Literals(["day", "month", "week", "year"]),
                interval_count: Schema.optional(Schema.Number),
              }),
            ),
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
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  on_behalf_of: Schema.optional(Schema.Unknown),
  subscription_data: Schema.optional(
    Schema.Struct({
      description: Schema.optional(Schema.Unknown),
      effective_date: Schema.optional(Schema.Unknown),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      trial_period_days: Schema.optional(Schema.Unknown),
    }),
  ),
  transfer_data: Schema.optional(Schema.Unknown),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/quotes/{quote}",
    contentType: "form-urlencoded",
  }),
);
export type PostQuotesQuoteInput = typeof PostQuotesQuoteInput.Type;

// Output Schema
export const PostQuotesQuoteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  amount_subtotal: Schema.Number,
  amount_total: Schema.Number,
  application: Schema.Unknown,
  application_fee_amount: Schema.NullOr(Schema.Number),
  application_fee_percent: Schema.NullOr(Schema.Number),
  automatic_tax: Schema.Struct({
    enabled: Schema.Boolean,
    liability: Schema.Unknown,
    provider: Schema.NullOr(Schema.String),
    status: Schema.NullOr(
      Schema.Literals(["complete", "failed", "requires_location_inputs"]),
    ),
  }),
  collection_method: Schema.Literals(["charge_automatically", "send_invoice"]),
  computed: Schema.Struct({
    recurring: Schema.Unknown,
    upfront: Schema.Struct({
      amount_subtotal: Schema.Number,
      amount_total: Schema.Number,
      line_items: Schema.optional(
        Schema.Struct({
          data: Schema.Array(
            Schema.Struct({
              adjustable_quantity: Schema.Unknown,
              amount_discount: Schema.Number,
              amount_subtotal: Schema.Number,
              amount_tax: Schema.Number,
              amount_total: Schema.Number,
              currency: Schema.String,
              description: Schema.NullOr(Schema.String),
              discounts: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    amount: Schema.Number,
                    discount: Schema.Struct({
                      checkout_session: Schema.NullOr(Schema.String),
                      customer: Schema.Unknown,
                      customer_account: Schema.NullOr(Schema.String),
                      end: Schema.NullOr(Schema.Number),
                      id: Schema.String,
                      invoice: Schema.NullOr(Schema.String),
                      invoice_item: Schema.NullOr(Schema.String),
                      object: Schema.Literals(["discount"]),
                      promotion_code: Schema.Unknown,
                      source: Schema.Struct({
                        coupon: Schema.Unknown,
                        type: Schema.Literals(["coupon"]),
                      }),
                      start: Schema.Number,
                      subscription: Schema.NullOr(Schema.String),
                      subscription_item: Schema.NullOr(Schema.String),
                    }),
                  }),
                ),
              ),
              id: Schema.String,
              metadata: Schema.NullOr(
                Schema.Record(Schema.String, Schema.String),
              ),
              object: Schema.Literals(["item"]),
              price: Schema.Unknown,
              quantity: Schema.NullOr(Schema.Number),
              taxes: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    amount: Schema.Number,
                    rate: Schema.Struct({
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
                    taxability_reason: Schema.NullOr(
                      Schema.Literals([
                        "customer_exempt",
                        "not_collecting",
                        "not_subject_to_tax",
                        "not_supported",
                        "portion_product_exempt",
                        "portion_reduced_rated",
                        "portion_standard_rated",
                        "product_exempt",
                        "product_exempt_holiday",
                        "proportionally_rated",
                        "reduced_rated",
                        "reverse_charge",
                        "standard_rated",
                        "taxable_basis_reduced",
                        "zero_rated",
                      ]),
                    ),
                    taxable_amount: Schema.NullOr(Schema.Number),
                  }),
                ),
              ),
            }),
          ),
          has_more: Schema.Boolean,
          object: Schema.Literals(["list"]),
          url: Schema.String,
        }),
      ),
      total_details: Schema.Struct({
        amount_discount: Schema.Number,
        amount_shipping: Schema.NullOr(Schema.Number),
        amount_tax: Schema.Number,
        breakdown: Schema.optional(
          Schema.Struct({
            discounts: Schema.Array(
              Schema.Struct({
                amount: Schema.Number,
                discount: Schema.Struct({
                  checkout_session: Schema.NullOr(Schema.String),
                  customer: Schema.Unknown,
                  customer_account: Schema.NullOr(Schema.String),
                  end: Schema.NullOr(Schema.Number),
                  id: Schema.String,
                  invoice: Schema.NullOr(Schema.String),
                  invoice_item: Schema.NullOr(Schema.String),
                  object: Schema.Literals(["discount"]),
                  promotion_code: Schema.Unknown,
                  source: Schema.Struct({
                    coupon: Schema.Unknown,
                    type: Schema.Literals(["coupon"]),
                  }),
                  start: Schema.Number,
                  subscription: Schema.NullOr(Schema.String),
                  subscription_item: Schema.NullOr(Schema.String),
                }),
              }),
            ),
            taxes: Schema.Array(
              Schema.Struct({
                amount: Schema.Number,
                rate: Schema.Struct({
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
                taxability_reason: Schema.NullOr(
                  Schema.Literals([
                    "customer_exempt",
                    "not_collecting",
                    "not_subject_to_tax",
                    "not_supported",
                    "portion_product_exempt",
                    "portion_reduced_rated",
                    "portion_standard_rated",
                    "product_exempt",
                    "product_exempt_holiday",
                    "proportionally_rated",
                    "reduced_rated",
                    "reverse_charge",
                    "standard_rated",
                    "taxable_basis_reduced",
                    "zero_rated",
                  ]),
                ),
                taxable_amount: Schema.NullOr(Schema.Number),
              }),
            ),
          }),
        ),
      }),
    }),
  }),
  created: Schema.Number,
  currency: Schema.NullOr(Schema.String),
  customer: Schema.Unknown,
  customer_account: Schema.NullOr(Schema.String),
  default_tax_rates: Schema.optional(Schema.Array(Schema.Unknown)),
  description: Schema.NullOr(Schema.String),
  discounts: Schema.Array(Schema.Unknown),
  expires_at: Schema.Number,
  footer: Schema.NullOr(Schema.String),
  from_quote: Schema.Unknown,
  header: Schema.NullOr(Schema.String),
  id: Schema.String,
  invoice: Schema.Unknown,
  invoice_settings: Schema.Struct({
    days_until_due: Schema.NullOr(Schema.Number),
    issuer: Schema.Struct({
      account: Schema.optional(Schema.Unknown),
      type: Schema.Literals(["account", "self"]),
    }),
  }),
  line_items: Schema.optional(
    Schema.Struct({
      data: Schema.Array(
        Schema.Struct({
          adjustable_quantity: Schema.Unknown,
          amount_discount: Schema.Number,
          amount_subtotal: Schema.Number,
          amount_tax: Schema.Number,
          amount_total: Schema.Number,
          currency: Schema.String,
          description: Schema.NullOr(Schema.String),
          discounts: Schema.optional(
            Schema.Array(
              Schema.Struct({
                amount: Schema.Number,
                discount: Schema.Struct({
                  checkout_session: Schema.NullOr(Schema.String),
                  customer: Schema.Unknown,
                  customer_account: Schema.NullOr(Schema.String),
                  end: Schema.NullOr(Schema.Number),
                  id: Schema.String,
                  invoice: Schema.NullOr(Schema.String),
                  invoice_item: Schema.NullOr(Schema.String),
                  object: Schema.Literals(["discount"]),
                  promotion_code: Schema.Unknown,
                  source: Schema.Struct({
                    coupon: Schema.Unknown,
                    type: Schema.Literals(["coupon"]),
                  }),
                  start: Schema.Number,
                  subscription: Schema.NullOr(Schema.String),
                  subscription_item: Schema.NullOr(Schema.String),
                }),
              }),
            ),
          ),
          id: Schema.String,
          metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
          object: Schema.Literals(["item"]),
          price: Schema.Unknown,
          quantity: Schema.NullOr(Schema.Number),
          taxes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                amount: Schema.Number,
                rate: Schema.Struct({
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
                taxability_reason: Schema.NullOr(
                  Schema.Literals([
                    "customer_exempt",
                    "not_collecting",
                    "not_subject_to_tax",
                    "not_supported",
                    "portion_product_exempt",
                    "portion_reduced_rated",
                    "portion_standard_rated",
                    "product_exempt",
                    "product_exempt_holiday",
                    "proportionally_rated",
                    "reduced_rated",
                    "reverse_charge",
                    "standard_rated",
                    "taxable_basis_reduced",
                    "zero_rated",
                  ]),
                ),
                taxable_amount: Schema.NullOr(Schema.Number),
              }),
            ),
          ),
        }),
      ),
      has_more: Schema.Boolean,
      object: Schema.Literals(["list"]),
      url: Schema.String,
    }),
  ),
  livemode: Schema.Boolean,
  metadata: Schema.Record(Schema.String, Schema.String),
  number: Schema.NullOr(Schema.String),
  object: Schema.Literals(["quote"]),
  on_behalf_of: Schema.Unknown,
  status: Schema.Literals(["accepted", "canceled", "draft", "open"]),
  status_transitions: Schema.Struct({
    accepted_at: Schema.NullOr(Schema.Number),
    canceled_at: Schema.NullOr(Schema.Number),
    finalized_at: Schema.NullOr(Schema.Number),
  }),
  subscription: Schema.Unknown,
  subscription_data: Schema.Struct({
    billing_mode: Schema.Struct({
      flexible: Schema.optional(
        Schema.Struct({
          proration_discounts: Schema.optional(
            Schema.Literals(["included", "itemized"]),
          ),
        }),
      ),
      type: Schema.Literals(["classic", "flexible"]),
    }),
    description: Schema.NullOr(Schema.String),
    effective_date: Schema.NullOr(Schema.Number),
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    trial_period_days: Schema.NullOr(Schema.Number),
  }),
  subscription_schedule: Schema.Unknown,
  test_clock: Schema.Unknown,
  total_details: Schema.Struct({
    amount_discount: Schema.Number,
    amount_shipping: Schema.NullOr(Schema.Number),
    amount_tax: Schema.Number,
    breakdown: Schema.optional(
      Schema.Struct({
        discounts: Schema.Array(
          Schema.Struct({
            amount: Schema.Number,
            discount: Schema.Struct({
              checkout_session: Schema.NullOr(Schema.String),
              customer: Schema.Unknown,
              customer_account: Schema.NullOr(Schema.String),
              end: Schema.NullOr(Schema.Number),
              id: Schema.String,
              invoice: Schema.NullOr(Schema.String),
              invoice_item: Schema.NullOr(Schema.String),
              object: Schema.Literals(["discount"]),
              promotion_code: Schema.Unknown,
              source: Schema.Struct({
                coupon: Schema.Unknown,
                type: Schema.Literals(["coupon"]),
              }),
              start: Schema.Number,
              subscription: Schema.NullOr(Schema.String),
              subscription_item: Schema.NullOr(Schema.String),
            }),
          }),
        ),
        taxes: Schema.Array(
          Schema.Struct({
            amount: Schema.Number,
            rate: Schema.Struct({
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
            taxability_reason: Schema.NullOr(
              Schema.Literals([
                "customer_exempt",
                "not_collecting",
                "not_subject_to_tax",
                "not_supported",
                "portion_product_exempt",
                "portion_reduced_rated",
                "portion_standard_rated",
                "product_exempt",
                "product_exempt_holiday",
                "proportionally_rated",
                "reduced_rated",
                "reverse_charge",
                "standard_rated",
                "taxable_basis_reduced",
                "zero_rated",
              ]),
            ),
            taxable_amount: Schema.NullOr(Schema.Number),
          }),
        ),
      }),
    ),
  }),
  transfer_data: Schema.Unknown,
});
export type PostQuotesQuoteOutput = typeof PostQuotesQuoteOutput.Type;

// The operation
/**
 * Update a quote
 *
 * <p>A quote models prices and services for a customer.</p>
 */
export const PostQuotesQuote = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostQuotesQuoteInput,
  outputSchema: PostQuotesQuoteOutput,
}));
