import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateMemberRoleInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  username: Schema.String.pipe(T.PathParam()),
  role: Schema.Literals(["admin", "member", "viewer"]),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/v1/organizations/{organizationSlug}/members/{username}",
  }),
);
export type UpdateMemberRoleInput = typeof UpdateMemberRoleInput.Type;

// Output Schema
export const UpdateMemberRoleOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    member: Schema.optional(
      Schema.Struct({
        username: Schema.optional(Schema.String),
        email: Schema.optional(Schema.String),
        role: Schema.optional(Schema.Literals(["admin", "member", "viewer"])),
      }),
    ),
  },
);
export type UpdateMemberRoleOutput = typeof UpdateMemberRoleOutput.Type;

// The operation
/**
 * Update Member Role
 *
 * Update the role of an organization member. Only organization admins or owners can perform this action.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param username - The username of a Turso user or organization member.
 */
export const updateMemberRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateMemberRoleInput,
  outputSchema: UpdateMemberRoleOutput,
}));
