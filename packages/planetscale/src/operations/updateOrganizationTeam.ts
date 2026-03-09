import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import {
  BadRequest,
  Forbidden,
  NotFound,
  UnprocessableEntity,
} from "../errors";

// Input Schema
export const UpdateOrganizationTeamInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  team: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/teams/{team}",
  }),
);
export type UpdateOrganizationTeamInput =
  typeof UpdateOrganizationTeamInput.Type;

// Output Schema
export const UpdateOrganizationTeamOutput = Schema.Struct({
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
export type UpdateOrganizationTeamOutput =
  typeof UpdateOrganizationTeamOutput.Type;

// The operation
/**
 * Update an organization team
 *
 * @param organization - The name of the organization
 * @param team - The slug of the team
 * @param name - The new name for the team
 * @param description - The new description for the team
 */
export const updateOrganizationTeam = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateOrganizationTeamInput,
    outputSchema: UpdateOrganizationTeamOutput,
    errors: [BadRequest, Forbidden, NotFound, UnprocessableEntity] as const,
  }),
);
