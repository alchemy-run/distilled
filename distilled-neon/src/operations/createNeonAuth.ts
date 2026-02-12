import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateNeonAuthInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  auth_provider: Schema.Literal("mock", "stack", "stack_v2", "better_auth"),
  database_name: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/branches/{branch_id}/auth" }));
export type CreateNeonAuthInput = typeof CreateNeonAuthInput.Type;

// Output Schema
export const CreateNeonAuthOutput = Schema.Struct({
  auth_provider: Schema.Literal("mock", "stack", "stack_v2", "better_auth"),
  auth_provider_project_id: Schema.String,
  pub_client_key: Schema.String,
  secret_server_key: Schema.String,
  jwks_url: Schema.String,
  schema_name: Schema.String,
  table_name: Schema.String,
  base_url: Schema.optional(Schema.String),
});
export type CreateNeonAuthOutput = typeof CreateNeonAuthOutput.Type;

// The operation
/**
 * Enable Neon Auth for the branch
 *
 * Enables Neon Auth integrationfor the branch.
 * You can obtain the `project_id` and `branch_id` by listing the projects and branches for your Neon account.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const createNeonAuth = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateNeonAuthInput,
  outputSchema: CreateNeonAuthOutput,
}));
