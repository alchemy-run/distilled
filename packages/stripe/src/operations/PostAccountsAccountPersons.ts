import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostAccountsAccountPersonsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    additional_tos_acceptances: Schema.optional(
      Schema.Struct({
        account: Schema.optional(
          Schema.Struct({
            date: Schema.optional(Schema.Number),
            ip: Schema.optional(Schema.String),
            user_agent: Schema.optional(Schema.Unknown),
          }),
        ),
      }),
    ),
    address: Schema.optional(
      Schema.Struct({
        city: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        line1: Schema.optional(Schema.String),
        line2: Schema.optional(Schema.String),
        postal_code: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
      }),
    ),
    address_kana: Schema.optional(
      Schema.Struct({
        city: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        line1: Schema.optional(Schema.String),
        line2: Schema.optional(Schema.String),
        postal_code: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
        town: Schema.optional(Schema.String),
      }),
    ),
    address_kanji: Schema.optional(
      Schema.Struct({
        city: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        line1: Schema.optional(Schema.String),
        line2: Schema.optional(Schema.String),
        postal_code: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
        town: Schema.optional(Schema.String),
      }),
    ),
    dob: Schema.optional(Schema.Unknown),
    documents: Schema.optional(
      Schema.Struct({
        company_authorization: Schema.optional(
          Schema.Struct({
            files: Schema.optional(Schema.Array(Schema.Unknown)),
          }),
        ),
        passport: Schema.optional(
          Schema.Struct({
            files: Schema.optional(Schema.Array(Schema.Unknown)),
          }),
        ),
        visa: Schema.optional(
          Schema.Struct({
            files: Schema.optional(Schema.Array(Schema.Unknown)),
          }),
        ),
      }),
    ),
    email: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    first_name: Schema.optional(Schema.String),
    first_name_kana: Schema.optional(Schema.String),
    first_name_kanji: Schema.optional(Schema.String),
    full_name_aliases: Schema.optional(Schema.Unknown),
    gender: Schema.optional(Schema.String),
    id_number: Schema.optional(Schema.String),
    id_number_secondary: Schema.optional(Schema.String),
    last_name: Schema.optional(Schema.String),
    last_name_kana: Schema.optional(Schema.String),
    last_name_kanji: Schema.optional(Schema.String),
    maiden_name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Unknown),
    nationality: Schema.optional(Schema.String),
    person_token: Schema.optional(Schema.String),
    phone: Schema.optional(Schema.String),
    political_exposure: Schema.optional(Schema.Literals(["existing", "none"])),
    registered_address: Schema.optional(
      Schema.Struct({
        city: Schema.optional(Schema.String),
        country: Schema.optional(Schema.String),
        line1: Schema.optional(Schema.String),
        line2: Schema.optional(Schema.String),
        postal_code: Schema.optional(Schema.String),
        state: Schema.optional(Schema.String),
      }),
    ),
    relationship: Schema.optional(
      Schema.Struct({
        authorizer: Schema.optional(Schema.Boolean),
        director: Schema.optional(Schema.Boolean),
        executive: Schema.optional(Schema.Boolean),
        legal_guardian: Schema.optional(Schema.Boolean),
        owner: Schema.optional(Schema.Boolean),
        percent_ownership: Schema.optional(Schema.Unknown),
        representative: Schema.optional(Schema.Boolean),
        title: Schema.optional(Schema.String),
      }),
    ),
    ssn_last_4: Schema.optional(Schema.String),
    us_cfpb_data: Schema.optional(
      Schema.Struct({
        ethnicity_details: Schema.optional(
          Schema.Struct({
            ethnicity: Schema.optional(
              Schema.Array(
                Schema.Literals([
                  "cuban",
                  "hispanic_or_latino",
                  "mexican",
                  "not_hispanic_or_latino",
                  "other_hispanic_or_latino",
                  "prefer_not_to_answer",
                  "puerto_rican",
                ]),
              ),
            ),
            ethnicity_other: Schema.optional(Schema.String),
          }),
        ),
        race_details: Schema.optional(
          Schema.Struct({
            race: Schema.optional(
              Schema.Array(
                Schema.Literals([
                  "african_american",
                  "american_indian_or_alaska_native",
                  "asian",
                  "asian_indian",
                  "black_or_african_american",
                  "chinese",
                  "ethiopian",
                  "filipino",
                  "guamanian_or_chamorro",
                  "haitian",
                  "jamaican",
                  "japanese",
                  "korean",
                  "native_hawaiian",
                  "native_hawaiian_or_other_pacific_islander",
                  "nigerian",
                  "other_asian",
                  "other_black_or_african_american",
                  "other_pacific_islander",
                  "prefer_not_to_answer",
                  "samoan",
                  "somali",
                  "vietnamese",
                  "white",
                ]),
              ),
            ),
            race_other: Schema.optional(Schema.String),
          }),
        ),
        self_identified_gender: Schema.optional(Schema.String),
      }),
    ),
    verification: Schema.optional(
      Schema.Struct({
        additional_document: Schema.optional(
          Schema.Struct({
            back: Schema.optional(Schema.String),
            front: Schema.optional(Schema.String),
          }),
        ),
        document: Schema.optional(
          Schema.Struct({
            back: Schema.optional(Schema.String),
            front: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/accounts/{account}/persons",
      contentType: "form-urlencoded",
    }),
  );
export type PostAccountsAccountPersonsInput =
  typeof PostAccountsAccountPersonsInput.Type;

// Output Schema
export const PostAccountsAccountPersonsOutput =
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
export type PostAccountsAccountPersonsOutput =
  typeof PostAccountsAccountPersonsOutput.Type;

// The operation
/**
 * Create a person
 *
 * <p>Creates a new person.</p>
 */
export const PostAccountsAccountPersons = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostAccountsAccountPersonsInput,
    outputSchema: PostAccountsAccountPersonsOutput,
  }),
);
