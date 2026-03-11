import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryInboundTransfersIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/inbound_transfers/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryInboundTransfersIdInput =
  typeof GetTreasuryInboundTransfersIdInput.Type;

// Output Schema
export const GetTreasuryInboundTransfersIdOutput =
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
export type GetTreasuryInboundTransfersIdOutput =
  typeof GetTreasuryInboundTransfersIdOutput.Type;

// The operation
/**
 * Retrieve an InboundTransfer
 *
 * <p>Retrieves the details of an existing InboundTransfer.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTreasuryInboundTransfersId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTreasuryInboundTransfersIdInput,
    outputSchema: GetTreasuryInboundTransfersIdOutput,
  }));
