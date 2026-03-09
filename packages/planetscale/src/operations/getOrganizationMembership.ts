import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetOrganizationMembershipInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization}/members/{id}" }),
);
export type GetOrganizationMembershipInput =
  typeof GetOrganizationMembershipInput.Type;

// Output Schema
export const GetOrganizationMembershipOutput = Schema.Struct({
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
export type GetOrganizationMembershipOutput =
  typeof GetOrganizationMembershipOutput.Type;

// The operation
/**
 * Get an organization member
 *
 * @param organization - The name of the organization
 * @param id - The ID of the user
 */
export const getOrganizationMembership = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrganizationMembershipInput,
    outputSchema: GetOrganizationMembershipOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
