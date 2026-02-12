import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateOrganizationInvitationsInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
  invitations: Schema.Array(Schema.Struct({
    email: Schema.String,
    role: Schema.Literal("admin", "member"),
  })),
}).pipe(T.Http({ method: "POST", path: "/organizations/{org_id}/invitations" }));
export type CreateOrganizationInvitationsInput = typeof CreateOrganizationInvitationsInput.Type;

// Output Schema
export const CreateOrganizationInvitationsOutput = Schema.Struct({
  invitations: Schema.Array(Schema.Struct({
    id: Schema.String,
    email: Schema.String,
    org_id: Schema.String,
    invited_by: Schema.String,
    invited_at: Schema.String,
    role: Schema.Literal("admin", "member"),
  })),
});
export type CreateOrganizationInvitationsOutput = typeof CreateOrganizationInvitationsOutput.Type;

// The operation
/**
 * Create organization invitations
 *
 * Creates invitations for a specific organization.
 * If the invited user has an existing account, they automatically join as a member.
 * If they don't yet have an account, they are invited to create one, after which they become a member.
 * Each invited user receives an email notification.
 *
 * @param org_id - The Neon organization ID
 */
export const createOrganizationInvitations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateOrganizationInvitationsInput,
  outputSchema: CreateOrganizationInvitationsOutput,
}));
