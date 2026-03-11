import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPaymentMethodConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    application: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/payment_method_configurations",
      contentType: "form-urlencoded",
    }),
  );
export type GetPaymentMethodConfigurationsInput =
  typeof GetPaymentMethodConfigurationsInput.Type;

// Output Schema
export const GetPaymentMethodConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        acss_debit: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        active: Schema.Boolean,
        affirm: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        afterpay_clearpay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        alipay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        alma: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        amazon_pay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        apple_pay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        application: Schema.NullOr(Schema.String),
        au_becs_debit: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        bacs_debit: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        bancontact: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        billie: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        blik: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        boleto: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        card: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        cartes_bancaires: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        cashapp: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        crypto: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        customer_balance: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        eps: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        fpx: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        giropay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        google_pay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        grabpay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        id: Schema.String,
        ideal: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        is_default: Schema.Boolean,
        jcb: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        kakao_pay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        klarna: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        konbini: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        kr_card: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        link: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        livemode: Schema.Boolean,
        mb_way: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        mobilepay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        multibanco: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        name: Schema.String,
        naver_pay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        nz_bank_account: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        object: Schema.Literals(["payment_method_configuration"]),
        oxxo: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        p24: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        parent: Schema.NullOr(Schema.String),
        pay_by_bank: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        payco: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        paynow: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        paypal: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        payto: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        pix: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        promptpay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        revolut_pay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        samsung_pay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        satispay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        sepa_debit: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        sofort: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        swish: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        twint: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        us_bank_account: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        wechat_pay: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
        zip: Schema.optional(
          Schema.Struct({
            available: Schema.Boolean,
            display_preference: Schema.Struct({
              overridable: Schema.NullOr(Schema.Boolean),
              preference: Schema.Literals(["none", "off", "on"]),
              value: Schema.Literals(["off", "on"]),
            }),
          }),
        ),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetPaymentMethodConfigurationsOutput =
  typeof GetPaymentMethodConfigurationsOutput.Type;

// The operation
/**
 * List payment method configurations
 *
 * <p>List payment method configurations</p>
 *
 * @param application - The Connect application to filter by.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetPaymentMethodConfigurations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetPaymentMethodConfigurationsInput,
    outputSchema: GetPaymentMethodConfigurationsOutput,
  }));
