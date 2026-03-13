import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import {
  BadRequest,
  Forbidden,
  NotFound,
  UnprocessableEntity,
} from "../errors";
import { SensitiveString } from "../sensitive";

// Input Schema
export const ListOrganizationTeamMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.String.pipe(T.PathParam()),
    team: Schema.String.pipe(T.PathParam()),
    page: Schema.optional(Schema.Number),
    per_page: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/organizations/{organization}/teams/{team}/members",
    }),
  );
export type ListOrganizationTeamMembersInput =
  typeof ListOrganizationTeamMembersInput.Type;

// Output Schema
export const ListOrganizationTeamMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    current_page: Schema.Number,
    next_page: Schema.NullOr(Schema.Number),
    next_page_url: Schema.NullOr(Schema.String),
    prev_page: Schema.NullOr(Schema.Number),
    prev_page_url: Schema.NullOr(Schema.String),
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        user: Schema.Struct({
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
        actor: Schema.Struct({
          id: Schema.String,
          display_name: Schema.String,
          avatar_url: Schema.String,
        }),
        created_at: Schema.String,
        updated_at: Schema.String,
        passwords: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
            role: Schema.Literals(["reader", "writer", "admin", "readwriter"]),
            cidrs: Schema.Array(Schema.String),
            created_at: Schema.String,
            deleted_at: Schema.String,
            expires_at: Schema.String,
            last_used_at: Schema.String,
            expired: Schema.Boolean,
            direct_vtgate: Schema.Boolean,
            direct_vtgate_addresses: Schema.Array(Schema.String),
            ttl_seconds: Schema.Number,
            access_host_url: Schema.String,
            access_host_regional_url: Schema.String,
            access_host_regional_urls: Schema.Array(Schema.String),
            actor: Schema.Struct({
              id: Schema.String,
              display_name: Schema.String,
              avatar_url: Schema.String,
            }),
            region: Schema.Struct({
              id: Schema.String,
              provider: Schema.String,
              enabled: Schema.Boolean,
              public_ip_addresses: Schema.Array(Schema.String),
              display_name: Schema.String,
              location: Schema.String,
              slug: Schema.String,
              current_default: Schema.Boolean,
            }),
            username: Schema.String,
            plain_text: SensitiveString,
            replica: Schema.Boolean,
            renewable: Schema.Boolean,
            database_branch: Schema.Struct({
              name: Schema.String,
              id: Schema.String,
              production: Schema.Boolean,
              mysql_edge_address: Schema.String,
              private_edge_connectivity: Schema.Boolean,
            }),
          }),
        ),
      }),
    ),
  });
export type ListOrganizationTeamMembersOutput =
  typeof ListOrganizationTeamMembersOutput.Type;

// The operation
/**
 * List team members
 *
 * @param organization - The name of the organization
 * @param team - The slug of the team
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listOrganizationTeamMembers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOrganizationTeamMembersInput,
    outputSchema: ListOrganizationTeamMembersOutput,
    errors: [BadRequest, Forbidden, NotFound, UnprocessableEntity] as const,
  }),
);
