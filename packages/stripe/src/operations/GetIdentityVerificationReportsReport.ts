import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIdentityVerificationReportsReportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    report: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/identity/verification_reports/{report}",
      contentType: "form-urlencoded",
    }),
  );
export type GetIdentityVerificationReportsReportInput =
  typeof GetIdentityVerificationReportsReportInput.Type;

// Output Schema
export const GetIdentityVerificationReportsReportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
        unparsed_place_of_birth: Schema.optional(Schema.NullOr(Schema.String)),
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
  });
export type GetIdentityVerificationReportsReportOutput =
  typeof GetIdentityVerificationReportsReportOutput.Type;

// The operation
/**
 * Retrieve a VerificationReport
 *
 * <p>Retrieves an existing VerificationReport</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetIdentityVerificationReportsReport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetIdentityVerificationReportsReportInput,
    outputSchema: GetIdentityVerificationReportsReportOutput,
  }));
