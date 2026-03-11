import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPaymentMethodConfigurationsConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configuration: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/payment_method_configurations/{configuration}",
      contentType: "form-urlencoded",
    }),
  );
export type GetPaymentMethodConfigurationsConfigurationInput =
  typeof GetPaymentMethodConfigurationsConfigurationInput.Type;

// Output Schema
export const GetPaymentMethodConfigurationsConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetPaymentMethodConfigurationsConfigurationOutput =
  typeof GetPaymentMethodConfigurationsConfigurationOutput.Type;

// The operation
/**
 * Retrieve payment method configuration
 *
 * <p>Retrieve payment method configuration</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetPaymentMethodConfigurationsConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetPaymentMethodConfigurationsConfigurationInput,
    outputSchema: GetPaymentMethodConfigurationsConfigurationOutput,
  }));
