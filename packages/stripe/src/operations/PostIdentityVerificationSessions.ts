import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const PostIdentityVerificationSessionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    client_reference_id: Schema.optional(Schema.String),
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
    related_customer: Schema.optional(Schema.String),
    related_customer_account: Schema.optional(Schema.String),
    related_person: Schema.optional(
      Schema.Struct({
        account: Schema.String,
        person: Schema.String,
      }),
    ),
    return_url: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Literals(["document", "id_number"])),
    verification_flow: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/identity/verification_sessions",
      contentType: "form-urlencoded",
    }),
  );
export type PostIdentityVerificationSessionsInput =
  typeof PostIdentityVerificationSessionsInput.Type;

// Output Schema
export const PostIdentityVerificationSessionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    client_reference_id: Schema.NullOr(Schema.String),
    client_secret: SensitiveNullableString,
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
export type PostIdentityVerificationSessionsOutput =
  typeof PostIdentityVerificationSessionsOutput.Type;

// The operation
/**
 * Create a VerificationSession
 *
 * <p>Creates a VerificationSession object.</p>
 * <p>After the VerificationSession is created, display a verification modal using the session <code>client_secret</code> or send your users to the session’s <code>url</code>.</p>
 * <p>If your API key is in test mode, verification checks won’t actually process, though everything else will occur as if in live mode.</p>
 * <p>Related guide: <a href="/docs/identity/verify-identity-documents">Verify your users’ identity documents</a></p>
 */
export const PostIdentityVerificationSessions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostIdentityVerificationSessionsInput,
    outputSchema: PostIdentityVerificationSessionsOutput,
  }));
