import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTreasuryInboundTransfersIdReturnInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/treasury/inbound_transfers/{id}/return",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTreasuryInboundTransfersIdReturnInput =
  typeof PostTestHelpersTreasuryInboundTransfersIdReturnInput.Type;

// Output Schema
export const PostTestHelpersTreasuryInboundTransfersIdReturnOutput =
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
export type PostTestHelpersTreasuryInboundTransfersIdReturnOutput =
  typeof PostTestHelpersTreasuryInboundTransfersIdReturnOutput.Type;

// The operation
/**
 * Test mode: Return an InboundTransfer
 *
 * <p>Marks the test mode InboundTransfer object as returned and links the InboundTransfer to a ReceivedDebit. The InboundTransfer must already be in the <code>succeeded</code> state.</p>
 */
export const PostTestHelpersTreasuryInboundTransfersIdReturn =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTestHelpersTreasuryInboundTransfersIdReturnInput,
    outputSchema: PostTestHelpersTreasuryInboundTransfersIdReturnOutput,
  }));
