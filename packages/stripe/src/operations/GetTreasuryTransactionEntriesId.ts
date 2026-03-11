import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryTransactionEntriesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/transaction_entries/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryTransactionEntriesIdInput =
  typeof GetTreasuryTransactionEntriesIdInput.Type;

// Output Schema
export const GetTreasuryTransactionEntriesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetTreasuryTransactionEntriesIdOutput =
  typeof GetTreasuryTransactionEntriesIdOutput.Type;

// The operation
/**
 * Retrieve a TransactionEntry
 *
 * <p>Retrieves a TransactionEntry object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTreasuryTransactionEntriesId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTreasuryTransactionEntriesIdInput,
    outputSchema: GetTreasuryTransactionEntriesIdOutput,
  }));
