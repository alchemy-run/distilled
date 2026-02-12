import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectOperationInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  operation_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/operations/{operation_id}" }));
export type GetProjectOperationInput = typeof GetProjectOperationInput.Type;

// Output Schema
export const GetProjectOperationOutput = Schema.Struct({
  operation: Schema.Struct({
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
  }),
});
export type GetProjectOperationOutput = typeof GetProjectOperationOutput.Type;

// The operation
/**
 * Retrieve operation details
 *
 * Retrieves details for the specified operation.
 * An operation is an action performed on a Neon project resource.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain a `operation_id` by listing operations for the project.
 *
 * @param project_id - The Neon project ID
 * @param operation_id - The operation ID
 */
export const getProjectOperation = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProjectOperationInput,
  outputSchema: GetProjectOperationOutput,
}));
