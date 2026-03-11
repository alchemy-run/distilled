import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBalanceTransactionsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/balance_transactions/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetBalanceTransactionsIdInput =
  typeof GetBalanceTransactionsIdInput.Type;

// Output Schema
export const GetBalanceTransactionsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    available_on: Schema.Number,
    balance_type: Schema.Literals([
      "issuing",
      "payments",
      "refund_and_dispute_prefunding",
      "risk_reserved",
    ]),
    created: Schema.Number,
    currency: Schema.String,
    description: Schema.NullOr(Schema.String),
    exchange_rate: Schema.NullOr(Schema.Number),
    fee: Schema.Number,
    fee_details: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        application: Schema.NullOr(Schema.String),
        currency: Schema.String,
        description: Schema.NullOr(Schema.String),
        type: Schema.String,
      }),
    ),
    id: Schema.String,
    net: Schema.Number,
    object: Schema.Literals(["balance_transaction"]),
    reporting_category: Schema.String,
    source: Schema.Unknown,
    status: Schema.String,
    type: Schema.Literals([
      "adjustment",
      "advance",
      "advance_funding",
      "anticipation_repayment",
      "application_fee",
      "application_fee_refund",
      "charge",
      "climate_order_purchase",
      "climate_order_refund",
      "connect_collection_transfer",
      "contribution",
      "issuing_authorization_hold",
      "issuing_authorization_release",
      "issuing_dispute",
      "issuing_transaction",
      "obligation_outbound",
      "obligation_reversal_inbound",
      "payment",
      "payment_failure_refund",
      "payment_network_reserve_hold",
      "payment_network_reserve_release",
      "payment_refund",
      "payment_reversal",
      "payment_unreconciled",
      "payout",
      "payout_cancel",
      "payout_failure",
      "payout_minimum_balance_hold",
      "payout_minimum_balance_release",
      "refund",
      "refund_failure",
      "reserve_hold",
      "reserve_release",
      "reserve_transaction",
      "reserved_funds",
      "stripe_balance_payment_debit",
      "stripe_balance_payment_debit_reversal",
      "stripe_fee",
      "stripe_fx_fee",
      "tax_fee",
      "topup",
      "topup_reversal",
      "transfer",
      "transfer_cancel",
      "transfer_failure",
      "transfer_refund",
    ]),
  });
export type GetBalanceTransactionsIdOutput =
  typeof GetBalanceTransactionsIdOutput.Type;

// The operation
/**
 * Retrieve a balance transaction
 *
 * <p>Retrieves the balance transaction with the given ID.</p>
 * <p>Note that this endpoint previously used the path <code>/v1/balance/history/:id</code>.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetBalanceTransactionsId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetBalanceTransactionsIdInput,
    outputSchema: GetBalanceTransactionsIdOutput,
  }),
);
