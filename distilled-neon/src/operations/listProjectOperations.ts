import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListProjectOperationsInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/operations" }));
export type ListProjectOperationsInput = typeof ListProjectOperationsInput.Type;

// Output Schema
export const ListProjectOperationsOutput = Schema.Struct({
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
  pagination: Schema.optional(Schema.Struct({
    cursor: Schema.String,
  })),
});
export type ListProjectOperationsOutput = typeof ListProjectOperationsOutput.Type;

// The operation
/**
 * List operations
 *
 * Retrieves a list of operations for the specified Neon project.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * The number of operations returned can be large.
 * To paginate the response, issue an initial request with a `limit` value.
 * Then, add the `cursor` value that was returned in the response to the next request.
 * Operations older than 6 months may be deleted from our systems.
 * If you need more history than that, you should store your own history.
 *
 * @param cursor - Specify the cursor value from the previous response to get the next batch of operations
 * @param limit - Specify a value from 1 to 1000 to limit number of operations in the response
 * @param project_id - The Neon project ID
 */
export const listProjectOperations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListProjectOperationsInput,
  outputSchema: ListProjectOperationsOutput,
}));
