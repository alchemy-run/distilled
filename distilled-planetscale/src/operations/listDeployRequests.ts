import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListDeployRequestsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  state: Schema.optional(Schema.String),
  branch: Schema.optional(Schema.String),
  into_branch: Schema.optional(Schema.String),
  deployed_at: Schema.optional(Schema.String),
  running_at: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/deploy-requests",
  }),
);
export type ListDeployRequestsInput = typeof ListDeployRequestsInput.Type;

// Output Schema
export const ListDeployRequestsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
});
export type ListDeployRequestsOutput = typeof ListDeployRequestsOutput.Type;

// The operation
/**
 * List deploy requests
 *
 * List deploy requests for a database
 *
 * @param organization - The name of the deploy request's organization
 * @param database - The name of the deploy request's database
 * @param state - Filter by state of the deploy request (open, closed, deployed)
 * @param branch - Filter by the name of the branch the deploy request is created from
 * @param into_branch - Filter by the name of the branch the deploy request will be merged into
 * @param deployed_at - Filter deploy requests by the date they were deployed. (e.g. 2023-01-01T00:00:00Z..2023-01-31T23:59:59Z)
 * @param running_at - Filter deploy requests by the date they were running. (e.g. 2023-01-01T00:00:00Z..2023-01-31T23:59:59Z)
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listDeployRequests = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListDeployRequestsInput,
  outputSchema: ListDeployRequestsOutput,
}));
