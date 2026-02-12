import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CreateDeployRequestInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String,
  into_branch: Schema.String,
  notes: Schema.optional(Schema.String),
  auto_cutover: Schema.optional(Schema.Boolean),
  auto_delete_branch: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/deploy-requests",
  }),
);
export type CreateDeployRequestInput = typeof CreateDeployRequestInput.Type;

// Output Schema
export const CreateDeployRequestOutput = Schema.Struct({
  id: Schema.String,
  number: Schema.Number,
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  closed_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  branch: Schema.String,
  branch_id: Schema.String,
  branch_deleted: Schema.Boolean,
  branch_deleted_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  branch_deleted_at: Schema.String,
  into_branch: Schema.String,
  into_branch_sharded: Schema.Boolean,
  into_branch_shard_count: Schema.Number,
  approved: Schema.Boolean,
  state: Schema.Literal("open", "closed"),
  deployment_state: Schema.Literal(
    "pending",
    "ready",
    "no_changes",
    "queued",
    "submitting",
    "in_progress",
    "pending_cutover",
    "in_progress_vschema",
    "in_progress_cancel",
    "in_progress_cutover",
    "complete",
    "complete_cancel",
    "complete_error",
    "complete_pending_revert",
    "in_progress_revert",
    "in_progress_revert_vschema",
    "complete_revert",
    "complete_revert_error",
    "cancelled",
    "error",
  ),
  deployment: Schema.Struct({
    id: Schema.String,
    auto_cutover: Schema.Boolean,
    auto_delete_branch: Schema.Boolean,
    created_at: Schema.String,
    cutover_at: Schema.String,
    cutover_expiring: Schema.Boolean,
    deploy_check_errors: Schema.String,
    finished_at: Schema.String,
    queued_at: Schema.String,
    ready_to_cutover_at: Schema.String,
    started_at: Schema.String,
    state: Schema.Literal(
      "pending",
      "ready",
      "no_changes",
      "queued",
      "submitting",
      "in_progress",
      "pending_cutover",
      "in_progress_vschema",
      "in_progress_cancel",
      "in_progress_cutover",
      "complete",
      "complete_cancel",
      "complete_error",
      "complete_pending_revert",
      "in_progress_revert",
      "in_progress_revert_vschema",
      "complete_revert",
      "complete_revert_error",
      "cancelled",
      "error",
    ),
    submitted_at: Schema.String,
    updated_at: Schema.String,
    into_branch: Schema.String,
    deploy_request_number: Schema.Number,
    deployable: Schema.Boolean,
    preceding_deployments: Schema.Array(Schema.Unknown),
    deploy_operations: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        state: Schema.Literal(
          "pending",
          "queued",
          "in_progress",
          "complete",
          "cancelled",
          "error",
        ),
        keyspace_name: Schema.String,
        table_name: Schema.String,
        operation_name: Schema.String,
        eta_seconds: Schema.Number,
        progress_percentage: Schema.Number,
        deploy_error_docs_url: Schema.String,
        ddl_statement: Schema.String,
        syntax_highlighted_ddl: Schema.String,
        created_at: Schema.String,
        updated_at: Schema.String,
        throttled_at: Schema.String,
        can_drop_data: Schema.Boolean,
        table_locked: Schema.Boolean,
        table_recently_used: Schema.Boolean,
        table_recently_used_at: Schema.String,
        removed_foreign_key_names: Schema.Array(Schema.String),
        deploy_errors: Schema.String,
      }),
    ),
    deploy_operation_summaries: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        created_at: Schema.String,
        deploy_errors: Schema.String,
        ddl_statement: Schema.String,
        eta_seconds: Schema.Number,
        keyspace_name: Schema.String,
        operation_name: Schema.String,
        progress_percentage: Schema.Number,
        state: Schema.Literal(
          "pending",
          "in_progress",
          "complete",
          "cancelled",
          "error",
        ),
        syntax_highlighted_ddl: Schema.String,
        table_name: Schema.String,
        table_recently_used_at: Schema.String,
        throttled_at: Schema.String,
        removed_foreign_key_names: Schema.Array(Schema.String),
        shard_count: Schema.Number,
        shard_names: Schema.Array(Schema.String),
        can_drop_data: Schema.Boolean,
        table_recently_used: Schema.Boolean,
        sharded: Schema.Boolean,
        operations: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            shard: Schema.String,
            state: Schema.Literal(
              "pending",
              "queued",
              "in_progress",
              "complete",
              "cancelled",
              "error",
            ),
            progress_percentage: Schema.Number,
            eta_seconds: Schema.Number,
          }),
        ),
      }),
    ),
    lint_errors: Schema.Array(Schema.Unknown),
    sequential_diff_dependencies: Schema.Array(Schema.Unknown),
    lookup_vindex_operations: Schema.Array(Schema.Unknown),
    throttler_configurations: Schema.Array(Schema.Unknown),
    deployment_revert_request: Schema.Unknown,
    actor: Schema.Struct({
      id: Schema.String,
      display_name: Schema.String,
      avatar_url: Schema.String,
    }),
    cutover_actor: Schema.Struct({
      id: Schema.String,
      display_name: Schema.String,
      avatar_url: Schema.String,
    }),
    cancelled_actor: Schema.Struct({
      id: Schema.String,
      display_name: Schema.String,
      avatar_url: Schema.String,
    }),
    schema_last_updated_at: Schema.String,
    table_locked: Schema.Boolean,
    locked_table_name: Schema.String,
    instant_ddl: Schema.Boolean,
    instant_ddl_eligible: Schema.Boolean,
  }),
  num_comments: Schema.Number,
  html_url: Schema.String,
  notes: Schema.String,
  html_body: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  closed_at: Schema.String,
  deployed_at: Schema.String,
});
export type CreateDeployRequestOutput = typeof CreateDeployRequestOutput.Type;

// The operation
/**
 * Create a deploy request
 *
 * @param organization - The name of the deploy request's organization
 * @param database - The name of the deploy request's database
 * @param branch - The name of the branch the deploy request is created from
 * @param into_branch - The name of the branch the deploy request will be merged into
 * @param notes - Notes about the deploy request
 * @param auto_cutover - Whether or not to enable auto_cutover for the deploy request. When enabled, will auto cutover to the new schema as soon as it is ready.
 * @param auto_delete_branch - Whether or not to enable auto_delete_branch for the deploy request. When enabled, will delete the branch once the DR successfully completes.
 */
export const createDeployRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateDeployRequestInput,
  outputSchema: CreateDeployRequestOutput,
  errors: [Forbidden, NotFound] as const,
}));
