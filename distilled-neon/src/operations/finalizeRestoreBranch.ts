import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const FinalizeRestoreBranchInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/projects/{project_id}/branches/{branch_id}/finalize_restore",
  }),
);
export type FinalizeRestoreBranchInput = typeof FinalizeRestoreBranchInput.Type;

// Output Schema
export const FinalizeRestoreBranchOutput = Schema.Struct({
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
export type FinalizeRestoreBranchOutput =
  typeof FinalizeRestoreBranchOutput.Type;

// The operation
/**
 * Finalize restore
 *
 * Finalize the restore operation for a branch created from a snapshot.
 * This operation updates the branch so it functions as the original branch it replaced.
 * This includes:
 * - Reassigning any computes from the original branch to the restored branch (this will restart the computes)
 * - Renaming the restored branch to the original branch's name
 * - Renaming the original branch so it no longer uses the original name
 * This operation only applies to branches created using the `restoreSnapshot` endpoint with `finalize_restore: false`.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const finalizeRestoreBranch = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FinalizeRestoreBranchInput,
    outputSchema: FinalizeRestoreBranchOutput,
  }),
);
