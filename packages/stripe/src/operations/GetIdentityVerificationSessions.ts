import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const GetIdentityVerificationSessionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    client_reference_id: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    related_customer: Schema.optional(Schema.String),
    related_customer_account: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["canceled", "processing", "requires_input", "verified"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/identity/verification_sessions",
      contentType: "form-urlencoded",
    }),
  );
export type GetIdentityVerificationSessionsInput =
  typeof GetIdentityVerificationSessionsInput.Type;

// Output Schema
export const GetIdentityVerificationSessionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetIdentityVerificationSessionsOutput =
  typeof GetIdentityVerificationSessionsOutput.Type;

// The operation
/**
 * List VerificationSessions
 *
 * <p>Returns a list of VerificationSessions</p>
 *
 * @param client_reference_id - A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.
 * @param created - Only return VerificationSessions that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param related_customer - Customer ID
 * @param related_customer_account - The ID of the Account representing a customer.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return VerificationSessions with this status. [Learn more about the lifecycle of sessions](https://docs.stripe.com/identity/how-sessions-work).
 */
export const GetIdentityVerificationSessions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetIdentityVerificationSessionsInput,
    outputSchema: GetIdentityVerificationSessionsOutput,
  }));
