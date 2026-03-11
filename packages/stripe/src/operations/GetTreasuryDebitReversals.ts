import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryDebitReversalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    financial_account: Schema.String,
    limit: Schema.optional(Schema.Number),
    received_debit: Schema.optional(Schema.String),
    resolution: Schema.optional(Schema.Literals(["lost", "won"])),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["canceled", "completed", "processing"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/debit_reversals",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryDebitReversalsInput =
  typeof GetTreasuryDebitReversalsInput.Type;

// Output Schema
export const GetTreasuryDebitReversalsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTreasuryDebitReversalsOutput =
  typeof GetTreasuryDebitReversalsOutput.Type;

// The operation
/**
 * List all DebitReversals
 *
 * <p>Returns a list of DebitReversals.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param financial_account - Returns objects associated with this FinancialAccount.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param received_debit - Only return DebitReversals for the ReceivedDebit ID.
 * @param resolution - Only return DebitReversals for a given resolution.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return DebitReversals for a given status.
 */
export const GetTreasuryDebitReversals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTreasuryDebitReversalsInput,
    outputSchema: GetTreasuryDebitReversalsOutput,
  }),
);
