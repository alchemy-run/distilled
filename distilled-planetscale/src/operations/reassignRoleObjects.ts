import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ReassignRoleObjectsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  successor: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/roles/{id}/reassign",
  }),
);
export type ReassignRoleObjectsInput = typeof ReassignRoleObjectsInput.Type;

// Output Schema
export const ReassignRoleObjectsOutput = Schema.Void;
export type ReassignRoleObjectsOutput = typeof ReassignRoleObjectsOutput.Type;

// The operation
/**
 * Reassign objects owned by one role to another role
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param id - The ID of the role
 * @param successor - The role to reassign ownership to
 */
export const reassignRoleObjects = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReassignRoleObjectsInput,
  outputSchema: ReassignRoleObjectsOutput,
  errors: [Forbidden, NotFound] as const,
}));
