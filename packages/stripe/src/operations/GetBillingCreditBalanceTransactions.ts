import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingCreditBalanceTransactionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    credit_grant: Schema.optional(Schema.String),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/billing/credit_balance_transactions",
      contentType: "form-urlencoded",
    }),
  );
export type GetBillingCreditBalanceTransactionsInput =
  typeof GetBillingCreditBalanceTransactionsInput.Type;

// Output Schema
export const GetBillingCreditBalanceTransactionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        created: Schema.Number,
        credit: Schema.Unknown,
        credit_grant: Schema.Unknown,
        debit: Schema.Unknown,
        effective_at: Schema.Number,
        id: Schema.String,
        livemode: Schema.Boolean,
        object: Schema.Literals(["billing.credit_balance_transaction"]),
        test_clock: Schema.Unknown,
        type: Schema.NullOr(Schema.Literals(["credit", "debit"])),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetBillingCreditBalanceTransactionsOutput =
  typeof GetBillingCreditBalanceTransactionsOutput.Type;

// The operation
/**
 * List credit balance transactions
 *
 * <p>Retrieve a list of credit balance transactions.</p>
 *
 * @param credit_grant - The credit grant for which to fetch credit balance transactions.
 * @param customer - The customer whose credit balance transactions you're retrieving.
 * @param customer_account - The account representing the customer whose credit balance transactions you're retrieving.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetBillingCreditBalanceTransactions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetBillingCreditBalanceTransactionsInput,
    outputSchema: GetBillingCreditBalanceTransactionsOutput,
  }));
