import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListBranchNeonAuthOauthProvidersInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/auth/oauth_providers",
  }),
);
export type ListBranchNeonAuthOauthProvidersInput =
  typeof ListBranchNeonAuthOauthProvidersInput.Type;

// Output Schema
export const ListBranchNeonAuthOauthProvidersOutput = Schema.Struct({
  providers: Schema.Array(
    Schema.Struct({
      id: Schema.Literals(["google", "github", "microsoft", "vercel"]),
      type: Schema.Literals(["standard", "shared"]),
      client_id: Schema.optional(Schema.String),
      client_secret: Schema.optional(Schema.String),
    }),
  ),
});
export type ListBranchNeonAuthOauthProvidersOutput =
  typeof ListBranchNeonAuthOauthProvidersOutput.Type;

// The operation
/**
 * List OAuth providers for neon auth for a branch
 *
 * Lists the OAuth providers for the specified project and branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const listBranchNeonAuthOauthProviders =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListBranchNeonAuthOauthProvidersInput,
    outputSchema: ListBranchNeonAuthOauthProvidersOutput,
  }));
