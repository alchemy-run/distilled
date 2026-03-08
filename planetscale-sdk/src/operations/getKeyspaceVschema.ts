import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetKeyspaceVschemaInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  keyspace: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/keyspaces/{keyspace}/vschema",
  }),
);
export type GetKeyspaceVschemaInput = typeof GetKeyspaceVschemaInput.Type;

// Output Schema
export const GetKeyspaceVschemaOutput = Schema.Struct({
  raw: Schema.String,
});
export type GetKeyspaceVschemaOutput = typeof GetKeyspaceVschemaOutput.Type;

// The operation
/**
 * Get the VSchema for the keyspace
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param keyspace - The name of the keyspace
 */
export const getKeyspaceVschema = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetKeyspaceVschemaInput,
  outputSchema: GetKeyspaceVschemaOutput,
  errors: [Forbidden, NotFound] as const,
}));
