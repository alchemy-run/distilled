import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteOrganizationInviteByEmailInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    email: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/organizations/{organizationSlug}/invites/{email}",
    }),
  );
export type DeleteOrganizationInviteByEmailInput =
  typeof DeleteOrganizationInviteByEmailInput.Type;

// Output Schema
export const DeleteOrganizationInviteByEmailOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteOrganizationInviteByEmailOutput =
  typeof DeleteOrganizationInviteByEmailOutput.Type;

// The operation
/**
 * Delete Invite
 *
 * Delete an invite for the organization by email.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const deleteOrganizationInviteByEmail =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteOrganizationInviteByEmailInput,
    outputSchema: DeleteOrganizationInviteByEmailOutput,
  }));
