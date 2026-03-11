import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTransfersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  amount: Schema.optional(Schema.Number),
  currency: Schema.String,
  description: Schema.optional(Schema.String),
  destination: Schema.String,
  expand: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  source_transaction: Schema.optional(Schema.String),
  source_type: Schema.optional(
    Schema.Literals(["bank_account", "card", "fpx"]),
  ),
  transfer_group: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/transfers",
    contentType: "form-urlencoded",
  }),
);
export type PostTransfersInput = typeof PostTransfersInput.Type;

// Output Schema
export const PostTransfersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostTransfersOutput = typeof PostTransfersOutput.Type;

// The operation
/**
 * Create a transfer
 *
 * <p>To send funds from your Stripe account to a connected account, you create a new transfer object. Your <a href="#balance">Stripe balance</a> must be able to cover the transfer amount, or you’ll receive an “Insufficient Funds” error.</p>
 */
export const PostTransfers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostTransfersInput,
  outputSchema: PostTransfersOutput,
}));
