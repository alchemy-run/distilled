import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTransfersTransferReversalsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    transfer: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/transfers/{transfer}/reversals/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type PostTransfersTransferReversalsIdInput =
  typeof PostTransfersTransferReversalsIdInput.Type;

// Output Schema
export const PostTransfersTransferReversalsIdOutput =
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
export type PostTransfersTransferReversalsIdOutput =
  typeof PostTransfersTransferReversalsIdOutput.Type;

// The operation
/**
 * Update a reversal
 *
 * <p>Updates the specified reversal by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>
 * <p>This request only accepts metadata and description as arguments.</p>
 */
export const PostTransfersTransferReversalsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTransfersTransferReversalsIdInput,
    outputSchema: PostTransfersTransferReversalsIdOutput,
  }));
