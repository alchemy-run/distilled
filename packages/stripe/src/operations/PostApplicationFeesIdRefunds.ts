import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostApplicationFeesIdRefundsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    amount: Schema.optional(Schema.Number),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/application_fees/{id}/refunds",
      contentType: "form-urlencoded",
    }),
  );
export type PostApplicationFeesIdRefundsInput =
  typeof PostApplicationFeesIdRefundsInput.Type;

// Output Schema
export const PostApplicationFeesIdRefundsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    balance_transaction: Schema.Unknown,
    created: Schema.Number,
    currency: Schema.String,
    fee: Schema.Unknown,
    id: Schema.String,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["fee_refund"]),
  });
export type PostApplicationFeesIdRefundsOutput =
  typeof PostApplicationFeesIdRefundsOutput.Type;

// The operation
/**
 * Create an application fee refund
 *
 * <p>Refunds an application fee that has previously been collected but not yet refunded.
 * Funds will be refunded to the Stripe account from which the fee was originally collected.</p>
 * <p>You can optionally refund only part of an application fee.
 * You can do so multiple times, until the entire fee has been refunded.</p>
 * <p>Once entirely refunded, an application fee can’t be refunded again.
 * This method will raise an error when called on an already-refunded application fee,
 * or when trying to refund more money than is left on an application fee.</p>
 */
export const PostApplicationFeesIdRefunds =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostApplicationFeesIdRefundsInput,
    outputSchema: PostApplicationFeesIdRefundsOutput,
  }));
