import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RevokePermissionFromProjectInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  permission_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/projects/{project_id}/permissions/{permission_id}",
  }),
);
export type RevokePermissionFromProjectInput =
  typeof RevokePermissionFromProjectInput.Type;

// Output Schema
export const RevokePermissionFromProjectOutput = Schema.Struct({
  id: Schema.String,
  granted_to_email: Schema.String,
  granted_at: Schema.String,
  revoked_at: Schema.optional(Schema.String),
});
export type RevokePermissionFromProjectOutput =
  typeof RevokePermissionFromProjectOutput.Type;

// The operation
/**
 * Revoke project access
 *
 * Revokes project access from the user associated with the specified permission `id`. You can retrieve a user's permission `id` by listing project access.
 */
export const revokePermissionFromProject = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RevokePermissionFromProjectInput,
    outputSchema: RevokePermissionFromProjectOutput,
  }),
);
