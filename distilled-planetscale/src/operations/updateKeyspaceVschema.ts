import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateKeyspaceVschemaInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  keyspace: Schema.String.pipe(T.PathParam()),
  vschema: Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/keyspaces/{keyspace}/vschema",
  }),
);
export type UpdateKeyspaceVschemaInput = typeof UpdateKeyspaceVschemaInput.Type;

// Output Schema
export const UpdateKeyspaceVschemaOutput = Schema.Struct({
  raw: Schema.String,
});
export type UpdateKeyspaceVschemaOutput =
  typeof UpdateKeyspaceVschemaOutput.Type;

// The operation
/**
 * Update the VSchema for the keyspace
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param keyspace - The name of the keyspace
 * @param vschema - The new VSchema for the keyspace
 */
export const updateKeyspaceVschema = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateKeyspaceVschemaInput,
    outputSchema: UpdateKeyspaceVschemaOutput,
  }),
);
