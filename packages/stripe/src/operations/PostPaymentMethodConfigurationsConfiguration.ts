import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPaymentMethodConfigurationsConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    configuration: Schema.String.pipe(T.PathParam()),
    acss_debit: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    active: Schema.optional(Schema.Boolean),
    affirm: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    afterpay_clearpay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    alipay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    alma: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    amazon_pay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    apple_pay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    apple_pay_later: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    au_becs_debit: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    bacs_debit: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    bancontact: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    billie: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    blik: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    boleto: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    card: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    cartes_bancaires: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    cashapp: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    crypto: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    customer_balance: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    eps: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    fpx: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    fr_meal_voucher_conecs: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    giropay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    google_pay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    grabpay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    ideal: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    jcb: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    kakao_pay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    klarna: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    konbini: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    kr_card: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    link: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    mb_way: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    mobilepay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    multibanco: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    name: Schema.optional(Schema.String),
    naver_pay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    nz_bank_account: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    oxxo: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    p24: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    pay_by_bank: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    payco: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    paynow: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    paypal: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    payto: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    pix: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    promptpay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    revolut_pay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    samsung_pay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    satispay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    sepa_debit: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    sofort: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    swish: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    twint: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    us_bank_account: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    wechat_pay: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
    zip: Schema.optional(
      Schema.Struct({
        display_preference: Schema.optional(
          Schema.Struct({
            preference: Schema.optional(Schema.Literals(["none", "off", "on"])),
          }),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payment_method_configurations/{configuration}",
      contentType: "form-urlencoded",
    }),
  );
export type PostPaymentMethodConfigurationsConfigurationInput =
  typeof PostPaymentMethodConfigurationsConfigurationInput.Type;

// Output Schema
export const PostPaymentMethodConfigurationsConfigurationOutput =
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
export type PostPaymentMethodConfigurationsConfigurationOutput =
  typeof PostPaymentMethodConfigurationsConfigurationOutput.Type;

// The operation
/**
 * Update payment method configuration
 *
 * <p>Update payment method configuration</p>
 */
export const PostPaymentMethodConfigurationsConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostPaymentMethodConfigurationsConfigurationInput,
    outputSchema: PostPaymentMethodConfigurationsConfigurationOutput,
  }));
