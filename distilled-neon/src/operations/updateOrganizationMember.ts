import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateOrganizationMemberInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
  member_id: Schema.String.pipe(T.PathParam()),
  role: Schema.Literals(["admin", "member"]),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{org_id}/members/{member_id}",
  }),
);
export type UpdateOrganizationMemberInput =
  typeof UpdateOrganizationMemberInput.Type;

// Output Schema
export const UpdateOrganizationMemberOutput = Schema.Struct({
  id: Schema.String,
  user_id: Schema.String,
  org_id: Schema.String,
  role: Schema.Literals(["admin", "member"]),
  joined_at: Schema.optional(Schema.String),
});
export type UpdateOrganizationMemberOutput =
  typeof UpdateOrganizationMemberOutput.Type;

// The operation
/**
 * Update role for organization member
 *
 * Only an admin can perform this action.
 *
 * @param org_id - The Neon organization ID
 * @param member_id - The Neon organization member ID
 */
export const updateOrganizationMember = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateOrganizationMemberInput,
    outputSchema: UpdateOrganizationMemberOutput,
  }),
);
