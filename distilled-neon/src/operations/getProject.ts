import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}" }));
export type GetProjectInput = typeof GetProjectInput.Type;

// Output Schema
export const GetProjectOutput = Schema.Struct({
  project: Schema.Struct({
    data_storage_bytes_hour: Schema.Number,
    data_transfer_bytes: Schema.Number,
    written_data_bytes: Schema.Number,
    compute_time_seconds: Schema.Number,
    active_time_seconds: Schema.Number,
    cpu_used_sec: Schema.Number,
    id: Schema.String,
    platform_id: Schema.String,
    region_id: Schema.String,
    name: Schema.String,
    provisioner: Schema.String,
    default_endpoint_settings: Schema.optional(Schema.Struct({
      pg_settings: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
      pgbouncer_settings: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
      autoscaling_limit_min_cu: Schema.optional(Schema.Number),
      autoscaling_limit_max_cu: Schema.optional(Schema.Number),
      suspend_timeout_seconds: Schema.optional(Schema.Number),
    })),
    settings: Schema.optional(Schema.Struct({
      quota: Schema.optional(Schema.Struct({
        active_time_seconds: Schema.optional(Schema.Number),
        compute_time_seconds: Schema.optional(Schema.Number),
        written_data_bytes: Schema.optional(Schema.Number),
        data_transfer_bytes: Schema.optional(Schema.Number),
        logical_size_bytes: Schema.optional(Schema.Number),
      })),
      allowed_ips: Schema.optional(Schema.Struct({
        ips: Schema.optional(Schema.Array(Schema.String)),
        protected_branches_only: Schema.optional(Schema.Boolean),
      })),
      enable_logical_replication: Schema.optional(Schema.Boolean),
      maintenance_window: Schema.optional(Schema.Struct({
        weekdays: Schema.Array(Schema.Number),
        start_time: Schema.String,
        end_time: Schema.String,
      })),
      block_public_connections: Schema.optional(Schema.Boolean),
      block_vpc_connections: Schema.optional(Schema.Boolean),
      audit_log_level: Schema.optional(Schema.Literal("base", "extended", "full")),
      hipaa: Schema.optional(Schema.Boolean),
      preload_libraries: Schema.optional(Schema.Struct({
        use_defaults: Schema.optional(Schema.Boolean),
        enabled_libraries: Schema.optional(Schema.Array(Schema.String)),
      })),
    })),
    pg_version: Schema.Number,
    proxy_host: Schema.String,
    branch_logical_size_limit: Schema.Number,
    branch_logical_size_limit_bytes: Schema.Number,
    store_passwords: Schema.Boolean,
    maintenance_starts_at: Schema.optional(Schema.String),
    creation_source: Schema.String,
    history_retention_seconds: Schema.Number,
    created_at: Schema.String,
    updated_at: Schema.String,
    synthetic_storage_size: Schema.optional(Schema.Number),
    consumption_period_start: Schema.String,
    consumption_period_end: Schema.String,
    quota_reset_at: Schema.optional(Schema.String),
    owner_id: Schema.String,
    owner: Schema.optional(Schema.Struct({
      email: Schema.String,
      name: Schema.String,
      branches_limit: Schema.Number,
      subscription_type: Schema.Literal("UNKNOWN", "direct_sales", "direct_sales_v3", "aws_marketplace", "free_v2", "free_v3", "launch", "launch_v3", "scale", "scale_v3", "business", "vercel_pg_legacy"),
    })),
    compute_last_active_at: Schema.optional(Schema.String),
    org_id: Schema.optional(Schema.String),
    maintenance_scheduled_for: Schema.optional(Schema.String),
    hipaa_enabled_at: Schema.optional(Schema.String),
  }),
});
export type GetProjectOutput = typeof GetProjectOutput.Type;

// The operation
/**
 * Retrieve project details
 *
 * Retrieves information about the specified project.
 * You can obtain a `project_id` by listing the projects for an organization.
 *
 * @param project_id - The Neon project ID
 */
export const getProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProjectInput,
  outputSchema: GetProjectOutput,
}));
