import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AddOrganizationMemberInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    username: Schema.optional(Schema.String),
    role: Schema.optional(Schema.Literals(["admin", "member", "viewer"])),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/organizations/{organizationSlug}/members",
    }),
  );
export type AddOrganizationMemberInput = typeof AddOrganizationMemberInput.Type;

// Output Schema
export const AddOrganizationMemberOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    member: Schema.optional(Schema.String),
    role: Schema.optional(
      Schema.Literals(["owner", "admin", "member", "viewer"]),
    ),
  });
export type AddOrganizationMemberOutput =
  typeof AddOrganizationMemberOutput.Type;

// The operation
/**
 * Add Member
 *
 * Add an existing Turso user to an organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const addOrganizationMember = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddOrganizationMemberInput,
    outputSchema: AddOrganizationMemberOutput,
  }),
);
