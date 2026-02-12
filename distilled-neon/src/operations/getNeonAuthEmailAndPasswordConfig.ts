import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetNeonAuthEmailAndPasswordConfigInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/branches/{branch_id}/auth/email_and_password" }));
export type GetNeonAuthEmailAndPasswordConfigInput = typeof GetNeonAuthEmailAndPasswordConfigInput.Type;

// Output Schema
export const GetNeonAuthEmailAndPasswordConfigOutput = Schema.Struct({
  enabled: Schema.Boolean,
  email_verification_method: Schema.Literal("link", "otp"),
  require_email_verification: Schema.Boolean,
  auto_sign_in_after_verification: Schema.Boolean,
  send_verification_email_on_sign_up: Schema.Boolean,
  send_verification_email_on_sign_in: Schema.Boolean,
  disable_sign_up: Schema.Boolean,
});
export type GetNeonAuthEmailAndPasswordConfigOutput = typeof GetNeonAuthEmailAndPasswordConfigOutput.Type;

// The operation
/**
 * Get email and password configuration
 *
 * Gets the email and password authentication configuration for Neon Auth
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const getNeonAuthEmailAndPasswordConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetNeonAuthEmailAndPasswordConfigInput,
  outputSchema: GetNeonAuthEmailAndPasswordConfigOutput,
}));
