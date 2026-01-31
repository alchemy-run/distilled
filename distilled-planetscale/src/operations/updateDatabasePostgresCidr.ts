import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateDatabasePostgresCidrInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  schema: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  cidrs: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "PUT",
    path: "/organizations/{organization}/databases/{database}/cidrs/{id}",
  }),
);
export type UpdateDatabasePostgresCidrInput =
  typeof UpdateDatabasePostgresCidrInput.Type;

// Output Schema
export const UpdateDatabasePostgresCidrOutput = Schema.Struct({
  id: Schema.String,
  schema: Schema.String,
  role: Schema.String,
  cidrs: Schema.Array(Schema.String),
  created_at: Schema.String,
  updated_at: Schema.String,
  deleted_at: Schema.String,
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
});
export type UpdateDatabasePostgresCidrOutput =
  typeof UpdateDatabasePostgresCidrOutput.Type;

// The operation
/**
 * Update an IP restriction entry
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 * @param id - The ID of the IP restriction entry
 * @param schema - The PostgreSQL schema to restrict access to. Leave empty to allow access to all schemas.
 * @param role - The PostgreSQL role to restrict access to. Leave empty to allow access for all roles.
 * @param cidrs - List of IPv4 CIDR ranges (e.g., ['192.168.1.0/24', '192.168.1.1/32']). Only provided fields will be updated.
 */
export const updateDatabasePostgresCidr = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateDatabasePostgresCidrInput,
    outputSchema: UpdateDatabasePostgresCidrOutput,
  }),
);
