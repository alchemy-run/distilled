import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTreasuryCreditReversalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    received_credit: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/treasury/credit_reversals",
      contentType: "form-urlencoded",
    }),
  );
export type PostTreasuryCreditReversalsInput =
  typeof PostTreasuryCreditReversalsInput.Type;

// Output Schema
export const PostTreasuryCreditReversalsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    created: Schema.Number,
    currency: Schema.String,
    financial_account: Schema.String,
    hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    network: Schema.Literals(["ach", "stripe"]),
    object: Schema.Literals(["treasury.credit_reversal"]),
    received_credit: Schema.String,
    status: Schema.Literals(["canceled", "posted", "processing"]),
    status_transitions: Schema.Struct({
      posted_at: Schema.NullOr(Schema.Number),
    }),
    transaction: Schema.Unknown,
  });
export type PostTreasuryCreditReversalsOutput =
  typeof PostTreasuryCreditReversalsOutput.Type;

// The operation
/**
 * Create a CreditReversal
 *
 * <p>Reverses a ReceivedCredit and creates a CreditReversal object.</p>
 */
export const PostTreasuryCreditReversals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostTreasuryCreditReversalsInput,
    outputSchema: PostTreasuryCreditReversalsOutput,
  }),
);
