import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationMemberInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
  member_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{org_id}/members/{member_id}",
  }),
);
export type GetOrganizationMemberInput = typeof GetOrganizationMemberInput.Type;

// Output Schema
export const GetOrganizationMemberOutput = Schema.Struct({
  id: Schema.String,
  user_id: Schema.String,
  org_id: Schema.String,
  role: Schema.Literals(["admin", "member"]),
  joined_at: Schema.optional(Schema.String),
});
export type GetOrganizationMemberOutput =
  typeof GetOrganizationMemberOutput.Type;

// The operation
/**
 * Retrieve organization member details
 *
 * Retrieves information about the specified organization member.
 *
 * @param org_id - The Neon organization ID
 * @param member_id - The Neon organization member ID
 */
export const getOrganizationMember = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrganizationMemberInput,
    outputSchema: GetOrganizationMemberOutput,
  }),
);
