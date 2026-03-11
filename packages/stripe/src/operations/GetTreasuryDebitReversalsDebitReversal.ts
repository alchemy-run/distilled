import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryDebitReversalsDebitReversalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    debit_reversal: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/debit_reversals/{debit_reversal}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryDebitReversalsDebitReversalInput =
  typeof GetTreasuryDebitReversalsDebitReversalInput.Type;

// Output Schema
export const GetTreasuryDebitReversalsDebitReversalOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    created: Schema.Number,
    currency: Schema.String,
    financial_account: Schema.NullOr(Schema.String),
    hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
    id: Schema.String,
    linked_flows: Schema.Unknown,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    network: Schema.Literals(["ach", "card"]),
    object: Schema.Literals(["treasury.debit_reversal"]),
    received_debit: Schema.String,
    status: Schema.Literals(["failed", "processing", "succeeded"]),
    status_transitions: Schema.Struct({
      completed_at: Schema.NullOr(Schema.Number),
    }),
    transaction: Schema.Unknown,
  });
export type GetTreasuryDebitReversalsDebitReversalOutput =
  typeof GetTreasuryDebitReversalsDebitReversalOutput.Type;

// The operation
/**
 * Retrieve a DebitReversal
 *
 * <p>Retrieves a DebitReversal object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTreasuryDebitReversalsDebitReversal =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTreasuryDebitReversalsDebitReversalInput,
    outputSchema: GetTreasuryDebitReversalsDebitReversalOutput,
  }));
