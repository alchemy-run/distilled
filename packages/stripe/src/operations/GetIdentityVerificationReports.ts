import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIdentityVerificationReportsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    client_reference_id: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Literals(["document", "id_number"])),
    verification_session: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/identity/verification_reports",
      contentType: "form-urlencoded",
    }),
  );
export type GetIdentityVerificationReportsInput =
  typeof GetIdentityVerificationReportsInput.Type;

// Output Schema
export const GetIdentityVerificationReportsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        client_reference_id: Schema.NullOr(Schema.String),
        created: Schema.Number,
        document: Schema.optional(
          Schema.Struct({
            address: Schema.Unknown,
            dob: Schema.optional(Schema.Unknown),
            error: Schema.Unknown,
            expiration_date: Schema.optional(Schema.Unknown),
            files: Schema.NullOr(Schema.Array(Schema.String)),
            first_name: Schema.NullOr(Schema.String),
            issued_date: Schema.Unknown,
            issuing_country: Schema.NullOr(Schema.String),
            last_name: Schema.NullOr(Schema.String),
            number: Schema.optional(Schema.NullOr(Schema.String)),
            sex: Schema.optional(
              Schema.NullOr(
                Schema.Literals(["[redacted]", "female", "male", "unknown"]),
              ),
            ),
            status: Schema.Literals(["unverified", "verified"]),
            type: Schema.NullOr(
              Schema.Literals(["driving_license", "id_card", "passport"]),
            ),
            unparsed_place_of_birth: Schema.optional(
              Schema.NullOr(Schema.String),
            ),
            unparsed_sex: Schema.optional(Schema.NullOr(Schema.String)),
          }),
        ),
        email: Schema.optional(
          Schema.Struct({
            email: Schema.NullOr(Schema.String),
            error: Schema.Unknown,
            status: Schema.Literals(["unverified", "verified"]),
          }),
        ),
        id: Schema.String,
        id_number: Schema.optional(
          Schema.Struct({
            dob: Schema.optional(Schema.Unknown),
            error: Schema.Unknown,
            first_name: Schema.NullOr(Schema.String),
            id_number: Schema.optional(Schema.NullOr(Schema.String)),
            id_number_type: Schema.NullOr(
              Schema.Literals(["br_cpf", "sg_nric", "us_ssn"]),
            ),
            last_name: Schema.NullOr(Schema.String),
            status: Schema.Literals(["unverified", "verified"]),
          }),
        ),
        livemode: Schema.Boolean,
        object: Schema.Literals(["identity.verification_report"]),
        options: Schema.optional(
          Schema.Struct({
            document: Schema.optional(
              Schema.Struct({
                allowed_types: Schema.optional(
                  Schema.Array(
                    Schema.Literals(["driving_license", "id_card", "passport"]),
                  ),
                ),
                require_id_number: Schema.optional(Schema.Boolean),
                require_live_capture: Schema.optional(Schema.Boolean),
                require_matching_selfie: Schema.optional(Schema.Boolean),
              }),
            ),
            id_number: Schema.optional(Schema.Struct({})),
          }),
        ),
        phone: Schema.optional(
          Schema.Struct({
            error: Schema.Unknown,
            phone: Schema.NullOr(Schema.String),
            status: Schema.Literals(["unverified", "verified"]),
          }),
        ),
        selfie: Schema.optional(
          Schema.Struct({
            document: Schema.NullOr(Schema.String),
            error: Schema.Unknown,
            selfie: Schema.NullOr(Schema.String),
            status: Schema.Literals(["unverified", "verified"]),
          }),
        ),
        type: Schema.Literals(["document", "id_number", "verification_flow"]),
        verification_flow: Schema.optional(Schema.String),
        verification_session: Schema.NullOr(Schema.String),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetIdentityVerificationReportsOutput =
  typeof GetIdentityVerificationReportsOutput.Type;

// The operation
/**
 * List VerificationReports
 *
 * <p>List all verification reports.</p>
 *
 * @param client_reference_id - A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.
 * @param created - Only return VerificationReports that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param type - Only return VerificationReports of this type
 * @param verification_session - Only return VerificationReports created by this VerificationSession ID. It is allowed to provide a VerificationIntent ID.
 */
export const GetIdentityVerificationReports =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetIdentityVerificationReportsInput,
    outputSchema: GetIdentityVerificationReportsOutput,
  }));
