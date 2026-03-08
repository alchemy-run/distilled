import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectBranchDataAPIInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  database_name: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/data-api/{database_name}",
  }),
);
export type GetProjectBranchDataAPIInput =
  typeof GetProjectBranchDataAPIInput.Type;

// Output Schema
export const GetProjectBranchDataAPIOutput = Schema.Struct({
  url: Schema.String,
  status: Schema.String,
  settings: Schema.optional(
    Schema.Struct({
      db_aggregates_enabled: Schema.optional(Schema.Boolean),
      db_anon_role: Schema.optional(Schema.String),
      db_extra_search_path: Schema.optional(Schema.String),
      db_max_rows: Schema.optional(Schema.Number),
      db_schemas: Schema.optional(Schema.Array(Schema.String)),
      jwt_role_claim_key: Schema.optional(Schema.String),
      jwt_cache_max_lifetime: Schema.optional(Schema.Number),
      openapi_mode: Schema.optional(Schema.String),
      server_cors_allowed_origins: Schema.optional(Schema.String),
      server_timing_enabled: Schema.optional(Schema.Boolean),
    }),
  ),
  available_schemas: Schema.optional(
    Schema.NullOr(Schema.Array(Schema.String)),
  ),
});
export type GetProjectBranchDataAPIOutput =
  typeof GetProjectBranchDataAPIOutput.Type;

// The operation
/**
 * Get Neon Data API
 *
 * Retrieves the Neon Data API for the specified branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 * @param database_name - The database name
 */
export const getProjectBranchDataAPI = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetProjectBranchDataAPIInput,
    outputSchema: GetProjectBranchDataAPIOutput,
  }),
);
