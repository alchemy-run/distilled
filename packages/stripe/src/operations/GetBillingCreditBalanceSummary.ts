import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingCreditBalanceSummaryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    filter: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/billing/credit_balance_summary",
      contentType: "form-urlencoded",
    }),
  );
export type GetBillingCreditBalanceSummaryInput =
  typeof GetBillingCreditBalanceSummaryInput.Type;

// Output Schema
export const GetBillingCreditBalanceSummaryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    balances: Schema.Array(
      Schema.Struct({
        available_balance: Schema.Struct({
          monetary: Schema.Unknown,
          type: Schema.Literals(["monetary"]),
        }),
        ledger_balance: Schema.Struct({
          monetary: Schema.Unknown,
          type: Schema.Literals(["monetary"]),
        }),
      }),
    ),
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    livemode: Schema.Boolean,
    object: Schema.Literals(["billing.credit_balance_summary"]),
  });
export type GetBillingCreditBalanceSummaryOutput =
  typeof GetBillingCreditBalanceSummaryOutput.Type;

// The operation
/**
 * Retrieve the credit balance summary for a customer
 *
 * <p>Retrieves the credit balance summary for a customer.</p>
 *
 * @param customer - The customer whose credit balance summary you're retrieving.
 * @param customer_account - The account representing the customer whose credit balance summary you're retrieving.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param filter - The filter criteria for the credit balance summary.
 */
export const GetBillingCreditBalanceSummary =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetBillingCreditBalanceSummaryInput,
    outputSchema: GetBillingCreditBalanceSummaryOutput,
  }));
