import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const PostSetupIntentsIntentConfirmInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    intent: Schema.String.pipe(T.PathParam()),
    confirmation_token: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    mandate_data: Schema.optional(Schema.Unknown),
    payment_method: Schema.optional(Schema.String),
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
            verification_method: Schema.optional(
              Schema.Literals(["automatic", "instant", "microdeposits"]),
            ),
          }),
        ),
        amazon_pay: Schema.optional(Schema.Struct({})),
        bacs_debit: Schema.optional(
          Schema.Struct({
            mandate_options: Schema.optional(
              Schema.Struct({
                reference_prefix: Schema.optional(Schema.Unknown),
              }),
            ),
          }),
        ),
        card: Schema.optional(
          Schema.Struct({
            mandate_options: Schema.optional(
              Schema.Struct({
                amount: Schema.Number,
                amount_type: Schema.Literals(["fixed", "maximum"]),
                currency: Schema.String,
                description: Schema.optional(Schema.String),
                end_date: Schema.optional(Schema.Number),
                interval: Schema.Literals([
                  "day",
                  "month",
                  "sporadic",
                  "week",
                  "year",
                ]),
                interval_count: Schema.optional(Schema.Number),
                reference: Schema.String,
                start_date: Schema.Number,
                supported_types: Schema.optional(
                  Schema.Array(Schema.Literals(["india"])),
                ),
              }),
            ),
            moto: Schema.optional(Schema.Boolean),
            network: Schema.optional(
              Schema.Literals([
                "amex",
                "cartes_bancaires",
                "diners",
                "discover",
                "eftpos_au",
                "girocard",
                "interac",
                "jcb",
                "link",
                "mastercard",
                "unionpay",
                "unknown",
                "visa",
              ]),
            ),
            request_three_d_secure: Schema.optional(
              Schema.Literals(["any", "automatic", "challenge"]),
            ),
            three_d_secure: Schema.optional(
              Schema.Struct({
                ares_trans_status: Schema.optional(
                  Schema.Literals(["A", "C", "I", "N", "R", "U", "Y"]),
                ),
                cryptogram: Schema.optional(Schema.String),
                electronic_commerce_indicator: Schema.optional(
                  Schema.Literals(["01", "02", "05", "06", "07"]),
                ),
                network_options: Schema.optional(
                  Schema.Struct({
                    cartes_bancaires: Schema.optional(
                      Schema.Struct({
                        cb_avalgo: Schema.Literals([
                          "0",
                          "1",
                          "2",
                          "3",
                          "4",
                          "A",
                        ]),
                        cb_exemption: Schema.optional(Schema.String),
                        cb_score: Schema.optional(Schema.Number),
                      }),
                    ),
                  }),
                ),
                requestor_challenge_indicator: Schema.optional(Schema.String),
                transaction_id: Schema.optional(Schema.String),
                version: Schema.optional(
                  Schema.Literals([
                    "1.0.2",
                    "2.1.0",
                    "2.2.0",
                    "2.3.0",
                    "2.3.1",
                  ]),
                ),
              }),
            ),
          }),
        ),
        card_present: Schema.optional(Schema.Struct({})),
        klarna: Schema.optional(
          Schema.Struct({
            currency: Schema.optional(Schema.String),
            on_demand: Schema.optional(
              Schema.Struct({
                average_amount: Schema.optional(Schema.Number),
                maximum_amount: Schema.optional(Schema.Number),
                minimum_amount: Schema.optional(Schema.Number),
                purchase_interval: Schema.optional(
                  Schema.Literals(["day", "month", "week", "year"]),
                ),
                purchase_interval_count: Schema.optional(Schema.Number),
              }),
            ),
            preferred_locale: Schema.optional(
              Schema.Literals([
                "cs-CZ",
                "da-DK",
                "de-AT",
                "de-CH",
                "de-DE",
                "el-GR",
                "en-AT",
                "en-AU",
                "en-BE",
                "en-CA",
                "en-CH",
                "en-CZ",
                "en-DE",
                "en-DK",
                "en-ES",
                "en-FI",
                "en-FR",
                "en-GB",
                "en-GR",
                "en-IE",
                "en-IT",
                "en-NL",
                "en-NO",
                "en-NZ",
                "en-PL",
                "en-PT",
                "en-RO",
                "en-SE",
                "en-US",
                "es-ES",
                "es-US",
                "fi-FI",
                "fr-BE",
                "fr-CA",
                "fr-CH",
                "fr-FR",
                "it-CH",
                "it-IT",
                "nb-NO",
                "nl-BE",
                "nl-NL",
                "pl-PL",
                "pt-PT",
                "ro-RO",
                "sv-FI",
                "sv-SE",
              ]),
            ),
            subscriptions: Schema.optional(Schema.Unknown),
          }),
        ),
        link: Schema.optional(
          Schema.Struct({
            persistent_token: Schema.optional(Schema.String),
          }),
        ),
        paypal: Schema.optional(
          Schema.Struct({
            billing_agreement_id: Schema.optional(Schema.String),
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
          }),
        ),
        sepa_debit: Schema.optional(
          Schema.Struct({
            mandate_options: Schema.optional(
              Schema.Struct({
                reference_prefix: Schema.optional(Schema.Unknown),
              }),
            ),
          }),
        ),
        us_bank_account: Schema.optional(
          Schema.Struct({
            financial_connections: Schema.optional(
              Schema.Struct({
                filters: Schema.optional(
                  Schema.Struct({
                    account_subcategories: Schema.optional(
                      Schema.Array(Schema.Literals(["checking", "savings"])),
                    ),
                  }),
                ),
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
                return_url: Schema.optional(Schema.String),
              }),
            ),
            mandate_options: Schema.optional(
              Schema.Struct({
                collection_method: Schema.optional(
                  Schema.Literals(["", "paper"]),
                ),
              }),
            ),
            networks: Schema.optional(
              Schema.Struct({
                requested: Schema.optional(
                  Schema.Array(Schema.Literals(["ach", "us_domestic_wire"])),
                ),
              }),
            ),
            verification_method: Schema.optional(
              Schema.Literals(["automatic", "instant", "microdeposits"]),
            ),
          }),
        ),
      }),
    ),
    return_url: Schema.optional(Schema.String),
    use_stripe_sdk: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/setup_intents/{intent}/confirm",
      contentType: "form-urlencoded",
    }),
  );
export type PostSetupIntentsIntentConfirmInput =
  typeof PostSetupIntentsIntentConfirmInput.Type;

// Output Schema
export const PostSetupIntentsIntentConfirmOutput =
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
export type PostSetupIntentsIntentConfirmOutput =
  typeof PostSetupIntentsIntentConfirmOutput.Type;

// The operation
/**
 * Confirm a SetupIntent
 *
 * <p>Confirm that your customer intends to set up the current or
 * provided payment method. For example, you would confirm a SetupIntent
 * when a customer hits the “Save” button on a payment method management
 * page on your website.</p>
 * <p>If the selected payment method does not require any additional
 * steps from the customer, the SetupIntent will transition to the
 * <code>succeeded</code> status.</p>
 * <p>Otherwise, it will transition to the <code>requires_action</code> status and
 * suggest additional actions via <code>next_action</code>. If setup fails,
 * the SetupIntent will transition to the
 * <code>requires_payment_method</code> status or the <code>canceled</code> status if the
 * confirmation limit is reached.</p>
 */
export const PostSetupIntentsIntentConfirm =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostSetupIntentsIntentConfirmInput,
    outputSchema: PostSetupIntentsIntentConfirmOutput,
  }));
