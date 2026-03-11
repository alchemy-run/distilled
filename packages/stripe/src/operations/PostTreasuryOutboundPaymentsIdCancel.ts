import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTreasuryOutboundPaymentsIdCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/treasury/outbound_payments/{id}/cancel",
      contentType: "form-urlencoded",
    }),
  );
export type PostTreasuryOutboundPaymentsIdCancelInput =
  typeof PostTreasuryOutboundPaymentsIdCancelInput.Type;

// Output Schema
export const PostTreasuryOutboundPaymentsIdCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    cancelable: Schema.Boolean,
    created: Schema.Number,
    currency: Schema.String,
    customer: Schema.NullOr(Schema.String),
    description: Schema.NullOr(Schema.String),
    destination_payment_method: Schema.NullOr(Schema.String),
    destination_payment_method_details: Schema.Unknown,
    end_user_details: Schema.Unknown,
    expected_arrival_date: Schema.Number,
    financial_account: Schema.String,
    hosted_regulatory_receipt_url: Schema.NullOr(Schema.String),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["treasury.outbound_payment"]),
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
export type PostTreasuryOutboundPaymentsIdCancelOutput =
  typeof PostTreasuryOutboundPaymentsIdCancelOutput.Type;

// The operation
/**
 * Cancel an OutboundPayment
 *
 * <p>Cancel an OutboundPayment.</p>
 */
export const PostTreasuryOutboundPaymentsIdCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTreasuryOutboundPaymentsIdCancelInput,
    outputSchema: PostTreasuryOutboundPaymentsIdCancelOutput,
  }));
