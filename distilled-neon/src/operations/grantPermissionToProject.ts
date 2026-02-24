import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GrantPermissionToProjectInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  email: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/permissions" }));
export type GrantPermissionToProjectInput =
  typeof GrantPermissionToProjectInput.Type;

// Output Schema
export const GrantPermissionToProjectOutput = Schema.Struct({
  id: Schema.String,
  granted_to_email: Schema.String,
  granted_at: Schema.String,
  revoked_at: Schema.optional(Schema.String),
});
export type GrantPermissionToProjectOutput =
  typeof GrantPermissionToProjectOutput.Type;

// The operation
/**
 * Grant project access
 *
 * Grants project access to the account associated with the specified email address
 */
export const grantPermissionToProject = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GrantPermissionToProjectInput,
    outputSchema: GrantPermissionToProjectOutput,
  }),
);
