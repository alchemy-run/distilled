import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const StartProjectEndpointInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  endpoint_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/projects/{project_id}/endpoints/{endpoint_id}/start",
  }),
);
export type StartProjectEndpointInput = typeof StartProjectEndpointInput.Type;

// Output Schema
export const StartProjectEndpointOutput = Schema.Struct({
  endpoint: Schema.Struct({
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
    pending_state: Schema.optional(Schema.Literals(["init", "active", "idle"])),
    settings: Schema.Struct({
      pg_settings: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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
  operations: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      project_id: Schema.String,
      branch_id: Schema.optional(Schema.String),
      endpoint_id: Schema.optional(Schema.String),
      action: Schema.Literals([
        "create_compute",
        "create_timeline",
        "start_compute",
        "suspend_compute",
        "apply_config",
        "check_availability",
        "delete_timeline",
        "create_branch",
        "import_data",
        "tenant_ignore",
        "tenant_attach",
        "tenant_detach",
        "tenant_reattach",
        "replace_safekeeper",
        "disable_maintenance",
        "apply_storage_config",
        "prepare_secondary_pageserver",
        "switch_pageserver",
        "detach_parent_branch",
        "timeline_archive",
        "timeline_unarchive",
        "start_reserved_compute",
        "sync_dbs_and_roles_from_compute",
        "apply_schema_from_branch",
        "timeline_mark_invisible",
        "prewarm_replica",
        "promote_replica",
        "set_storage_non_dirty",
      ]),
      status: Schema.Literals([
        "scheduling",
        "running",
        "finished",
        "failed",
        "error",
        "cancelling",
        "cancelled",
        "skipped",
      ]),
      error: Schema.optional(Schema.String),
      failures_count: Schema.Number,
      retry_at: Schema.optional(Schema.String),
      created_at: Schema.String,
      updated_at: Schema.String,
      total_duration_ms: Schema.Number,
    }),
  ),
});
export type StartProjectEndpointOutput = typeof StartProjectEndpointOutput.Type;

// The operation
/**
 * Start compute endpoint
 *
 * Starts a compute endpoint. The compute endpoint is ready to use
 * after the last operation in chain finishes successfully.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain an `endpoint_id` by listing your project's compute endpoints.
 * An `endpoint_id` has an `ep-` prefix.
 * For information about compute endpoints, see [Manage computes](https://neon.tech/docs/manage/endpoints/).
 *
 * @param project_id - The Neon project ID
 * @param endpoint_id - The endpoint ID
 */
export const startProjectEndpoint = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StartProjectEndpointInput,
    outputSchema: StartProjectEndpointOutput,
  }),
);
