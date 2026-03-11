import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSetupAttemptsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  setup_intent: Schema.String,
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/setup_attempts",
    contentType: "form-urlencoded",
  }),
);
export type GetSetupAttemptsInput = typeof GetSetupAttemptsInput.Type;

// Output Schema
export const GetSetupAttemptsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    data: Schema.Array(
      Schema.Struct({
        application: Schema.Unknown,
        attach_to_self: Schema.optional(Schema.Boolean),
        created: Schema.Number,
        customer: Schema.Unknown,
        customer_account: Schema.NullOr(Schema.String),
        flow_directions: Schema.NullOr(
          Schema.Array(Schema.Literals(["inbound", "outbound"])),
        ),
        id: Schema.String,
        livemode: Schema.Boolean,
        object: Schema.Literals(["setup_attempt"]),
        on_behalf_of: Schema.Unknown,
        payment_method: Schema.Unknown,
        payment_method_details: Schema.Struct({
          acss_debit: Schema.optional(Schema.Struct({})),
          amazon_pay: Schema.optional(Schema.Struct({})),
          au_becs_debit: Schema.optional(Schema.Struct({})),
          bacs_debit: Schema.optional(Schema.Struct({})),
          bancontact: Schema.optional(
            Schema.Struct({
              bank_code: Schema.NullOr(Schema.String),
              bank_name: Schema.NullOr(Schema.String),
              bic: Schema.NullOr(Schema.String),
              generated_sepa_debit: Schema.Unknown,
              generated_sepa_debit_mandate: Schema.Unknown,
              iban_last4: Schema.NullOr(Schema.String),
              preferred_language: Schema.NullOr(
                Schema.Literals(["de", "en", "fr", "nl"]),
              ),
              verified_name: Schema.NullOr(Schema.String),
            }),
          ),
          boleto: Schema.optional(Schema.Struct({})),
          card: Schema.optional(
            Schema.Struct({
              brand: Schema.NullOr(Schema.String),
              checks: Schema.Unknown,
              country: Schema.NullOr(Schema.String),
              description: Schema.optional(Schema.NullOr(Schema.String)),
              exp_month: Schema.NullOr(Schema.Number),
              exp_year: Schema.NullOr(Schema.Number),
              fingerprint: Schema.optional(Schema.NullOr(Schema.String)),
              funding: Schema.NullOr(Schema.String),
              iin: Schema.optional(Schema.NullOr(Schema.String)),
              issuer: Schema.optional(Schema.NullOr(Schema.String)),
              last4: Schema.NullOr(Schema.String),
              network: Schema.NullOr(Schema.String),
              three_d_secure: Schema.Unknown,
              wallet: Schema.Unknown,
            }),
          ),
          card_present: Schema.optional(
            Schema.Struct({
              generated_card: Schema.Unknown,
              offline: Schema.Unknown,
            }),
          ),
          cashapp: Schema.optional(Schema.Struct({})),
          ideal: Schema.optional(
            Schema.Struct({
              bank: Schema.NullOr(
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
              bic: Schema.NullOr(
                Schema.Literals([
                  "ABNANL2A",
                  "ADYBNL2A",
                  "ASNBNL21",
                  "BITSNL2A",
                  "BUNQNL2A",
                  "BUUTNL2A",
                  "FNOMNL22",
                  "FVLBNL22",
                  "HANDNL2A",
                  "INGBNL2A",
                  "KNABNL2H",
                  "MLLENL2A",
                  "MOYONL21",
                  "NNBANL2G",
                  "NTSBDEB1",
                  "RABONL2U",
                  "RBRBNL21",
                  "REVOIE23",
                  "REVOLT21",
                  "SNSBNL2A",
                  "TRIONL2U",
                ]),
              ),
              generated_sepa_debit: Schema.Unknown,
              generated_sepa_debit_mandate: Schema.Unknown,
              iban_last4: Schema.NullOr(Schema.String),
              verified_name: Schema.NullOr(Schema.String),
            }),
          ),
          kakao_pay: Schema.optional(Schema.Struct({})),
          klarna: Schema.optional(Schema.Struct({})),
          kr_card: Schema.optional(Schema.Struct({})),
          link: Schema.optional(Schema.Struct({})),
          naver_pay: Schema.optional(
            Schema.Struct({
              buyer_id: Schema.optional(Schema.String),
            }),
          ),
          nz_bank_account: Schema.optional(Schema.Struct({})),
          paypal: Schema.optional(Schema.Struct({})),
          payto: Schema.optional(Schema.Struct({})),
          revolut_pay: Schema.optional(Schema.Struct({})),
          sepa_debit: Schema.optional(Schema.Struct({})),
          sofort: Schema.optional(
            Schema.Struct({
              bank_code: Schema.NullOr(Schema.String),
              bank_name: Schema.NullOr(Schema.String),
              bic: Schema.NullOr(Schema.String),
              generated_sepa_debit: Schema.Unknown,
              generated_sepa_debit_mandate: Schema.Unknown,
              iban_last4: Schema.NullOr(Schema.String),
              preferred_language: Schema.NullOr(
                Schema.Literals(["de", "en", "fr", "nl"]),
              ),
              verified_name: Schema.NullOr(Schema.String),
            }),
          ),
          type: Schema.String,
          us_bank_account: Schema.optional(Schema.Struct({})),
        }),
        setup_error: Schema.Unknown,
        setup_intent: Schema.Unknown,
        status: Schema.String,
        usage: Schema.String,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  },
);
export type GetSetupAttemptsOutput = typeof GetSetupAttemptsOutput.Type;

// The operation
/**
 * List all SetupAttempts
 *
 * <p>Returns a list of SetupAttempts that associate with a provided SetupIntent.</p>
 *
 * @param created - A filter on the list, based on the object `created` field. The value
can be a string with an integer Unix timestamp or a
dictionary with a number of different query options.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param setup_intent - Only return SetupAttempts created by the SetupIntent specified by
this ID.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetSetupAttempts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSetupAttemptsInput,
  outputSchema: GetSetupAttemptsOutput,
}));
