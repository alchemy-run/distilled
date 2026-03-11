import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTreasuryOutboundPaymentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    currency: Schema.String,
    customer: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    destination_payment_method: Schema.optional(Schema.String),
    destination_payment_method_data: Schema.optional(
      Schema.Struct({
        billing_details: Schema.optional(
          Schema.Struct({
            address: Schema.optional(Schema.Unknown),
            email: Schema.optional(Schema.Unknown),
            name: Schema.optional(Schema.Unknown),
            phone: Schema.optional(Schema.Unknown),
          }),
        ),
        financial_account: Schema.optional(Schema.String),
        metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        type: Schema.Literals(["financial_account", "us_bank_account"]),
        us_bank_account: Schema.optional(
          Schema.Struct({
            account_holder_type: Schema.optional(
              Schema.Literals(["company", "individual"]),
            ),
            account_number: Schema.optional(Schema.String),
            account_type: Schema.optional(
              Schema.Literals(["checking", "savings"]),
            ),
            financial_connections_account: Schema.optional(Schema.String),
            routing_number: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    destination_payment_method_options: Schema.optional(
      Schema.Struct({
        us_bank_account: Schema.optional(Schema.Unknown),
      }),
    ),
    end_user_details: Schema.optional(
      Schema.Struct({
        ip_address: Schema.optional(Schema.String),
        present: Schema.Boolean,
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    financial_account: Schema.String,
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    statement_descriptor: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/treasury/outbound_payments",
      contentType: "form-urlencoded",
    }),
  );
export type PostTreasuryOutboundPaymentsInput =
  typeof PostTreasuryOutboundPaymentsInput.Type;

// Output Schema
export const PostTreasuryOutboundPaymentsOutput =
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
export type PostTreasuryOutboundPaymentsOutput =
  typeof PostTreasuryOutboundPaymentsOutput.Type;

// The operation
/**
 * Create an OutboundPayment
 *
 * <p>Creates an OutboundPayment.</p>
 */
export const PostTreasuryOutboundPayments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTreasuryOutboundPaymentsInput,
    outputSchema: PostTreasuryOutboundPaymentsOutput,
  }));
