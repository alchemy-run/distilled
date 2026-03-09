import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListProjectBranchEndpointsInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/endpoints",
  }),
);
export type ListProjectBranchEndpointsInput =
  typeof ListProjectBranchEndpointsInput.Type;

// Output Schema
export const ListProjectBranchEndpointsOutput = Schema.Struct({
  endpoints: Schema.Array(
    Schema.Struct({
      host: Schema.String,
      id: Schema.String,
      name: Schema.optional(Schema.String),
      project_id: Schema.String,
      branch_id: Schema.String,
      autoscaling_limit_min_cu: Schema.Number,
      autoscaling_limit_max_cu: Schema.Number,
      region_id: Schema.String,
      type: Schema.Literals(["read_only", "read_write"]),
      current_state: Schema.Literals(["init", "active", "idle"]),
      pending_state: Schema.optional(
        Schema.Literals(["init", "active", "idle"]),
      ),
      settings: Schema.Struct({
        pg_settings: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        pgbouncer_settings: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        preload_libraries: Schema.optional(
          Schema.Struct({
            use_defaults: Schema.optional(Schema.Boolean),
            enabled_libraries: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
      }),
      pooler_enabled: Schema.Boolean,
      pooler_mode: Schema.Literals(["transaction"]),
      disabled: Schema.Boolean,
      passwordless_access: Schema.Boolean,
      last_active: Schema.optional(Schema.String),
      creation_source: Schema.String,
      created_at: Schema.String,
      updated_at: Schema.String,
      started_at: Schema.optional(Schema.String),
      suspended_at: Schema.optional(Schema.String),
      proxy_host: Schema.String,
      suspend_timeout_seconds: Schema.Number,
      provisioner: Schema.String,
      compute_release_version: Schema.optional(Schema.String),
    }),
  ),
});
export type ListProjectBranchEndpointsOutput =
  typeof ListProjectBranchEndpointsOutput.Type;

// The operation
/**
 * List branch endpoints
 *
 * Retrieves a list of compute endpoints for the specified branch.
 * Neon permits only one read-write compute endpoint per branch.
 * A branch can have multiple read-only compute endpoints.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const listProjectBranchEndpoints = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListProjectBranchEndpointsInput,
    outputSchema: ListProjectBranchEndpointsOutput,
  }),
);
