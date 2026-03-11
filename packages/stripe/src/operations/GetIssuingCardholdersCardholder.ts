import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIssuingCardholdersCardholderInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cardholder: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/issuing/cardholders/{cardholder}",
      contentType: "form-urlencoded",
    }),
  );
export type GetIssuingCardholdersCardholderInput =
  typeof GetIssuingCardholdersCardholderInput.Type;

// Output Schema
export const GetIssuingCardholdersCardholderOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billing: Schema.Struct({
      address: Schema.Struct({
        city: Schema.NullOr(Schema.String),
        country: Schema.NullOr(Schema.String),
        line1: Schema.NullOr(Schema.String),
        line2: Schema.NullOr(Schema.String),
        postal_code: Schema.NullOr(Schema.String),
        state: Schema.NullOr(Schema.String),
      }),
    }),
    company: Schema.Unknown,
    created: Schema.Number,
    email: Schema.NullOr(Schema.String),
    id: Schema.String,
    individual: Schema.Unknown,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    name: Schema.String,
    object: Schema.Literals(["issuing.cardholder"]),
    phone_number: Schema.NullOr(Schema.String),
    preferred_locales: Schema.NullOr(
      Schema.Array(Schema.Literals(["de", "en", "es", "fr", "it"])),
    ),
    requirements: Schema.Struct({
      disabled_reason: Schema.NullOr(
        Schema.Literals([
          "listed",
          "rejected.listed",
          "requirements.past_due",
          "under_review",
        ]),
      ),
      past_due: Schema.NullOr(
        Schema.Array(
          Schema.Literals([
            "company.tax_id",
            "individual.card_issuing.user_terms_acceptance.date",
            "individual.card_issuing.user_terms_acceptance.ip",
            "individual.dob.day",
            "individual.dob.month",
            "individual.dob.year",
            "individual.first_name",
            "individual.last_name",
            "individual.verification.document",
          ]),
        ),
      ),
    }),
    spending_controls: Schema.Unknown,
    status: Schema.Literals(["active", "blocked", "inactive"]),
    type: Schema.Literals(["company", "individual"]),
  });
export type GetIssuingCardholdersCardholderOutput =
  typeof GetIssuingCardholdersCardholderOutput.Type;

// The operation
/**
 * Retrieve a cardholder
 *
 * <p>Retrieves an Issuing <code>Cardholder</code> object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetIssuingCardholdersCardholder =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetIssuingCardholdersCardholderInput,
    outputSchema: GetIssuingCardholdersCardholderOutput,
  }));
