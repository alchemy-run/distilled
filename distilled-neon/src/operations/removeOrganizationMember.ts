import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RemoveOrganizationMemberInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
  member_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/organizations/{org_id}/members/{member_id}" }));
export type RemoveOrganizationMemberInput = typeof RemoveOrganizationMemberInput.Type;

// Output Schema
export const RemoveOrganizationMemberOutput = Schema.Struct({

});
export type RemoveOrganizationMemberOutput = typeof RemoveOrganizationMemberOutput.Type;

// The operation
/**
 * Remove member from the organization
 *
 * Remove member from the organization.
 * Only an admin of the organization can perform this action.
 * If another admin is being removed, it will not be allows in case it is the only admin left in the organization.
 *
 * @param org_id - The Neon organization ID
 * @param member_id - The Neon organization member ID
 */
export const removeOrganizationMember = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RemoveOrganizationMemberInput,
  outputSchema: RemoveOrganizationMemberOutput,
}));
