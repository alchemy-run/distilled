import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectBranchDatabaseInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  database_name: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/databases/{database_name}",
  }),
);
export type GetProjectBranchDatabaseInput =
  typeof GetProjectBranchDatabaseInput.Type;

// Output Schema
export const GetProjectBranchDatabaseOutput = Schema.Struct({
  database: Schema.Struct({
    id: Schema.Number,
    branch_id: Schema.String,
    name: Schema.String,
    owner_name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
  }),
});
export type GetProjectBranchDatabaseOutput =
  typeof GetProjectBranchDatabaseOutput.Type;

// The operation
/**
 * Retrieve database details
 *
 * Retrieves information about the specified database.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` and `database_name` by listing the branch's databases.
 * For related information, see [Manage databases](https://neon.tech/docs/manage/databases/).
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 * @param database_name - The database name
 */
export const getProjectBranchDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetProjectBranchDatabaseInput,
    outputSchema: GetProjectBranchDatabaseOutput,
  }),
);
