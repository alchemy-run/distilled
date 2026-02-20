import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectBranchRoleInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  role_name: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/roles/{role_name}",
  }),
);
export type GetProjectBranchRoleInput = typeof GetProjectBranchRoleInput.Type;

// Output Schema
export const GetProjectBranchRoleOutput = Schema.Struct({
  role: Schema.Struct({
    branch_id: Schema.String,
    name: Schema.String,
    password: Schema.optional(Schema.String),
    protected: Schema.optional(Schema.Boolean),
    authentication_method: Schema.optional(Schema.String),
    created_at: Schema.String,
    updated_at: Schema.String,
  }),
});
export type GetProjectBranchRoleOutput = typeof GetProjectBranchRoleOutput.Type;

// The operation
/**
 * Retrieve role details
 *
 * Retrieves details about the specified role.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * You can obtain the `role_name` by listing the roles for a branch.
 * In Neon, the terms "role" and "user" are synonymous.
 * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 * @param role_name - The role name
 */
export const getProjectBranchRole = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetProjectBranchRoleInput,
    outputSchema: GetProjectBranchRoleOutput,
  }),
);
