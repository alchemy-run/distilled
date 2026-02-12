import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteBranchNeonAuthTrustedDomainInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  auth_provider: Schema.Literal("mock", "stack", "stack_v2", "better_auth"),
  domains: Schema.Array(Schema.Struct({
    domain: Schema.String,
  })),
}).pipe(T.Http({ method: "DELETE", path: "/projects/{project_id}/branches/{branch_id}/auth/domains" }));
export type DeleteBranchNeonAuthTrustedDomainInput = typeof DeleteBranchNeonAuthTrustedDomainInput.Type;

// Output Schema
export const DeleteBranchNeonAuthTrustedDomainOutput = Schema.Void;
export type DeleteBranchNeonAuthTrustedDomainOutput = typeof DeleteBranchNeonAuthTrustedDomainOutput.Type;

// The operation
/**
 * Delete domain from redirect_uri whitelist
 *
 * Deletes a domain from the redirect_uri whitelist for the specified project.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const deleteBranchNeonAuthTrustedDomain = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteBranchNeonAuthTrustedDomainInput,
  outputSchema: DeleteBranchNeonAuthTrustedDomainOutput,
}));
