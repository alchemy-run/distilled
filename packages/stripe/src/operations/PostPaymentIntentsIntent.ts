import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const PostPaymentIntentsIntentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    intent: Schema.String.pipe(T.PathParam()),
    amount: Schema.optional(Schema.Number),
    amount_details: Schema.optional(Schema.Unknown),
    application_fee_amount: Schema.optional(Schema.Unknown),
    capture_method: Schema.optional(
      Schema.Literals(["automatic", "automatic_async", "manual"]),
    ),
    currency: Schema.optional(Schema.String),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    excluded_payment_method_types: Schema.optional(Schema.Unknown),
    expand: Schema.optional(Schema.Array(Schema.String)),
    hooks: Schema.optional(
      Schema.Struct({
        inputs: Schema.optional(
          Schema.Struct({
            tax: Schema.optional(
              Schema.Struct({
                calculation: Schema.Unknown,
              }),
            ),
          }),
        ),
      }),
    ),
    metadata: Schema.optional(Schema.Unknown),
    payment_details: Schema.optional(Schema.Unknown),
    payment_method: Schema.optional(Schema.String),
    payment_method_configuration: Schema.optional(Schema.String),
    payment_method_data: Schema.optional(
      Schema.Struct({
        acss_debit: Schema.optional(
          Schema.Struct({
            account_number: Schema.String,
            institution_number: Schema.String,
            transit_number: Schema.String,
          }),
        ),
        affirm: Schema.optional(Schema.Struct({})),
        afterpay_clearpay: Schema.optional(Schema.Struct({})),
        alipay: Schema.optional(Schema.Struct({})),
        allow_redisplay: Schema.optional(
          Schema.Literals(["always", "limited", "unspecified"]),
        ),
        alma: Schema.optional(Schema.Struct({})),
        amazon_pay: Schema.optional(Schema.Struct({})),
        au_becs_debit: Schema.optional(
          Schema.Struct({
            account_number: Schema.String,
            bsb_number: Schema.String,
          }),
        ),
        bacs_debit: Schema.optional(
          Schema.Struct({
            account_number: Schema.optional(Schema.String),
            sort_code: Schema.optional(Schema.String),
          }),
        ),
        bancontact: Schema.optional(Schema.Struct({})),
        billie: Schema.optional(Schema.Struct({})),
        billing_details: Schema.optional(
          Schema.Struct({
            address: Schema.optional(Schema.Unknown),
            email: Schema.optional(Schema.Unknown),
            name: Schema.optional(Schema.Unknown),
            phone: Schema.optional(Schema.Unknown),
            tax_id: Schema.optional(Schema.String),
          }),
        ),
        blik: Schema.optional(Schema.Struct({})),
        boleto: Schema.optional(
          Schema.Struct({
            tax_id: Schema.String,
          }),
        ),
        cashapp: Schema.optional(Schema.Struct({})),
        crypto: Schema.optional(Schema.Struct({})),
        customer_balance: Schema.optional(Schema.Struct({})),
        eps: Schema.optional(
          Schema.Struct({
            bank: Schema.optional(
              Schema.Literals([
                "arzte_und_apotheker_bank",
                "austrian_anadi_bank_ag",
                "bank_austria",
                "bankhaus_carl_spangler",
                "bankhaus_schelhammer_und_schattera_ag",
                "bawag_psk_ag",
                "bks_bank_ag",
                "brull_kallmus_bank_ag",
                "btv_vier_lander_bank",
                "capital_bank_grawe_gruppe_ag",
                "deutsche_bank_ag",
                "dolomitenbank",
                "easybank_ag",
                "erste_bank_und_sparkassen",
                "hypo_alpeadriabank_international_ag",
                "hypo_bank_burgenland_aktiengesellschaft",
                "hypo_noe_lb_fur_niederosterreich_u_wien",
                "hypo_oberosterreich_salzburg_steiermark",
                "hypo_tirol_bank_ag",
                "hypo_vorarlberg_bank_ag",
                "marchfelder_bank",
                "oberbank_ag",
                "raiffeisen_bankengruppe_osterreich",
                "schoellerbank_ag",
                "sparda_bank_wien",
                "volksbank_gruppe",
                "volkskreditbank_ag",
                "vr_bank_braunau",
              ]),
            ),
          }),
        ),
        fpx: Schema.optional(
          Schema.Struct({
            account_holder_type: Schema.optional(
              Schema.Literals(["company", "individual"]),
            ),
            bank: Schema.Literals([
              "affin_bank",
              "agrobank",
              "alliance_bank",
              "ambank",
              "bank_islam",
              "bank_muamalat",
              "bank_of_china",
              "bank_rakyat",
              "bsn",
              "cimb",
              "deutsche_bank",
              "hong_leong_bank",
              "hsbc",
              "kfh",
              "maybank2e",
              "maybank2u",
              "ocbc",
              "pb_enterprise",
              "public_bank",
              "rhb",
              "standard_chartered",
              "uob",
            ]),
          }),
        ),
        giropay: Schema.optional(Schema.Struct({})),
        grabpay: Schema.optional(Schema.Struct({})),
        ideal: Schema.optional(
          Schema.Struct({
            bank: Schema.optional(
              Schema.Literals([
                "abn_amro",
                "adyen",
                "asn_bank",
                "bunq",
                "buut",
                "finom",
                "handelsbanken",
                "ing",
                "knab",
                "mollie",
                "moneyou",
                "n26",
                "nn",
                "rabobank",
                "regiobank",
                "revolut",
                "sns_bank",
                "triodos_bank",
                "van_lanschot",
                "yoursafe",
              ]),
            ),
          }),
        ),
        interac_present: Schema.optional(Schema.Struct({})),
        kakao_pay: Schema.optional(Schema.Struct({})),
        klarna: Schema.optional(
          Schema.Struct({
            dob: Schema.optional(
              Schema.Struct({
                day: Schema.Number,
                month: Schema.Number,
                year: Schema.Number,
              }),
            ),
          }),
        ),
        konbini: Schema.optional(Schema.Struct({})),
        kr_card: Schema.optional(Schema.Struct({})),
        link: Schema.optional(Schema.Struct({})),
        mb_way: Schema.optional(Schema.Struct({})),
        metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        mobilepay: Schema.optional(Schema.Struct({})),
        multibanco: Schema.optional(Schema.Struct({})),
        naver_pay: Schema.optional(
          Schema.Struct({
            funding: Schema.optional(Schema.Literals(["card", "points"])),
          }),
        ),
        nz_bank_account: Schema.optional(
          Schema.Struct({
            account_holder_name: Schema.optional(Schema.String),
            account_number: Schema.String,
            bank_code: Schema.String,
            branch_code: Schema.String,
            reference: Schema.optional(Schema.String),
            suffix: Schema.String,
          }),
        ),
        oxxo: Schema.optional(Schema.Struct({})),
        p24: Schema.optional(
          Schema.Struct({
            bank: Schema.optional(
              Schema.Literals([
                "alior_bank",
                "bank_millennium",
                "bank_nowy_bfg_sa",
                "bank_pekao_sa",
                "banki_spbdzielcze",
                "blik",
                "bnp_paribas",
                "boz",
                "citi_handlowy",
                "credit_agricole",
                "envelobank",
                "etransfer_pocztowy24",
                "getin_bank",
                "ideabank",
                "ing",
                "inteligo",
                "mbank_mtransfer",
                "nest_przelew",
                "noble_pay",
                "pbac_z_ipko",
                "plus_bank",
                "santander_przelew24",
                "tmobile_usbugi_bankowe",
                "toyota_bank",
                "velobank",
                "volkswagen_bank",
              ]),
            ),
          }),
        ),
        pay_by_bank: Schema.optional(Schema.Struct({})),
        payco: Schema.optional(Schema.Struct({})),
        paynow: Schema.optional(Schema.Struct({})),
        paypal: Schema.optional(Schema.Struct({})),
        payto: Schema.optional(
          Schema.Struct({
            account_number: Schema.optional(Schema.String),
            bsb_number: Schema.optional(Schema.String),
            pay_id: Schema.optional(Schema.String),
          }),
        ),
        pix: Schema.optional(Schema.Struct({})),
        promptpay: Schema.optional(Schema.Struct({})),
        radar_options: Schema.optional(
          Schema.Struct({
            session: Schema.optional(Schema.String),
          }),
        ),
        revolut_pay: Schema.optional(Schema.Struct({})),
        samsung_pay: Schema.optional(Schema.Struct({})),
        satispay: Schema.optional(Schema.Struct({})),
        sepa_debit: Schema.optional(
          Schema.Struct({
            iban: Schema.String,
          }),
        ),
        sofort: Schema.optional(
          Schema.Struct({
            country: Schema.Literals(["AT", "BE", "DE", "ES", "IT", "NL"]),
          }),
        ),
        swish: Schema.optional(Schema.Struct({})),
        twint: Schema.optional(Schema.Struct({})),
        type: Schema.Literals([
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
        us_bank_account: Schema.optional(
          Schema.Struct({
            account_holder_type: Schema.optional(
              Schema.Literals(["company", "individual"]),
            ),
            account_number: Schema.optional(Schema.String),
            account_type: Schema.optional(
              Schema.Literals(["checking", "savings"]),
            ),
            financial_connections_account: Schema.optional(Schema.String),
            routing_number: Schema.optional(Schema.String),
          }),
        ),
        wechat_pay: Schema.optional(Schema.Struct({})),
        zip: Schema.optional(Schema.Struct({})),
      }),
    ),
    payment_method_options: Schema.optional(
      Schema.Struct({
        acss_debit: Schema.optional(Schema.Unknown),
        affirm: Schema.optional(Schema.Unknown),
        afterpay_clearpay: Schema.optional(Schema.Unknown),
        alipay: Schema.optional(Schema.Unknown),
        alma: Schema.optional(Schema.Unknown),
        amazon_pay: Schema.optional(Schema.Unknown),
        au_becs_debit: Schema.optional(Schema.Unknown),
        bacs_debit: Schema.optional(Schema.Unknown),
        bancontact: Schema.optional(Schema.Unknown),
        billie: Schema.optional(Schema.Unknown),
        blik: Schema.optional(Schema.Unknown),
        boleto: Schema.optional(Schema.Unknown),
        card: Schema.optional(Schema.Unknown),
        card_present: Schema.optional(Schema.Unknown),
        cashapp: Schema.optional(Schema.Unknown),
        crypto: Schema.optional(Schema.Unknown),
        customer_balance: Schema.optional(Schema.Unknown),
        eps: Schema.optional(Schema.Unknown),
        fpx: Schema.optional(Schema.Unknown),
        giropay: Schema.optional(Schema.Unknown),
        grabpay: Schema.optional(Schema.Unknown),
        ideal: Schema.optional(Schema.Unknown),
        interac_present: Schema.optional(Schema.Unknown),
        kakao_pay: Schema.optional(Schema.Unknown),
        klarna: Schema.optional(Schema.Unknown),
        konbini: Schema.optional(Schema.Unknown),
        kr_card: Schema.optional(Schema.Unknown),
        link: Schema.optional(Schema.Unknown),
        mb_way: Schema.optional(Schema.Unknown),
        mobilepay: Schema.optional(Schema.Unknown),
        multibanco: Schema.optional(Schema.Unknown),
        naver_pay: Schema.optional(Schema.Unknown),
        nz_bank_account: Schema.optional(Schema.Unknown),
        oxxo: Schema.optional(Schema.Unknown),
        p24: Schema.optional(Schema.Unknown),
        pay_by_bank: Schema.optional(Schema.Unknown),
        payco: Schema.optional(Schema.Unknown),
        paynow: Schema.optional(Schema.Unknown),
        paypal: Schema.optional(Schema.Unknown),
        payto: Schema.optional(Schema.Unknown),
        pix: Schema.optional(Schema.Unknown),
        promptpay: Schema.optional(Schema.Unknown),
        revolut_pay: Schema.optional(Schema.Unknown),
        samsung_pay: Schema.optional(Schema.Unknown),
        satispay: Schema.optional(Schema.Unknown),
        sepa_debit: Schema.optional(Schema.Unknown),
        sofort: Schema.optional(Schema.Unknown),
        swish: Schema.optional(Schema.Unknown),
        twint: Schema.optional(Schema.Unknown),
        us_bank_account: Schema.optional(Schema.Unknown),
        wechat_pay: Schema.optional(Schema.Unknown),
        zip: Schema.optional(Schema.Unknown),
      }),
    ),
    payment_method_types: Schema.optional(Schema.Array(Schema.String)),
    receipt_email: Schema.optional(Schema.Unknown),
    setup_future_usage: Schema.optional(
      Schema.Literals(["", "off_session", "on_session"]),
    ),
    shipping: Schema.optional(Schema.Unknown),
    statement_descriptor: Schema.optional(Schema.String),
    statement_descriptor_suffix: Schema.optional(Schema.String),
    transfer_data: Schema.optional(
      Schema.Struct({
        amount: Schema.optional(Schema.Number),
      }),
    ),
    transfer_group: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payment_intents/{intent}",
      contentType: "form-urlencoded",
    }),
  );
