import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCustomersCustomerCashBalanceTransactionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/customers/{customer}/cash_balance_transactions",
      contentType: "form-urlencoded",
    }),
  );
export type GetCustomersCustomerCashBalanceTransactionsInput =
  typeof GetCustomersCustomerCashBalanceTransactionsInput.Type;

// Output Schema
export const GetCustomersCustomerCashBalanceTransactionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        adjusted_for_overdraft: Schema.optional(
          Schema.Struct({
            balance_transaction: Schema.Unknown,
            linked_transaction: Schema.Unknown,
          }),
        ),
        applied_to_payment: Schema.optional(
          Schema.Struct({
            payment_intent: Schema.Unknown,
          }),
        ),
        created: Schema.Number,
        currency: Schema.String,
        customer: Schema.Unknown,
        customer_account: Schema.NullOr(Schema.String),
        ending_balance: Schema.Number,
        funded: Schema.optional(
          Schema.Struct({
            bank_transfer: Schema.Struct({
              eu_bank_transfer: Schema.optional(
                Schema.Struct({
                  bic: Schema.NullOr(Schema.String),
                  iban_last4: Schema.NullOr(Schema.String),
                  sender_name: Schema.NullOr(Schema.String),
                }),
              ),
              gb_bank_transfer: Schema.optional(
                Schema.Struct({
                  account_number_last4: Schema.NullOr(Schema.String),
                  sender_name: Schema.NullOr(Schema.String),
                  sort_code: Schema.NullOr(Schema.String),
                }),
              ),
              jp_bank_transfer: Schema.optional(
                Schema.Struct({
                  sender_bank: Schema.NullOr(Schema.String),
                  sender_branch: Schema.NullOr(Schema.String),
                  sender_name: Schema.NullOr(Schema.String),
                }),
              ),
              reference: Schema.NullOr(Schema.String),
              type: Schema.Literals([
                "eu_bank_transfer",
                "gb_bank_transfer",
                "jp_bank_transfer",
                "mx_bank_transfer",
                "us_bank_transfer",
              ]),
              us_bank_transfer: Schema.optional(
                Schema.Struct({
                  network: Schema.optional(
                    Schema.Literals(["ach", "domestic_wire_us", "swift"]),
                  ),
                  sender_name: Schema.NullOr(Schema.String),
                }),
              ),
            }),
          }),
        ),
        id: Schema.String,
        livemode: Schema.Boolean,
        net_amount: Schema.Number,
        object: Schema.Literals(["customer_cash_balance_transaction"]),
        refunded_from_payment: Schema.optional(
          Schema.Struct({
            refund: Schema.Unknown,
          }),
        ),
        transferred_to_balance: Schema.optional(
          Schema.Struct({
            balance_transaction: Schema.Unknown,
          }),
        ),
        type: Schema.Literals([
          "adjusted_for_overdraft",
          "applied_to_payment",
          "funded",
          "funding_reversed",
          "refunded_from_payment",
          "return_canceled",
          "return_initiated",
          "transferred_to_balance",
          "unapplied_from_payment",
        ]),
        unapplied_from_payment: Schema.optional(
          Schema.Struct({
            payment_intent: Schema.Unknown,
          }),
        ),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetCustomersCustomerCashBalanceTransactionsOutput =
  typeof GetCustomersCustomerCashBalanceTransactionsOutput.Type;

// The operation
/**
 * List cash balance transactions
 *
 * <p>Returns a list of transactions that modified the customer’s <a href="/docs/payments/customer-balance">cash balance</a>.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetCustomersCustomerCashBalanceTransactions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCustomersCustomerCashBalanceTransactionsInput,
    outputSchema: GetCustomersCustomerCashBalanceTransactionsOutput,
  }));
