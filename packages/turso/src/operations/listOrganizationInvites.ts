import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrganizationInvitesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/invites",
    }),
  );
export type ListOrganizationInvitesInput =
  typeof ListOrganizationInvitesInput.Type;

// Output Schema
export const ListOrganizationInvitesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invites: Schema.optional(
      Schema.Array(
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
    ),
  });
export type ListOrganizationInvitesOutput =
  typeof ListOrganizationInvitesOutput.Type;

// The operation
/**
 * List Invites
 *
 * Returns a list of invites for the organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const listOrganizationInvites = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOrganizationInvitesInput,
    outputSchema: ListOrganizationInvitesOutput,
  }),
);
