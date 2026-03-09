import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateNeonAuthEmailAndPasswordConfigInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  enabled: Schema.optional(Schema.Boolean),
  email_verification_method: Schema.optional(Schema.Literals(["link", "otp"])),
  require_email_verification: Schema.optional(Schema.Boolean),
  auto_sign_in_after_verification: Schema.optional(Schema.Boolean),
  send_verification_email_on_sign_up: Schema.optional(Schema.Boolean),
  send_verification_email_on_sign_in: Schema.optional(Schema.Boolean),
  disable_sign_up: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/projects/{project_id}/branches/{branch_id}/auth/email_and_password",
  }),
);
export type UpdateNeonAuthEmailAndPasswordConfigInput =
  typeof UpdateNeonAuthEmailAndPasswordConfigInput.Type;

// Output Schema
export const UpdateNeonAuthEmailAndPasswordConfigOutput = Schema.Struct({
  enabled: Schema.Boolean,
  email_verification_method: Schema.Literals(["link", "otp"]),
  require_email_verification: Schema.Boolean,
  auto_sign_in_after_verification: Schema.Boolean,
  send_verification_email_on_sign_up: Schema.Boolean,
  send_verification_email_on_sign_in: Schema.Boolean,
  disable_sign_up: Schema.Boolean,
});
export type UpdateNeonAuthEmailAndPasswordConfigOutput =
  typeof UpdateNeonAuthEmailAndPasswordConfigOutput.Type;

// The operation
/**
 * Update email and password configuration
 *
 * Updates the email and password authentication configuration for Neon Auth
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const updateNeonAuthEmailAndPasswordConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateNeonAuthEmailAndPasswordConfigInput,
    outputSchema: UpdateNeonAuthEmailAndPasswordConfigOutput,
  }));
