import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCustomersCustomerBalanceTransactionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    invoice: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/customers/{customer}/balance_transactions",
      contentType: "form-urlencoded",
    }),
  );
export type GetCustomersCustomerBalanceTransactionsInput =
  typeof GetCustomersCustomerBalanceTransactionsInput.Type;

// Output Schema
export const GetCustomersCustomerBalanceTransactionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetCustomersCustomerBalanceTransactionsOutput =
  typeof GetCustomersCustomerBalanceTransactionsOutput.Type;

// The operation
/**
 * List customer balance transactions
 *
 * <p>Returns a list of transactions that updated the customer’s <a href="/docs/billing/customer/balance">balances</a>.</p>
 *
 * @param created - Only return customer balance transactions that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param invoice - Only return transactions that are related to the specified invoice.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetCustomersCustomerBalanceTransactions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCustomersCustomerBalanceTransactionsInput,
    outputSchema: GetCustomersCustomerBalanceTransactionsOutput,
  }));
