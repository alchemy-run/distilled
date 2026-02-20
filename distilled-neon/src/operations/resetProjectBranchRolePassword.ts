import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ResetProjectBranchRolePasswordInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  role_name: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/projects/{project_id}/branches/{branch_id}/roles/{role_name}/reset_password",
  }),
);
export type ResetProjectBranchRolePasswordInput =
  typeof ResetProjectBranchRolePasswordInput.Type;

// Output Schema
export const ResetProjectBranchRolePasswordOutput = Schema.Struct({
  role: Schema.Struct({
    branch_id: Schema.String,
    name: Schema.String,
    password: Schema.optional(Schema.String),
    protected: Schema.optional(Schema.Boolean),
    authentication_method: Schema.optional(Schema.String),
    created_at: Schema.String,
    updated_at: Schema.String,
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
export type ResetProjectBranchRolePasswordOutput =
  typeof ResetProjectBranchRolePasswordOutput.Type;

// The operation
/**
 * Reset role password
 *
 * Resets the password for the specified Postgres role.
 * Returns a new password and operations. The new password is ready to use when the last operation finishes.
 * The old password remains valid until last operation finishes.
 * Connections to the compute endpoint are dropped. If idle,
 * the compute endpoint becomes active for a short period of time.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * You can obtain the `role_name` by listing the roles for a branch.
 * For related information, see [Manage roles](https://neon.tech/docs/manage/roles/).
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 * @param role_name - The role nam
 */
export const resetProjectBranchRolePassword =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResetProjectBranchRolePasswordInput,
    outputSchema: ResetProjectBranchRolePasswordOutput,
  }));
