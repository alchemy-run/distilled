import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "GET", path: "/v1/organizations/{organizationSlug}" }),
);
export type GetOrganizationInput = typeof GetOrganizationInput.Type;

// Output Schema
export const GetOrganizationOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organization: Schema.optional(
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
});
export type GetOrganizationOutput = typeof GetOrganizationOutput.Type;

// The operation
/**
 * Retrieve Organization
 *
 * Retrieve details of a specific organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const getOrganization = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrganizationInput,
  outputSchema: GetOrganizationOutput,
}));
