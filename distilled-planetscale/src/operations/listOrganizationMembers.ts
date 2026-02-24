import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListOrganizationMembersInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  q: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization}/members" }),
);
export type ListOrganizationMembersInput =
  typeof ListOrganizationMembersInput.Type;

// Output Schema
export const ListOrganizationMembersOutput = Schema.Struct({
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
    }),
  ),
});
export type ListOrganizationMembersOutput =
  typeof ListOrganizationMembersOutput.Type;

// The operation
/**
 * List organization members
 *
 * @param organization - The name of the organization
 * @param q - Search term to filter members by name or email
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listOrganizationMembers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOrganizationMembersInput,
    outputSchema: ListOrganizationMembersOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
