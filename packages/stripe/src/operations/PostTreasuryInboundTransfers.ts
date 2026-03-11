import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTreasuryInboundTransfersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    currency: Schema.String,
    description: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    financial_account: Schema.String,
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    origin_payment_method: Schema.String,
    statement_descriptor: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/treasury/inbound_transfers",
      contentType: "form-urlencoded",
    }),
  );
export type PostTreasuryInboundTransfersInput =
  typeof PostTreasuryInboundTransfersInput.Type;

// Output Schema
export const PostTreasuryInboundTransfersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    cancelable: Schema.Boolean,
    created: Schema.Number,
    currency: Schema.String,
    description: Schema.NullOr(Schema.String),
    failure_details: Schema.Unknown,
    financial_account: Schema.String,
    hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
    id: Schema.String,
    linked_flows: Schema.Struct({
      received_debit: Schema.NullOr(Schema.String),
    }),
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["treasury.inbound_transfer"]),
    origin_payment_method: Schema.NullOr(Schema.String),
    origin_payment_method_details: Schema.Unknown,
    returned: Schema.NullOr(Schema.Boolean),
    statement_descriptor: Schema.String,
    status: Schema.Literals(["canceled", "failed", "processing", "succeeded"]),
    status_transitions: Schema.Struct({
      canceled_at: Schema.optional(Schema.NullOr(Schema.Number)),
      failed_at: Schema.NullOr(Schema.Number),
      succeeded_at: Schema.NullOr(Schema.Number),
    }),
    transaction: Schema.Unknown,
  });
export type PostTreasuryInboundTransfersOutput =
  typeof PostTreasuryInboundTransfersOutput.Type;

// The operation
/**
 * Create an InboundTransfer
 *
 * <p>Creates an InboundTransfer.</p>
 */
export const PostTreasuryInboundTransfers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTreasuryInboundTransfersInput,
    outputSchema: PostTreasuryInboundTransfersOutput,
  }));
