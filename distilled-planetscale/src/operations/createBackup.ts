import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CreateBackupInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  retention_unit: Schema.optional(
    Schema.Literal("hour", "day", "week", "month", "year"),
  ),
  retention_value: Schema.optional(Schema.Number),
  emergency: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/backups",
  }),
);
export type CreateBackupInput = typeof CreateBackupInput.Type;

// Output Schema
export const CreateBackupOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  state: Schema.Literal(
    "pending",
    "running",
    "success",
    "failed",
    "canceled",
    "ignored",
  ),
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
      target: Schema.Literal("production", "development"),
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
export type CreateBackupOutput = typeof CreateBackupOutput.Type;

// The operation
/**
 * Create a backup
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param name - Name for the backup
 * @param retention_unit - Unit for the retention period of the backup
 * @param retention_value - Value between `1` and `1000` for the retention period of the backup (i.e retention_value `6` and retention_unit `hour` means 6 hours)
 * @param emergency - Whether the backup is an immediate backup that may affect database performance. Emergency backups are only supported for PostgreSQL databases.
 */
export const createBackup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateBackupInput,
  outputSchema: CreateBackupOutput,
  errors: [Forbidden, NotFound] as const,
}));
