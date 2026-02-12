import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateNeonAuthUserRoleInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  auth_user_id: Schema.String.pipe(T.PathParam()),
  roles: Schema.Array(Schema.String),
}).pipe(T.Http({ method: "PUT", path: "/projects/{project_id}/branches/{branch_id}/auth/users/{auth_user_id}/role" }));
export type UpdateNeonAuthUserRoleInput = typeof UpdateNeonAuthUserRoleInput.Type;

// Output Schema
export const UpdateNeonAuthUserRoleOutput = Schema.Struct({
  id: Schema.String,
});
export type UpdateNeonAuthUserRoleOutput = typeof UpdateNeonAuthUserRoleOutput.Type;

// The operation
/**
 * Update auth user role
 *
 * Updates the role of an auth user for the specified project.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 * @param auth_user_id - The Neon user ID
 */
export const updateNeonAuthUserRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateNeonAuthUserRoleInput,
  outputSchema: UpdateNeonAuthUserRoleOutput,
}));
