import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationInvitationsInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/organizations/{org_id}/invitations" }));
export type GetOrganizationInvitationsInput = typeof GetOrganizationInvitationsInput.Type;

// Output Schema
export const GetOrganizationInvitationsOutput = Schema.Struct({
  invitations: Schema.Array(Schema.Struct({
    id: Schema.String,
    email: Schema.String,
    org_id: Schema.String,
    invited_by: Schema.String,
    invited_at: Schema.String,
    role: Schema.Literal("admin", "member"),
  })),
});
export type GetOrganizationInvitationsOutput = typeof GetOrganizationInvitationsOutput.Type;

// The operation
/**
 * Retrieve organization invitation details
 *
 * Retrieves information about extended invitations for the specified organization
 *
 * @param org_id - The Neon organization ID
 */
export const getOrganizationInvitations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrganizationInvitationsInput,
  outputSchema: GetOrganizationInvitationsOutput,
}));
