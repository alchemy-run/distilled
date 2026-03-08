import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListSharedProjectsInput = Schema.Struct({
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  search: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/projects/shared" }));
export type ListSharedProjectsInput = typeof ListSharedProjectsInput.Type;

// Output Schema
export const ListSharedProjectsOutput = Schema.Struct({
  projects: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      platform_id: Schema.String,
      region_id: Schema.String,
      name: Schema.String,
      provisioner: Schema.String,
      default_endpoint_settings: Schema.optional(
        Schema.Struct({
          pg_settings: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          pgbouncer_settings: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          autoscaling_limit_min_cu: Schema.optional(Schema.Number),
          autoscaling_limit_max_cu: Schema.optional(Schema.Number),
          suspend_timeout_seconds: Schema.optional(Schema.Number),
        }),
      ),
      settings: Schema.optional(
        Schema.Struct({
          quota: Schema.optional(
            Schema.Struct({
              active_time_seconds: Schema.optional(Schema.Number),
              compute_time_seconds: Schema.optional(Schema.Number),
              written_data_bytes: Schema.optional(Schema.Number),
              data_transfer_bytes: Schema.optional(Schema.Number),
              logical_size_bytes: Schema.optional(Schema.Number),
            }),
          ),
          allowed_ips: Schema.optional(
            Schema.Struct({
              ips: Schema.optional(Schema.Array(Schema.String)),
              protected_branches_only: Schema.optional(Schema.Boolean),
            }),
          ),
          enable_logical_replication: Schema.optional(Schema.Boolean),
          maintenance_window: Schema.optional(
            Schema.Struct({
              weekdays: Schema.Array(Schema.Number),
              start_time: Schema.String,
              end_time: Schema.String,
            }),
          ),
          block_public_connections: Schema.optional(Schema.Boolean),
          block_vpc_connections: Schema.optional(Schema.Boolean),
          audit_log_level: Schema.optional(
            Schema.Literals(["base", "extended", "full"]),
          ),
          hipaa: Schema.optional(Schema.Boolean),
          preload_libraries: Schema.optional(
            Schema.Struct({
              use_defaults: Schema.optional(Schema.Boolean),
              enabled_libraries: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        }),
      ),
      pg_version: Schema.Number,
      proxy_host: Schema.String,
      branch_logical_size_limit: Schema.Number,
      branch_logical_size_limit_bytes: Schema.Number,
      store_passwords: Schema.Boolean,
      active_time: Schema.Number,
      cpu_used_sec: Schema.Number,
      maintenance_starts_at: Schema.optional(Schema.String),
      creation_source: Schema.String,
      created_at: Schema.String,
      updated_at: Schema.String,
      synthetic_storage_size: Schema.optional(Schema.Number),
      quota_reset_at: Schema.optional(Schema.String),
      owner_id: Schema.String,
      compute_last_active_at: Schema.optional(Schema.String),
      org_id: Schema.optional(Schema.String),
      org_name: Schema.optional(Schema.String),
      history_retention_seconds: Schema.optional(Schema.Number),
      hipaa_enabled_at: Schema.optional(Schema.String),
      deleted_at: Schema.optional(Schema.String),
      recoverable_until: Schema.optional(Schema.String),
    }),
  ),
  unavailable_project_ids: Schema.optional(Schema.Array(Schema.String)),
  pagination: Schema.optional(
    Schema.Struct({
      cursor: Schema.String,
    }),
  ),
});
export type ListSharedProjectsOutput = typeof ListSharedProjectsOutput.Type;

// The operation
/**
 * List shared projects
 *
 * Retrieves a list of projects shared with your Neon account.
 * For more information, see [Manage projects](https://neon.tech/docs/manage/projects/).
 *
 * @param cursor - Specify the cursor value from the previous response to get the next batch of projects.
 * @param limit - Specify a value from 1 to 400 to limit number of projects in the response.
 * @param search - Search query by name or id.
 * @param timeout - Specify an explicit timeout in milliseconds to limit response delay.
After timing out, the incomplete list of project data fetched so far will be returned.
Projects still being fetched when the timeout occurred are listed in the "unavailable" attribute of the response.
If not specified, an implicit implementation defined timeout is chosen with the same behaviour as above

 */
export const listSharedProjects = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListSharedProjectsInput,
  outputSchema: ListSharedProjectsOutput,
}));
