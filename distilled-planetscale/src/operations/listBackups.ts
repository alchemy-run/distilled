import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListBackupsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  all: Schema.optional(Schema.Boolean),
  state: Schema.optional(
    Schema.Literal(
      "pending",
      "running",
      "success",
      "failed",
      "canceled",
      "ignored",
    ),
  ),
  policy: Schema.optional(Schema.String),
  from: Schema.optional(Schema.String),
  to: Schema.optional(Schema.String),
  running_at: Schema.optional(Schema.String),
  production: Schema.optional(Schema.Boolean),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/backups",
  }),
);
export type ListBackupsInput = typeof ListBackupsInput.Type;

// Output Schema
export const ListBackupsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
      started_at: Schema.String,
      expires_at: Schema.String,
      completed_at: Schema.String,
      deleted_at: Schema.String,
      pvc_size: Schema.Number,
      protected: Schema.Boolean,
      required: Schema.Boolean,
      restored_branches: Schema.Array(
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
          created_at: Schema.String,
          updated_at: Schema.String,
          deleted_at: Schema.String,
        }),
      ),
      actor: Schema.Struct({
        id: Schema.String,
        display_name: Schema.String,
        avatar_url: Schema.String,
      }),
      backup_policy: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        target: Schema.Literal("production", "development"),
        retention_value: Schema.Number,
        retention_unit: Schema.String,
        frequency_value: Schema.Number,
        frequency_unit: Schema.String,
        schedule_time: Schema.String,
        schedule_day: Schema.Number,
        schedule_week: Schema.Number,
        created_at: Schema.String,
        updated_at: Schema.String,
        last_ran_at: Schema.String,
        next_run_at: Schema.String,
        required: Schema.Boolean,
      }),
      schema_snapshot: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        created_at: Schema.String,
        updated_at: Schema.String,
        linted_at: Schema.String,
        url: Schema.String,
      }),
      database_branch: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        created_at: Schema.String,
        updated_at: Schema.String,
        deleted_at: Schema.String,
      }),
    }),
  ),
});
export type ListBackupsOutput = typeof ListBackupsOutput.Type;

// The operation
/**
 * List backups
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param all - Whether to include all backups, including deleted ones
 * @param state - Filter backups by state
 * @param policy - Filter backups by backup policy ID
 * @param from - Filter backups started after this date (e.g. 2023-01-01T00:00:00Z)
 * @param to - Filter backups started before this date (e.g. 2023-01-31T23:59:59Z)
 * @param running_at - Filter backups that are running during a specific time (e.g. 2023-01-01T00:00:00Z..2023-01-01T23:59:59Z)
 * @param production - Filter backups by production branch
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listBackups = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListBackupsInput,
  outputSchema: ListBackupsOutput,
  errors: [Forbidden, NotFound] as const,
}));
