import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostIdentityVerificationSessionsSessionRedactInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/identity/verification_sessions/{session}/redact",
      contentType: "form-urlencoded",
    }),
  );
export type PostIdentityVerificationSessionsSessionRedactInput =
  typeof PostIdentityVerificationSessionsSessionRedactInput.Type;

// Output Schema
export const PostIdentityVerificationSessionsSessionRedactOutput =
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
export type PostIdentityVerificationSessionsSessionRedactOutput =
  typeof PostIdentityVerificationSessionsSessionRedactOutput.Type;

// The operation
/**
 * Redact a VerificationSession
 *
 * <p>Redact a VerificationSession to remove all collected information from Stripe. This will redact
 * the VerificationSession and all objects related to it, including VerificationReports, Events,
 * request logs, etc.</p>
 * <p>A VerificationSession object can be redacted when it is in <code>requires_input</code> or <code>verified</code>
 * <a href="/docs/identity/how-sessions-work">status</a>. Redacting a VerificationSession in <code>requires_action</code>
 * state will automatically cancel it.</p>
 * <p>The redaction process may take up to four days. When the redaction process is in progress, the
 * VerificationSession’s <code>redaction.status</code> field will be set to <code>processing</code>; when the process is
 * finished, it will change to <code>redacted</code> and an <code>identity.verification_session.redacted</code> event
 * will be emitted.</p>
 * <p>Redaction is irreversible. Redacted objects are still accessible in the Stripe API, but all the
 * fields that contain personal data will be replaced by the string <code>[redacted]</code> or a similar
 * placeholder. The <code>metadata</code> field will also be erased. Redacted objects cannot be updated or
 * used for any purpose.</p>
 * <p><a href="/docs/identity/verification-sessions#redact">Learn more</a>.</p>
 */
export const PostIdentityVerificationSessionsSessionRedact =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostIdentityVerificationSessionsSessionRedactInput,
    outputSchema: PostIdentityVerificationSessionsSessionRedactOutput,
  }));
