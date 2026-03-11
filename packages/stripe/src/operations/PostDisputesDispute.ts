import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostDisputesDisputeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dispute: Schema.String.pipe(T.PathParam()),
    evidence: Schema.optional(
      Schema.Struct({
        access_activity_log: Schema.optional(Schema.String),
        billing_address: Schema.optional(Schema.String),
        cancellation_policy: Schema.optional(Schema.String),
        cancellation_policy_disclosure: Schema.optional(Schema.String),
        cancellation_rebuttal: Schema.optional(Schema.String),
        customer_communication: Schema.optional(Schema.String),
        customer_email_address: Schema.optional(Schema.String),
        customer_name: Schema.optional(Schema.String),
        customer_purchase_ip: Schema.optional(Schema.String),
        customer_signature: Schema.optional(Schema.String),
        duplicate_charge_documentation: Schema.optional(Schema.String),
        duplicate_charge_explanation: Schema.optional(Schema.String),
        duplicate_charge_id: Schema.optional(Schema.String),
        enhanced_evidence: Schema.optional(Schema.Unknown),
        product_description: Schema.optional(Schema.String),
        receipt: Schema.optional(Schema.String),
        refund_policy: Schema.optional(Schema.String),
        refund_policy_disclosure: Schema.optional(Schema.String),
        refund_refusal_explanation: Schema.optional(Schema.String),
        service_date: Schema.optional(Schema.String),
        service_documentation: Schema.optional(Schema.String),
        shipping_address: Schema.optional(Schema.String),
        shipping_carrier: Schema.optional(Schema.String),
        shipping_date: Schema.optional(Schema.String),
        shipping_documentation: Schema.optional(Schema.String),
        shipping_tracking_number: Schema.optional(Schema.String),
        uncategorized_file: Schema.optional(Schema.String),
        uncategorized_text: Schema.optional(Schema.String),
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Unknown),
    submit: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/disputes/{dispute}",
      contentType: "form-urlencoded",
    }),
  );
export type PostDisputesDisputeInput = typeof PostDisputesDisputeInput.Type;

// Output Schema
export const PostDisputesDisputeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type PostDisputesDisputeOutput = typeof PostDisputesDisputeOutput.Type;

// The operation
/**
 * Update a dispute
 *
 * <p>When you get a dispute, contacting your customer is always the best first step. If that doesn’t work, you can submit evidence to help us resolve the dispute in your favor. You can do this in your <a href="https://dashboard.stripe.com/disputes">dashboard</a>, but if you prefer, you can use the API to submit evidence programmatically.</p>
 * <p>Depending on your dispute type, different evidence fields will give you a better chance of winning your dispute. To figure out which evidence fields to provide, see our <a href="/docs/disputes/categories">guide to dispute types</a>.</p>
 */
export const PostDisputesDispute = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostDisputesDisputeInput,
  outputSchema: PostDisputesDisputeOutput,
}));
