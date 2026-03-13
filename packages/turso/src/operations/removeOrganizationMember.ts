import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RemoveOrganizationMemberInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    username: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/organizations/{organizationSlug}/members/{username}",
    }),
  );
export type RemoveOrganizationMemberInput =
  typeof RemoveOrganizationMemberInput.Type;

// Output Schema
export const RemoveOrganizationMemberOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    member: Schema.optional(Schema.String),
  });
export type RemoveOrganizationMemberOutput =
  typeof RemoveOrganizationMemberOutput.Type;

// The operation
/**
 * Remove Member
 *
 * Remove a user from the organization by username.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param username - The username of a Turso user or organization member.
 */
export const removeOrganizationMember = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RemoveOrganizationMemberInput,
    outputSchema: RemoveOrganizationMemberOutput,
  }),
);
