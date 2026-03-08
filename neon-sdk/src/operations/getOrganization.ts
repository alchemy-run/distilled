import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrganizationInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/organizations/{org_id}" }));
export type GetOrganizationInput = typeof GetOrganizationInput.Type;

// Output Schema
export const GetOrganizationOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  handle: Schema.String,
  plan: Schema.String,
  created_at: Schema.String,
  managed_by: Schema.String,
  updated_at: Schema.String,
  allow_hipaa_projects: Schema.optional(Schema.Boolean),
});
export type GetOrganizationOutput = typeof GetOrganizationOutput.Type;

// The operation
/**
 * Retrieve organization details
 *
 * Retrieves information about the specified organization.
 *
 * @param org_id - The Neon organization ID
 */
export const getOrganization = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrganizationInput,
  outputSchema: GetOrganizationOutput,
}));
