import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPayoutsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  amount: Schema.Number,
  currency: Schema.String,
  description: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  method: Schema.optional(Schema.Literals(["instant", "standard"])),
  payout_method: Schema.optional(Schema.String),
  source_type: Schema.optional(
    Schema.Literals(["bank_account", "card", "fpx"]),
  ),
  statement_descriptor: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/payouts",
    contentType: "form-urlencoded",
  }),
);
export type PostPayoutsInput = typeof PostPayoutsInput.Type;

// Output Schema
export const PostPayoutsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostPayoutsOutput = typeof PostPayoutsOutput.Type;

// The operation
/**
 * Create a payout
 *
 * <p>To send funds to your own bank account, create a new payout object. Your <a href="#balance">Stripe balance</a> must cover the payout amount. If it doesn’t, you receive an “Insufficient Funds” error.</p>
 * <p>If your API key is in test mode, money won’t actually be sent, though every other action occurs as if you’re in live mode.</p>
 * <p>If you create a manual payout on a Stripe account that uses multiple payment source types, you need to specify the source type balance that the payout draws from. The <a href="#balance_object">balance object</a> details available and pending amounts by source type.</p>
 */
export const PostPayouts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostPayoutsInput,
  outputSchema: PostPayoutsOutput,
}));
