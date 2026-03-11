import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTransfersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
  transfer_group: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/transfers",
    contentType: "form-urlencoded",
  }),
);
export type GetTransfersInput = typeof GetTransfersInput.Type;

// Output Schema
export const GetTransfersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      amount: Schema.Number,
      amount_reversed: Schema.Number,
      balance_transaction: Schema.Unknown,
      created: Schema.Number,
      currency: Schema.String,
      description: Schema.NullOr(Schema.String),
      destination: Schema.Unknown,
      destination_payment: Schema.optional(Schema.Unknown),
      id: Schema.String,
      livemode: Schema.Boolean,
      metadata: Schema.Record(Schema.String, Schema.String),
      object: Schema.Literals(["transfer"]),
      reversals: Schema.Struct({
        data: Schema.Array(
          Schema.Struct({
            amount: Schema.Number,
            balance_transaction: Schema.Unknown,
            created: Schema.Number,
            currency: Schema.String,
            destination_payment_refund: Schema.Unknown,
            id: Schema.String,
            metadata: Schema.NullOr(
              Schema.Record(Schema.String, Schema.String),
            ),
            object: Schema.Literals(["transfer_reversal"]),
            source_refund: Schema.Unknown,
            transfer: Schema.Unknown,
          }),
        ),
        has_more: Schema.Boolean,
        object: Schema.Literals(["list"]),
        url: Schema.String,
      }),
      reversed: Schema.Boolean,
      source_transaction: Schema.Unknown,
      source_type: Schema.optional(Schema.String),
      transfer_group: Schema.NullOr(Schema.String),
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetTransfersOutput = typeof GetTransfersOutput.Type;

// The operation
/**
 * List all transfers
 *
 * <p>Returns a list of existing transfers sent to connected accounts. The transfers are returned in sorted order, with the most recently created transfers appearing first.</p>
 *
 * @param created - Only return transfers that were created during the given date interval.
 * @param destination - Only return transfers for the destination specified by this account ID.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param transfer_group - Only return transfers with the specified transfer group.
 */
export const GetTransfers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetTransfersInput,
  outputSchema: GetTransfersOutput,
}));
