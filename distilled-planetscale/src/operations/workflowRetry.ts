import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const WorkflowRetryInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  number: Schema.Number.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/workflows/{number}/retry",
  }),
);
export type WorkflowRetryInput = typeof WorkflowRetryInput.Type;

// Output Schema
export const WorkflowRetryOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  number: Schema.Number,
  state: Schema.Literal(
    "pending",
    "copying",
    "running",
    "stopped",
    "verifying_data",
    "verified_data",
    "switching_replicas",
    "switched_replicas",
    "switching_primaries",
    "switched_primaries",
    "reversing_traffic",
    "reversing_traffic_for_cancel",
    "cutting_over",
    "cutover",
    "reversed_cutover",
    "completed",
    "cancelling",
    "cancelled",
    "error",
  ),
  created_at: Schema.String,
  updated_at: Schema.String,
  started_at: Schema.String,
  completed_at: Schema.String,
  cancelled_at: Schema.String,
  reversed_at: Schema.String,
  retried_at: Schema.String,
  data_copy_completed_at: Schema.String,
  cutover_at: Schema.String,
  replicas_switched: Schema.Boolean,
  primaries_switched: Schema.Boolean,
  switch_replicas_at: Schema.String,
  switch_primaries_at: Schema.String,
  verify_data_at: Schema.String,
  workflow_type: Schema.Literal("move_tables"),
  workflow_subtype: Schema.String,
  defer_secondary_keys: Schema.Boolean,
  on_ddl: Schema.Literal("IGNORE", "STOP", "EXEC", "EXEC_IGNORE"),
  workflow_errors: Schema.String,
  may_retry: Schema.Boolean,
  may_restart: Schema.Boolean,
  verified_data_stale: Schema.Boolean,
  sequence_tables_applied: Schema.Boolean,
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  verify_data_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  reversed_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  switch_replicas_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  switch_primaries_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  cancelled_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  completed_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  retried_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  cutover_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  reversed_cutover_by: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  branch: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.String,
  }),
  source_keyspace: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.String,
  }),
  target_keyspace: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.String,
  }),
  global_keyspace: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.String,
  }),
});
export type WorkflowRetryOutput = typeof WorkflowRetryOutput.Type;

// The operation
/**
 * Retry a failed workflow
 *
 * @param organization - The name of the organization the workflow belongs to
 * @param database - The name of the database the workflow belongs to
 * @param number - The sequence number of the workflow
 */
export const workflowRetry = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkflowRetryInput,
  outputSchema: WorkflowRetryOutput,
  errors: [Forbidden, NotFound] as const,
}));
