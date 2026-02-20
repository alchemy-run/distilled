import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListProjectPermissionsInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/permissions" }));
export type ListProjectPermissionsInput =
  typeof ListProjectPermissionsInput.Type;

// Output Schema
export const ListProjectPermissionsOutput = Schema.Struct({
  project_permissions: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      granted_to_email: Schema.String,
      granted_at: Schema.String,
      revoked_at: Schema.optional(Schema.String),
    }),
  ),
});
export type ListProjectPermissionsOutput =
  typeof ListProjectPermissionsOutput.Type;

// The operation
/**
 * List project access
 *
 * Retrieves details about users who have access to the project, including the permission `id`, the granted-to email address, and the date project access was granted.
 */
export const listProjectPermissions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListProjectPermissionsInput,
    outputSchema: ListProjectPermissionsOutput,
  }),
);
