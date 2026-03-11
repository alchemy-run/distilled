import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTransfersTransferInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    transfer: Schema.String.pipe(T.PathParam()),
    description: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/transfers/{transfer}",
      contentType: "form-urlencoded",
    }),
  );
export type PostTransfersTransferInput = typeof PostTransfersTransferInput.Type;

// Output Schema
export const PostTransfersTransferOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
          metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
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
  });
export type PostTransfersTransferOutput =
  typeof PostTransfersTransferOutput.Type;

// The operation
/**
 * Update a transfer
 *
 * <p>Updates the specified transfer by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>
 * <p>This request accepts only metadata as an argument.</p>
 */
export const PostTransfersTransfer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostTransfersTransferInput,
    outputSchema: PostTransfersTransferOutput,
  }),
);
