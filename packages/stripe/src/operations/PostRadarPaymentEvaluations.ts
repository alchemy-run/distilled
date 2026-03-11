import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostRadarPaymentEvaluationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    client_device_metadata_details: Schema.optional(
      Schema.Struct({
        radar_session: Schema.String,
      }),
    ),
    customer_details: Schema.Struct({
      customer: Schema.optional(Schema.String),
      customer_account: Schema.optional(Schema.String),
      email: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      phone: Schema.optional(Schema.String),
    }),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    payment_details: Schema.Struct({
      amount: Schema.Number,
      currency: Schema.String,
      description: Schema.optional(Schema.String),
      money_movement_details: Schema.optional(
        Schema.Struct({
          card: Schema.optional(
            Schema.Struct({
              customer_presence: Schema.optional(
                Schema.Literals(["off_session", "on_session"]),
              ),
              payment_type: Schema.optional(
                Schema.Literals([
                  "one_off",
                  "recurring",
                  "setup_one_off",
                  "setup_recurring",
                ]),
              ),
            }),
          ),
          money_movement_type: Schema.Literals(["card"]),
        }),
      ),
      payment_method_details: Schema.Struct({
        billing_details: Schema.optional(
          Schema.Struct({
            address: Schema.optional(
              Schema.Struct({
                city: Schema.optional(Schema.String),
                country: Schema.optional(Schema.String),
                line1: Schema.optional(Schema.String),
                line2: Schema.optional(Schema.String),
                postal_code: Schema.optional(Schema.String),
                state: Schema.optional(Schema.String),
              }),
            ),
            email: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            phone: Schema.optional(Schema.String),
          }),
        ),
        payment_method: Schema.String,
      }),
      shipping_details: Schema.optional(
        Schema.Struct({
          address: Schema.optional(
            Schema.Struct({
              city: Schema.optional(Schema.String),
              country: Schema.optional(Schema.String),
              line1: Schema.optional(Schema.String),
              line2: Schema.optional(Schema.String),
              postal_code: Schema.optional(Schema.String),
              state: Schema.optional(Schema.String),
            }),
          ),
          name: Schema.optional(Schema.String),
          phone: Schema.optional(Schema.String),
        }),
      ),
      statement_descriptor: Schema.optional(Schema.String),
    }),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/radar/payment_evaluations",
      contentType: "form-urlencoded",
    }),
  );
export type PostRadarPaymentEvaluationsInput =
  typeof PostRadarPaymentEvaluationsInput.Type;

// Output Schema
export const PostRadarPaymentEvaluationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    client_device_metadata_details: Schema.optional(
      Schema.Struct({
        radar_session: Schema.String,
      }),
    ),
    created_at: Schema.Number,
    customer_details: Schema.optional(
      Schema.Struct({
        customer: Schema.NullOr(Schema.String),
        customer_account: Schema.NullOr(Schema.String),
        email: Schema.NullOr(Schema.String),
        name: Schema.NullOr(Schema.String),
        phone: Schema.NullOr(Schema.String),
      }),
    ),
    events: Schema.optional(
      Schema.Array(
        Schema.Struct({
          dispute_opened: Schema.optional(
            Schema.Struct({
              amount: Schema.Number,
              currency: Schema.String,
              reason: Schema.Literals([
                "account_not_available",
                "credit_not_processed",
                "customer_initiated",
                "duplicate",
                "fraudulent",
                "general",
                "noncompliant",
                "product_not_received",
                "product_unacceptable",
                "subscription_canceled",
                "unrecognized",
              ]),
            }),
          ),
          early_fraud_warning_received: Schema.optional(
            Schema.Struct({
              fraud_type: Schema.Literals([
                "made_with_lost_card",
                "made_with_stolen_card",
                "other",
                "unauthorized_use_of_card",
              ]),
            }),
          ),
          occurred_at: Schema.Number,
          refunded: Schema.optional(
            Schema.Struct({
              amount: Schema.Number,
              currency: Schema.String,
              reason: Schema.Literals([
                "duplicate",
                "fraudulent",
                "other",
                "requested_by_customer",
              ]),
            }),
          ),
          type: Schema.Literals([
            "dispute_opened",
            "early_fraud_warning_received",
            "refunded",
            "user_intervention_raised",
            "user_intervention_resolved",
          ]),
          user_intervention_raised: Schema.optional(
            Schema.Struct({
              custom: Schema.optional(
                Schema.Struct({
                  type: Schema.String,
                }),
              ),
              key: Schema.String,
              type: Schema.Literals(["3ds", "captcha", "custom"]),
            }),
          ),
          user_intervention_resolved: Schema.optional(
            Schema.Struct({
              key: Schema.String,
              outcome: Schema.NullOr(
                Schema.Literals(["abandoned", "failed", "passed"]),
              ),
            }),
          ),
        }),
      ),
    ),
    id: Schema.String,
    insights: Schema.Struct({
      evaluated_at: Schema.Number,
      fraudulent_dispute: Schema.Struct({
        recommended_action: Schema.Literals(["block", "continue"]),
        risk_score: Schema.Number,
      }),
    }),
    livemode: Schema.Boolean,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["radar.payment_evaluation"]),
    outcome: Schema.optional(Schema.Unknown),
    payment_details: Schema.optional(
      Schema.Struct({
        amount: Schema.Number,
        currency: Schema.String,
        description: Schema.NullOr(Schema.String),
        money_movement_details: Schema.Unknown,
        payment_method_details: Schema.Unknown,
        shipping_details: Schema.Unknown,
        statement_descriptor: Schema.NullOr(Schema.String),
      }),
    ),
  });
export type PostRadarPaymentEvaluationsOutput =
  typeof PostRadarPaymentEvaluationsOutput.Type;

// The operation
/**
 * Create a Payment Evaluation
 *
 * <p>Request a Radar API fraud risk score from Stripe for a payment before sending it for external processor authorization.</p>
 */
export const PostRadarPaymentEvaluations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostRadarPaymentEvaluationsInput,
    outputSchema: PostRadarPaymentEvaluationsOutput,
  }),
);
