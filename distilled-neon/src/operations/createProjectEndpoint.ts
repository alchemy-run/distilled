import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateProjectEndpointInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  endpoint: Schema.Struct({
    branch_id: Schema.String,
    region_id: Schema.optional(Schema.String),
    type: Schema.Literal("read_only", "read_write"),
    settings: Schema.optional(Schema.Struct({
      pg_settings: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
      pgbouncer_settings: Schema.optional(Schema.Record({ key: Schema.String, value: Schema.String })),
      preload_libraries: Schema.optional(Schema.Struct({
        use_defaults: Schema.optional(Schema.Boolean),
        enabled_libraries: Schema.optional(Schema.Array(Schema.String)),
      })),
    })),
    autoscaling_limit_min_cu: Schema.optional(Schema.Number),
    autoscaling_limit_max_cu: Schema.optional(Schema.Number),
    provisioner: Schema.optional(Schema.String),
    pooler_enabled: Schema.optional(Schema.Boolean),
    pooler_mode: Schema.optional(Schema.Literal("transaction")),
    disabled: Schema.optional(Schema.Boolean),
    passwordless_access: Schema.optional(Schema.Boolean),
    suspend_timeout_seconds: Schema.optional(Schema.Number),
    name: Schema.optional(Schema.String),
  }),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/endpoints" }));
export type CreateProjectEndpointInput = typeof CreateProjectEndpointInput.Type;

// Output Schema
export const CreateProjectEndpointOutput = Schema.Struct({
  endpoint: Schema.Struct({
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
  }),
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
export type CreateProjectEndpointOutput = typeof CreateProjectEndpointOutput.Type;

// The operation
/**
 * Create compute endpoint
 *
 * Creates a compute endpoint for the specified branch.
 * An endpoint is a Neon compute instance.
 * There is a maximum of one read-write compute endpoint per branch.
 * If the specified branch already has a read-write compute endpoint, the operation fails.
 * A branch can have multiple read-only compute endpoints.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain `branch_id` by listing the project's branches.
 * A `branch_id` has a `br-` prefix.
 * For supported regions and `region_id` values, see [Regions](https://neon.tech/docs/introduction/regions/).
 * For more information about compute endpoints, see [Manage computes](https://neon.tech/docs/manage/endpoints/).
 *
 * @param project_id - The Neon project ID
 */
export const createProjectEndpoint = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateProjectEndpointInput,
  outputSchema: CreateProjectEndpointOutput,
}));
