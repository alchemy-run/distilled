import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrganizationMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/members",
    }),
  );
export type ListOrganizationMembersInput =
  typeof ListOrganizationMembersInput.Type;

// Output Schema
export const ListOrganizationMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    members: Schema.optional(
      Schema.Array(
        Schema.Struct({
          username: Schema.optional(Schema.String),
          role: Schema.optional(
            Schema.Literals(["owner", "admin", "member", "viewer"]),
          ),
          email: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ListOrganizationMembersOutput =
  typeof ListOrganizationMembersOutput.Type;

// The operation
/**
 * List Members
 *
 * Returns a list of members part of the organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const listOrganizationMembers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOrganizationMembersInput,
    outputSchema: ListOrganizationMembersOutput,
  }),
);
