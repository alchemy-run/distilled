import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCurrentUserOrganizationsInput = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/users/me/organizations" }),
);
export type GetCurrentUserOrganizationsInput =
  typeof GetCurrentUserOrganizationsInput.Type;

// Output Schema
export const GetCurrentUserOrganizationsOutput = Schema.Struct({
  organizations: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      handle: Schema.String,
      plan: Schema.String,
      created_at: Schema.String,
      managed_by: Schema.String,
      updated_at: Schema.String,
      allow_hipaa_projects: Schema.optional(Schema.Boolean),
    }),
  ),
});
export type GetCurrentUserOrganizationsOutput =
  typeof GetCurrentUserOrganizationsOutput.Type;

// The operation
/**
 * Retrieve current user organizations list
 *
 * Retrieves information about the current Neon user's organizations
 */
export const getCurrentUserOrganizations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetCurrentUserOrganizationsInput,
    outputSchema: GetCurrentUserOrganizationsOutput,
  }),
);
