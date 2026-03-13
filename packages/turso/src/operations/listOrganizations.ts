import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrganizationsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(T.Http({ method: "GET", path: "/v1/organizations" }));
export type ListOrganizationsInput = typeof ListOrganizationsInput.Type;

// Output Schema
export const ListOrganizationsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
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
);
export type ListOrganizationsOutput = typeof ListOrganizationsOutput.Type;

// The operation
/**
 * List Organizations
 *
 * Returns a list of organizations the authenticated user owns or is a member of.
 */
export const listOrganizations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrganizationsInput,
  outputSchema: ListOrganizationsOutput,
}));
