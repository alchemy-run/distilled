import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateNeonAuthOrganizationPluginInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  enabled: Schema.optional(Schema.Boolean),
  organization_limit: Schema.optional(Schema.Number),
  membership_limit: Schema.optional(Schema.Number),
  creator_role: Schema.optional(Schema.Literals(["admin", "owner"])),
  send_invitation_email: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/projects/{project_id}/branches/{branch_id}/auth/plugins/organization",
  }),
);
export type UpdateNeonAuthOrganizationPluginInput =
  typeof UpdateNeonAuthOrganizationPluginInput.Type;

// Output Schema
export const UpdateNeonAuthOrganizationPluginOutput = Schema.Struct({
  enabled: Schema.Boolean,
  organization_limit: Schema.Number,
  membership_limit: Schema.Number,
  creator_role: Schema.Literals(["admin", "owner"]),
  send_invitation_email: Schema.Boolean,
});
export type UpdateNeonAuthOrganizationPluginOutput =
  typeof UpdateNeonAuthOrganizationPluginOutput.Type;

// The operation
/**
 * Update organization plugin configuration
 *
 * Updates the organization plugin configuration for Neon Auth.
 * The organization plugin enables multi-tenant organization support.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const updateNeonAuthOrganizationPlugin =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateNeonAuthOrganizationPluginInput,
    outputSchema: UpdateNeonAuthOrganizationPluginOutput,
  }));
