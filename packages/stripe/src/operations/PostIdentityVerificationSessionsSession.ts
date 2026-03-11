import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostIdentityVerificationSessionsSessionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    options: Schema.optional(
      Schema.Struct({
        document: Schema.optional(Schema.Unknown),
      }),
    ),
    provided_details: Schema.optional(
      Schema.Struct({
        email: Schema.optional(Schema.String),
        phone: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(Schema.Literals(["document", "id_number"])),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/identity/verification_sessions/{session}",
      contentType: "form-urlencoded",
    }),
  );
export type PostIdentityVerificationSessionsSessionInput =
  typeof PostIdentityVerificationSessionsSessionInput.Type;

// Output Schema
export const PostIdentityVerificationSessionsSessionOutput =
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
export type PostIdentityVerificationSessionsSessionOutput =
  typeof PostIdentityVerificationSessionsSessionOutput.Type;

// The operation
/**
 * Update a VerificationSession
 *
 * <p>Updates a VerificationSession object.</p>
 * <p>When the session status is <code>requires_input</code>, you can use this method to update the
 * verification check and options.</p>
 */
export const PostIdentityVerificationSessionsSession =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostIdentityVerificationSessionsSessionInput,
    outputSchema: PostIdentityVerificationSessionsSessionOutput,
  }));
