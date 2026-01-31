import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateDatabasePostgresCidrInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  schema: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  cidrs: Schema.Array(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/cidrs",
  }),
);
export type CreateDatabasePostgresCidrInput =
  typeof CreateDatabasePostgresCidrInput.Type;

// Output Schema
export const CreateDatabasePostgresCidrOutput = Schema.Struct({
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
export type CreateDatabasePostgresCidrOutput =
  typeof CreateDatabasePostgresCidrOutput.Type;

// The operation
/**
 * Create an IP restriction entry
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 * @param schema - The PostgreSQL schema to restrict access to. Leave empty or omit to allow access to all schemas.
 * @param role - The PostgreSQL role to restrict access to. Leave empty or omit to allow access for all roles.
 * @param cidrs - List of IPv4 CIDR ranges (e.g., ['192.168.1.0/24', '192.168.1.1/32']). Must contain at least one valid IPv4 address or range.
 */
export const createDatabasePostgresCidr = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateDatabasePostgresCidrInput,
    outputSchema: CreateDatabasePostgresCidrOutput,
  }),
);
