import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteProjectBranchDataAPIInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  database_name: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/projects/{project_id}/branches/{branch_id}/data-api/{database_name}",
  }),
);
export type DeleteProjectBranchDataAPIInput =
  typeof DeleteProjectBranchDataAPIInput.Type;

// Output Schema
export const DeleteProjectBranchDataAPIOutput = Schema.Struct({});
export type DeleteProjectBranchDataAPIOutput =
  typeof DeleteProjectBranchDataAPIOutput.Type;

// The operation
/**
 * Delete Neon Data API
 *
 * Deletes the Neon Data API for the specified branch.
 * You can obtain the `project_id` and `branch_id` by listing the projects and branches for your Neon account.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 * @param database_name - The database name
 */
export const deleteProjectBranchDataAPI = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteProjectBranchDataAPIInput,
    outputSchema: DeleteProjectBranchDataAPIOutput,
  }),
);
