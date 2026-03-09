import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CountProjectBranchesInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  search: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "GET", path: "/projects/{project_id}/branches/count" }),
);
export type CountProjectBranchesInput = typeof CountProjectBranchesInput.Type;

// Output Schema
export const CountProjectBranchesOutput = Schema.Struct({
  count: Schema.Number,
});
export type CountProjectBranchesOutput = typeof CountProjectBranchesOutput.Type;

// The operation
/**
 * Retrieve number of branches
 *
 * Retrieves the total number of branches in the specified project.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 *
 * @param project_id - The Neon project ID
 * @param search - Count branches matching the `name` in search query
 */
export const countProjectBranches = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CountProjectBranchesInput,
    outputSchema: CountProjectBranchesOutput,
  }),
);
