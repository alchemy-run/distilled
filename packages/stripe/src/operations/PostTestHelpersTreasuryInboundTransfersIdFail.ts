import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTreasuryInboundTransfersIdFailInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    failure_details: Schema.optional(
      Schema.Struct({
        code: Schema.optional(
          Schema.Literals([
            "account_closed",
            "account_frozen",
            "bank_account_restricted",
            "bank_ownership_changed",
            "debit_not_authorized",
            "incorrect_account_holder_address",
            "incorrect_account_holder_name",
            "incorrect_account_holder_tax_id",
            "insufficient_funds",
            "invalid_account_number",
            "invalid_currency",
            "no_account",
            "other",
          ]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/treasury/inbound_transfers/{id}/fail",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTreasuryInboundTransfersIdFailInput =
  typeof PostTestHelpersTreasuryInboundTransfersIdFailInput.Type;

// Output Schema
export const PostTestHelpersTreasuryInboundTransfersIdFailOutput =
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
export type PostTestHelpersTreasuryInboundTransfersIdFailOutput =
  typeof PostTestHelpersTreasuryInboundTransfersIdFailOutput.Type;

// The operation
/**
 * Test mode: Fail an InboundTransfer
 *
 * <p>Transitions a test mode created InboundTransfer to the <code>failed</code> status. The InboundTransfer must already be in the <code>processing</code> state.</p>
 */
export const PostTestHelpersTreasuryInboundTransfersIdFail =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTestHelpersTreasuryInboundTransfersIdFailInput,
    outputSchema: PostTestHelpersTreasuryInboundTransfersIdFailOutput,
  }));
