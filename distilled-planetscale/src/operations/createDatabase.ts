import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateDatabaseInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
  region: Schema.optional(Schema.String),
  cluster_size: Schema.String,
  replicas: Schema.optional(Schema.Number),
  kind: Schema.optional(Schema.Literal("mysql", "postgresql")),
  major_version: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/organizations/{organization}/databases" }),
);
export type CreateDatabaseInput = typeof CreateDatabaseInput.Type;

// Output Schema
export const CreateDatabaseOutput = Schema.Struct({
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
export type CreateDatabaseOutput = typeof CreateDatabaseOutput.Type;

// The operation
/**
 * Create a database
 *
 * @param organization - The name of the organization the database belongs to
 * @param name - Name of the database
 * @param region - The region the database will be deployed in. If left blank, defaults to the organization's default region.
 * @param cluster_size - The database cluster size name (e.g., 'PS_10', 'PS_80'). Use the 'List available cluster sizes' endpoint to get available options for your organization. /v1/organizations/:organization/cluster-size-skus
 * @param replicas - The number of replicas for the database. 0 for non-HA, 2+ for HA.
 * @param kind - The kind of database to create.
 * @param major_version - For PostgreSQL databases, the PostgreSQL major version to use for the database. Defaults to the latest available major version.
 */
export const createDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateDatabaseInput,
  outputSchema: CreateDatabaseOutput,
}));
