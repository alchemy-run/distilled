import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostIssuingDisputesDisputeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dispute: Schema.String.pipe(T.PathParam()),
    amount: Schema.optional(Schema.Number),
    evidence: Schema.optional(
      Schema.Struct({
        canceled: Schema.optional(Schema.Unknown),
        duplicate: Schema.optional(Schema.Unknown),
        fraudulent: Schema.optional(Schema.Unknown),
        merchandise_not_as_described: Schema.optional(Schema.Unknown),
        no_valid_authorization: Schema.optional(Schema.Unknown),
        not_received: Schema.optional(Schema.Unknown),
        other: Schema.optional(Schema.Unknown),
        reason: Schema.optional(
          Schema.Literals([
            "canceled",
            "duplicate",
            "fraudulent",
            "merchandise_not_as_described",
            "no_valid_authorization",
            "not_received",
            "other",
            "service_not_as_described",
          ]),
        ),
        service_not_as_described: Schema.optional(Schema.Unknown),
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/issuing/disputes/{dispute}",
      contentType: "form-urlencoded",
    }),
  );
export type PostIssuingDisputesDisputeInput =
  typeof PostIssuingDisputesDisputeInput.Type;

// Output Schema
export const PostIssuingDisputesDisputeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    balance_transactions: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            amount: Schema.Number,
            available_on: Schema.Number,
            balance_type: Schema.Literals([
              "issuing",
              "payments",
              "refund_and_dispute_prefunding",
              "risk_reserved",
            ]),
            created: Schema.Number,
            currency: Schema.String,
            description: Schema.NullOr(Schema.String),
            exchange_rate: Schema.NullOr(Schema.Number),
            fee: Schema.Number,
            fee_details: Schema.Array(
              Schema.Struct({
                amount: Schema.Number,
                application: Schema.NullOr(Schema.String),
                currency: Schema.String,
                description: Schema.NullOr(Schema.String),
                type: Schema.String,
              }),
            ),
            id: Schema.String,
            net: Schema.Number,
            object: Schema.Literals(["balance_transaction"]),
            reporting_category: Schema.String,
            source: Schema.Unknown,
            status: Schema.String,
            type: Schema.Literals([
              "adjustment",
              "advance",
              "advance_funding",
              "anticipation_repayment",
              "application_fee",
              "application_fee_refund",
              "charge",
              "climate_order_purchase",
              "climate_order_refund",
              "connect_collection_transfer",
              "contribution",
              "issuing_authorization_hold",
              "issuing_authorization_release",
              "issuing_dispute",
              "issuing_transaction",
              "obligation_outbound",
              "obligation_reversal_inbound",
              "payment",
              "payment_failure_refund",
              "payment_network_reserve_hold",
              "payment_network_reserve_release",
              "payment_refund",
              "payment_reversal",
              "payment_unreconciled",
              "payout",
              "payout_cancel",
              "payout_failure",
              "payout_minimum_balance_hold",
              "payout_minimum_balance_release",
              "refund",
              "refund_failure",
              "reserve_hold",
              "reserve_release",
              "reserve_transaction",
              "reserved_funds",
              "stripe_balance_payment_debit",
              "stripe_balance_payment_debit_reversal",
              "stripe_fee",
              "stripe_fx_fee",
              "tax_fee",
              "topup",
              "topup_reversal",
              "transfer",
              "transfer_cancel",
              "transfer_failure",
              "transfer_refund",
            ]),
          }),
        ),
      ),
    ),
    created: Schema.Number,
    currency: Schema.String,
    evidence: Schema.Struct({
      canceled: Schema.optional(
        Schema.Struct({
          additional_documentation: Schema.Unknown,
          canceled_at: Schema.NullOr(Schema.Number),
          cancellation_policy_provided: Schema.NullOr(Schema.Boolean),
          cancellation_reason: Schema.NullOr(Schema.String),
          expected_at: Schema.NullOr(Schema.Number),
          explanation: Schema.NullOr(Schema.String),
          product_description: Schema.NullOr(Schema.String),
          product_type: Schema.NullOr(
            Schema.Literals(["merchandise", "service"]),
          ),
          return_status: Schema.NullOr(
            Schema.Literals(["merchant_rejected", "successful"]),
          ),
          returned_at: Schema.NullOr(Schema.Number),
        }),
      ),
      duplicate: Schema.optional(
        Schema.Struct({
          additional_documentation: Schema.Unknown,
          card_statement: Schema.Unknown,
          cash_receipt: Schema.Unknown,
          check_image: Schema.Unknown,
          explanation: Schema.NullOr(Schema.String),
          original_transaction: Schema.NullOr(Schema.String),
        }),
      ),
      fraudulent: Schema.optional(
        Schema.Struct({
          additional_documentation: Schema.Unknown,
          explanation: Schema.NullOr(Schema.String),
        }),
      ),
      merchandise_not_as_described: Schema.optional(
        Schema.Struct({
          additional_documentation: Schema.Unknown,
          explanation: Schema.NullOr(Schema.String),
          received_at: Schema.NullOr(Schema.Number),
          return_description: Schema.NullOr(Schema.String),
          return_status: Schema.NullOr(
            Schema.Literals(["merchant_rejected", "successful"]),
          ),
          returned_at: Schema.NullOr(Schema.Number),
        }),
      ),
      no_valid_authorization: Schema.optional(
        Schema.Struct({
          additional_documentation: Schema.Unknown,
          explanation: Schema.NullOr(Schema.String),
        }),
      ),
      not_received: Schema.optional(
        Schema.Struct({
          additional_documentation: Schema.Unknown,
          expected_at: Schema.NullOr(Schema.Number),
          explanation: Schema.NullOr(Schema.String),
          product_description: Schema.NullOr(Schema.String),
          product_type: Schema.NullOr(
            Schema.Literals(["merchandise", "service"]),
          ),
        }),
      ),
      other: Schema.optional(
        Schema.Struct({
          additional_documentation: Schema.Unknown,
          explanation: Schema.NullOr(Schema.String),
          product_description: Schema.NullOr(Schema.String),
          product_type: Schema.NullOr(
            Schema.Literals(["merchandise", "service"]),
          ),
        }),
      ),
      reason: Schema.Literals([
        "canceled",
        "duplicate",
        "fraudulent",
        "merchandise_not_as_described",
        "no_valid_authorization",
        "not_received",
        "other",
        "service_not_as_described",
      ]),
      service_not_as_described: Schema.optional(
        Schema.Struct({
          additional_documentation: Schema.Unknown,
          canceled_at: Schema.NullOr(Schema.Number),
          cancellation_reason: Schema.NullOr(Schema.String),
          explanation: Schema.NullOr(Schema.String),
          received_at: Schema.NullOr(Schema.Number),
        }),
      ),
    }),
    id: Schema.String,
    livemode: Schema.Boolean,
    loss_reason: Schema.optional(
      Schema.Literals([
        "cardholder_authentication_issuer_liability",
        "eci5_token_transaction_with_tavv",
        "excess_disputes_in_timeframe",
        "has_not_met_the_minimum_dispute_amount_requirements",
        "invalid_duplicate_dispute",
        "invalid_incorrect_amount_dispute",
        "invalid_no_authorization",
        "invalid_use_of_disputes",
        "merchandise_delivered_or_shipped",
        "merchandise_or_service_as_described",
        "not_cancelled",
        "other",
        "refund_issued",
        "submitted_beyond_allowable_time_limit",
        "transaction_3ds_required",
        "transaction_approved_after_prior_fraud_dispute",
        "transaction_authorized",
        "transaction_electronically_read",
        "transaction_qualifies_for_visa_easy_payment_service",
        "transaction_unattended",
      ]),
    ),
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["issuing.dispute"]),
    status: Schema.Literals([
      "expired",
      "lost",
      "submitted",
      "unsubmitted",
      "won",
    ]),
    transaction: Schema.Unknown,
    treasury: Schema.optional(Schema.Unknown),
  });
export type PostIssuingDisputesDisputeOutput =
  typeof PostIssuingDisputesDisputeOutput.Type;

// The operation
/**
 * Update a dispute
 *
 * <p>Updates the specified Issuing <code>Dispute</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Properties on the <code>evidence</code> object can be unset by passing in an empty string.</p>
 */
export const PostIssuingDisputesDispute = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostIssuingDisputesDisputeInput,
    outputSchema: PostIssuingDisputesDisputeOutput,
  }),
);
