import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListBranchNeonAuthTrustedDomainsInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/branches/{branch_id}/auth/domains" }));
export type ListBranchNeonAuthTrustedDomainsInput = typeof ListBranchNeonAuthTrustedDomainsInput.Type;

// Output Schema
export const ListBranchNeonAuthTrustedDomainsOutput = Schema.Struct({
  domains: Schema.Array(Schema.Struct({
    domain: Schema.String,
    auth_provider: Schema.Literal("mock", "stack", "stack_v2", "better_auth"),
  })),
});
export type ListBranchNeonAuthTrustedDomainsOutput = typeof ListBranchNeonAuthTrustedDomainsOutput.Type;

// The operation
/**
 * List domains in redirect_uri whitelist
 *
 * Lists the domains in the redirect_uri whitelist for the specified project.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const listBranchNeonAuthTrustedDomains = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListBranchNeonAuthTrustedDomainsInput,
  outputSchema: ListBranchNeonAuthTrustedDomainsOutput,
}));
