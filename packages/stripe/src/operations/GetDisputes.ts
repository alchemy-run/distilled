import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetDisputesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  charge: Schema.optional(Schema.String),
  created: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  payment_intent: Schema.optional(Schema.String),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/disputes",
    contentType: "form-urlencoded",
  }),
);
export type GetDisputesInput = typeof GetDisputesInput.Type;

// Output Schema
export const GetDisputesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      amount: Schema.Number,
      balance_transactions: Schema.Array(
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
      charge: Schema.Unknown,
      created: Schema.Number,
      currency: Schema.String,
      enhanced_eligibility_types: Schema.Array(
        Schema.Literals(["visa_compelling_evidence_3", "visa_compliance"]),
      ),
      evidence: Schema.Struct({
        access_activity_log: Schema.NullOr(Schema.String),
        billing_address: Schema.NullOr(Schema.String),
        cancellation_policy: Schema.Unknown,
        cancellation_policy_disclosure: Schema.NullOr(Schema.String),
        cancellation_rebuttal: Schema.NullOr(Schema.String),
        customer_communication: Schema.Unknown,
        customer_email_address: Schema.NullOr(Schema.String),
        customer_name: Schema.NullOr(Schema.String),
        customer_purchase_ip: Schema.NullOr(Schema.String),
        customer_signature: Schema.Unknown,
        duplicate_charge_documentation: Schema.Unknown,
        duplicate_charge_explanation: Schema.NullOr(Schema.String),
        duplicate_charge_id: Schema.NullOr(Schema.String),
        enhanced_evidence: Schema.Struct({
          visa_compelling_evidence_3: Schema.optional(
            Schema.Struct({
              disputed_transaction: Schema.Unknown,
              prior_undisputed_transactions: Schema.Array(
                Schema.Struct({
                  charge: Schema.String,
                  customer_account_id: Schema.NullOr(Schema.String),
                  customer_device_fingerprint: Schema.NullOr(Schema.String),
                  customer_device_id: Schema.NullOr(Schema.String),
                  customer_email_address: Schema.NullOr(Schema.String),
                  customer_purchase_ip: Schema.NullOr(Schema.String),
                  product_description: Schema.NullOr(Schema.String),
                  shipping_address: Schema.Unknown,
                }),
              ),
            }),
          ),
          visa_compliance: Schema.optional(
            Schema.Struct({
              fee_acknowledged: Schema.Boolean,
            }),
          ),
        }),
        product_description: Schema.NullOr(Schema.String),
        receipt: Schema.Unknown,
        refund_policy: Schema.Unknown,
        refund_policy_disclosure: Schema.NullOr(Schema.String),
        refund_refusal_explanation: Schema.NullOr(Schema.String),
        service_date: Schema.NullOr(Schema.String),
        service_documentation: Schema.Unknown,
        shipping_address: Schema.NullOr(Schema.String),
        shipping_carrier: Schema.NullOr(Schema.String),
        shipping_date: Schema.NullOr(Schema.String),
        shipping_documentation: Schema.Unknown,
        shipping_tracking_number: Schema.NullOr(Schema.String),
        uncategorized_file: Schema.Unknown,
        uncategorized_text: Schema.NullOr(Schema.String),
      }),
      evidence_details: Schema.Struct({
        due_by: Schema.NullOr(Schema.Number),
        enhanced_eligibility: Schema.Struct({
          visa_compelling_evidence_3: Schema.optional(
            Schema.Struct({
              required_actions: Schema.Array(
                Schema.Literals([
                  "missing_customer_identifiers",
                  "missing_disputed_transaction_description",
                  "missing_merchandise_or_services",
                  "missing_prior_undisputed_transaction_description",
                  "missing_prior_undisputed_transactions",
                ]),
              ),
              status: Schema.Literals([
                "not_qualified",
                "qualified",
                "requires_action",
              ]),
            }),
          ),
          visa_compliance: Schema.optional(
            Schema.Struct({
              status: Schema.Literals([
                "fee_acknowledged",
                "requires_fee_acknowledgement",
              ]),
            }),
          ),
        }),
        has_evidence: Schema.Boolean,
        past_due: Schema.Boolean,
        submission_count: Schema.Number,
      }),
      id: Schema.String,
      is_charge_refundable: Schema.Boolean,
      livemode: Schema.Boolean,
      metadata: Schema.Record(Schema.String, Schema.String),
      network_reason_code: Schema.optional(Schema.NullOr(Schema.String)),
      object: Schema.Literals(["dispute"]),
      payment_intent: Schema.Unknown,
      payment_method_details: Schema.optional(
        Schema.Struct({
          amazon_pay: Schema.optional(
            Schema.Struct({
              dispute_type: Schema.NullOr(
                Schema.Literals(["chargeback", "claim"]),
              ),
            }),
          ),
          card: Schema.optional(
            Schema.Struct({
              brand: Schema.String,
              case_type: Schema.Literals([
                "block",
                "chargeback",
                "compliance",
                "inquiry",
                "resolution",
              ]),
              network_reason_code: Schema.NullOr(Schema.String),
            }),
          ),
          klarna: Schema.optional(
            Schema.Struct({
              chargeback_loss_reason_code: Schema.optional(Schema.String),
              reason_code: Schema.NullOr(Schema.String),
            }),
          ),
          paypal: Schema.optional(
            Schema.Struct({
              case_id: Schema.NullOr(Schema.String),
              reason_code: Schema.NullOr(Schema.String),
            }),
          ),
          type: Schema.Literals(["amazon_pay", "card", "klarna", "paypal"]),
        }),
      ),
      reason: Schema.String,
      status: Schema.Literals([
        "lost",
        "needs_response",
        "prevented",
        "under_review",
        "warning_closed",
        "warning_needs_response",
        "warning_under_review",
        "won",
      ]),
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetDisputesOutput = typeof GetDisputesOutput.Type;

// The operation
/**
 * List all disputes
 *
 * <p>Returns a list of your disputes.</p>
 *
 * @param charge - Only return disputes associated to the charge specified by this charge ID.
 * @param created - Only return disputes that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param payment_intent - Only return disputes associated to the PaymentIntent specified by this PaymentIntent ID.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetDisputes = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetDisputesInput,
  outputSchema: GetDisputesOutput,
}));
