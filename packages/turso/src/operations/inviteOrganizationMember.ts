import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const InviteOrganizationMemberInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    email: Schema.String,
    role: Schema.optional(Schema.Literals(["admin", "member", "viewer"])),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/organizations/{organizationSlug}/invites",
    }),
  );
export type InviteOrganizationMemberInput =
  typeof InviteOrganizationMemberInput.Type;

// Output Schema
export const InviteOrganizationMemberOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invited: Schema.optional(
      Schema.Struct({
        ID: Schema.optional(Schema.Number),
        CreatedAt: Schema.optional(Schema.String),
        UpdatedAt: Schema.optional(Schema.String),
        DeletedAt: Schema.optional(Schema.String),
        Role: Schema.optional(Schema.Literals(["admin", "member", "viewer"])),
        Email: Schema.optional(Schema.String),
        OrganizationID: Schema.optional(Schema.Number),
        Token: Schema.optional(Schema.String),
        Organization: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            slug: Schema.optional(Schema.String),
            type: Schema.optional(Schema.Literals(["personal", "team"])),
            overages: Schema.optional(Schema.Boolean),
            blocked_reads: Schema.optional(Schema.Boolean),
            blocked_writes: Schema.optional(Schema.Boolean),
            plan_id: Schema.optional(Schema.String),
            plan_timeline: Schema.optional(Schema.String),
            platform: Schema.optional(Schema.String),
          }),
        ),
        Accepted: Schema.optional(Schema.Boolean),
      }),
    ),
  });
export type InviteOrganizationMemberOutput =
  typeof InviteOrganizationMemberOutput.Type;

// The operation
/**
 * Invite Organization Member
 *
 * Invite a user (who isn't already a Turso user) to an organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const inviteOrganizationMember = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InviteOrganizationMemberInput,
    outputSchema: InviteOrganizationMemberOutput,
  }),
);
