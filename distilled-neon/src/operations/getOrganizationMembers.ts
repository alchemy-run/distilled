import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationMembersInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/organizations/{org_id}/members" }));
export type GetOrganizationMembersInput = typeof GetOrganizationMembersInput.Type;

// Output Schema
export const GetOrganizationMembersOutput = Schema.Struct({
  members: Schema.Array(Schema.Struct({
    member: Schema.Struct({
      id: Schema.String,
      user_id: Schema.String,
      org_id: Schema.String,
      role: Schema.Literal("admin", "member"),
      joined_at: Schema.optional(Schema.String),
    }),
    user: Schema.Struct({
      email: Schema.String,
    }),
  })),
});
export type GetOrganizationMembersOutput = typeof GetOrganizationMembersOutput.Type;

// The operation
/**
 * Retrieve organization members details
 *
 * Retrieves information about the specified organization members.
 *
 * @param org_id - The Neon organization ID
 */
export const getOrganizationMembers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrganizationMembersInput,
  outputSchema: GetOrganizationMembersOutput,
}));
