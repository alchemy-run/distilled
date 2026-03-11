import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTreasuryInboundTransfersIdSucceedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/treasury/inbound_transfers/{id}/succeed",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTreasuryInboundTransfersIdSucceedInput =
  typeof PostTestHelpersTreasuryInboundTransfersIdSucceedInput.Type;

// Output Schema
export const PostTestHelpersTreasuryInboundTransfersIdSucceedOutput =
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
export type PostTestHelpersTreasuryInboundTransfersIdSucceedOutput =
  typeof PostTestHelpersTreasuryInboundTransfersIdSucceedOutput.Type;

// The operation
/**
 * Test mode: Succeed an InboundTransfer
 *
 * <p>Transitions a test mode created InboundTransfer to the <code>succeeded</code> status. The InboundTransfer must already be in the <code>processing</code> state.</p>
 */
export const PostTestHelpersTreasuryInboundTransfersIdSucceed =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTestHelpersTreasuryInboundTransfersIdSucceedInput,
    outputSchema: PostTestHelpersTreasuryInboundTransfersIdSucceedOutput,
  }));
