import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTransfersIdReversalsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    amount: Schema.optional(Schema.Number),
    description: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
    refund_application_fee: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/transfers/{id}/reversals",
      contentType: "form-urlencoded",
    }),
  );
export type PostTransfersIdReversalsInput =
  typeof PostTransfersIdReversalsInput.Type;

// Output Schema
export const PostTransfersIdReversalsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type PostTransfersIdReversalsOutput =
  typeof PostTransfersIdReversalsOutput.Type;

// The operation
/**
 * Create a transfer reversal
 *
 * <p>When you create a new reversal, you must specify a transfer to create it on.</p>
 * <p>When reversing transfers, you can optionally reverse part of the transfer. You can do so as many times as you wish until the entire transfer has been reversed.</p>
 * <p>Once entirely reversed, a transfer can’t be reversed again. This method will return an error when called on an already-reversed transfer, or when trying to reverse more money than is left on a transfer.</p>
 */
export const PostTransfersIdReversals = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostTransfersIdReversalsInput,
    outputSchema: PostTransfersIdReversalsOutput,
  }),
);
