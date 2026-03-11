import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersCustomersCustomerFundCashBalanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    amount: Schema.Number,
    currency: Schema.String,
    expand: Schema.optional(Schema.Array(Schema.String)),
    reference: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/customers/{customer}/fund_cash_balance",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersCustomersCustomerFundCashBalanceInput =
  typeof PostTestHelpersCustomersCustomerFundCashBalanceInput.Type;

// Output Schema
export const PostTestHelpersCustomersCustomerFundCashBalanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type PostTestHelpersCustomersCustomerFundCashBalanceOutput =
  typeof PostTestHelpersCustomersCustomerFundCashBalanceOutput.Type;

// The operation
/**
 * Fund a test mode cash balance
 *
 * <p>Create an incoming testmode bank transfer</p>
 */
export const PostTestHelpersCustomersCustomerFundCashBalance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTestHelpersCustomersCustomerFundCashBalanceInput,
    outputSchema: PostTestHelpersCustomersCustomerFundCashBalanceOutput,
  }));
