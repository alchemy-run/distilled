import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBillingPortalSessionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configuration: Schema.optional(Schema.String),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    flow_data: Schema.optional(
      Schema.Struct({
        after_completion: Schema.optional(
          Schema.Struct({
            hosted_confirmation: Schema.optional(
              Schema.Struct({
                custom_message: Schema.optional(Schema.String),
              }),
            ),
            redirect: Schema.optional(
              Schema.Struct({
                return_url: Schema.String,
              }),
            ),
            type: Schema.Literals([
              "hosted_confirmation",
              "portal_homepage",
              "redirect",
            ]),
          }),
        ),
        subscription_cancel: Schema.optional(
          Schema.Struct({
            retention: Schema.optional(
              Schema.Struct({
                coupon_offer: Schema.Struct({
                  coupon: Schema.String,
                }),
                type: Schema.Literals(["coupon_offer"]),
              }),
            ),
            subscription: Schema.String,
          }),
        ),
        subscription_update: Schema.optional(
          Schema.Struct({
            subscription: Schema.String,
          }),
        ),
        subscription_update_confirm: Schema.optional(
          Schema.Struct({
            discounts: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  coupon: Schema.optional(Schema.String),
                  promotion_code: Schema.optional(Schema.String),
                }),
              ),
            ),
            items: Schema.Array(
              Schema.Struct({
                id: Schema.String,
                price: Schema.optional(Schema.String),
                quantity: Schema.optional(Schema.Number),
              }),
            ),
            subscription: Schema.String,
          }),
        ),
        type: Schema.Literals([
          "payment_method_update",
          "subscription_cancel",
          "subscription_update",
          "subscription_update_confirm",
        ]),
      }),
    ),
    locale: Schema.optional(
      Schema.Literals([
        "auto",
        "bg",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "en-AU",
        "en-CA",
        "en-GB",
        "en-IE",
        "en-IN",
        "en-NZ",
        "en-SG",
        "es",
        "es-419",
        "et",
        "fi",
        "fil",
        "fr",
        "fr-CA",
        "hr",
        "hu",
        "id",
        "it",
        "ja",
        "ko",
        "lt",
        "lv",
        "ms",
        "mt",
        "nb",
        "nl",
        "pl",
        "pt",
        "pt-BR",
        "ro",
        "ru",
        "sk",
        "sl",
        "sv",
        "th",
        "tr",
        "vi",
        "zh",
        "zh-HK",
        "zh-TW",
      ]),
    ),
    on_behalf_of: Schema.optional(Schema.String),
    return_url: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/billing_portal/sessions",
      contentType: "form-urlencoded",
    }),
  );
export type PostBillingPortalSessionsInput =
  typeof PostBillingPortalSessionsInput.Type;

// Output Schema
export const PostBillingPortalSessionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configuration: Schema.Unknown,
    created: Schema.Number,
    customer: Schema.String,
    customer_account: Schema.NullOr(Schema.String),
    flow: Schema.Unknown,
    id: Schema.String,
    livemode: Schema.Boolean,
    locale: Schema.NullOr(
      Schema.Literals([
        "auto",
        "bg",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "en-AU",
        "en-CA",
        "en-GB",
        "en-IE",
        "en-IN",
        "en-NZ",
        "en-SG",
        "es",
        "es-419",
        "et",
        "fi",
        "fil",
        "fr",
        "fr-CA",
        "hr",
        "hu",
        "id",
        "it",
        "ja",
        "ko",
        "lt",
        "lv",
        "ms",
        "mt",
        "nb",
        "nl",
        "pl",
        "pt",
        "pt-BR",
        "ro",
        "ru",
        "sk",
        "sl",
        "sv",
        "th",
        "tr",
        "vi",
        "zh",
        "zh-HK",
        "zh-TW",
      ]),
    ),
    object: Schema.Literals(["billing_portal.session"]),
    on_behalf_of: Schema.NullOr(Schema.String),
    return_url: Schema.NullOr(Schema.String),
    url: Schema.String,
  });
export type PostBillingPortalSessionsOutput =
  typeof PostBillingPortalSessionsOutput.Type;

// The operation
/**
 * Create a portal session
 *
 * <p>Creates a session of the customer portal.</p>
 */
export const PostBillingPortalSessions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostBillingPortalSessionsInput,
    outputSchema: PostBillingPortalSessionsOutput,
  }),
);
