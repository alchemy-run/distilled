import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTreasuryDebitReversalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    received_debit: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/treasury/debit_reversals",
      contentType: "form-urlencoded",
    }),
  );
export type PostTreasuryDebitReversalsInput =
  typeof PostTreasuryDebitReversalsInput.Type;

// Output Schema
export const PostTreasuryDebitReversalsOutput =
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
export type PostTreasuryDebitReversalsOutput =
  typeof PostTreasuryDebitReversalsOutput.Type;

// The operation
/**
 * Create a DebitReversal
 *
 * <p>Reverses a ReceivedDebit and creates a DebitReversal object.</p>
 */
export const PostTreasuryDebitReversals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostTreasuryDebitReversalsInput,
    outputSchema: PostTreasuryDebitReversalsOutput,
  }),
);
