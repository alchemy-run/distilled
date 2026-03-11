import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIdentityVerificationSessionsSessionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/identity/verification_sessions/{session}",
      contentType: "form-urlencoded",
    }),
  );
export type GetIdentityVerificationSessionsSessionInput =
  typeof GetIdentityVerificationSessionsSessionInput.Type;

// Output Schema
export const GetIdentityVerificationSessionsSessionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    client_reference_id: Schema.NullOr(Schema.String),
    client_secret: Schema.NullOr(Schema.String),
    created: Schema.Number,
    id: Schema.String,
    last_error: Schema.Unknown,
    last_verification_report: Schema.Unknown,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["identity.verification_session"]),
    options: Schema.Unknown,
    provided_details: Schema.optional(Schema.Unknown),
    redaction: Schema.Unknown,
    related_customer: Schema.NullOr(Schema.String),
    related_customer_account: Schema.NullOr(Schema.String),
    related_person: Schema.optional(
      Schema.Struct({
        account: Schema.String,
        person: Schema.String,
      }),
    ),
    status: Schema.Literals([
      "canceled",
      "processing",
      "requires_input",
      "verified",
    ]),
    type: Schema.Literals(["document", "id_number", "verification_flow"]),
    url: Schema.NullOr(Schema.String),
    verification_flow: Schema.optional(Schema.String),
    verified_outputs: Schema.optional(Schema.Unknown),
  });
export type GetIdentityVerificationSessionsSessionOutput =
  typeof GetIdentityVerificationSessionsSessionOutput.Type;

// The operation
/**
 * Retrieve a VerificationSession
 *
 * <p>Retrieves the details of a VerificationSession that was previously created.</p>
 * <p>When the session status is <code>requires_input</code>, you can use this method to retrieve a valid
 * <code>client_secret</code> or <code>url</code> to allow re-submission.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetIdentityVerificationSessionsSession =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetIdentityVerificationSessionsSessionInput,
    outputSchema: GetIdentityVerificationSessionsSessionOutput,
  }));
