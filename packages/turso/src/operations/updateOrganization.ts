import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateOrganizationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    overages: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({ method: "PATCH", path: "/v1/organizations/{organizationSlug}" }),
  );
export type UpdateOrganizationInput = typeof UpdateOrganizationInput.Type;

// Output Schema
export const UpdateOrganizationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type UpdateOrganizationOutput = typeof UpdateOrganizationOutput.Type;

// The operation
/**
 * Update Organization
 *
 * Update an organization you own or are a member of.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const updateOrganization = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateOrganizationInput,
  outputSchema: UpdateOrganizationOutput,
}));
