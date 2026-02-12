import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListProjectBranchRolesInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/branches/{branch_id}/roles" }));
export type ListProjectBranchRolesInput = typeof ListProjectBranchRolesInput.Type;

// Output Schema
export const ListProjectBranchRolesOutput = Schema.Struct({
  roles: Schema.Array(Schema.Struct({
    branch_id: Schema.String,
    name: Schema.String,
    password: Schema.optional(Schema.String),
    protected: Schema.optional(Schema.Boolean),
    authentication_method: Schema.optional(Schema.String),
    created_at: Schema.String,
    updated_at: Schema.String,
  })),
});
export type ListProjectBranchRolesOutput = typeof ListProjectBranchRolesOutput.Type;

// The operation
/**
 * List roles
 *
 * Retrieves a list of Postgres roles from the specified branch.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const listProjectBranchRoles = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListProjectBranchRolesInput,
  outputSchema: ListProjectBranchRolesOutput,
}));
