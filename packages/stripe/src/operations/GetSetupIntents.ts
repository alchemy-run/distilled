import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const GetSetupIntentsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  attach_to_self: Schema.optional(Schema.Boolean),
  created: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  customer_account: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  payment_method: Schema.optional(Schema.String),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/setup_intents",
    contentType: "form-urlencoded",
  }),
);
export type GetSetupIntentsInput = typeof GetSetupIntentsInput.Type;

// Output Schema
export const GetSetupIntentsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetSetupIntentsOutput = typeof GetSetupIntentsOutput.Type;

// The operation
/**
 * List all SetupIntents
 *
 * <p>Returns a list of SetupIntents.</p>
 *
 * @param attach_to_self - If present, the SetupIntent's payment method will be attached to the in-context Stripe Account.

It can only be used for this Stripe Account’s own money movement flows like InboundTransfer and OutboundTransfers. It cannot be set to true when setting up a PaymentMethod for a Customer, and defaults to false when attaching a PaymentMethod to a Customer.
 * @param created - A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.
 * @param customer - Only return SetupIntents for the customer specified by this customer ID.
 * @param customer_account - Only return SetupIntents for the account specified by this customer ID.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param payment_method - Only return SetupIntents that associate with the specified payment method.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetSetupIntents = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSetupIntentsInput,
  outputSchema: GetSetupIntentsOutput,
}));
