import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPayoutsPayoutReverseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    payout: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payouts/{payout}/reverse",
      contentType: "form-urlencoded",
    }),
  );
export type PostPayoutsPayoutReverseInput =
  typeof PostPayoutsPayoutReverseInput.Type;

// Output Schema
export const PostPayoutsPayoutReverseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    application_fee: Schema.Unknown,
    application_fee_amount: Schema.NullOr(Schema.Number),
    arrival_date: Schema.Number,
    automatic: Schema.Boolean,
    balance_transaction: Schema.Unknown,
    created: Schema.Number,
    currency: Schema.String,
    description: Schema.NullOr(Schema.String),
    destination: Schema.Unknown,
    failure_balance_transaction: Schema.Unknown,
    failure_code: Schema.NullOr(Schema.String),
    failure_message: Schema.NullOr(Schema.String),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    method: Schema.String,
    object: Schema.Literals(["payout"]),
    original_payout: Schema.Unknown,
    payout_method: Schema.NullOr(Schema.String),
    reconciliation_status: Schema.Literals([
      "completed",
      "in_progress",
      "not_applicable",
    ]),
    reversed_by: Schema.Unknown,
    source_type: Schema.String,
    statement_descriptor: Schema.NullOr(Schema.String),
    status: Schema.String,
    trace_id: Schema.Unknown,
    type: Schema.Literals(["bank_account", "card"]),
  });
export type PostPayoutsPayoutReverseOutput =
  typeof PostPayoutsPayoutReverseOutput.Type;

// The operation
/**
 * Reverse a payout
 *
 * <p>Reverses a payout by debiting the destination bank account. At this time, you can only reverse payouts for connected accounts to US and Canadian bank accounts. If the payout is manual and in the <code>pending</code> status, use <code>/v1/payouts/:id/cancel</code> instead.</p>
 * <p>By requesting a reversal through <code>/v1/payouts/:id/reverse</code>, you confirm that the authorized signatory of the selected bank account authorizes the debit on the bank account and that no other authorization is required.</p>
 */
export const PostPayoutsPayoutReverse = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostPayoutsPayoutReverseInput,
    outputSchema: PostPayoutsPayoutReverseOutput,
  }),
);
