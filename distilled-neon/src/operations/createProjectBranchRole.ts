import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateProjectBranchRoleInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  role: Schema.Struct({
    name: Schema.String,
    no_login: Schema.optional(Schema.Boolean),
  }),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/branches/{branch_id}/roles" }));
export type CreateProjectBranchRoleInput = typeof CreateProjectBranchRoleInput.Type;

// Output Schema
export const CreateProjectBranchRoleOutput = Schema.Struct({
  role: Schema.Struct({
    branch_id: Schema.String,
    name: Schema.String,
    password: Schema.optional(Schema.String),
    protected: Schema.optional(Schema.Boolean),
    authentication_method: Schema.optional(Schema.String),
    created_at: Schema.String,
    updated_at: Schema.String,
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
export type CreateProjectBranchRoleOutput = typeof CreateProjectBranchRoleOutput.Type;

// The operation
/**
 * Create role
 *
 * Creates a Postgres role in the specified branch.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
 * Connections established to the active compute endpoint will be dropped.
 * If the compute endpoint is idle, the endpoint becomes active for a short period of time and is suspended afterward.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const createProjectBranchRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateProjectBranchRoleInput,
  outputSchema: CreateProjectBranchRoleOutput,
}));
