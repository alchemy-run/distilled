import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateProjectBranchDataAPIInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  database_name: Schema.String.pipe(T.PathParam()),
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
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/projects/{project_id}/branches/{branch_id}/data-api/{database_name}",
  }),
);
export type UpdateProjectBranchDataAPIInput =
  typeof UpdateProjectBranchDataAPIInput.Type;

// Output Schema
export const UpdateProjectBranchDataAPIOutput = Schema.Struct({});
export type UpdateProjectBranchDataAPIOutput =
  typeof UpdateProjectBranchDataAPIOutput.Type;

// The operation
/**
 * Update Neon Data API
 *
 * Updates the Neon Data API configuration for the specified branch.
 * You can optionally provide settings to update the Data API configuration.
 * The schema cache is always refreshed as part of this operation.
 * You can obtain the `project_id` and `branch_id` by listing the projects and branches for your Neon account.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 * @param database_name - The database name
 */
export const updateProjectBranchDataAPI = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateProjectBranchDataAPIInput,
    outputSchema: UpdateProjectBranchDataAPIOutput,
  }),
);
