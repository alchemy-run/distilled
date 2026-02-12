import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListOrganizationsInput = Schema.Struct({
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/organizations" }));
export type ListOrganizationsInput = typeof ListOrganizationsInput.Type;

// Output Schema
export const ListOrganizationsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
});
export type ListOrganizationsOutput = typeof ListOrganizationsOutput.Type;

// The operation
/**
 * List organizations
 *
 * When using a service token, returns the list of organizations the service token has access to. When using an OAuth token, returns the list of organizations the user has access to.
 *
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listOrganizations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrganizationsInput,
  outputSchema: ListOrganizationsOutput,
  errors: [Forbidden, NotFound] as const,
}));
