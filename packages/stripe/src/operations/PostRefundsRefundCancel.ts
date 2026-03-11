import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostRefundsRefundCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    refund: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/refunds/{refund}/cancel",
      contentType: "form-urlencoded",
    }),
  );
export type PostRefundsRefundCancelInput =
  typeof PostRefundsRefundCancelInput.Type;

// Output Schema
export const PostRefundsRefundCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
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
      Schema.Literals(["charge_pending", "insufficient_funds", "processing"]),
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
  });
export type PostRefundsRefundCancelOutput =
  typeof PostRefundsRefundCancelOutput.Type;

// The operation
/**
 * Cancel a refund
 *
 * <p>Cancels a refund with a status of <code>requires_action</code>.</p>
 * <p>You can’t cancel refunds in other states. Only refunds for payment methods that require customer action can enter the <code>requires_action</code> state.</p>
 */
export const PostRefundsRefundCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostRefundsRefundCancelInput,
    outputSchema: PostRefundsRefundCancelOutput,
  }),
);
