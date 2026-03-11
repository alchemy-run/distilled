import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTransfersIdReversalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/transfers/{id}/reversals",
      contentType: "form-urlencoded",
    }),
  );
export type GetTransfersIdReversalsInput =
  typeof GetTransfersIdReversalsInput.Type;

// Output Schema
export const GetTransfersIdReversalsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        balance_transaction: Schema.Unknown,
        created: Schema.Number,
        currency: Schema.String,
        destination_payment_refund: Schema.Unknown,
        id: Schema.String,
        metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
        object: Schema.Literals(["transfer_reversal"]),
        source_refund: Schema.Unknown,
        transfer: Schema.Unknown,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTransfersIdReversalsOutput =
  typeof GetTransfersIdReversalsOutput.Type;

// The operation
/**
 * List all reversals
 *
 * <p>You can see a list of the reversals belonging to a specific transfer. Note that the 10 most recent reversals are always available by default on the transfer object. If you need more than those 10, you can use this API method and the <code>limit</code> and <code>starting_after</code> parameters to page through additional reversals.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetTransfersIdReversals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTransfersIdReversalsInput,
    outputSchema: GetTransfersIdReversalsOutput,
  }),
);
