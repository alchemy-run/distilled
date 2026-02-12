import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectBranchRolePasswordInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  role_name: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/branches/{branch_id}/roles/{role_name}/reveal_password" }));
export type GetProjectBranchRolePasswordInput = typeof GetProjectBranchRolePasswordInput.Type;

// Output Schema
export const GetProjectBranchRolePasswordOutput = Schema.Struct({
  password: Schema.String,
});
export type GetProjectBranchRolePasswordOutput = typeof GetProjectBranchRolePasswordOutput.Type;

// The operation
/**
 * Retrieve role password
 *
 * Retrieves the password for the specified Postgres role, if possible.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * You can obtain the `role_name` by listing the roles for a branch.
 * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 * @param role_name - The role name
 */
export const getProjectBranchRolePassword = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProjectBranchRolePasswordInput,
  outputSchema: GetProjectBranchRolePasswordOutput,
}));
