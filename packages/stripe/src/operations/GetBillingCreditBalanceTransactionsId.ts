import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingCreditBalanceTransactionsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/billing/credit_balance_transactions/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetBillingCreditBalanceTransactionsIdInput =
  typeof GetBillingCreditBalanceTransactionsIdInput.Type;

// Output Schema
export const GetBillingCreditBalanceTransactionsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetBillingCreditBalanceTransactionsIdOutput =
  typeof GetBillingCreditBalanceTransactionsIdOutput.Type;

// The operation
/**
 * Retrieve a credit balance transaction
 *
 * <p>Retrieves a credit balance transaction.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param id - Unique identifier for the object.
 */
export const GetBillingCreditBalanceTransactionsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetBillingCreditBalanceTransactionsIdInput,
    outputSchema: GetBillingCreditBalanceTransactionsIdOutput,
  }));
