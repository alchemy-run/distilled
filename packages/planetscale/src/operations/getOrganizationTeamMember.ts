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
export const GetOrganizationTeamMemberInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.String.pipe(T.PathParam()),
    team: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/organizations/{organization}/teams/{team}/members/{id}",
    }),
  );
export type GetOrganizationTeamMemberInput =
  typeof GetOrganizationTeamMemberInput.Type;

// Output Schema
export const GetOrganizationTeamMemberOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetOrganizationTeamMemberOutput =
  typeof GetOrganizationTeamMemberOutput.Type;

// The operation
/**
 * Get a team member
 *
 * @param organization - The name of the organization
 * @param team - The slug of the team
 * @param id - The ID of the team membership or the ID of the member
 */
export const getOrganizationTeamMember = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrganizationTeamMemberInput,
    outputSchema: GetOrganizationTeamMemberOutput,
    errors: [BadRequest, Forbidden, NotFound, UnprocessableEntity] as const,
  }),
);
