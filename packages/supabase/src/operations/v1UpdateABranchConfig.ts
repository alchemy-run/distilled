import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateABranchConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    branch_id_or_ref: Schema.String.pipe(T.PathParam()),
    branch_name: Schema.optional(Schema.String),
    git_branch: Schema.optional(Schema.String),
    reset_on_push: Schema.optional(Schema.Boolean),
    persistent: Schema.optional(Schema.Boolean),
    status: Schema.optional(
      Schema.Literals([
        "CREATING_PROJECT",
        "RUNNING_MIGRATIONS",
        "MIGRATIONS_PASSED",
        "MIGRATIONS_FAILED",
        "FUNCTIONS_DEPLOYED",
        "FUNCTIONS_FAILED",
      ]),
    ),
    request_review: Schema.optional(Schema.Boolean),
    notify_url: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "PATCH", path: "/v1/branches/{branch_id_or_ref}" }));
export type V1UpdateABranchConfigInput = typeof V1UpdateABranchConfigInput.Type;

// Output Schema
export const V1UpdateABranchConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type V1UpdateABranchConfigOutput =
  typeof V1UpdateABranchConfigOutput.Type;

// The operation
/**
 * Update database branch config
 *
 * Updates the configuration of the specified database branch
 *
 * @param branch_id_or_ref - Branch ID
 */
export const v1UpdateABranchConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateABranchConfigInput,
    outputSchema: V1UpdateABranchConfigOutput,
  }),
);
