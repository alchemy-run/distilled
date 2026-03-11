import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBalanceTransactionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    currency: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    payout: Schema.optional(Schema.String),
    source: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/balance_transactions",
      contentType: "form-urlencoded",
    }),
  );
export type GetBalanceTransactionsInput =
  typeof GetBalanceTransactionsInput.Type;

// Output Schema
export const GetBalanceTransactionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetBalanceTransactionsOutput =
  typeof GetBalanceTransactionsOutput.Type;

// The operation
/**
 * List all balance transactions
 *
 * <p>Returns a list of transactions that have contributed to the Stripe account balance (e.g., charges, transfers, and so forth). The transactions are returned in sorted order, with the most recent transactions appearing first.</p>
 * <p>Note that this endpoint was previously called “Balance history” and used the path <code>/v1/balance/history</code>.</p>
 *
 * @param created - Only return transactions that were created during the given date interval.
 * @param currency - Only return transactions in a certain currency. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param payout - For automatic Stripe payouts only, only returns transactions that were paid out on the specified payout ID.
 * @param source - Only returns transactions associated with the given object.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param type - Only returns transactions of the given type. One of: `adjustment`, `advance`, `advance_funding`, `anticipation_repayment`, `application_fee`, `application_fee_refund`, `charge`, `climate_order_purchase`, `climate_order_refund`, `connect_collection_transfer`, `contribution`, `issuing_authorization_hold`, `issuing_authorization_release`, `issuing_dispute`, `issuing_transaction`, `obligation_outbound`, `obligation_reversal_inbound`, `payment`, `payment_failure_refund`, `payment_network_reserve_hold`, `payment_network_reserve_release`, `payment_refund`, `payment_reversal`, `payment_unreconciled`, `payout`, `payout_cancel`, `payout_failure`, `payout_minimum_balance_hold`, `payout_minimum_balance_release`, `refund`, `refund_failure`, `reserve_transaction`, `reserved_funds`, `reserve_hold`, `reserve_release`, `stripe_fee`, `stripe_fx_fee`, `stripe_balance_payment_debit`, `stripe_balance_payment_debit_reversal`, `tax_fee`, `topup`, `topup_reversal`, `transfer`, `transfer_cancel`, `transfer_failure`, or `transfer_refund`.
 */
export const GetBalanceTransactions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetBalanceTransactionsInput,
    outputSchema: GetBalanceTransactionsOutput,
  }),
);
