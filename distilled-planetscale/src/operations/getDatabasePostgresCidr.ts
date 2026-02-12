import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound, UnprocessableEntity } from "../errors";

// Input Schema
export const GetDatabasePostgresCidrInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/cidrs/{id}",
  }),
);
export type GetDatabasePostgresCidrInput =
  typeof GetDatabasePostgresCidrInput.Type;

// Output Schema
export const GetDatabasePostgresCidrOutput = Schema.Struct({
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
export type GetDatabasePostgresCidrOutput =
  typeof GetDatabasePostgresCidrOutput.Type;

// The operation
/**
 * Get an IP restriction entry
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 * @param id - The ID of the IP restriction entry
 */
export const getDatabasePostgresCidr = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetDatabasePostgresCidrInput,
    outputSchema: GetDatabasePostgresCidrOutput,
    errors: [Forbidden, NotFound, UnprocessableEntity] as const,
  }),
);
