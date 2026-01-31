import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteKeyspaceInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  keyspace: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/keyspaces/{keyspace}",
  }),
);
export type DeleteKeyspaceInput = typeof DeleteKeyspaceInput.Type;

// Output Schema
export const DeleteKeyspaceOutput = Schema.Void;
export type DeleteKeyspaceOutput = typeof DeleteKeyspaceOutput.Type;

// The operation
/**
 * Delete a keyspace
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param keyspace - The name of the keyspace
 */
export const deleteKeyspace = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteKeyspaceInput,
  outputSchema: DeleteKeyspaceOutput,
}));
