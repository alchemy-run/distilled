import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationMemberInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    username: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/members/{username}",
    }),
  );
export type GetOrganizationMemberInput = typeof GetOrganizationMemberInput.Type;

// Output Schema
export const GetOrganizationMemberOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    member: Schema.optional(
      Schema.Struct({
        username: Schema.optional(Schema.String),
        role: Schema.optional(
          Schema.Literals(["owner", "admin", "member", "viewer"]),
        ),
        email: Schema.optional(Schema.String),
      }),
    ),
  });
export type GetOrganizationMemberOutput =
  typeof GetOrganizationMemberOutput.Type;

// The operation
/**
 * Retrieve Member
 *
 * Retrieve details of a specific member in the organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param username - The username of a Turso user or organization member.
 */
export const getOrganizationMember = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrganizationMemberInput,
    outputSchema: GetOrganizationMemberOutput,
  }),
);
