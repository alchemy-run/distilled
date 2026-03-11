import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTransfersTransferReversalsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    transfer: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/transfers/{transfer}/reversals/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTransfersTransferReversalsIdInput =
  typeof GetTransfersTransferReversalsIdInput.Type;

// Output Schema
export const GetTransfersTransferReversalsIdOutput =
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
export type GetTransfersTransferReversalsIdOutput =
  typeof GetTransfersTransferReversalsIdOutput.Type;

// The operation
/**
 * Retrieve a reversal
 *
 * <p>By default, you can see the 10 most recent reversals stored directly on the transfer object, but you can also retrieve details about a specific reversal stored on the transfer.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTransfersTransferReversalsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTransfersTransferReversalsIdInput,
    outputSchema: GetTransfersTransferReversalsIdOutput,
  }));
