import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostChargesChargeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    charge: Schema.String.pipe(T.PathParam()),
    customer: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    fraud_details: Schema.optional(
      Schema.Struct({
        user_report: Schema.Literals(["", "fraudulent", "safe"]),
      }),
    ),
    metadata: Schema.optional(Schema.Unknown),
    receipt_email: Schema.optional(Schema.String),
    shipping: Schema.optional(
      Schema.Struct({
        address: Schema.Struct({
          city: Schema.optional(Schema.String),
          country: Schema.optional(Schema.String),
          line1: Schema.optional(Schema.String),
          line2: Schema.optional(Schema.String),
          postal_code: Schema.optional(Schema.String),
          state: Schema.optional(Schema.String),
        }),
        carrier: Schema.optional(Schema.String),
        name: Schema.String,
        phone: Schema.optional(Schema.String),
        tracking_number: Schema.optional(Schema.String),
      }),
    ),
    transfer_group: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/charges/{charge}",
    contentType: "form-urlencoded",
  }),
);
export type PostChargesChargeInput = typeof PostChargesChargeInput.Type;

// Output Schema
export const PostChargesChargeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    amount_captured: Schema.Number,
    amount_refunded: Schema.Number,
    application: Schema.Unknown,
    application_fee: Schema.Unknown,
    application_fee_amount: Schema.NullOr(Schema.Number),
    authorization_code: Schema.optional(Schema.String),
    balance_transaction: Schema.Unknown,
    billing_details: Schema.Struct({
      address: Schema.Unknown,
      email: Schema.NullOr(Schema.String),
      name: Schema.NullOr(Schema.String),
      phone: Schema.NullOr(Schema.String),
      tax_id: Schema.NullOr(Schema.String),
    }),
    calculated_statement_descriptor: Schema.NullOr(Schema.String),
    captured: Schema.Boolean,
    created: Schema.Number,
    currency: Schema.String,
    customer: Schema.Unknown,
    description: Schema.NullOr(Schema.String),
    disputed: Schema.Boolean,
    failure_balance_transaction: Schema.Unknown,
    failure_code: Schema.NullOr(Schema.String),
    failure_message: Schema.NullOr(Schema.String),
    fraud_details: Schema.Unknown,
    id: Schema.String,
    level3: Schema.optional(
      Schema.Struct({
        customer_reference: Schema.optional(Schema.String),
        line_items: Schema.Array(
          Schema.Struct({
            discount_amount: Schema.NullOr(Schema.Number),
            product_code: Schema.String,
            product_description: Schema.String,
            quantity: Schema.NullOr(Schema.Number),
            tax_amount: Schema.NullOr(Schema.Number),
            unit_cost: Schema.NullOr(Schema.Number),
          }),
        ),
        merchant_reference: Schema.String,
        shipping_address_zip: Schema.optional(Schema.String),
        shipping_amount: Schema.optional(Schema.Number),
        shipping_from_zip: Schema.optional(Schema.String),
      }),
    ),
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["charge"]),
    on_behalf_of: Schema.Unknown,
    outcome: Schema.Unknown,
    paid: Schema.Boolean,
    payment_intent: Schema.Unknown,
    payment_method: Schema.NullOr(Schema.String),
    payment_method_details: Schema.Unknown,
    presentment_details: Schema.optional(
      Schema.Struct({
        presentment_amount: Schema.Number,
        presentment_currency: Schema.String,
      }),
    ),
    radar_options: Schema.optional(
      Schema.Struct({
        session: Schema.optional(Schema.String),
      }),
    ),
    receipt_email: Schema.NullOr(Schema.String),
    receipt_number: Schema.NullOr(Schema.String),
    receipt_url: Schema.NullOr(Schema.String),
    refunded: Schema.Boolean,
    refunds: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          data: Schema.Array(
            Schema.Struct({
              amount: Schema.Number,
              balance_transaction: Schema.Unknown,
              charge: Schema.Unknown,
              created: Schema.Number,
              currency: Schema.String,
              description: Schema.optional(Schema.String),
              destination_details: Schema.optional(
                Schema.Struct({
                  affirm: Schema.optional(Schema.Struct({})),
                  afterpay_clearpay: Schema.optional(Schema.Struct({})),
                  alipay: Schema.optional(Schema.Struct({})),
                  alma: Schema.optional(Schema.Struct({})),
                  amazon_pay: Schema.optional(Schema.Struct({})),
                  au_bank_transfer: Schema.optional(Schema.Struct({})),
                  blik: Schema.optional(
                    Schema.Struct({
                      network_decline_code: Schema.NullOr(Schema.String),
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  br_bank_transfer: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  card: Schema.optional(
                    Schema.Struct({
                      reference: Schema.optional(Schema.String),
                      reference_status: Schema.optional(Schema.String),
                      reference_type: Schema.optional(Schema.String),
                      type: Schema.Literals(["pending", "refund", "reversal"]),
                    }),
                  ),
                  cashapp: Schema.optional(Schema.Struct({})),
                  crypto: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                    }),
                  ),
                  customer_cash_balance: Schema.optional(Schema.Struct({})),
                  eps: Schema.optional(Schema.Struct({})),
                  eu_bank_transfer: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  gb_bank_transfer: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  giropay: Schema.optional(Schema.Struct({})),
                  grabpay: Schema.optional(Schema.Struct({})),
                  jp_bank_transfer: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  klarna: Schema.optional(Schema.Struct({})),
                  mb_way: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  multibanco: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  mx_bank_transfer: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  nz_bank_transfer: Schema.optional(Schema.Struct({})),
                  p24: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  paynow: Schema.optional(Schema.Struct({})),
                  paypal: Schema.optional(
                    Schema.Struct({
                      network_decline_code: Schema.NullOr(Schema.String),
                    }),
                  ),
                  pix: Schema.optional(Schema.Struct({})),
                  revolut: Schema.optional(Schema.Struct({})),
                  sofort: Schema.optional(Schema.Struct({})),
                  swish: Schema.optional(
                    Schema.Struct({
                      network_decline_code: Schema.NullOr(Schema.String),
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  th_bank_transfer: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  twint: Schema.optional(Schema.Struct({})),
                  type: Schema.String,
                  us_bank_transfer: Schema.optional(
                    Schema.Struct({
                      reference: Schema.NullOr(Schema.String),
                      reference_status: Schema.NullOr(Schema.String),
                    }),
                  ),
                  wechat_pay: Schema.optional(Schema.Struct({})),
                  zip: Schema.optional(Schema.Struct({})),
                }),
              ),
              failure_balance_transaction: Schema.optional(Schema.Unknown),
              failure_reason: Schema.optional(Schema.String),
              id: Schema.String,
              instructions_email: Schema.optional(Schema.String),
              metadata: Schema.NullOr(
                Schema.Record(Schema.String, Schema.String),
              ),
              next_action: Schema.optional(
                Schema.Struct({
                  display_details: Schema.optional(
                    Schema.Struct({
                      email_sent: Schema.Struct({
                        email_sent_at: Schema.Number,
                        email_sent_to: Schema.String,
                      }),
                      expires_at: Schema.Number,
                    }),
                  ),
                  type: Schema.String,
                }),
              ),
              object: Schema.Literals(["refund"]),
              payment_intent: Schema.Unknown,
              pending_reason: Schema.optional(
                Schema.Literals([
                  "charge_pending",
                  "insufficient_funds",
                  "processing",
                ]),
              ),
              presentment_details: Schema.optional(
                Schema.Struct({
                  presentment_amount: Schema.Number,
                  presentment_currency: Schema.String,
                }),
              ),
              reason: Schema.NullOr(
                Schema.Literals([
                  "duplicate",
                  "expired_uncaptured_charge",
                  "fraudulent",
                  "requested_by_customer",
                ]),
              ),
              receipt_number: Schema.NullOr(Schema.String),
              source_transfer_reversal: Schema.Unknown,
              status: Schema.NullOr(Schema.String),
              transfer_reversal: Schema.Unknown,
            }),
          ),
          has_more: Schema.Boolean,
          object: Schema.Literals(["list"]),
          url: Schema.String,
        }),
      ),
    ),
    review: Schema.Unknown,
    shipping: Schema.Unknown,
    source: Schema.Unknown,
    source_transfer: Schema.Unknown,
    statement_descriptor: Schema.NullOr(Schema.String),
    statement_descriptor_suffix: Schema.NullOr(Schema.String),
    status: Schema.Literals(["failed", "pending", "succeeded"]),
    transfer: Schema.optional(Schema.Unknown),
    transfer_data: Schema.Unknown,
    transfer_group: Schema.NullOr(Schema.String),
  });
export type PostChargesChargeOutput = typeof PostChargesChargeOutput.Type;

// The operation
/**
 * Update a charge
 *
 * <p>Updates the specified charge by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>
 */
export const PostChargesCharge = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostChargesChargeInput,
  outputSchema: PostChargesChargeOutput,
}));
