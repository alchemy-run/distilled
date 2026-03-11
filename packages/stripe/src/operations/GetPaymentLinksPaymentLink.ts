import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPaymentLinksPaymentLinkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    payment_link: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/payment_links/{payment_link}",
      contentType: "form-urlencoded",
    }),
  );
export type GetPaymentLinksPaymentLinkInput =
  typeof GetPaymentLinksPaymentLinkInput.Type;

// Output Schema
export const GetPaymentLinksPaymentLinkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    active: Schema.Boolean,
    after_completion: Schema.Struct({
      hosted_confirmation: Schema.optional(
        Schema.Struct({
          custom_message: Schema.NullOr(Schema.String),
        }),
      ),
      redirect: Schema.optional(
        Schema.Struct({
          url: Schema.String,
        }),
      ),
      type: Schema.Literals(["hosted_confirmation", "redirect"]),
    }),
    allow_promotion_codes: Schema.Boolean,
    application: Schema.Unknown,
    application_fee_amount: Schema.NullOr(Schema.Number),
    application_fee_percent: Schema.NullOr(Schema.Number),
    automatic_tax: Schema.Struct({
      enabled: Schema.Boolean,
      liability: Schema.Unknown,
    }),
    billing_address_collection: Schema.Literals(["auto", "required"]),
    consent_collection: Schema.Unknown,
    currency: Schema.String,
    custom_fields: Schema.Array(
      Schema.Struct({
        dropdown: Schema.optional(
          Schema.Struct({
            default_value: Schema.NullOr(Schema.String),
            options: Schema.Array(
              Schema.Struct({
                label: Schema.String,
                value: Schema.String,
              }),
            ),
          }),
        ),
        key: Schema.String,
        label: Schema.Struct({
          custom: Schema.NullOr(Schema.String),
          type: Schema.Literals(["custom"]),
        }),
        numeric: Schema.optional(
          Schema.Struct({
            default_value: Schema.NullOr(Schema.String),
            maximum_length: Schema.NullOr(Schema.Number),
            minimum_length: Schema.NullOr(Schema.Number),
          }),
        ),
        optional: Schema.Boolean,
        text: Schema.optional(
          Schema.Struct({
            default_value: Schema.NullOr(Schema.String),
            maximum_length: Schema.NullOr(Schema.Number),
            minimum_length: Schema.NullOr(Schema.Number),
          }),
        ),
        type: Schema.Literals(["dropdown", "numeric", "text"]),
      }),
    ),
    custom_text: Schema.Struct({
      after_submit: Schema.Unknown,
      shipping_address: Schema.Unknown,
      submit: Schema.Unknown,
      terms_of_service_acceptance: Schema.Unknown,
    }),
    customer_creation: Schema.Literals(["always", "if_required"]),
    id: Schema.String,
    inactive_message: Schema.NullOr(Schema.String),
    invoice_creation: Schema.Unknown,
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
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    name_collection: Schema.optional(
      Schema.Struct({
        business: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            optional: Schema.Boolean,
          }),
        ),
        individual: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            optional: Schema.Boolean,
          }),
        ),
      }),
    ),
    object: Schema.Literals(["payment_link"]),
    on_behalf_of: Schema.Unknown,
    optional_items: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            adjustable_quantity: Schema.Unknown,
            price: Schema.String,
            quantity: Schema.Number,
          }),
        ),
      ),
    ),
    payment_intent_data: Schema.Unknown,
    payment_method_collection: Schema.Literals(["always", "if_required"]),
    payment_method_types: Schema.NullOr(
      Schema.Array(
        Schema.Literals([
          "affirm",
          "afterpay_clearpay",
          "alipay",
          "alma",
          "au_becs_debit",
          "bacs_debit",
          "bancontact",
          "billie",
          "blik",
          "boleto",
          "card",
          "cashapp",
          "eps",
          "fpx",
          "giropay",
          "grabpay",
          "ideal",
          "klarna",
          "konbini",
          "link",
          "mb_way",
          "mobilepay",
          "multibanco",
          "oxxo",
          "p24",
          "pay_by_bank",
          "paynow",
          "paypal",
          "payto",
          "pix",
          "promptpay",
          "satispay",
          "sepa_debit",
          "sofort",
          "swish",
          "twint",
          "us_bank_account",
          "wechat_pay",
          "zip",
        ]),
      ),
    ),
    phone_number_collection: Schema.Struct({
      enabled: Schema.Boolean,
    }),
    restrictions: Schema.Unknown,
    shipping_address_collection: Schema.Unknown,
    shipping_options: Schema.Array(
      Schema.Struct({
        shipping_amount: Schema.Number,
        shipping_rate: Schema.Unknown,
      }),
    ),
    submit_type: Schema.Literals([
      "auto",
      "book",
      "donate",
      "pay",
      "subscribe",
    ]),
    subscription_data: Schema.Unknown,
    tax_id_collection: Schema.Struct({
      enabled: Schema.Boolean,
      required: Schema.Literals(["if_supported", "never"]),
    }),
    transfer_data: Schema.Unknown,
    url: Schema.String,
  });
export type GetPaymentLinksPaymentLinkOutput =
  typeof GetPaymentLinksPaymentLinkOutput.Type;

// The operation
/**
 * Retrieve payment link
 *
 * <p>Retrieve a payment link.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetPaymentLinksPaymentLink = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetPaymentLinksPaymentLinkInput,
    outputSchema: GetPaymentLinksPaymentLinkOutput,
  }),
);
