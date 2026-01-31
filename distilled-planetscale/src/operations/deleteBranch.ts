import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteBranchInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}",
  }),
);
export type DeleteBranchInput = typeof DeleteBranchInput.Type;

// Output Schema
export const DeleteBranchOutput = Schema.Void;
export type DeleteBranchOutput = typeof DeleteBranchOutput.Type;

// The operation
/**
 * Delete a branch
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 */
export const deleteBranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteBranchInput,
  outputSchema: DeleteBranchOutput,
}));
