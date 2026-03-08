import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListProjectEndpointsInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/endpoints" }));
export type ListProjectEndpointsInput = typeof ListProjectEndpointsInput.Type;

// Output Schema
export const ListProjectEndpointsOutput = Schema.Struct({
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
export type ListProjectEndpointsOutput = typeof ListProjectEndpointsOutput.Type;

// The operation
/**
 * List compute endpoints
 *
 * Retrieves a list of compute endpoints for the specified project.
 * A compute endpoint is a Neon compute instance.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * For information about compute endpoints, see [Manage computes](https://neon.tech/docs/manage/endpoints/).
 *
 * @param project_id - The Neon project ID
 */
export const listProjectEndpoints = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListProjectEndpointsInput,
    outputSchema: ListProjectEndpointsOutput,
  }),
);
