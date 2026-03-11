import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    outbound_transfer: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostInput =
  typeof PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostInput.Type;

// Output Schema
export const PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    cancelable: Schema.Boolean,
    created: Schema.Number,
    currency: Schema.String,
    description: Schema.NullOr(Schema.String),
    destination_payment_method: Schema.NullOr(Schema.String),
    destination_payment_method_details: Schema.Struct({
      billing_details: Schema.Struct({
        address: Schema.Struct({
          city: Schema.NullOr(Schema.String),
          country: Schema.NullOr(Schema.String),
          line1: Schema.NullOr(Schema.String),
          line2: Schema.NullOr(Schema.String),
          postal_code: Schema.NullOr(Schema.String),
          state: Schema.NullOr(Schema.String),
        }),
        email: Schema.NullOr(Schema.String),
        name: Schema.NullOr(Schema.String),
      }),
      financial_account: Schema.optional(
        Schema.Struct({
          id: Schema.String,
          network: Schema.Literals(["stripe"]),
        }),
      ),
      type: Schema.Literals(["financial_account", "us_bank_account"]),
      us_bank_account: Schema.optional(
        Schema.Struct({
          account_holder_type: Schema.NullOr(
            Schema.Literals(["company", "individual"]),
          ),
          account_type: Schema.NullOr(Schema.Literals(["checking", "savings"])),
          bank_name: Schema.NullOr(Schema.String),
          fingerprint: Schema.NullOr(Schema.String),
          last4: Schema.NullOr(Schema.String),
          mandate: Schema.optional(Schema.Unknown),
          network: Schema.Literals(["ach", "us_domestic_wire"]),
          routing_number: Schema.NullOr(Schema.String),
        }),
      ),
    }),
    expected_arrival_date: Schema.Number,
    financial_account: Schema.String,
    hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["treasury.outbound_transfer"]),
    returned_details: Schema.Unknown,
    statement_descriptor: Schema.String,
    status: Schema.Literals([
      "canceled",
      "failed",
      "posted",
      "processing",
      "returned",
    ]),
    status_transitions: Schema.Struct({
      canceled_at: Schema.NullOr(Schema.Number),
      failed_at: Schema.NullOr(Schema.Number),
      posted_at: Schema.NullOr(Schema.Number),
      returned_at: Schema.NullOr(Schema.Number),
    }),
    tracking_details: Schema.Unknown,
    transaction: Schema.Unknown,
  });
export type PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostOutput =
  typeof PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostOutput.Type;

// The operation
/**
 * Test mode: Post an OutboundTransfer
 *
 * <p>Transitions a test mode created OutboundTransfer to the <code>posted</code> status. The OutboundTransfer must already be in the <code>processing</code> state.</p>
 */
export const PostTestHelpersTreasuryOutboundTransfersOutboundTransferPost =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostInput,
    outputSchema:
      PostTestHelpersTreasuryOutboundTransfersOutboundTransferPostOutput,
  }));
