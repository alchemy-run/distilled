import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const PostPaymentIntentsIntentVerifyMicrodepositsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    intent: Schema.String.pipe(T.PathParam()),
    amounts: Schema.optional(Schema.Array(Schema.Number)),
    descriptor_code: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payment_intents/{intent}/verify_microdeposits",
      contentType: "form-urlencoded",
    }),
  );
export type PostPaymentIntentsIntentVerifyMicrodepositsInput =
  typeof PostPaymentIntentsIntentVerifyMicrodepositsInput.Type;

// Output Schema
export const PostPaymentIntentsIntentVerifyMicrodepositsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    amount_capturable: Schema.Number,
    amount_details: Schema.optional(
      Schema.Struct({
        discount_amount: Schema.optional(Schema.Number),
        error: Schema.optional(
          Schema.Struct({
            code: Schema.NullOr(
              Schema.Literals([
                "amount_details_amount_mismatch",
                "amount_details_tax_shipping_discount_greater_than_amount",
              ]),
            ),
            message: Schema.NullOr(Schema.String),
          }),
        ),
        line_items: Schema.optional(
          Schema.Struct({
            data: Schema.Array(
              Schema.Struct({
                discount_amount: Schema.NullOr(Schema.Number),
                id: Schema.String,
                object: Schema.Literals([
                  "payment_intent_amount_details_line_item",
                ]),
                payment_method_options: Schema.Unknown,
                product_code: Schema.NullOr(Schema.String),
                product_name: Schema.String,
                quantity: Schema.Number,
                tax: Schema.Unknown,
                unit_cost: Schema.Number,
                unit_of_measure: Schema.NullOr(Schema.String),
              }),
            ),
            has_more: Schema.Boolean,
            object: Schema.Literals(["list"]),
            url: Schema.String,
          }),
        ),
        shipping: Schema.optional(
          Schema.Struct({
            amount: Schema.NullOr(Schema.Number),
            from_postal_code: Schema.NullOr(Schema.String),
            to_postal_code: Schema.NullOr(Schema.String),
          }),
        ),
        tax: Schema.optional(
          Schema.Struct({
            total_tax_amount: Schema.NullOr(Schema.Number),
          }),
        ),
        tip: Schema.optional(
          Schema.Struct({
            amount: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
    amount_received: Schema.Number,
    application: Schema.Unknown,
    application_fee_amount: Schema.NullOr(Schema.Number),
    automatic_payment_methods: Schema.Unknown,
    canceled_at: Schema.NullOr(Schema.Number),
    cancellation_reason: Schema.NullOr(
      Schema.Literals([
        "abandoned",
        "automatic",
        "duplicate",
        "expired",
        "failed_invoice",
        "fraudulent",
        "requested_by_customer",
        "void_invoice",
      ]),
    ),
    capture_method: Schema.Literals(["automatic", "automatic_async", "manual"]),
    client_secret: SensitiveNullableString,
    confirmation_method: Schema.Literals(["automatic", "manual"]),
    created: Schema.Number,
    currency: Schema.String,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    description: Schema.NullOr(Schema.String),
    excluded_payment_method_types: Schema.NullOr(
      Schema.Array(
        Schema.Literals([
          "acss_debit",
          "affirm",
          "afterpay_clearpay",
          "alipay",
          "alma",
          "amazon_pay",
          "au_becs_debit",
          "bacs_debit",
          "bancontact",
          "billie",
          "blik",
          "boleto",
          "card",
          "cashapp",
          "crypto",
          "customer_balance",
          "eps",
          "fpx",
          "giropay",
          "grabpay",
          "ideal",
          "kakao_pay",
          "klarna",
          "konbini",
          "kr_card",
          "mb_way",
          "mobilepay",
          "multibanco",
          "naver_pay",
          "nz_bank_account",
          "oxxo",
          "p24",
          "pay_by_bank",
          "payco",
          "paynow",
          "paypal",
          "payto",
          "pix",
          "promptpay",
          "revolut_pay",
          "samsung_pay",
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
    hooks: Schema.optional(
      Schema.Struct({
        inputs: Schema.optional(
          Schema.Struct({
            tax: Schema.optional(
              Schema.Struct({
                calculation: Schema.String,
              }),
            ),
          }),
        ),
      }),
    ),
    id: Schema.String,
    last_payment_error: Schema.Unknown,
    latest_charge: Schema.Unknown,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    next_action: Schema.Unknown,
    object: Schema.Literals(["payment_intent"]),
    on_behalf_of: Schema.Unknown,
    payment_details: Schema.optional(
      Schema.Struct({
        customer_reference: Schema.NullOr(Schema.String),
        order_reference: Schema.NullOr(Schema.String),
      }),
    ),
    payment_method: Schema.Unknown,
    payment_method_configuration_details: Schema.Unknown,
    payment_method_options: Schema.Unknown,
    payment_method_types: Schema.Array(Schema.String),
    presentment_details: Schema.optional(
      Schema.Struct({
        presentment_amount: Schema.Number,
        presentment_currency: Schema.String,
      }),
    ),
    processing: Schema.Unknown,
    receipt_email: Schema.NullOr(Schema.String),
    review: Schema.Unknown,
    setup_future_usage: Schema.NullOr(
      Schema.Literals(["off_session", "on_session"]),
    ),
    shipping: Schema.Unknown,
    source: Schema.Unknown,
    statement_descriptor: Schema.NullOr(Schema.String),
    statement_descriptor_suffix: Schema.NullOr(Schema.String),
    status: Schema.Literals([
      "canceled",
      "processing",
      "requires_action",
      "requires_capture",
      "requires_confirmation",
      "requires_payment_method",
      "succeeded",
    ]),
    transfer_data: Schema.optional(Schema.Unknown),
    transfer_group: Schema.NullOr(Schema.String),
  });
export type PostPaymentIntentsIntentVerifyMicrodepositsOutput =
  typeof PostPaymentIntentsIntentVerifyMicrodepositsOutput.Type;

// The operation
/**
 * Verify microdeposits on a PaymentIntent
 *
 * <p>Verifies microdeposits on a PaymentIntent object.</p>
 */
export const PostPaymentIntentsIntentVerifyMicrodeposits =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostPaymentIntentsIntentVerifyMicrodepositsInput,
    outputSchema: PostPaymentIntentsIntentVerifyMicrodepositsOutput,
  }));
