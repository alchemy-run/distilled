import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCustomersCustomerBalanceTransactionsTransactionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    transaction: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/customers/{customer}/balance_transactions/{transaction}",
      contentType: "form-urlencoded",
    }),
  );
export type GetCustomersCustomerBalanceTransactionsTransactionInput =
  typeof GetCustomersCustomerBalanceTransactionsTransactionInput.Type;

// Output Schema
export const GetCustomersCustomerBalanceTransactionsTransactionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    checkout_session: Schema.Unknown,
    created: Schema.Number,
    credit_note: Schema.Unknown,
    currency: Schema.String,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    description: Schema.NullOr(Schema.String),
    ending_balance: Schema.Number,
    id: Schema.String,
    invoice: Schema.Unknown,
    livemode: Schema.Boolean,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["customer_balance_transaction"]),
    type: Schema.Literals([
      "adjustment",
      "applied_to_invoice",
      "checkout_session_subscription_payment",
      "checkout_session_subscription_payment_canceled",
      "credit_note",
      "initial",
      "invoice_overpaid",
      "invoice_too_large",
      "invoice_too_small",
      "migration",
      "unapplied_from_invoice",
      "unspent_receiver_credit",
    ]),
  });
export type GetCustomersCustomerBalanceTransactionsTransactionOutput =
  typeof GetCustomersCustomerBalanceTransactionsTransactionOutput.Type;

// The operation
/**
 * Retrieve a customer balance transaction
 *
 * <p>Retrieves a specific customer balance transaction that updated the customer’s <a href="/docs/billing/customer/balance">balances</a>.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetCustomersCustomerBalanceTransactionsTransaction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCustomersCustomerBalanceTransactionsTransactionInput,
    outputSchema: GetCustomersCustomerBalanceTransactionsTransactionOutput,
  }));
