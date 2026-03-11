import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListOrganizationMembersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    slug: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/organizations/{slug}/members" }));
export type V1ListOrganizationMembersInput =
  typeof V1ListOrganizationMembersInput.Type;

// Output Schema
export const V1ListOrganizationMembersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      user_id: Schema.String,
      user_name: Schema.String,
      email: Schema.optional(Schema.String),
      role_name: Schema.String,
      mfa_enabled: Schema.Boolean,
    }),
  );
export type V1ListOrganizationMembersOutput =
  typeof V1ListOrganizationMembersOutput.Type;

// The operation
/**
 * List members of an organization
 *
 * @param slug - Organization slug
 */
export const v1ListOrganizationMembers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1ListOrganizationMembersInput,
    outputSchema: V1ListOrganizationMembersOutput,
  }),
);
