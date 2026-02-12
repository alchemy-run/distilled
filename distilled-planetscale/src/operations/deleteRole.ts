import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const DeleteRoleInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  successor: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/roles/{id}",
  }),
);
export type DeleteRoleInput = typeof DeleteRoleInput.Type;

// Output Schema
export const DeleteRoleOutput = Schema.Void;
export type DeleteRoleOutput = typeof DeleteRoleOutput.Type;

// The operation
/**
 * Delete role credentials
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param id - The ID of the role
 * @param successor - The optional role to reassign ownership to before dropping
 */
export const deleteRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteRoleInput,
  outputSchema: DeleteRoleOutput,
  errors: [Forbidden, NotFound] as const,
}));
