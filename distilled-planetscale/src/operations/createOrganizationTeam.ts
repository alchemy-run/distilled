import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateOrganizationTeamInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
  description: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/organizations/{organization}/teams" }),
);
export type CreateOrganizationTeamInput =
  typeof CreateOrganizationTeamInput.Type;

// Output Schema
export const CreateOrganizationTeamOutput = Schema.Struct({
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
export type CreateOrganizationTeamOutput =
  typeof CreateOrganizationTeamOutput.Type;

// The operation
/**
 * Create an organization team
 *
 * @param organization - The name of the organization
 * @param name - The name of the team
 * @param description - A description of the team's purpose
 */
export const createOrganizationTeam = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateOrganizationTeamInput,
    outputSchema: CreateOrganizationTeamOutput,
  }),
);
