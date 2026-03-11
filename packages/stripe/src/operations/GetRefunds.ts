import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetRefundsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  charge: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  payment_intent: Schema.optional(Schema.String),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/refunds",
    contentType: "form-urlencoded",
  }),
);
export type GetRefundsInput = typeof GetRefundsInput.Type;

// Output Schema
export const GetRefundsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetRefundsOutput = typeof GetRefundsOutput.Type;

// The operation
/**
 * List all refunds
 *
 * <p>Returns a list of all refunds you created. We return the refunds in sorted order, with the most recent refunds appearing first. The 10 most recent refunds are always available by default on the Charge object.</p>
 *
 * @param charge - Only return refunds for the charge specified by this charge ID.
 * @param created - Only return refunds that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param payment_intent - Only return refunds for the PaymentIntent specified by this ID.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetRefunds = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetRefundsInput,
  outputSchema: GetRefundsOutput,
}));
