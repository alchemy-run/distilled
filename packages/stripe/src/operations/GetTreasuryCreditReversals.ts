import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryCreditReversalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    financial_account: Schema.String,
    limit: Schema.optional(Schema.Number),
    received_credit: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["canceled", "posted", "processing"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/credit_reversals",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryCreditReversalsInput =
  typeof GetTreasuryCreditReversalsInput.Type;

// Output Schema
export const GetTreasuryCreditReversalsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTreasuryCreditReversalsOutput =
  typeof GetTreasuryCreditReversalsOutput.Type;

// The operation
/**
 * List all CreditReversals
 *
 * <p>Returns a list of CreditReversals.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param financial_account - Returns objects associated with this FinancialAccount.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param received_credit - Only return CreditReversals for the ReceivedCredit ID.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return CreditReversals for a given status.
 */
export const GetTreasuryCreditReversals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTreasuryCreditReversalsInput,
    outputSchema: GetTreasuryCreditReversalsOutput,
  }),
);
