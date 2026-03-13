import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const PostCheckoutSessionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    adaptive_pricing: Schema.optional(
      Schema.Struct({
        enabled: Schema.optional(Schema.Boolean),
      }),
    ),
    after_expiration: Schema.optional(
      Schema.Struct({
        recovery: Schema.optional(
          Schema.Struct({
            allow_promotion_codes: Schema.optional(Schema.Boolean),
            enabled: Schema.Boolean,
          }),
        ),
      }),
    ),
    allow_promotion_codes: Schema.optional(Schema.Boolean),
    automatic_tax: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
        liability: Schema.optional(
          Schema.Struct({
            account: Schema.optional(Schema.String),
            type: Schema.Literals(["account", "self"]),
          }),
        ),
      }),
    ),
    billing_address_collection: Schema.optional(
      Schema.Literals(["auto", "required"]),
    ),
    branding_settings: Schema.optional(
      Schema.Struct({
        background_color: Schema.optional(Schema.Unknown),
        border_style: Schema.optional(
          Schema.Literals(["", "pill", "rectangular", "rounded"]),
        ),
        button_color: Schema.optional(Schema.Unknown),
        display_name: Schema.optional(Schema.String),
        font_family: Schema.optional(
          Schema.Literals([
            "",
            "be_vietnam_pro",
            "bitter",
            "chakra_petch",
            "default",
            "hahmlet",
            "inconsolata",
            "inter",
            "lato",
            "lora",
            "m_plus_1_code",
            "montserrat",
            "noto_sans",
            "noto_sans_jp",
            "noto_serif",
            "nunito",
            "open_sans",
            "pridi",
            "pt_sans",
            "pt_serif",
            "raleway",
            "roboto",
            "roboto_slab",
            "source_sans_pro",
            "titillium_web",
            "ubuntu_mono",
            "zen_maru_gothic",
          ]),
        ),
        icon: Schema.optional(
          Schema.Struct({
            file: Schema.optional(Schema.String),
            type: Schema.Literals(["file", "url"]),
            url: Schema.optional(Schema.String),
          }),
        ),
        logo: Schema.optional(
          Schema.Struct({
            file: Schema.optional(Schema.String),
            type: Schema.Literals(["file", "url"]),
            url: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    cancel_url: Schema.optional(Schema.String),
    client_reference_id: Schema.optional(Schema.String),
    consent_collection: Schema.optional(
      Schema.Struct({
        payment_method_reuse_agreement: Schema.optional(
          Schema.Struct({
            position: Schema.Literals(["auto", "hidden"]),
          }),
        ),
        promotions: Schema.optional(Schema.Literals(["auto", "none"])),
        terms_of_service: Schema.optional(
          Schema.Literals(["none", "required"]),
        ),
      }),
    ),
    currency: Schema.optional(Schema.String),
    custom_fields: Schema.optional(
      Schema.Array(
        Schema.Struct({
          dropdown: Schema.optional(
            Schema.Struct({
              default_value: Schema.optional(Schema.String),
              options: Schema.Array(
                Schema.Struct({
                  label: Schema.String,
                  value: Schema.String,
                }),
              ),
            }),
          ),
          key: Schema.String,
          label: Schema.Struct({
            custom: Schema.String,
            type: Schema.Literals(["custom"]),
          }),
          numeric: Schema.optional(
            Schema.Struct({
              default_value: Schema.optional(Schema.String),
              maximum_length: Schema.optional(Schema.Number),
              minimum_length: Schema.optional(Schema.Number),
            }),
          ),
          optional: Schema.optional(Schema.Boolean),
          text: Schema.optional(
            Schema.Struct({
              default_value: Schema.optional(Schema.String),
              maximum_length: Schema.optional(Schema.Number),
              minimum_length: Schema.optional(Schema.Number),
            }),
          ),
          type: Schema.Literals(["dropdown", "numeric", "text"]),
        }),
      ),
    ),
    custom_text: Schema.optional(
      Schema.Struct({
        after_submit: Schema.optional(Schema.Unknown),
        shipping_address: Schema.optional(Schema.Unknown),
        submit: Schema.optional(Schema.Unknown),
        terms_of_service_acceptance: Schema.optional(Schema.Unknown),
      }),
    ),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    customer_creation: Schema.optional(
      Schema.Literals(["always", "if_required"]),
    ),
    customer_email: Schema.optional(Schema.String),
    customer_update: Schema.optional(
      Schema.Struct({
        address: Schema.optional(Schema.Literals(["auto", "never"])),
        name: Schema.optional(Schema.Literals(["auto", "never"])),
        shipping: Schema.optional(Schema.Literals(["auto", "never"])),
      }),
    ),
    discounts: Schema.optional(
      Schema.Array(
        Schema.Struct({
          coupon: Schema.optional(Schema.String),
          promotion_code: Schema.optional(Schema.String),
        }),
      ),
    ),
    excluded_payment_method_types: Schema.optional(
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
    expand: Schema.optional(Schema.Array(Schema.String)),
    expires_at: Schema.optional(Schema.Number),
    invoice_creation: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
        invoice_data: Schema.optional(
          Schema.Struct({
            account_tax_ids: Schema.optional(Schema.Unknown),
            custom_fields: Schema.optional(Schema.Unknown),
            description: Schema.optional(Schema.String),
            footer: Schema.optional(Schema.String),
            issuer: Schema.optional(
              Schema.Struct({
                account: Schema.optional(Schema.String),
                type: Schema.Literals(["account", "self"]),
              }),
            ),
            metadata: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            rendering_options: Schema.optional(Schema.Unknown),
          }),
        ),
      }),
    ),
    line_items: Schema.optional(
      Schema.Array(
        Schema.Struct({
          adjustable_quantity: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
              maximum: Schema.optional(Schema.Number),
              minimum: Schema.optional(Schema.Number),
            }),
          ),
          dynamic_tax_rates: Schema.optional(Schema.Array(Schema.String)),
          metadata: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          price: Schema.optional(Schema.String),
          price_data: Schema.optional(
            Schema.Struct({
              currency: Schema.String,
              product: Schema.optional(Schema.String),
              product_data: Schema.optional(
                Schema.Struct({
                  description: Schema.optional(Schema.String),
                  images: Schema.optional(Schema.Array(Schema.String)),
                  metadata: Schema.optional(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  name: Schema.String,
                  tax_code: Schema.optional(Schema.String),
                  unit_label: Schema.optional(Schema.String),
                }),
              ),
              recurring: Schema.optional(
                Schema.Struct({
                  interval: Schema.Literals(["day", "month", "week", "year"]),
                  interval_count: Schema.optional(Schema.Number),
                }),
              ),
              tax_behavior: Schema.optional(
                Schema.Literals(["exclusive", "inclusive", "unspecified"]),
              ),
              unit_amount: Schema.optional(Schema.Number),
              unit_amount_decimal: Schema.optional(Schema.String),
            }),
          ),
          quantity: Schema.optional(Schema.Number),
          tax_rates: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
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
        "en-GB",
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
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    mode: Schema.optional(
      Schema.Literals(["payment", "setup", "subscription"]),
    ),
    name_collection: Schema.optional(
      Schema.Struct({
        business: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            optional: Schema.optional(Schema.Boolean),
          }),
        ),
        individual: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            optional: Schema.optional(Schema.Boolean),
          }),
        ),
      }),
    ),
    optional_items: Schema.optional(
      Schema.Array(
        Schema.Struct({
          adjustable_quantity: Schema.optional(
            Schema.Struct({
              enabled: Schema.Boolean,
              maximum: Schema.optional(Schema.Number),
              minimum: Schema.optional(Schema.Number),
            }),
          ),
          price: Schema.String,
          quantity: Schema.Number,
        }),
      ),
    ),
    origin_context: Schema.optional(Schema.Literals(["mobile_app", "web"])),
    payment_intent_data: Schema.optional(
      Schema.Struct({
        application_fee_amount: Schema.optional(Schema.Number),
        capture_method: Schema.optional(
          Schema.Literals(["automatic", "automatic_async", "manual"]),
        ),
        description: Schema.optional(Schema.String),
        metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        on_behalf_of: Schema.optional(Schema.String),
        receipt_email: Schema.optional(Schema.String),
        setup_future_usage: Schema.optional(
          Schema.Literals(["off_session", "on_session"]),
        ),
        shipping: Schema.optional(
          Schema.Struct({
            address: Schema.Struct({
              city: Schema.optional(Schema.String),
              country: Schema.optional(Schema.String),
              line1: Schema.String,
              line2: Schema.optional(Schema.String),
              postal_code: Schema.optional(Schema.String),
              state: Schema.optional(Schema.String),
            }),
            carrier: Schema.optional(Schema.String),
            name: Schema.String,
            phone: Schema.optional(Schema.String),
            tracking_number: Schema.optional(Schema.String),
          }),
        ),
        statement_descriptor: Schema.optional(Schema.String),
        statement_descriptor_suffix: Schema.optional(Schema.String),
        transfer_data: Schema.optional(
          Schema.Struct({
            amount: Schema.optional(Schema.Number),
            destination: Schema.String,
          }),
        ),
        transfer_group: Schema.optional(Schema.String),
      }),
    ),
    payment_method_collection: Schema.optional(
      Schema.Literals(["always", "if_required"]),
    ),
    payment_method_configuration: Schema.optional(Schema.String),
    payment_method_data: Schema.optional(
      Schema.Struct({
        allow_redisplay: Schema.optional(
          Schema.Literals(["always", "limited", "unspecified"]),
        ),
      }),
    ),
    payment_method_options: Schema.optional(
      Schema.Struct({
        acss_debit: Schema.optional(
          Schema.Struct({
            currency: Schema.optional(Schema.Literals(["cad", "usd"])),
            mandate_options: Schema.optional(
              Schema.Struct({
                custom_mandate_url: Schema.optional(Schema.Unknown),
                default_for: Schema.optional(
                  Schema.Array(Schema.Literals(["invoice", "subscription"])),
                ),
                interval_description: Schema.optional(Schema.String),
                payment_schedule: Schema.optional(
                  Schema.Literals(["combined", "interval", "sporadic"]),
                ),
                transaction_type: Schema.optional(
                  Schema.Literals(["business", "personal"]),
                ),
              }),
            ),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session", "on_session"]),
            ),
            target_date: Schema.optional(Schema.String),
            verification_method: Schema.optional(
              Schema.Literals(["automatic", "instant", "microdeposits"]),
            ),
          }),
        ),
        affirm: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        afterpay_clearpay: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        alipay: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        alma: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
          }),
        ),
        amazon_pay: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session"]),
            ),
          }),
        ),
        au_becs_debit: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
            target_date: Schema.optional(Schema.String),
          }),
        ),
        bacs_debit: Schema.optional(
          Schema.Struct({
            mandate_options: Schema.optional(
              Schema.Struct({
                reference_prefix: Schema.optional(Schema.Unknown),
              }),
            ),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session", "on_session"]),
            ),
            target_date: Schema.optional(Schema.String),
          }),
        ),
        bancontact: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        billie: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
          }),
        ),
        boleto: Schema.optional(
          Schema.Struct({
            expires_after_days: Schema.optional(Schema.Number),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session", "on_session"]),
            ),
          }),
        ),
        card: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            installments: Schema.optional(
              Schema.Struct({
                enabled: Schema.optional(Schema.Boolean),
              }),
            ),
            request_extended_authorization: Schema.optional(
              Schema.Literals(["if_available", "never"]),
            ),
            request_incremental_authorization: Schema.optional(
              Schema.Literals(["if_available", "never"]),
            ),
            request_multicapture: Schema.optional(
              Schema.Literals(["if_available", "never"]),
            ),
            request_overcapture: Schema.optional(
              Schema.Literals(["if_available", "never"]),
            ),
            request_three_d_secure: Schema.optional(
              Schema.Literals(["any", "automatic", "challenge"]),
            ),
            restrictions: Schema.optional(
              Schema.Struct({
                brands_blocked: Schema.optional(
                  Schema.Array(
                    Schema.Literals([
                      "american_express",
                      "discover_global_network",
                      "mastercard",
                      "visa",
                    ]),
                  ),
                ),
              }),
            ),
            setup_future_usage: Schema.optional(
              Schema.Literals(["off_session", "on_session"]),
            ),
            statement_descriptor_suffix_kana: Schema.optional(Schema.String),
            statement_descriptor_suffix_kanji: Schema.optional(Schema.String),
          }),
        ),
        cashapp: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session", "on_session"]),
            ),
          }),
        ),
        customer_balance: Schema.optional(
          Schema.Struct({
            bank_transfer: Schema.optional(
              Schema.Struct({
                eu_bank_transfer: Schema.optional(
                  Schema.Struct({
                    country: Schema.String,
                  }),
                ),
                requested_address_types: Schema.optional(
                  Schema.Array(
                    Schema.Literals([
                      "aba",
                      "iban",
                      "sepa",
                      "sort_code",
                      "spei",
                      "swift",
                      "zengin",
                    ]),
                  ),
                ),
                type: Schema.Literals([
                  "eu_bank_transfer",
                  "gb_bank_transfer",
                  "jp_bank_transfer",
                  "mx_bank_transfer",
                  "us_bank_transfer",
                ]),
              }),
            ),
            funding_type: Schema.optional(Schema.Literals(["bank_transfer"])),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        demo_pay: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session"]),
            ),
          }),
        ),
        eps: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        fpx: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        giropay: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        grabpay: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        ideal: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        kakao_pay: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session"]),
            ),
          }),
        ),
        klarna: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
            subscriptions: Schema.optional(Schema.Unknown),
          }),
        ),
        konbini: Schema.optional(
          Schema.Struct({
            expires_after_days: Schema.optional(Schema.Number),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        kr_card: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session"]),
            ),
          }),
        ),
        link: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session"]),
            ),
          }),
        ),
        mobilepay: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        multibanco: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        naver_pay: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session"]),
            ),
          }),
        ),
        oxxo: Schema.optional(
          Schema.Struct({
            expires_after_days: Schema.optional(Schema.Number),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        p24: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
            tos_shown_and_accepted: Schema.optional(Schema.Boolean),
          }),
        ),
        pay_by_bank: Schema.optional(Schema.Struct({})),
        payco: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
          }),
        ),
        paynow: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        paypal: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["", "manual"])),
            preferred_locale: Schema.optional(
              Schema.Literals([
                "cs-CZ",
                "da-DK",
                "de-AT",
                "de-DE",
                "de-LU",
                "el-GR",
                "en-GB",
                "en-US",
                "es-ES",
                "fi-FI",
                "fr-BE",
                "fr-FR",
                "fr-LU",
                "hu-HU",
                "it-IT",
                "nl-BE",
                "nl-NL",
                "pl-PL",
                "pt-PT",
                "sk-SK",
                "sv-SE",
              ]),
            ),
            reference: Schema.optional(Schema.String),
            risk_correlation_id: Schema.optional(Schema.String),
            setup_future_usage: Schema.optional(
              Schema.Literals(["", "none", "off_session"]),
            ),
          }),
        ),
        payto: Schema.optional(
          Schema.Struct({
            mandate_options: Schema.optional(
              Schema.Struct({
                amount: Schema.optional(Schema.Unknown),
                amount_type: Schema.optional(
                  Schema.Literals(["", "fixed", "maximum"]),
                ),
                end_date: Schema.optional(Schema.Unknown),
                payment_schedule: Schema.optional(
                  Schema.Literals([
                    "",
                    "adhoc",
                    "annual",
                    "daily",
                    "fortnightly",
                    "monthly",
                    "quarterly",
                    "semi_annual",
                    "weekly",
                  ]),
                ),
                payments_per_period: Schema.optional(Schema.Unknown),
                purpose: Schema.optional(
                  Schema.Literals([
                    "",
                    "dependant_support",
                    "government",
                    "loan",
                    "mortgage",
                    "other",
                    "pension",
                    "personal",
                    "retail",
                    "salary",
                    "tax",
                    "utility",
                  ]),
                ),
                start_date: Schema.optional(Schema.Unknown),
              }),
            ),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session"]),
            ),
          }),
        ),
        pix: Schema.optional(
          Schema.Struct({
            amount_includes_iof: Schema.optional(
              Schema.Literals(["always", "never"]),
            ),
            expires_after_seconds: Schema.optional(Schema.Number),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        revolut_pay: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session"]),
            ),
          }),
        ),
        samsung_pay: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
          }),
        ),
        satispay: Schema.optional(
          Schema.Struct({
            capture_method: Schema.optional(Schema.Literals(["manual"])),
          }),
        ),
        sepa_debit: Schema.optional(
          Schema.Struct({
            mandate_options: Schema.optional(
              Schema.Struct({
                reference_prefix: Schema.optional(Schema.Unknown),
              }),
            ),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session", "on_session"]),
            ),
            target_date: Schema.optional(Schema.String),
          }),
        ),
        sofort: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        swish: Schema.optional(
          Schema.Struct({
            reference: Schema.optional(Schema.String),
          }),
        ),
        twint: Schema.optional(
          Schema.Struct({
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
        us_bank_account: Schema.optional(
          Schema.Struct({
            financial_connections: Schema.optional(
              Schema.Struct({
                permissions: Schema.optional(
                  Schema.Array(
                    Schema.Literals([
                      "balances",
                      "ownership",
                      "payment_method",
                      "transactions",
                    ]),
                  ),
                ),
                prefetch: Schema.optional(
                  Schema.Array(
                    Schema.Literals(["balances", "ownership", "transactions"]),
                  ),
                ),
              }),
            ),
            setup_future_usage: Schema.optional(
              Schema.Literals(["none", "off_session", "on_session"]),
            ),
            target_date: Schema.optional(Schema.String),
            verification_method: Schema.optional(
              Schema.Literals(["automatic", "instant"]),
            ),
          }),
        ),
        wechat_pay: Schema.optional(
          Schema.Struct({
            app_id: Schema.optional(Schema.String),
            client: Schema.Literals(["android", "ios", "web"]),
            setup_future_usage: Schema.optional(Schema.Literals(["none"])),
          }),
        ),
      }),
    ),
    payment_method_types: Schema.optional(
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
          "link",
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
    permissions: Schema.optional(
      Schema.Struct({
        update_shipping_details: Schema.optional(
          Schema.Literals(["client_only", "server_only"]),
        ),
      }),
    ),
    phone_number_collection: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
      }),
    ),
    redirect_on_completion: Schema.optional(
      Schema.Literals(["always", "if_required", "never"]),
    ),
    return_url: Schema.optional(Schema.String),
    saved_payment_method_options: Schema.optional(
      Schema.Struct({
        allow_redisplay_filters: Schema.optional(
          Schema.Array(Schema.Literals(["always", "limited", "unspecified"])),
        ),
        payment_method_remove: Schema.optional(
          Schema.Literals(["disabled", "enabled"]),
        ),
        payment_method_save: Schema.optional(
          Schema.Literals(["disabled", "enabled"]),
        ),
      }),
    ),
    setup_intent_data: Schema.optional(
      Schema.Struct({
        description: Schema.optional(Schema.String),
        metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        on_behalf_of: Schema.optional(Schema.String),
      }),
    ),
    shipping_address_collection: Schema.optional(
      Schema.Struct({
        allowed_countries: Schema.Array(
          Schema.Literals([
            "AC",
            "AD",
            "AE",
            "AF",
            "AG",
            "AI",
            "AL",
            "AM",
            "AO",
            "AQ",
            "AR",
            "AT",
            "AU",
            "AW",
            "AX",
            "AZ",
            "BA",
            "BB",
            "BD",
            "BE",
            "BF",
            "BG",
            "BH",
            "BI",
            "BJ",
            "BL",
            "BM",
            "BN",
            "BO",
            "BQ",
            "BR",
            "BS",
            "BT",
            "BV",
            "BW",
            "BY",
            "BZ",
            "CA",
            "CD",
            "CF",
            "CG",
            "CH",
            "CI",
            "CK",
            "CL",
            "CM",
            "CN",
            "CO",
            "CR",
            "CV",
            "CW",
            "CY",
            "CZ",
            "DE",
            "DJ",
            "DK",
            "DM",
            "DO",
            "DZ",
            "EC",
            "EE",
            "EG",
            "EH",
            "ER",
            "ES",
            "ET",
            "FI",
            "FJ",
            "FK",
            "FO",
            "FR",
            "GA",
            "GB",
            "GD",
            "GE",
            "GF",
            "GG",
            "GH",
            "GI",
            "GL",
            "GM",
            "GN",
            "GP",
            "GQ",
            "GR",
            "GS",
            "GT",
            "GU",
            "GW",
            "GY",
            "HK",
            "HN",
            "HR",
            "HT",
            "HU",
            "ID",
            "IE",
            "IL",
            "IM",
            "IN",
            "IO",
            "IQ",
            "IS",
            "IT",
            "JE",
            "JM",
            "JO",
            "JP",
            "KE",
            "KG",
            "KH",
            "KI",
            "KM",
            "KN",
            "KR",
            "KW",
            "KY",
            "KZ",
            "LA",
            "LB",
            "LC",
            "LI",
            "LK",
            "LR",
            "LS",
            "LT",
            "LU",
            "LV",
            "LY",
            "MA",
            "MC",
            "MD",
            "ME",
            "MF",
            "MG",
            "MK",
            "ML",
            "MM",
            "MN",
            "MO",
            "MQ",
            "MR",
            "MS",
            "MT",
            "MU",
            "MV",
            "MW",
            "MX",
            "MY",
            "MZ",
            "NA",
            "NC",
            "NE",
            "NG",
            "NI",
            "NL",
            "NO",
            "NP",
            "NR",
            "NU",
            "NZ",
            "OM",
            "PA",
            "PE",
            "PF",
            "PG",
            "PH",
            "PK",
            "PL",
            "PM",
            "PN",
            "PR",
            "PS",
            "PT",
            "PY",
            "QA",
            "RE",
            "RO",
            "RS",
            "RU",
            "RW",
            "SA",
            "SB",
            "SC",
            "SD",
            "SE",
            "SG",
            "SH",
            "SI",
            "SJ",
            "SK",
            "SL",
            "SM",
            "SN",
            "SO",
            "SR",
            "SS",
            "ST",
            "SV",
            "SX",
            "SZ",
            "TA",
            "TC",
            "TD",
            "TF",
            "TG",
            "TH",
            "TJ",
            "TK",
            "TL",
            "TM",
            "TN",
            "TO",
            "TR",
            "TT",
            "TV",
            "TW",
            "TZ",
            "UA",
            "UG",
            "US",
            "UY",
            "UZ",
            "VA",
            "VC",
            "VE",
            "VG",
            "VN",
            "VU",
            "WF",
            "WS",
            "XK",
            "YE",
            "YT",
            "ZA",
            "ZM",
            "ZW",
            "ZZ",
          ]),
        ),
      }),
    ),
    shipping_options: Schema.optional(
      Schema.Array(
        Schema.Struct({
          shipping_rate: Schema.optional(Schema.String),
          shipping_rate_data: Schema.optional(
            Schema.Struct({
              delivery_estimate: Schema.optional(
                Schema.Struct({
                  maximum: Schema.optional(
                    Schema.Struct({
                      unit: Schema.Literals([
                        "business_day",
                        "day",
                        "hour",
                        "month",
                        "week",
                      ]),
                      value: Schema.Number,
                    }),
                  ),
                  minimum: Schema.optional(
                    Schema.Struct({
                      unit: Schema.Literals([
                        "business_day",
                        "day",
                        "hour",
                        "month",
                        "week",
                      ]),
                      value: Schema.Number,
                    }),
                  ),
                }),
              ),
              display_name: Schema.String,
              fixed_amount: Schema.optional(
                Schema.Struct({
                  amount: Schema.Number,
                  currency: Schema.String,
                  currency_options: Schema.optional(
                    Schema.Record(
                      Schema.String,
                      Schema.Struct({
                        amount: Schema.Number,
                        tax_behavior: Schema.optional(
                          Schema.Literals([
                            "exclusive",
                            "inclusive",
                            "unspecified",
                          ]),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
              metadata: Schema.optional(
                Schema.Record(Schema.String, Schema.String),
              ),
              tax_behavior: Schema.optional(
                Schema.Literals(["exclusive", "inclusive", "unspecified"]),
              ),
              tax_code: Schema.optional(Schema.String),
              type: Schema.optional(Schema.Literals(["fixed_amount"])),
            }),
          ),
        }),
      ),
    ),
    submit_type: Schema.optional(
      Schema.Literals(["auto", "book", "donate", "pay", "subscribe"]),
    ),
    subscription_data: Schema.optional(
      Schema.Struct({
        application_fee_percent: Schema.optional(Schema.Number),
        billing_cycle_anchor: Schema.optional(Schema.Number),
        billing_mode: Schema.optional(
          Schema.Struct({
            flexible: Schema.optional(
              Schema.Struct({
                proration_discounts: Schema.optional(
                  Schema.Literals(["included", "itemized"]),
                ),
              }),
            ),
            type: Schema.Literals(["classic", "flexible"]),
          }),
        ),
        default_tax_rates: Schema.optional(Schema.Array(Schema.String)),
        description: Schema.optional(Schema.String),
        invoice_settings: Schema.optional(
          Schema.Struct({
            issuer: Schema.optional(
              Schema.Struct({
                account: Schema.optional(Schema.String),
                type: Schema.Literals(["account", "self"]),
              }),
            ),
          }),
        ),
        metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        on_behalf_of: Schema.optional(Schema.String),
        proration_behavior: Schema.optional(
          Schema.Literals(["create_prorations", "none"]),
        ),
        transfer_data: Schema.optional(
          Schema.Struct({
            amount_percent: Schema.optional(Schema.Number),
            destination: Schema.String,
          }),
        ),
        trial_end: Schema.optional(Schema.Number),
        trial_period_days: Schema.optional(Schema.Number),
        trial_settings: Schema.optional(
          Schema.Struct({
            end_behavior: Schema.Struct({
              missing_payment_method: Schema.Literals([
                "cancel",
                "create_invoice",
                "pause",
              ]),
            }),
          }),
        ),
      }),
    ),
    success_url: Schema.optional(Schema.String),
    tax_id_collection: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
        required: Schema.optional(Schema.Literals(["if_supported", "never"])),
      }),
    ),
    ui_mode: Schema.optional(Schema.Literals(["custom", "embedded", "hosted"])),
    wallet_options: Schema.optional(
      Schema.Struct({
        link: Schema.optional(
          Schema.Struct({
            display: Schema.optional(Schema.Literals(["auto", "never"])),
          }),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/checkout/sessions",
      contentType: "form-urlencoded",
    }),
  );
export type PostCheckoutSessionsInput = typeof PostCheckoutSessionsInput.Type;

// Output Schema
export const PostCheckoutSessionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    adaptive_pricing: Schema.Unknown,
    after_expiration: Schema.Unknown,
    allow_promotion_codes: Schema.NullOr(Schema.Boolean),
    amount_subtotal: Schema.NullOr(Schema.Number),
    amount_total: Schema.NullOr(Schema.Number),
    automatic_tax: Schema.Struct({
      enabled: Schema.Boolean,
      liability: Schema.Unknown,
      provider: Schema.NullOr(Schema.String),
      status: Schema.NullOr(
        Schema.Literals(["complete", "failed", "requires_location_inputs"]),
      ),
    }),
    billing_address_collection: Schema.NullOr(
      Schema.Literals(["auto", "required"]),
    ),
    branding_settings: Schema.optional(
      Schema.Struct({
        background_color: Schema.String,
        border_style: Schema.Literals(["pill", "rectangular", "rounded"]),
        button_color: Schema.String,
        display_name: Schema.String,
        font_family: Schema.String,
        icon: Schema.Unknown,
        logo: Schema.Unknown,
      }),
    ),
    cancel_url: Schema.NullOr(Schema.String),
    client_reference_id: Schema.NullOr(Schema.String),
    client_secret: SensitiveNullableString,
    collected_information: Schema.Unknown,
    consent: Schema.Unknown,
    consent_collection: Schema.Unknown,
    created: Schema.Number,
    currency: Schema.NullOr(Schema.String),
    currency_conversion: Schema.Unknown,
    custom_fields: Schema.Array(
      Schema.Struct({
        dropdown: Schema.optional(
          Schema.Struct({
            default_value: Schema.NullOr(Schema.String),
            options: Schema.Array(
              Schema.Struct({
                label: Schema.String,
                value: Schema.String,
              }),
            ),
            value: Schema.NullOr(Schema.String),
          }),
        ),
        key: Schema.String,
        label: Schema.Struct({
          custom: Schema.NullOr(Schema.String),
          type: Schema.Literals(["custom"]),
        }),
        numeric: Schema.optional(
          Schema.Struct({
            default_value: Schema.NullOr(Schema.String),
            maximum_length: Schema.NullOr(Schema.Number),
            minimum_length: Schema.NullOr(Schema.Number),
            value: Schema.NullOr(Schema.String),
          }),
        ),
        optional: Schema.Boolean,
        text: Schema.optional(
          Schema.Struct({
            default_value: Schema.NullOr(Schema.String),
            maximum_length: Schema.NullOr(Schema.Number),
            minimum_length: Schema.NullOr(Schema.Number),
            value: Schema.NullOr(Schema.String),
          }),
        ),
        type: Schema.Literals(["dropdown", "numeric", "text"]),
      }),
    ),
    custom_text: Schema.Struct({
      after_submit: Schema.Unknown,
      shipping_address: Schema.Unknown,
      submit: Schema.Unknown,
      terms_of_service_acceptance: Schema.Unknown,
    }),
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    customer_creation: Schema.NullOr(
      Schema.Literals(["always", "if_required"]),
    ),
    customer_details: Schema.Unknown,
    customer_email: Schema.NullOr(Schema.String),
    discounts: Schema.NullOr(
      Schema.Array(
        Schema.Struct({
          coupon: Schema.Unknown,
          promotion_code: Schema.Unknown,
        }),
      ),
    ),
    excluded_payment_method_types: Schema.optional(Schema.Array(Schema.String)),
    expires_at: Schema.Number,
    id: Schema.String,
    invoice: Schema.Unknown,
    invoice_creation: Schema.Unknown,
    line_items: Schema.optional(
      Schema.Struct({
        data: Schema.Array(
          Schema.Struct({
            adjustable_quantity: Schema.Unknown,
            amount_discount: Schema.Number,
            amount_subtotal: Schema.Number,
            amount_tax: Schema.Number,
            amount_total: Schema.Number,
            currency: Schema.String,
            description: Schema.NullOr(Schema.String),
            discounts: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  amount: Schema.Number,
                  discount: Schema.Struct({
                    checkout_session: Schema.NullOr(Schema.String),
                    customer: Schema.Unknown,
                    customer_account: Schema.NullOr(Schema.String),
                    end: Schema.NullOr(Schema.Number),
                    id: Schema.String,
                    invoice: Schema.NullOr(Schema.String),
                    invoice_item: Schema.NullOr(Schema.String),
                    object: Schema.Literals(["discount"]),
                    promotion_code: Schema.Unknown,
                    source: Schema.Struct({
                      coupon: Schema.Unknown,
                      type: Schema.Literals(["coupon"]),
                    }),
                    start: Schema.Number,
                    subscription: Schema.NullOr(Schema.String),
                    subscription_item: Schema.NullOr(Schema.String),
                  }),
                }),
              ),
            ),
            id: Schema.String,
            metadata: Schema.NullOr(
              Schema.Record(Schema.String, Schema.String),
            ),
            object: Schema.Literals(["item"]),
            price: Schema.Unknown,
            quantity: Schema.NullOr(Schema.Number),
            taxes: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  amount: Schema.Number,
                  rate: Schema.Struct({
                    active: Schema.Boolean,
                    country: Schema.NullOr(Schema.String),
                    created: Schema.Number,
                    description: Schema.NullOr(Schema.String),
                    display_name: Schema.String,
                    effective_percentage: Schema.NullOr(Schema.Number),
                    flat_amount: Schema.Unknown,
                    id: Schema.String,
                    inclusive: Schema.Boolean,
                    jurisdiction: Schema.NullOr(Schema.String),
                    jurisdiction_level: Schema.NullOr(
                      Schema.Literals([
                        "city",
                        "country",
                        "county",
                        "district",
                        "multiple",
                        "state",
                      ]),
                    ),
                    livemode: Schema.Boolean,
                    metadata: Schema.NullOr(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    object: Schema.Literals(["tax_rate"]),
                    percentage: Schema.Number,
                    rate_type: Schema.NullOr(
                      Schema.Literals(["flat_amount", "percentage"]),
                    ),
                    state: Schema.NullOr(Schema.String),
                    tax_type: Schema.NullOr(
                      Schema.Literals([
                        "amusement_tax",
                        "communications_tax",
                        "gst",
                        "hst",
                        "igst",
                        "jct",
                        "lease_tax",
                        "pst",
                        "qst",
                        "retail_delivery_fee",
                        "rst",
                        "sales_tax",
                        "service_tax",
                        "vat",
                      ]),
                    ),
                  }),
                  taxability_reason: Schema.NullOr(
                    Schema.Literals([
                      "customer_exempt",
                      "not_collecting",
                      "not_subject_to_tax",
                      "not_supported",
                      "portion_product_exempt",
                      "portion_reduced_rated",
                      "portion_standard_rated",
                      "product_exempt",
                      "product_exempt_holiday",
                      "proportionally_rated",
                      "reduced_rated",
                      "reverse_charge",
                      "standard_rated",
                      "taxable_basis_reduced",
                      "zero_rated",
                    ]),
                  ),
                  taxable_amount: Schema.NullOr(Schema.Number),
                }),
              ),
            ),
          }),
        ),
        has_more: Schema.Boolean,
        object: Schema.Literals(["list"]),
        url: Schema.String,
      }),
    ),
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
        "en-GB",
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
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    mode: Schema.Literals(["payment", "setup", "subscription"]),
    name_collection: Schema.optional(
      Schema.Struct({
        business: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            optional: Schema.Boolean,
          }),
        ),
        individual: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            optional: Schema.Boolean,
          }),
        ),
      }),
    ),
    object: Schema.Literals(["checkout.session"]),
    optional_items: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            adjustable_quantity: Schema.Unknown,
            price: Schema.String,
            quantity: Schema.Number,
          }),
        ),
      ),
    ),
    origin_context: Schema.NullOr(Schema.Literals(["mobile_app", "web"])),
    payment_intent: Schema.Unknown,
    payment_link: Schema.Unknown,
    payment_method_collection: Schema.NullOr(
      Schema.Literals(["always", "if_required"]),
    ),
    payment_method_configuration_details: Schema.Unknown,
    payment_method_options: Schema.Unknown,
    payment_method_types: Schema.Array(Schema.String),
    payment_status: Schema.Literals(["no_payment_required", "paid", "unpaid"]),
    permissions: Schema.Unknown,
    phone_number_collection: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
      }),
    ),
    presentment_details: Schema.optional(
      Schema.Struct({
        presentment_amount: Schema.Number,
        presentment_currency: Schema.String,
      }),
    ),
    recovered_from: Schema.NullOr(Schema.String),
    redirect_on_completion: Schema.optional(
      Schema.Literals(["always", "if_required", "never"]),
    ),
    return_url: Schema.optional(Schema.String),
    saved_payment_method_options: Schema.Unknown,
    setup_intent: Schema.Unknown,
    shipping_address_collection: Schema.Unknown,
    shipping_cost: Schema.Unknown,
    shipping_options: Schema.Array(
      Schema.Struct({
        shipping_amount: Schema.Number,
        shipping_rate: Schema.Unknown,
      }),
    ),
    status: Schema.NullOr(Schema.Literals(["complete", "expired", "open"])),
    submit_type: Schema.NullOr(
      Schema.Literals(["auto", "book", "donate", "pay", "subscribe"]),
    ),
    subscription: Schema.Unknown,
    success_url: Schema.NullOr(Schema.String),
    tax_id_collection: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
        required: Schema.Literals(["if_supported", "never"]),
      }),
    ),
    total_details: Schema.Unknown,
    ui_mode: Schema.NullOr(Schema.Literals(["custom", "embedded", "hosted"])),
    url: Schema.NullOr(Schema.String),
    wallet_options: Schema.Unknown,
  });
export type PostCheckoutSessionsOutput = typeof PostCheckoutSessionsOutput.Type;

// The operation
/**
 * Create a Checkout Session
 *
 * <p>Creates a Checkout Session object.</p>
 */
export const PostCheckoutSessions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostCheckoutSessionsInput,
    outputSchema: PostCheckoutSessionsOutput,
  }),
);
