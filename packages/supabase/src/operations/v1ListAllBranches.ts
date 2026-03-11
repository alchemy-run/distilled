import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllBranchesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
  },
).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/branches" }));
export type V1ListAllBranchesInput = typeof V1ListAllBranchesInput.Type;

// Output Schema
export const V1ListAllBranchesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    project_ref: Schema.String,
    parent_project_ref: Schema.String,
    is_default: Schema.Boolean,
    git_branch: Schema.optional(Schema.String),
    pr_number: Schema.optional(Schema.Number),
    latest_check_run_id: Schema.optional(Schema.Number),
    persistent: Schema.Boolean,
    status: Schema.Literals([
      "CREATING_PROJECT",
      "RUNNING_MIGRATIONS",
      "MIGRATIONS_PASSED",
      "MIGRATIONS_FAILED",
      "FUNCTIONS_DEPLOYED",
      "FUNCTIONS_FAILED",
    ]),
    created_at: Schema.String,
    updated_at: Schema.String,
    review_requested_at: Schema.optional(Schema.String),
    with_data: Schema.Boolean,
    notify_url: Schema.optional(Schema.String),
    deletion_scheduled_at: Schema.optional(Schema.String),
    preview_project_status: Schema.optional(
      Schema.Literals([
        "INACTIVE",
        "ACTIVE_HEALTHY",
        "ACTIVE_UNHEALTHY",
        "COMING_UP",
        "UNKNOWN",
        "GOING_DOWN",
        "INIT_FAILED",
        "REMOVED",
        "RESTORING",
        "UPGRADING",
        "PAUSING",
        "RESTORE_FAILED",
        "RESTARTING",
        "PAUSE_FAILED",
        "RESIZING",
      ]),
    ),
  }),
);
export type V1ListAllBranchesOutput = typeof V1ListAllBranchesOutput.Type;

// The operation
/**
 * List all database branches
 *
 * Returns all database branches of the specified project.
 *
 * @param ref - Project ref
 */
export const v1ListAllBranches = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListAllBranchesInput,
  outputSchema: V1ListAllBranchesOutput,
}));