export type PostPaymentIntentsIntentInput =
  typeof PostPaymentIntentsIntentInput.Type;

// Output Schema
export const PostPaymentIntentsIntentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    amount_capturable: Schema.Number,
    amount_details: Schema.optional(
      Schema.Struct({
        discount_amount: Schema.optional(Schema.Number),
        error: Schema.optional(
          Schema.Struct({
            code: Schema.NullOr(
              Schema.Literals([
                "amount_details_amount_mismatch",
                "amount_details_tax_shipping_discount_greater_than_amount",
              ]),
            ),
            message: Schema.NullOr(Schema.String),
          }),
        ),
        line_items: Schema.optional(
          Schema.Struct({
            data: Schema.Array(
              Schema.Struct({
                discount_amount: Schema.NullOr(Schema.Number),
                id: Schema.String,
                object: Schema.Literals([
                  "payment_intent_amount_details_line_item",
                ]),
                payment_method_options: Schema.Unknown,
                product_code: Schema.NullOr(Schema.String),
                product_name: Schema.String,
                quantity: Schema.Number,
                tax: Schema.Unknown,
                unit_cost: Schema.Number,
                unit_of_measure: Schema.NullOr(Schema.String),
              }),
            ),
            has_more: Schema.Boolean,
            object: Schema.Literals(["list"]),
            url: Schema.String,
          }),
        ),
        shipping: Schema.optional(
          Schema.Struct({
            amount: Schema.NullOr(Schema.Number),
            from_postal_code: Schema.NullOr(Schema.String),
            to_postal_code: Schema.NullOr(Schema.String),
          }),
        ),
        tax: Schema.optional(
          Schema.Struct({
            total_tax_amount: Schema.NullOr(Schema.Number),
          }),
        ),
        tip: Schema.optional(
          Schema.Struct({
            amount: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
    amount_received: Schema.Number,
    application: Schema.Unknown,
    application_fee_amount: Schema.NullOr(Schema.Number),
    automatic_payment_methods: Schema.Unknown,
    canceled_at: Schema.NullOr(Schema.Number),
    cancellation_reason: Schema.NullOr(
      Schema.Literals([
        "abandoned",
        "automatic",
        "duplicate",
        "expired",
        "failed_invoice",
        "fraudulent",
        "requested_by_customer",
        "void_invoice",
      ]),
    ),
    capture_method: Schema.Literals(["automatic", "automatic_async", "manual"]),
    client_secret: SensitiveNullableString,
    confirmation_method: Schema.Literals(["automatic", "manual"]),
    created: Schema.Number,
    currency: Schema.String,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
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
    hooks: Schema.optional(
      Schema.Struct({
        inputs: Schema.optional(
          Schema.Struct({
            tax: Schema.optional(
              Schema.Struct({
                calculation: Schema.String,
              }),
            ),
          }),
        ),
      }),
    ),
    id: Schema.String,
    last_payment_error: Schema.Unknown,
    latest_charge: Schema.Unknown,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    next_action: Schema.Unknown,
    object: Schema.Literals(["payment_intent"]),
    on_behalf_of: Schema.Unknown,
    payment_details: Schema.optional(
      Schema.Struct({
        customer_reference: Schema.NullOr(Schema.String),
        order_reference: Schema.NullOr(Schema.String),
      }),
    ),
    payment_method: Schema.Unknown,
    payment_method_configuration_details: Schema.Unknown,
    payment_method_options: Schema.Unknown,
    payment_method_types: Schema.Array(Schema.String),
    presentment_details: Schema.optional(
      Schema.Struct({
        presentment_amount: Schema.Number,
        presentment_currency: Schema.String,
      }),
    ),
    processing: Schema.Unknown,
    receipt_email: Schema.NullOr(Schema.String),
    review: Schema.Unknown,
    setup_future_usage: Schema.NullOr(
      Schema.Literals(["off_session", "on_session"]),
    ),
    shipping: Schema.Unknown,
    source: Schema.Unknown,
    statement_descriptor: Schema.NullOr(Schema.String),
    statement_descriptor_suffix: Schema.NullOr(Schema.String),
    status: Schema.Literals([
      "canceled",
      "processing",
      "requires_action",
      "requires_capture",
      "requires_confirmation",
      "requires_payment_method",
      "succeeded",
    ]),
    transfer_data: Schema.optional(Schema.Unknown),
    transfer_group: Schema.NullOr(Schema.String),
  });
export type PostPaymentIntentsIntentOutput =
  typeof PostPaymentIntentsIntentOutput.Type;

// The operation
/**
 * Update a PaymentIntent
 *
 * <p>Updates properties on a PaymentIntent object without confirming.</p>
 * <p>Depending on which properties you update, you might need to confirm the
 * PaymentIntent again. For example, updating the <code>payment_method</code>
 * always requires you to confirm the PaymentIntent again. If you prefer to
 * update and confirm at the same time, we recommend updating properties through
 * the <a href="/docs/api/payment_intents/confirm">confirm API</a> instead.</p>
 */
export const PostPaymentIntentsIntent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostPaymentIntentsIntentInput,
    outputSchema: PostPaymentIntentsIntentOutput,
  }),
);
