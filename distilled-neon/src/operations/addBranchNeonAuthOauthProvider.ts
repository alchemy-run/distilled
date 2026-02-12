import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AddBranchNeonAuthOauthProviderInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  id: Schema.Literal("google", "github", "microsoft", "vercel"),
  client_id: Schema.optional(Schema.String),
  client_secret: Schema.optional(Schema.String),
  microsoft_tenant_id: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/branches/{branch_id}/auth/oauth_providers" }));
export type AddBranchNeonAuthOauthProviderInput = typeof AddBranchNeonAuthOauthProviderInput.Type;

// Output Schema
export const AddBranchNeonAuthOauthProviderOutput = Schema.Struct({
  id: Schema.Literal("google", "github", "microsoft", "vercel"),
  type: Schema.Literal("standard", "shared"),
  client_id: Schema.optional(Schema.String),
  client_secret: Schema.optional(Schema.String),
});
export type AddBranchNeonAuthOauthProviderOutput = typeof AddBranchNeonAuthOauthProviderOutput.Type;

// The operation
/**
 * Add a OAuth provider
 *
 * Adds a OAuth provider to the specified project.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const addBranchNeonAuthOauthProvider = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddBranchNeonAuthOauthProviderInput,
  outputSchema: AddBranchNeonAuthOauthProviderOutput,
}));
