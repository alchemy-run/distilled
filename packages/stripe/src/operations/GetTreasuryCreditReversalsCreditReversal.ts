import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryCreditReversalsCreditReversalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    credit_reversal: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/credit_reversals/{credit_reversal}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryCreditReversalsCreditReversalInput =
  typeof GetTreasuryCreditReversalsCreditReversalInput.Type;

// Output Schema
export const GetTreasuryCreditReversalsCreditReversalOutput =
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
export type GetTreasuryCreditReversalsCreditReversalOutput =
  typeof GetTreasuryCreditReversalsCreditReversalOutput.Type;

// The operation
/**
 * Retrieve a CreditReversal
 *
 * <p>Retrieves the details of an existing CreditReversal by passing the unique CreditReversal ID from either the CreditReversal creation request or CreditReversal list</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTreasuryCreditReversalsCreditReversal =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTreasuryCreditReversalsCreditReversalInput,
    outputSchema: GetTreasuryCreditReversalsCreditReversalOutput,
  }));
