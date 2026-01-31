import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateDatabaseSettingsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  new_name: Schema.optional(Schema.String),
  automatic_migrations: Schema.optional(Schema.Boolean),
  migration_framework: Schema.optional(Schema.String),
  migration_table_name: Schema.optional(Schema.String),
  require_approval_for_deploy: Schema.optional(Schema.Boolean),
  restrict_branch_region: Schema.optional(Schema.Boolean),
  allow_data_branching: Schema.optional(Schema.Boolean),
  allow_foreign_key_constraints: Schema.optional(Schema.Boolean),
  insights_raw_queries: Schema.optional(Schema.Boolean),
  production_branch_web_console: Schema.optional(Schema.Boolean),
  default_branch: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}",
  }),
);
export type UpdateDatabaseSettingsInput =
  typeof UpdateDatabaseSettingsInput.Type;

// Output Schema
export const UpdateDatabaseSettingsOutput = Schema.Struct({
  id: Schema.String,
  url: Schema.String,
  branches_url: Schema.String,
  branches_count: Schema.optional(Schema.Number),
  open_schema_recommendations_count: Schema.optional(Schema.Number),
  development_branches_count: Schema.optional(Schema.Number),
  production_branches_count: Schema.optional(Schema.Number),
  issues_count: Schema.optional(Schema.Number),
  multiple_admins_required_for_deletion: Schema.optional(Schema.Boolean),
  ready: Schema.Boolean,
  at_backup_restore_branches_limit: Schema.optional(Schema.Boolean),
  at_development_branch_usage_limit: Schema.optional(Schema.Boolean),
  data_import: Schema.optional(
    Schema.NullOr(
      Schema.Struct({
        state: Schema.String,
        import_check_errors: Schema.String,
        started_at: Schema.String,
        finished_at: Schema.String,
        data_source: Schema.Struct({
          hostname: Schema.String,
          port: Schema.Number,
          database: Schema.String,
        }),
      }),
    ),
  ),
  region: Schema.Struct({
    id: Schema.String,
    provider: Schema.String,
    enabled: Schema.Boolean,
    public_ip_addresses: Schema.Array(Schema.String),
    display_name: Schema.String,
    location: Schema.String,
    slug: Schema.String,
    current_default: Schema.Boolean,
  }),
  html_url: Schema.String,
  name: Schema.String,
  state: Schema.Literal(
    "pending",
    "importing",
    "sleep_in_progress",
    "sleeping",
    "awakening",
    "import_ready",
    "ready",
  ),
  sharded: Schema.optional(Schema.Boolean),
  default_branch_shard_count: Schema.optional(Schema.Number),
  default_branch_read_only_regions_count: Schema.optional(Schema.Number),
  default_branch_table_count: Schema.optional(Schema.Number),
  default_branch: Schema.optional(Schema.String),
  require_approval_for_deploy: Schema.optional(Schema.Boolean),
  resizing: Schema.optional(Schema.Boolean),
  resize_queued: Schema.optional(Schema.Boolean),
  allow_data_branching: Schema.optional(Schema.Boolean),
  foreign_keys_enabled: Schema.optional(Schema.Boolean),
  automatic_migrations: Schema.optional(Schema.NullOr(Schema.Boolean)),
  restrict_branch_region: Schema.optional(Schema.Boolean),
  insights_raw_queries: Schema.optional(Schema.Boolean),
  plan: Schema.optional(Schema.String),
  insights_enabled: Schema.optional(Schema.Boolean),
  production_branch_web_console: Schema.optional(Schema.Boolean),
  migration_table_name: Schema.optional(Schema.NullOr(Schema.String)),
  migration_framework: Schema.optional(Schema.NullOr(Schema.String)),
  created_at: Schema.String,
  updated_at: Schema.String,
  schema_last_updated_at: Schema.optional(Schema.String),
  kind: Schema.Literal("mysql", "postgresql"),
});
export type UpdateDatabaseSettingsOutput =
  typeof UpdateDatabaseSettingsOutput.Type;

// The operation
/**
 * Update database settings
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 * @param new_name - The name to update the database to
 * @param automatic_migrations - Whether or not to copy migration data to new branches and in deploy requests. (Vitess only)
 * @param migration_framework - A migration framework to use on the database. (Vitess only)
 * @param migration_table_name - Name of table to use as migration table for the database. (Vitess only)
 * @param require_approval_for_deploy - Whether or not deploy requests must be approved by a database administrator other than the request creator
 * @param restrict_branch_region - Whether or not to limit branch creation to the same region as the one selected during database creation.
 * @param allow_data_branching - Whether or not data branching is allowed on the database. (Vitess only)
 * @param allow_foreign_key_constraints - Whether or not foreign key constraints are allowed on the database. (Vitess only)
 * @param insights_raw_queries - Whether or not full queries should be collected from the database
 * @param production_branch_web_console - Whether or not the web console can be used on the production branch of the database
 * @param default_branch - The default branch of the database
 */
export const updateDatabaseSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateDatabaseSettingsInput,
    outputSchema: UpdateDatabaseSettingsOutput,
  }),
);
