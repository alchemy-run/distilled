import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateProjectBranchInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/branches" }));
export type CreateProjectBranchInput = typeof CreateProjectBranchInput.Type;

// Output Schema
export const CreateProjectBranchOutput = Schema.Struct({
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
  endpoints: Schema.Array(Schema.Struct({
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
  })),
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
  roles: Schema.Array(Schema.Struct({
    branch_id: Schema.String,
    name: Schema.String,
    password: Schema.optional(Schema.String),
    protected: Schema.optional(Schema.Boolean),
    authentication_method: Schema.optional(Schema.String),
    created_at: Schema.String,
    updated_at: Schema.String,
  })),
  databases: Schema.Array(Schema.Struct({
    id: Schema.Number,
    branch_id: Schema.String,
    name: Schema.String,
    owner_name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
  })),
  connection_uris: Schema.optional(Schema.Array(Schema.Struct({
    connection_uri: Schema.String,
    connection_parameters: Schema.Struct({
      database: Schema.String,
      password: Schema.String,
      role: Schema.String,
      host: Schema.String,
      pooler_host: Schema.String,
    }),
  }))),
});
export type CreateProjectBranchOutput = typeof CreateProjectBranchOutput.Type;

// The operation
/**
 * Create branch
 *
 * Creates a branch in the specified project.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * This method does not require a request body, but you can specify one to create a compute endpoint for the branch or to select a non-default parent branch.
 * By default, the branch is created from the project's default branch with no compute endpoint, and the branch name is auto-generated.
 * To access the branch, you must add an endpoint object. A `read_write` endpoint allows you to perform read and write operations on the branch.
 * Each branch supports one read-write endpoint and multiple read-only endpoints.
 * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
 *
 * @param project_id - The Neon project ID
 */
export const createProjectBranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateProjectBranchInput,
  outputSchema: CreateProjectBranchOutput,
}));
