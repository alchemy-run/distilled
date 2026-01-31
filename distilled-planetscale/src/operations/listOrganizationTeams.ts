import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrganizationTeamsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  q: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/organizations/{organization}/teams" }));
export type ListOrganizationTeamsInput = typeof ListOrganizationTeamsInput.Type;

// Output Schema
export const ListOrganizationTeamsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
});
export type ListOrganizationTeamsOutput =
  typeof ListOrganizationTeamsOutput.Type;

// The operation
/**
 * List teams in an organization
 *
 * @param organization - The name of the organization
 * @param q - Search term to filter teams by name
 */
export const listOrganizationTeams = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOrganizationTeamsInput,
    outputSchema: ListOrganizationTeamsOutput,
  }),
);
