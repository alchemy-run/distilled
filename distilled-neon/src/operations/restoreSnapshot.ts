import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RestoreSnapshotInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  snapshot_id: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  target_branch_id: Schema.optional(Schema.String),
  finalize_restore: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/snapshots/{snapshot_id}/restore" }));
export type RestoreSnapshotInput = typeof RestoreSnapshotInput.Type;

// Output Schema
export const RestoreSnapshotOutput = Schema.Struct({
  branch: Schema.Struct({
    id: Schema.String,
    project_id: Schema.String,
    parent_id: Schema.optional(Schema.String),
    parent_lsn: Schema.optional(Schema.String),
    parent_timestamp: Schema.optional(Schema.String),
    name: Schema.String,
    current_state: Schema.String,
    pending_state: Schema.optional(Schema.String),
    state_changed_at: Schema.String,
    logical_size: Schema.optional(Schema.Number),
    creation_source: Schema.String,
    primary: Schema.optional(Schema.Boolean),
    default: Schema.Boolean,
    protected: Schema.Boolean,
    cpu_used_sec: Schema.Number,
    compute_time_seconds: Schema.Number,
    active_time_seconds: Schema.Number,
    written_data_bytes: Schema.Number,
    data_transfer_bytes: Schema.Number,
    created_at: Schema.String,
    updated_at: Schema.String,
    ttl_interval_seconds: Schema.optional(Schema.Number),
    expires_at: Schema.optional(Schema.String),
    last_reset_at: Schema.optional(Schema.String),
    created_by: Schema.optional(Schema.Struct({
      name: Schema.optional(Schema.String),
      image: Schema.optional(Schema.String),
    })),
    init_source: Schema.optional(Schema.String),
    restore_status: Schema.optional(Schema.String),
    restored_from: Schema.optional(Schema.String),
    restored_as: Schema.optional(Schema.String),
    restricted_actions: Schema.optional(Schema.Array(Schema.Struct({
      name: Schema.String,
      reason: Schema.String,
    }))),
  }),
  endpoints: Schema.optional(Schema.Array(Schema.Struct({
    host: Schema.String,
    id: Schema.String,
    name: Schema.optional(Schema.String),
    project_id: Schema.String,
    branch_id: Schema.String,
    autoscaling_limit_min_cu: Schema.Number,
    autoscaling_limit_max_cu: Schema.Number,
    region_id: Schema.String,
    type: Schema.Literal("read_only", "read_write"),
    current_state: Schema.Literal("init", "active", "idle"),
    pending_state: Schema.optional(Schema.Literal("init", "active", "idle")),
    settings: Schema.Struct({
      pg_settings: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
      pgbouncer_settings: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
      preload_libraries: Schema.optional(Schema.Struct({
        use_defaults: Schema.optional(Schema.Boolean),
        enabled_libraries: Schema.optional(Schema.Array(Schema.String)),
      })),
    }),
    pooler_enabled: Schema.Boolean,
    pooler_mode: Schema.Literal("transaction"),
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
  }))),
  operations: Schema.Array(Schema.Struct({
    id: Schema.String,
    project_id: Schema.String,
    branch_id: Schema.optional(Schema.String),
    endpoint_id: Schema.optional(Schema.String),
    action: Schema.Literal("create_compute", "create_timeline", "start_compute", "suspend_compute", "apply_config", "check_availability", "delete_timeline", "create_branch", "import_data", "tenant_ignore", "tenant_attach", "tenant_detach", "tenant_reattach", "replace_safekeeper", "disable_maintenance", "apply_storage_config", "prepare_secondary_pageserver", "switch_pageserver", "detach_parent_branch", "timeline_archive", "timeline_unarchive", "start_reserved_compute", "sync_dbs_and_roles_from_compute", "apply_schema_from_branch", "timeline_mark_invisible", "prewarm_replica", "promote_replica", "set_storage_non_dirty"),
    status: Schema.Literal("scheduling", "running", "finished", "failed", "error", "cancelling", "cancelled", "skipped"),
    error: Schema.optional(Schema.String),
    failures_count: Schema.Number,
    retry_at: Schema.optional(Schema.String),
    created_at: Schema.String,
    updated_at: Schema.String,
    total_duration_ms: Schema.Number,
  })),
});
export type RestoreSnapshotOutput = typeof RestoreSnapshotOutput.Type;

// The operation
/**
 * Restore snapshot
 *
 * Restore the specified snapshot to a new branch and optionally finalize the restore operation.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param snapshot_id - The snapshot ID
 * @param name - DEPRECATED. Use the `name` field in the request body instead.
A name for the newly restored branch. If omitted, a default name will be generated.

 */
export const restoreSnapshot = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RestoreSnapshotInput,
  outputSchema: RestoreSnapshotOutput,
}));
