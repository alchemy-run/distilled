import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetNeonAuthInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/auth",
  }),
);
export type GetNeonAuthInput = typeof GetNeonAuthInput.Type;

// Output Schema
export const GetNeonAuthOutput = Schema.Struct({
  auth_provider: Schema.Literals(["mock", "stack", "stack_v2", "better_auth"]),
  auth_provider_project_id: Schema.String,
  branch_id: Schema.String,
  db_name: Schema.String,
  created_at: Schema.String,
  owned_by: Schema.Literals(["user", "neon"]),
  transfer_status: Schema.optional(Schema.Literals(["initiated", "finished"])),
  jwks_url: Schema.String,
  base_url: Schema.optional(Schema.String),
});
export type GetNeonAuthOutput = typeof GetNeonAuthOutput.Type;

// The operation
/**
 * Get details of Neon Auth for the branch
 *
 * / Fetches the details of the Neon Auth for the specified branch. You can obtain the `project_id` and `branch_id` by listing the projects and branches for your Neon account.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const getNeonAuth = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetNeonAuthInput,
  outputSchema: GetNeonAuthOutput,
}));
