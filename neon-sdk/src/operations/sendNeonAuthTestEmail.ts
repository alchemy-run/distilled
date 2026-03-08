import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SendNeonAuthTestEmailInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/projects/{project_id}/branches/{branch_id}/auth/send_test_email",
  }),
);
export type SendNeonAuthTestEmailInput = typeof SendNeonAuthTestEmailInput.Type;

// Output Schema
export const SendNeonAuthTestEmailOutput = Schema.Struct({
  success: Schema.Boolean,
  error_message: Schema.optional(Schema.String),
});
export type SendNeonAuthTestEmailOutput =
  typeof SendNeonAuthTestEmailOutput.Type;

// The operation
/**
 * Send test email
 *
 * Sends a test email to the specified email address.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const sendNeonAuthTestEmail = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SendNeonAuthTestEmailInput,
    outputSchema: SendNeonAuthTestEmailOutput,
  }),
);
