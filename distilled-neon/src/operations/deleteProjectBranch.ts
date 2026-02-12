import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteProjectBranchInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/projects/{project_id}/branches/{branch_id}" }));
export type DeleteProjectBranchInput = typeof DeleteProjectBranchInput.Type;

// Output Schema
export const DeleteProjectBranchOutput = Schema.Struct({
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
export type DeleteProjectBranchOutput = typeof DeleteProjectBranchOutput.Type;

// The operation
/**
 * Delete branch
 *
 * Deletes the specified branch from a project, and places
 * all compute endpoints into an idle state, breaking existing client connections.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain a `branch_id` by listing the project's branches.
 * For related information, see [Manage branches](https://neon.tech/docs/manage/branches/).
 * When a successful response status is received, the compute endpoints are still active,
 * and the branch is not yet deleted from storage.
 * The deletion occurs after all operations finish.
 * You cannot delete a project's root or default branch, and you cannot delete a branch that has a child branch.
 * A project must have at least one branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const deleteProjectBranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteProjectBranchInput,
  outputSchema: DeleteProjectBranchOutput,
}));
