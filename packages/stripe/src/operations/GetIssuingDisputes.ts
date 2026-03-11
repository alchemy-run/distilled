import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIssuingDisputesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["expired", "lost", "submitted", "unsubmitted", "won"]),
    ),
    transaction: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/issuing/disputes",
      contentType: "form-urlencoded",
    }),
  );
export type GetIssuingDisputesInput = typeof GetIssuingDisputesInput.Type;

// Output Schema
export const GetIssuingDisputesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetIssuingDisputesOutput = typeof GetIssuingDisputesOutput.Type;

// The operation
/**
 * List all disputes
 *
 * <p>Returns a list of Issuing <code>Dispute</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>
 *
 * @param created - Only return Issuing disputes that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Select Issuing disputes with the given status.
 * @param transaction - Select the Issuing dispute for the given transaction.
 */
export const GetIssuingDisputes = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetIssuingDisputesInput,
  outputSchema: GetIssuingDisputesOutput,
}));
