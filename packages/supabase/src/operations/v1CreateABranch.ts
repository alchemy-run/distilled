import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateABranchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  branch_name: Schema.String,
  git_branch: Schema.optional(Schema.String),
  is_default: Schema.optional(Schema.Boolean),
  persistent: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
  desired_instance_size: Schema.optional(
    Schema.Literals([
      "pico",
      "nano",
      "micro",
      "small",
      "medium",
      "large",
      "xlarge",
      "2xlarge",
      "4xlarge",
      "8xlarge",
      "12xlarge",
      "16xlarge",
      "24xlarge",
      "24xlarge_optimized_memory",
      "24xlarge_optimized_cpu",
      "24xlarge_high_memory",
      "48xlarge",
      "48xlarge_optimized_memory",
      "48xlarge_optimized_cpu",
      "48xlarge_high_memory",
    ]),
  ),
  release_channel: Schema.optional(
    Schema.Literals([
      "internal",
      "alpha",
      "beta",
      "ga",
      "withdrawn",
      "preview",
    ]),
  ),
  postgres_engine: Schema.optional(Schema.Literals(["15", "17", "17-oriole"])),
  secrets: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  with_data: Schema.optional(Schema.Boolean),
  notify_url: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/branches" }));
export type V1CreateABranchInput = typeof V1CreateABranchInput.Type;

// Output Schema
export const V1CreateABranchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type V1CreateABranchOutput = typeof V1CreateABranchOutput.Type;

// The operation
/**
 * Create a database branch
 *
 * Creates a database branch from the specified project.
 *
 * @param ref - Project ref
 */
export const v1CreateABranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1CreateABranchInput,
  outputSchema: V1CreateABranchOutput,
}));
