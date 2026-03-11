import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPayoutsPayoutCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    payout: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payouts/{payout}/cancel",
      contentType: "form-urlencoded",
    }),
  );
export type PostPayoutsPayoutCancelInput =
  typeof PostPayoutsPayoutCancelInput.Type;

// Output Schema
export const PostPayoutsPayoutCancelOutput =
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
export type PostPayoutsPayoutCancelOutput =
  typeof PostPayoutsPayoutCancelOutput.Type;

// The operation
/**
 * Cancel a payout
 *
 * <p>You can cancel a previously created payout if its status is <code>pending</code>. Stripe refunds the funds to your available balance. You can’t cancel automatic Stripe payouts.</p>
 */
export const PostPayoutsPayoutCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostPayoutsPayoutCancelInput,
    outputSchema: PostPayoutsPayoutCancelOutput,
  }),
);
