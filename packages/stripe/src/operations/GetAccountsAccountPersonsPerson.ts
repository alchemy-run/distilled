import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAccountsAccountPersonsPersonInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    person: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/accounts/{account}/persons/{person}",
      contentType: "form-urlencoded",
    }),
  );
export type GetAccountsAccountPersonsPersonInput =
  typeof GetAccountsAccountPersonsPersonInput.Type;

// Output Schema
export const GetAccountsAccountPersonsPersonOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.optional(Schema.String),
    additional_tos_acceptances: Schema.optional(
      Schema.Struct({
        account: Schema.Unknown,
      }),
    ),
    address: Schema.optional(
      Schema.Struct({
        city: Schema.NullOr(Schema.String),
        country: Schema.NullOr(Schema.String),
        line1: Schema.NullOr(Schema.String),
        line2: Schema.NullOr(Schema.String),
        postal_code: Schema.NullOr(Schema.String),
        state: Schema.NullOr(Schema.String),
      }),
    ),
    address_kana: Schema.optional(Schema.Unknown),
    address_kanji: Schema.optional(Schema.Unknown),
    created: Schema.Number,
    dob: Schema.optional(
      Schema.Struct({
        day: Schema.NullOr(Schema.Number),
        month: Schema.NullOr(Schema.Number),
        year: Schema.NullOr(Schema.Number),
      }),
    ),
    email: Schema.optional(Schema.NullOr(Schema.String)),
    first_name: Schema.optional(Schema.NullOr(Schema.String)),
    first_name_kana: Schema.optional(Schema.NullOr(Schema.String)),
    first_name_kanji: Schema.optional(Schema.NullOr(Schema.String)),
    full_name_aliases: Schema.optional(Schema.Array(Schema.String)),
    future_requirements: Schema.optional(Schema.Unknown),
    gender: Schema.optional(Schema.NullOr(Schema.String)),
    id: Schema.String,
    id_number_provided: Schema.optional(Schema.Boolean),
    id_number_secondary_provided: Schema.optional(Schema.Boolean),
    last_name: Schema.optional(Schema.NullOr(Schema.String)),
    last_name_kana: Schema.optional(Schema.NullOr(Schema.String)),
    last_name_kanji: Schema.optional(Schema.NullOr(Schema.String)),
    maiden_name: Schema.optional(Schema.NullOr(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    nationality: Schema.optional(Schema.NullOr(Schema.String)),
    object: Schema.Literals(["person"]),
    phone: Schema.optional(Schema.NullOr(Schema.String)),
    political_exposure: Schema.optional(Schema.Literals(["existing", "none"])),
    registered_address: Schema.optional(
      Schema.Struct({
        city: Schema.NullOr(Schema.String),
        country: Schema.NullOr(Schema.String),
        line1: Schema.NullOr(Schema.String),
        line2: Schema.NullOr(Schema.String),
        postal_code: Schema.NullOr(Schema.String),
        state: Schema.NullOr(Schema.String),
      }),
    ),
    relationship: Schema.optional(
      Schema.Struct({
        authorizer: Schema.NullOr(Schema.Boolean),
        director: Schema.NullOr(Schema.Boolean),
        executive: Schema.NullOr(Schema.Boolean),
        legal_guardian: Schema.NullOr(Schema.Boolean),
        owner: Schema.NullOr(Schema.Boolean),
        percent_ownership: Schema.NullOr(Schema.Number),
        representative: Schema.NullOr(Schema.Boolean),
        title: Schema.NullOr(Schema.String),
      }),
    ),
    requirements: Schema.optional(Schema.Unknown),
    ssn_last_4_provided: Schema.optional(Schema.Boolean),
    us_cfpb_data: Schema.optional(Schema.Unknown),
    verification: Schema.optional(
      Schema.Struct({
        additional_document: Schema.optional(Schema.Unknown),
        details: Schema.optional(Schema.NullOr(Schema.String)),
        details_code: Schema.optional(Schema.NullOr(Schema.String)),
        document: Schema.optional(
          Schema.Struct({
            back: Schema.Unknown,
            details: Schema.NullOr(Schema.String),
            details_code: Schema.NullOr(Schema.String),
            front: Schema.Unknown,
          }),
        ),
        status: Schema.String,
      }),
    ),
  });
export type GetAccountsAccountPersonsPersonOutput =
  typeof GetAccountsAccountPersonsPersonOutput.Type;

// The operation
/**
 * Retrieve a person
 *
 * <p>Retrieves an existing person.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetAccountsAccountPersonsPerson =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAccountsAccountPersonsPersonInput,
    outputSchema: GetAccountsAccountPersonsPersonOutput,
  }));
