import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateSnapshotInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  lsn: Schema.optional(Schema.String),
  timestamp: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  expires_at: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/branches/{branch_id}/snapshot" }));
export type CreateSnapshotInput = typeof CreateSnapshotInput.Type;

// Output Schema
export const CreateSnapshotOutput = Schema.Struct({
  snapshot: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    lsn: Schema.optional(Schema.String),
    timestamp: Schema.optional(Schema.String),
    source_branch_id: Schema.optional(Schema.String),
    created_at: Schema.String,
    expires_at: Schema.optional(Schema.String),
    manual: Schema.optional(Schema.Boolean),
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
export type CreateSnapshotOutput = typeof CreateSnapshotOutput.Type;

// The operation
/**
 * Create snapshot
 *
 * Create a snapshot from the specified branch using the provided parameters.
 * This endpoint may initiate an asynchronous operation.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 * @param lsn - The target Log Sequence Number (LSN) to take the snapshot from.
Must fall within the restore window. Cannot be used with `timestamp`

 * @param timestamp - The target timestamp for the snapshot. Must fall within the restore window.
Use ISO 8601 format (e.g. 2025-08-05T22:00:00Z). Cannot be used with `lsn`.

 * @param name - A name for the snapshot.
 * @param expires_at - The time at which the snapshot will be automatically deleted.
Use ISO 8601 format (e.g. 2025-08-05T22:00:00Z).

 */
export const createSnapshot = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateSnapshotInput,
  outputSchema: CreateSnapshotOutput,
}));
