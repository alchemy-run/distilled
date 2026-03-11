import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostCustomersCustomerBalanceTransactionsTransactionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    transaction: Schema.String.pipe(T.PathParam()),
    description: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/customers/{customer}/balance_transactions/{transaction}",
      contentType: "form-urlencoded",
    }),
  );
export type PostCustomersCustomerBalanceTransactionsTransactionInput =
  typeof PostCustomersCustomerBalanceTransactionsTransactionInput.Type;

// Output Schema
export const PostCustomersCustomerBalanceTransactionsTransactionOutput =
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
export type PostCustomersCustomerBalanceTransactionsTransactionOutput =
  typeof PostCustomersCustomerBalanceTransactionsTransactionOutput.Type;

// The operation
/**
 * Update a customer credit balance transaction
 *
 * <p>Most credit balance transaction fields are immutable, but you may update its <code>description</code> and <code>metadata</code>.</p>
 */
export const PostCustomersCustomerBalanceTransactionsTransaction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostCustomersCustomerBalanceTransactionsTransactionInput,
    outputSchema: PostCustomersCustomerBalanceTransactionsTransactionOutput,
  }));
