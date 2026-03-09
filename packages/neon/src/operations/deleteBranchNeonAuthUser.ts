import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteBranchNeonAuthUserInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  auth_user_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/projects/{project_id}/branches/{branch_id}/auth/users/{auth_user_id}",
  }),
);
export type DeleteBranchNeonAuthUserInput =
  typeof DeleteBranchNeonAuthUserInput.Type;

// Output Schema
export const DeleteBranchNeonAuthUserOutput = Schema.Void;
export type DeleteBranchNeonAuthUserOutput =
  typeof DeleteBranchNeonAuthUserOutput.Type;

// The operation
/**
 * Delete auth user
 *
 * Deletes the auth user for the specified project.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 * @param auth_user_id - The Neon user ID
 */
export const deleteBranchNeonAuthUser = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteBranchNeonAuthUserInput,
    outputSchema: DeleteBranchNeonAuthUserOutput,
  }),
);
