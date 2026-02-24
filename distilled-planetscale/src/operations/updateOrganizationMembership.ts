import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const UpdateOrganizationMembershipInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  role: Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/members/{id}",
  }),
);
export type UpdateOrganizationMembershipInput =
  typeof UpdateOrganizationMembershipInput.Type;

// Output Schema
export const UpdateOrganizationMembershipOutput = Schema.Struct({
  id: Schema.String,
  user: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    name: Schema.optional(Schema.NullOr(Schema.String)),
    email: Schema.String,
    avatar_url: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    two_factor_auth_configured: Schema.Boolean,
    default_organization: Schema.optional(
      Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        created_at: Schema.String,
        updated_at: Schema.String,
        deleted_at: Schema.String,
      }),
    ),
    sso: Schema.optional(Schema.Boolean),
    managed: Schema.optional(Schema.Boolean),
    directory_managed: Schema.optional(Schema.Boolean),
    email_verified: Schema.optional(Schema.Boolean),
  }),
  role: Schema.Literals(["member", "admin"]),
  created_at: Schema.String,
  updated_at: Schema.String,
});
export type UpdateOrganizationMembershipOutput =
  typeof UpdateOrganizationMembershipOutput.Type;

// The operation
/**
 * Update organization member role
 *
 * @param organization - The name of the organization
 * @param id - The ID of the user
 * @param role - The role to assign to the member (e.g., 'admin', 'member'). Note: Cannot update your own role. Roles managed by IdP cannot be updated via API.
 */
export const updateOrganizationMembership =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateOrganizationMembershipInput,
    outputSchema: UpdateOrganizationMembershipOutput,
    errors: [Forbidden, NotFound] as const,
  }));
