import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectBranchSchemaInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  db_name: Schema.String,
  lsn: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  format: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/branches/{branch_id}/schema" }));
export type GetProjectBranchSchemaInput = typeof GetProjectBranchSchemaInput.Type;

// Output Schema
export const GetProjectBranchSchemaOutput = Schema.Struct({
  sql: Schema.optional(Schema.String),
  json: Schema.optional(Schema.Struct({
    tables: Schema.Array(Schema.Struct({
      schema: Schema.String,
      name: Schema.String,
      columns: Schema.Array(Schema.Struct({
        name: Schema.String,
        type: Schema.String,
        nullable: Schema.optional(Schema.Boolean),
        generated: Schema.optional(Schema.Boolean),
      })),
      constraints: Schema.optional(Schema.Array(Schema.Struct({
        type: Schema.String,
        columns: Schema.Array(Schema.String),
        name: Schema.optional(Schema.String),
        referenced_table: Schema.optional(Schema.Struct({
          schema: Schema.String,
          table: Schema.String,
          columns: Schema.Array(Schema.String),
        })),
      }))),
    })),
  })),
});
export type GetProjectBranchSchemaOutput = typeof GetProjectBranchSchemaOutput.Type;

// The operation
/**
 * Retrieve database schema
 *
 * Retrieves the schema from the specified database. The `lsn` and `timestamp` values cannot be specified at the same time. If both are omitted, the database schema is retrieved from database's head.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 * @param db_name - Name of the database for which the schema is retrieved
 * @param lsn - The Log Sequence Number (LSN) for which the schema is retrieved

 * @param timestamp - The point in time for which the schema is retrieved

 * @param format - The format of the schema to retrieve. Possible values:
- `sql` (default)
- `json`

 */
export const getProjectBranchSchema = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProjectBranchSchemaInput,
  outputSchema: GetProjectBranchSchemaOutput,
}));
