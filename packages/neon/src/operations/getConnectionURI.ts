import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetConnectionURIInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.optional(Schema.String),
  endpoint_id: Schema.optional(Schema.String),
  database_name: Schema.String,
  role_name: Schema.String,
  pooled: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "GET", path: "/projects/{project_id}/connection_uri" }),
);
export type GetConnectionURIInput = typeof GetConnectionURIInput.Type;

// Output Schema
export const GetConnectionURIOutput = Schema.Struct({
  uri: Schema.String,
});
export type GetConnectionURIOutput = typeof GetConnectionURIOutput.Type;

// The operation
/**
 * Retrieve connection URI
 *
 * Retrieves a connection URI for the specified database.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `database_name` by listing the databases for a branch.
 * You can obtain a `role_name` by listing the roles for a branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID. Defaults to your project's default `branch_id` if not specified.
 * @param endpoint_id - The endpoint ID. Defaults to the read-write `endpoint_id` associated with the `branch_id` if not specified.
 * @param database_name - The database name
 * @param role_name - The role name
 * @param pooled - Adds the `-pooler` option to the connection URI when set to `true`, creating a pooled connection URI.
 */
export const getConnectionURI = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetConnectionURIInput,
  outputSchema: GetConnectionURIOutput,
}));
