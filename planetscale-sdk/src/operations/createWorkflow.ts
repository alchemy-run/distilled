import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CreateWorkflowInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
  source_keyspace: Schema.String,
  target_keyspace: Schema.String,
  global_keyspace: Schema.optional(Schema.String),
  defer_secondary_keys: Schema.optional(Schema.Boolean),
  on_ddl: Schema.optional(
    Schema.Literals(["IGNORE", "STOP", "EXEC", "EXEC_IGNORE"]),
  ),
  tables: Schema.Array(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/workflows",
  }),
);
export type CreateWorkflowInput = typeof CreateWorkflowInput.Type;

// Output Schema
export const CreateWorkflowOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  number: Schema.Number,
  state: Schema.Literals([
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
  ]),
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
  workflow_type: Schema.Literals(["move_tables"]),
  workflow_subtype: Schema.String,
  defer_secondary_keys: Schema.Boolean,
  on_ddl: Schema.Literals(["IGNORE", "STOP", "EXEC", "EXEC_IGNORE"]),
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
export type CreateWorkflowOutput = typeof CreateWorkflowOutput.Type;

// The operation
/**
 * Create a workflow
 *
 * @param organization - The name of the organization the workflow belongs to
 * @param database - The name of the database the workflow belongs to
 * @param name - Name the workflow
 * @param source_keyspace - Name of the source keyspace
 * @param target_keyspace - Name of the target keyspace
 * @param global_keyspace - Name of the global sequence keyspace
 * @param defer_secondary_keys - Defer secondary keys
 * @param on_ddl - The behavior when DDL changes during the workflow
 * @param tables - List of tables to move
 */
export const createWorkflow = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateWorkflowInput,
  outputSchema: CreateWorkflowOutput,
  errors: [Forbidden, NotFound] as const,
}));
