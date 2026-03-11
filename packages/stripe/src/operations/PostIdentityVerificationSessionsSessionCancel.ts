import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostIdentityVerificationSessionsSessionCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/identity/verification_sessions/{session}/cancel",
      contentType: "form-urlencoded",
    }),
  );
export type PostIdentityVerificationSessionsSessionCancelInput =
  typeof PostIdentityVerificationSessionsSessionCancelInput.Type;

// Output Schema
export const PostIdentityVerificationSessionsSessionCancelOutput =
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
export type PostIdentityVerificationSessionsSessionCancelOutput =
  typeof PostIdentityVerificationSessionsSessionCancelOutput.Type;

// The operation
/**
 * Cancel a VerificationSession
 *
 * <p>A VerificationSession object can be canceled when it is in <code>requires_input</code> <a href="/docs/identity/how-sessions-work">status</a>.</p>
 * <p>Once canceled, future submission attempts are disabled. This cannot be undone. <a href="/docs/identity/verification-sessions#cancel">Learn more</a>.</p>
 */
export const PostIdentityVerificationSessionsSessionCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostIdentityVerificationSessionsSessionCancelInput,
    outputSchema: PostIdentityVerificationSessionsSessionCancelOutput,
  }));
