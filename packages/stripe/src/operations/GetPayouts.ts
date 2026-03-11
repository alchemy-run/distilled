import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPayoutsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  arrival_date: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/payouts",
    contentType: "form-urlencoded",
  }),
);
export type GetPayoutsInput = typeof GetPayoutsInput.Type;

// Output Schema
export const GetPayoutsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetPayoutsOutput = typeof GetPayoutsOutput.Type;

// The operation
/**
 * List all payouts
 *
 * <p>Returns a list of existing payouts sent to third-party bank accounts or payouts that Stripe sent to you. The payouts return in sorted order, with the most recently created payouts appearing first.</p>
 *
 * @param arrival_date - Only return payouts that are expected to arrive during the given date interval.
 * @param created - Only return payouts that were created during the given date interval.
 * @param destination - The ID of an external account - only return payouts sent to this external account.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return payouts that have the given status: `pending`, `paid`, `failed`, or `canceled`.
 */
export const GetPayouts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetPayoutsInput,
  outputSchema: GetPayoutsOutput,
}));
