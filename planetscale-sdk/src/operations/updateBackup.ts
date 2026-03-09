import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const UpdateBackupInput = Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  protected: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/backups/{id}",
  }),
);
export type UpdateBackupInput = typeof UpdateBackupInput.Type;

// Output Schema
export const UpdateBackupOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  state: Schema.Literals([
    "pending",
    "running",
    "success",
    "failed",
    "canceled",
    "ignored",
  ]),
  size: Schema.Number,
  estimated_storage_cost: Schema.Number,
  created_at: Schema.String,
  updated_at: Schema.String,
  started_at: Schema.NullOr(Schema.String),
  expires_at: Schema.NullOr(Schema.String),
  completed_at: Schema.NullOr(Schema.String),
  deleted_at: Schema.NullOr(Schema.String),
  pvc_size: Schema.Number,
  protected: Schema.Boolean,
  required: Schema.Boolean,
  restored_branches: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      created_at: Schema.String,
      updated_at: Schema.String,
      deleted_at: Schema.NullOr(Schema.String),
    }),
  ),
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  backup_policy: Schema.NullOr(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      target: Schema.Literals(["production", "development"]),
      retention_value: Schema.Number,
      retention_unit: Schema.String,
      frequency_value: Schema.Number,
      frequency_unit: Schema.String,
      schedule_time: Schema.NullOr(Schema.String),
      schedule_day: Schema.Number,
      schedule_week: Schema.Number,
      created_at: Schema.String,
      updated_at: Schema.String,
      last_ran_at: Schema.NullOr(Schema.String),
      next_run_at: Schema.NullOr(Schema.String),
      required: Schema.Boolean,
    }),
  ),
  schema_snapshot: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    linted_at: Schema.NullOr(Schema.String),
    url: Schema.String,
  }),
  database_branch: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.NullOr(Schema.String),
  }),
});
export type UpdateBackupOutput = typeof UpdateBackupOutput.Type;

// The operation
/**
 * Update a backup
 *
 * @param id - The ID of the backup
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param protected - Whether the backup is protected from deletion or not
 */
export const updateBackup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateBackupInput,
  outputSchema: UpdateBackupOutput,
  errors: [Forbidden, NotFound] as const,
}));
