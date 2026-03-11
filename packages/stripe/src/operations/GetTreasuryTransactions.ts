import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryTransactionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    financial_account: Schema.String,
    limit: Schema.optional(Schema.Number),
    order_by: Schema.optional(Schema.Literals(["created", "posted_at"])),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["open", "posted", "void"])),
    status_transitions: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/transactions",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryTransactionsInput =
  typeof GetTreasuryTransactionsInput.Type;

// Output Schema
export const GetTreasuryTransactionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        balance_impact: Schema.Struct({
          cash: Schema.Number,
          inbound_pending: Schema.Number,
          outbound_pending: Schema.Number,
        }),
        created: Schema.Number,
        currency: Schema.String,
        description: Schema.String,
        entries: Schema.optional(
          Schema.NullOr(
            Schema.Struct({
              data: Schema.Array(
                Schema.Struct({
                  balance_impact: Schema.Struct({
                    cash: Schema.Number,
                    inbound_pending: Schema.Number,
                    outbound_pending: Schema.Number,
                  }),
                  created: Schema.Number,
                  currency: Schema.String,
                  effective_at: Schema.Number,
                  financial_account: Schema.String,
                  flow: Schema.NullOr(Schema.String),
                  flow_details: Schema.optional(Schema.Unknown),
                  flow_type: Schema.Literals([
                    "credit_reversal",
                    "debit_reversal",
                    "inbound_transfer",
                    "issuing_authorization",
                    "other",
                    "outbound_payment",
                    "outbound_transfer",
                    "received_credit",
                    "received_debit",
                  ]),
                  id: Schema.String,
                  livemode: Schema.Boolean,
                  object: Schema.Literals(["treasury.transaction_entry"]),
                  transaction: Schema.Unknown,
                  type: Schema.Literals([
                    "credit_reversal",
                    "credit_reversal_posting",
                    "debit_reversal",
                    "inbound_transfer",
                    "inbound_transfer_return",
                    "issuing_authorization_hold",
                    "issuing_authorization_release",
                    "other",
                    "outbound_payment",
                    "outbound_payment_cancellation",
                    "outbound_payment_failure",
                    "outbound_payment_posting",
                    "outbound_payment_return",
                    "outbound_transfer",
                    "outbound_transfer_cancellation",
                    "outbound_transfer_failure",
                    "outbound_transfer_posting",
                    "outbound_transfer_return",
                    "received_credit",
                    "received_debit",
                  ]),
                }),
              ),
              has_more: Schema.Boolean,
              object: Schema.Literals(["list"]),
              url: Schema.String,
            }),
          ),
        ),
        financial_account: Schema.String,
        flow: Schema.NullOr(Schema.String),
        flow_details: Schema.optional(Schema.Unknown),
        flow_type: Schema.Literals([
          "credit_reversal",
          "debit_reversal",
          "inbound_transfer",
          "issuing_authorization",
          "other",
          "outbound_payment",
          "outbound_transfer",
          "received_credit",
          "received_debit",
        ]),
        id: Schema.String,
        livemode: Schema.Boolean,
        object: Schema.Literals(["treasury.transaction"]),
        status: Schema.Literals(["open", "posted", "void"]),
        status_transitions: Schema.Struct({
          posted_at: Schema.NullOr(Schema.Number),
          void_at: Schema.NullOr(Schema.Number),
        }),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTreasuryTransactionsOutput =
  typeof GetTreasuryTransactionsOutput.Type;

// The operation
/**
 * List all Transactions
 *
 * <p>Retrieves a list of Transaction objects.</p>
 *
 * @param created - Only return Transactions that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param financial_account - Returns objects associated with this FinancialAccount.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param order_by - The results are in reverse chronological order by `created` or `posted_at`. The default is `created`.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return Transactions that have the given status: `open`, `posted`, or `void`.
 * @param status_transitions - A filter for the `status_transitions.posted_at` timestamp. When using this filter, `status=posted` and `order_by=posted_at` must also be specified.
 */
export const GetTreasuryTransactions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTreasuryTransactionsInput,
    outputSchema: GetTreasuryTransactionsOutput,
  }),
);
