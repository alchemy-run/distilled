import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateBranchNeonAuthNewUserInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  email: Schema.String,
  name: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/branches/{branch_id}/auth/users" }));
export type CreateBranchNeonAuthNewUserInput = typeof CreateBranchNeonAuthNewUserInput.Type;

// Output Schema
export const CreateBranchNeonAuthNewUserOutput = Schema.Struct({
  id: Schema.String,
});
export type CreateBranchNeonAuthNewUserOutput = typeof CreateBranchNeonAuthNewUserOutput.Type;

// The operation
/**
 * Create new auth user
 *
 * Creates a new user in Neon Auth.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const createBranchNeonAuthNewUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateBranchNeonAuthNewUserInput,
  outputSchema: CreateBranchNeonAuthNewUserOutput,
}));
