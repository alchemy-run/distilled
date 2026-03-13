import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    org_id: Schema.String.pipe(T.PathParam()),
    sort_by: Schema.optional(Schema.Literals(["email", "role", "joined_at"])),
    cursor: Schema.optional(Schema.String),
    sort_order: Schema.optional(Schema.Literals(["asc", "desc"])),
    limit: Schema.optional(Schema.Number),
  }).pipe(T.Http({ method: "GET", path: "/organizations/{org_id}/members" }));
export type GetOrganizationMembersInput =
  typeof GetOrganizationMembersInput.Type;

// Output Schema
export const GetOrganizationMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    members: Schema.Array(
      Schema.Struct({
        member: Schema.Struct({
          id: Schema.String,
          user_id: Schema.String,
          org_id: Schema.String,
          role: Schema.Literals(["admin", "member"]),
          joined_at: Schema.optional(Schema.String),
        }),
        user: Schema.Struct({
          email: Schema.String,
          has_mfa: Schema.optional(Schema.Boolean),
        }),
      }),
    ),
    pagination: Schema.optional(
      Schema.Struct({
        next: Schema.optional(Schema.String),
        sort_by: Schema.optional(Schema.String),
        sort_order: Schema.optional(Schema.String),
      }),
    ),
  });
export type GetOrganizationMembersOutput =
  typeof GetOrganizationMembersOutput.Type;

// The operation
/**
 * Retrieve organization members details
 *
 * Retrieves a paginated list of members for the specified organization.
 *
 * @param org_id - The Neon organization ID
 * @param sort_by - Sort the members by the specified field. Defaults to `joined_at`.
 * @param cursor - A cursor to use in pagination. A cursor defines your place in the data list. Include `response.pagination.next` in subsequent API calls to fetch next page of the list.
 * @param sort_order - Defines the sorting order of entities.
 * @param limit - The maximum number of members to return in the response
 */
export const getOrganizationMembers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrganizationMembersInput,
    outputSchema: GetOrganizationMembersOutput,
  }),
);
