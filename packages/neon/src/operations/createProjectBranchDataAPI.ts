import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateProjectBranchDataAPIInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  database_name: Schema.String.pipe(T.PathParam()),
  auth_provider: Schema.optional(Schema.Literals(["neon_auth", "external"])),
  jwks_url: Schema.optional(Schema.String),
  provider_name: Schema.optional(Schema.String),
  jwt_audience: Schema.optional(Schema.String),
  add_default_grants: Schema.optional(Schema.Boolean),
  skip_auth_schema: Schema.optional(Schema.Boolean),
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
    method: "POST",
    path: "/projects/{project_id}/branches/{branch_id}/data-api/{database_name}",
  }),
);
export type CreateProjectBranchDataAPIInput =
  typeof CreateProjectBranchDataAPIInput.Type;

// Output Schema
export const CreateProjectBranchDataAPIOutput = Schema.Struct({
  url: Schema.String,
});
export type CreateProjectBranchDataAPIOutput =
  typeof CreateProjectBranchDataAPIOutput.Type;

// The operation
/**
 * Create Neon Data API
 *
 * Creates a new instance of Neon Data API in the specified branch.
 * You can obtain the `project_id` and `branch_id` by listing the projects and branches for your Neon account.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 * @param database_name - The database name
 */
export const createProjectBranchDataAPI = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateProjectBranchDataAPIInput,
    outputSchema: CreateProjectBranchDataAPIOutput,
  }),
);
