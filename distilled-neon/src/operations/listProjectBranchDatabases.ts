import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListProjectBranchDatabasesInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/branches/{branch_id}/databases" }));
export type ListProjectBranchDatabasesInput = typeof ListProjectBranchDatabasesInput.Type;

// Output Schema
export const ListProjectBranchDatabasesOutput = Schema.Struct({
  databases: Schema.Array(Schema.Struct({
    id: Schema.Number,
    branch_id: Schema.String,
    name: Schema.String,
    owner_name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
  })),
});
export type ListProjectBranchDatabasesOutput = typeof ListProjectBranchDatabasesOutput.Type;

// The operation
/**
 * List databases
 *
 * Retrieves a list of databases for the specified branch.
 * A branch can have multiple databases.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * For related information, see [Manage databases](https://neon.tech/docs/manage/databases/).
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const listProjectBranchDatabases = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListProjectBranchDatabasesInput,
  outputSchema: ListProjectBranchDatabasesOutput,
}));
