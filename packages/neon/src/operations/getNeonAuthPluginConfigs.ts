import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetNeonAuthPluginConfigsInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/auth/plugins",
  }),
);
export type GetNeonAuthPluginConfigsInput =
  typeof GetNeonAuthPluginConfigsInput.Type;

// Output Schema
export const GetNeonAuthPluginConfigsOutput = Schema.Struct({
  organization: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
      organization_limit: Schema.Number,
      membership_limit: Schema.Number,
      creator_role: Schema.Literals(["admin", "owner"]),
      send_invitation_email: Schema.Boolean,
    }),
  ),
  email_provider: Schema.optional(Schema.Unknown),
  email_and_password: Schema.optional(
    Schema.Struct({
      enabled: Schema.Boolean,
      email_verification_method: Schema.Literals(["link", "otp"]),
      require_email_verification: Schema.Boolean,
      auto_sign_in_after_verification: Schema.Boolean,
      send_verification_email_on_sign_up: Schema.Boolean,
      send_verification_email_on_sign_in: Schema.Boolean,
      disable_sign_up: Schema.Boolean,
    }),
  ),
  oauth_providers: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.Literals(["google", "github", "microsoft", "vercel"]),
        type: Schema.Literals(["standard", "shared"]),
        client_id: Schema.optional(Schema.String),
        client_secret: Schema.optional(Schema.String),
      }),
    ),
  ),
  allow_localhost: Schema.optional(Schema.Boolean),
});
export type GetNeonAuthPluginConfigsOutput =
  typeof GetNeonAuthPluginConfigsOutput.Type;

// The operation
/**
 * Get all plugin configurations
 *
 * Returns all plugin configurations for Neon Auth in a single response.
 * This endpoint aggregates organization, email provider, email and password,
 * OAuth providers, and localhost settings.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const getNeonAuthPluginConfigs = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetNeonAuthPluginConfigsInput,
    outputSchema: GetNeonAuthPluginConfigsOutput,
  }),
);
