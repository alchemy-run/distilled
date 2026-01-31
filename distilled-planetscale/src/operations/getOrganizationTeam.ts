import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationTeamInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  team: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization}/teams/{team}" }),
);
export type GetOrganizationTeamInput = typeof GetOrganizationTeamInput.Type;

// Output Schema
export const GetOrganizationTeamOutput = Schema.Struct({
  id: Schema.String,
  display_name: Schema.String,
  creator: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  members: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      display_name: Schema.String,
      name: Schema.String,
      email: Schema.String,
      avatar_url: Schema.String,
      created_at: Schema.String,
      updated_at: Schema.String,
      two_factor_auth_configured: Schema.Boolean,
      default_organization: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        created_at: Schema.String,
        updated_at: Schema.String,
        deleted_at: Schema.String,
      }),
      sso: Schema.Boolean,
      managed: Schema.Boolean,
      directory_managed: Schema.Boolean,
      email_verified: Schema.Boolean,
    }),
  ),
  databases: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      url: Schema.String,
      branches_url: Schema.String,
    }),
  ),
  name: Schema.String,
  slug: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  description: Schema.String,
  managed: Schema.Boolean,
});
export type GetOrganizationTeamOutput = typeof GetOrganizationTeamOutput.Type;

// The operation
/**
 * Get an organization team
 *
 * @param organization - The name of the organization
 * @param team - The slug of the team
 */
export const getOrganizationTeam = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrganizationTeamInput,
  outputSchema: GetOrganizationTeamOutput,
}));
