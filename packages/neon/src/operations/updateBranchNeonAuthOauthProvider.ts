import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateBranchNeonAuthOauthProviderInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  oauth_provider_id: Schema.String.pipe(T.PathParam()),
  client_id: Schema.optional(Schema.String),
  client_secret: Schema.optional(Schema.String),
  microsoft_tenant_id: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/projects/{project_id}/branches/{branch_id}/auth/oauth_providers/{oauth_provider_id}",
  }),
);
export type UpdateBranchNeonAuthOauthProviderInput =
  typeof UpdateBranchNeonAuthOauthProviderInput.Type;

// Output Schema
export const UpdateBranchNeonAuthOauthProviderOutput = Schema.Struct({
  id: Schema.Literals(["google", "github", "microsoft", "vercel"]),
  type: Schema.Literals(["standard", "shared"]),
  client_id: Schema.optional(Schema.String),
  client_secret: Schema.optional(Schema.String),
});
export type UpdateBranchNeonAuthOauthProviderOutput =
  typeof UpdateBranchNeonAuthOauthProviderOutput.Type;

// The operation
/**
 * Update OAuth provider
 *
 * Updates a OAuth provider for the specified project.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 * @param oauth_provider_id - The OAuth provider ID
 */
export const updateBranchNeonAuthOauthProvider =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateBranchNeonAuthOauthProviderInput,
    outputSchema: UpdateBranchNeonAuthOauthProviderOutput,
  }));
