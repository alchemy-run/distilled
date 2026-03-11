import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTransfersTransferInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    transfer: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/transfers/{transfer}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTransfersTransferInput = typeof GetTransfersTransferInput.Type;

// Output Schema
export const GetTransfersTransferOutput =
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
export type GetTransfersTransferOutput = typeof GetTransfersTransferOutput.Type;

// The operation
/**
 * Retrieve a transfer
 *
 * <p>Retrieves the details of an existing transfer. Supply the unique transfer ID from either a transfer creation request or the transfer list, and Stripe will return the corresponding transfer information.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTransfersTransfer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTransfersTransferInput,
    outputSchema: GetTransfersTransferOutput,
  }),
);
