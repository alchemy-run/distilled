import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const PostSetupIntentsIntentCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    intent: Schema.String.pipe(T.PathParam()),
    cancellation_reason: Schema.optional(
      Schema.Literals(["abandoned", "duplicate", "requested_by_customer"]),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/setup_intents/{intent}/cancel",
      contentType: "form-urlencoded",
    }),
  );
export type PostSetupIntentsIntentCancelInput =
  typeof PostSetupIntentsIntentCancelInput.Type;

// Output Schema
export const PostSetupIntentsIntentCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    application: Schema.Unknown,
    attach_to_self: Schema.optional(Schema.Boolean),
    automatic_payment_methods: Schema.Unknown,
    cancellation_reason: Schema.NullOr(
      Schema.Literals(["abandoned", "duplicate", "requested_by_customer"]),
    ),
    client_secret: SensitiveNullableString,
    created: Schema.Number,
    customer: Schema.Unknown,
    customer_account: Schema.optional(Schema.NullOr(Schema.String)),
    description: Schema.NullOr(Schema.String),
    excluded_payment_method_types: Schema.NullOr(
      Schema.Array(
        Schema.Literals([
          "acss_debit",
          "affirm",
          "afterpay_clearpay",
          "alipay",
          "alma",
          "amazon_pay",
          "au_becs_debit",
          "bacs_debit",
          "bancontact",
          "billie",
          "blik",
          "boleto",
          "card",
          "cashapp",
          "crypto",
          "customer_balance",
          "eps",
          "fpx",
          "giropay",
          "grabpay",
          "ideal",
          "kakao_pay",
          "klarna",
          "konbini",
          "kr_card",
          "mb_way",
          "mobilepay",
          "multibanco",
          "naver_pay",
          "nz_bank_account",
          "oxxo",
          "p24",
          "pay_by_bank",
          "payco",
          "paynow",
          "paypal",
          "payto",
          "pix",
          "promptpay",
          "revolut_pay",
          "samsung_pay",
          "satispay",
          "sepa_debit",
          "sofort",
          "swish",
          "twint",
          "us_bank_account",
          "wechat_pay",
          "zip",
        ]),
      ),
    ),
    flow_directions: Schema.optional(
      Schema.NullOr(Schema.Array(Schema.Literals(["inbound", "outbound"]))),
    ),
    id: Schema.String,
    last_setup_error: Schema.Unknown,
    latest_attempt: Schema.Unknown,
    livemode: Schema.Boolean,
    mandate: Schema.Unknown,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    next_action: Schema.Unknown,
    object: Schema.Literals(["setup_intent"]),
    on_behalf_of: Schema.Unknown,
    payment_method: Schema.Unknown,
    payment_method_configuration_details: Schema.Unknown,
    payment_method_options: Schema.Unknown,
    payment_method_types: Schema.Array(Schema.String),
    single_use_mandate: Schema.Unknown,
    status: Schema.Literals([
      "canceled",
      "processing",
      "requires_action",
      "requires_confirmation",
      "requires_payment_method",
      "succeeded",
    ]),
    usage: Schema.String,
  });
export type PostSetupIntentsIntentCancelOutput =
  typeof PostSetupIntentsIntentCancelOutput.Type;

// The operation
/**
 * Cancel a SetupIntent
 *
 * <p>You can cancel a SetupIntent object when it’s in one of these statuses: <code>requires_payment_method</code>, <code>requires_confirmation</code>, or <code>requires_action</code>. </p>
 * <p>After you cancel it, setup is abandoned and any operations on the SetupIntent fail with an error. You can’t cancel the SetupIntent for a Checkout Session. <a href="/docs/api/checkout/sessions/expire">Expire the Checkout Session</a> instead.</p>
 */
export const PostSetupIntentsIntentCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostSetupIntentsIntentCancelInput,
    outputSchema: PostSetupIntentsIntentCancelOutput,
  }));
