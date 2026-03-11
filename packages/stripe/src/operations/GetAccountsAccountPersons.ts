import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAccountsAccountPersonsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    relationship: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/accounts/{account}/persons",
      contentType: "form-urlencoded",
    }),
  );
export type GetAccountsAccountPersonsInput =
  typeof GetAccountsAccountPersonsInput.Type;

// Output Schema
export const GetAccountsAccountPersonsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
        political_exposure: Schema.optional(
          Schema.Literals(["existing", "none"]),
        ),
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetAccountsAccountPersonsOutput =
  typeof GetAccountsAccountPersonsOutput.Type;

// The operation
/**
 * List all persons
 *
 * <p>Returns a list of people associated with the account’s legal entity. The people are returned sorted by creation date, with the most recent people appearing first.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param relationship - Filters on the list of people returned based on the person's relationship to the account's company.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetAccountsAccountPersons = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetAccountsAccountPersonsInput,
    outputSchema: GetAccountsAccountPersonsOutput,
  }),
);
