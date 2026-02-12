import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteBranchNeonAuthOauthProviderInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  oauth_provider_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/projects/{project_id}/branches/{branch_id}/auth/oauth_providers/{oauth_provider_id}" }));
export type DeleteBranchNeonAuthOauthProviderInput = typeof DeleteBranchNeonAuthOauthProviderInput.Type;

// Output Schema
export const DeleteBranchNeonAuthOauthProviderOutput = Schema.Void;
export type DeleteBranchNeonAuthOauthProviderOutput = typeof DeleteBranchNeonAuthOauthProviderOutput.Type;

// The operation
/**
 * Delete OAuth provider
 *
 * Deletes a OAuth provider from the specified project.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 * @param oauth_provider_id - The OAuth provider ID
 */
export const deleteBranchNeonAuthOauthProvider = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteBranchNeonAuthOauthProviderInput,
  outputSchema: DeleteBranchNeonAuthOauthProviderOutput,
}));
