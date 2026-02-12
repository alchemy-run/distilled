import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetOrganizationInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/organizations/{organization}" }));
export type GetOrganizationInput = typeof GetOrganizationInput.Type;

// Output Schema
export const GetOrganizationOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  billing_email: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  plan: Schema.String,
  valid_billing_info: Schema.Boolean,
  sso: Schema.Boolean,
  sso_directory: Schema.Boolean,
  single_tenancy: Schema.Boolean,
  managed_tenancy: Schema.Boolean,
  has_past_due_invoices: Schema.optional(Schema.Boolean),
  database_count: Schema.Number,
  sso_portal_url: Schema.optional(Schema.String),
  features: Schema.Unknown,
  idp_managed_roles: Schema.Boolean,
  invoice_budget_amount: Schema.String,
  keyspace_shard_limit: Schema.Number,
  has_card: Schema.Boolean,
  payment_info_required: Schema.Boolean,
});
export type GetOrganizationOutput = typeof GetOrganizationOutput.Type;

// The operation
/**
 * Get an organization
 *
 * @param organization - The name of the organization
 */
export const getOrganization = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrganizationInput,
  outputSchema: GetOrganizationOutput,
  errors: [Forbidden, NotFound] as const,
}));
