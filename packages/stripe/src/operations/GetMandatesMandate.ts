import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetMandatesMandateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    mandate: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/mandates/{mandate}",
      contentType: "form-urlencoded",
    }),
  );
export type GetMandatesMandateInput = typeof GetMandatesMandateInput.Type;

// Output Schema
export const GetMandatesMandateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer_acceptance: Schema.Struct({
      accepted_at: Schema.NullOr(Schema.Number),
      offline: Schema.optional(Schema.Struct({})),
      online: Schema.optional(
        Schema.Struct({
          ip_address: Schema.NullOr(Schema.String),
          user_agent: Schema.NullOr(Schema.String),
        }),
      ),
      type: Schema.Literals(["offline", "online"]),
    }),
    id: Schema.String,
    livemode: Schema.Boolean,
    multi_use: Schema.optional(Schema.Struct({})),
    object: Schema.Literals(["mandate"]),
    on_behalf_of: Schema.optional(Schema.String),
    payment_method: Schema.Unknown,
    payment_method_details: Schema.Struct({
      acss_debit: Schema.optional(
        Schema.Struct({
          default_for: Schema.optional(
            Schema.Array(Schema.Literals(["invoice", "subscription"])),
          ),
          interval_description: Schema.NullOr(Schema.String),
          payment_schedule: Schema.Literals([
            "combined",
            "interval",
            "sporadic",
          ]),
          transaction_type: Schema.Literals(["business", "personal"]),
        }),
      ),
      amazon_pay: Schema.optional(Schema.Struct({})),
      au_becs_debit: Schema.optional(
        Schema.Struct({
          url: Schema.String,
        }),
      ),
      bacs_debit: Schema.optional(
        Schema.Struct({
          display_name: Schema.NullOr(Schema.String),
          network_status: Schema.Literals([
            "accepted",
            "pending",
            "refused",
            "revoked",
          ]),
          reference: Schema.String,
          revocation_reason: Schema.NullOr(
            Schema.Literals([
              "account_closed",
              "bank_account_restricted",
              "bank_ownership_changed",
              "could_not_process",
              "debit_not_authorized",
            ]),
          ),
          service_user_number: Schema.NullOr(Schema.String),
          url: Schema.String,
        }),
      ),
      card: Schema.optional(Schema.Struct({})),
      cashapp: Schema.optional(Schema.Struct({})),
      kakao_pay: Schema.optional(Schema.Struct({})),
      klarna: Schema.optional(Schema.Struct({})),
      kr_card: Schema.optional(Schema.Struct({})),
      link: Schema.optional(Schema.Struct({})),
      naver_pay: Schema.optional(Schema.Struct({})),
      nz_bank_account: Schema.optional(Schema.Struct({})),
      paypal: Schema.optional(
        Schema.Struct({
          billing_agreement_id: Schema.NullOr(Schema.String),
          payer_id: Schema.NullOr(Schema.String),
        }),
      ),
      payto: Schema.optional(
        Schema.Struct({
          amount: Schema.NullOr(Schema.Number),
          amount_type: Schema.Literals(["fixed", "maximum"]),
          end_date: Schema.NullOr(Schema.String),
          payment_schedule: Schema.Literals([
            "adhoc",
            "annual",
            "daily",
            "fortnightly",
            "monthly",
            "quarterly",
            "semi_annual",
            "weekly",
          ]),
          payments_per_period: Schema.NullOr(Schema.Number),
          purpose: Schema.NullOr(
            Schema.Literals([
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
          start_date: Schema.NullOr(Schema.String),
        }),
      ),
      revolut_pay: Schema.optional(Schema.Struct({})),
      sepa_debit: Schema.optional(
        Schema.Struct({
          reference: Schema.String,
          url: Schema.String,
        }),
      ),
      type: Schema.String,
      us_bank_account: Schema.optional(
        Schema.Struct({
          collection_method: Schema.optional(Schema.Literals(["paper"])),
        }),
      ),
    }),
    single_use: Schema.optional(
      Schema.Struct({
        amount: Schema.Number,
        currency: Schema.String,
      }),
    ),
    status: Schema.Literals(["active", "inactive", "pending"]),
    type: Schema.Literals(["multi_use", "single_use"]),
  });
export type GetMandatesMandateOutput = typeof GetMandatesMandateOutput.Type;

// The operation
/**
 * Retrieve a Mandate
 *
 * <p>Retrieves a Mandate object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetMandatesMandate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetMandatesMandateInput,
  outputSchema: GetMandatesMandateOutput,
}));
