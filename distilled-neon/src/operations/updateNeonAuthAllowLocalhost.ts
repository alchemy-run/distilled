import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateNeonAuthAllowLocalhostInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  allow_localhost: Schema.Boolean,
}).pipe(T.Http({ method: "PATCH", path: "/projects/{project_id}/branches/{branch_id}/auth/allow_localhost" }));
export type UpdateNeonAuthAllowLocalhostInput = typeof UpdateNeonAuthAllowLocalhostInput.Type;

// Output Schema
export const UpdateNeonAuthAllowLocalhostOutput = Schema.Struct({
  allow_localhost: Schema.Boolean,
});
export type UpdateNeonAuthAllowLocalhostOutput = typeof UpdateNeonAuthAllowLocalhostOutput.Type;

// The operation
/**
 * Update allow localhost
 *
 * Updates the allow localhost configuration for the specified branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const updateNeonAuthAllowLocalhost = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateNeonAuthAllowLocalhostInput,
  outputSchema: UpdateNeonAuthAllowLocalhostOutput,
}));
