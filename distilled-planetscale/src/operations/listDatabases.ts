import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListDatabasesInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  q: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization}/databases" }),
);
export type ListDatabasesInput = typeof ListDatabasesInput.Type;

// Output Schema
export const ListDatabasesOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
      state: Schema.Literals([
        "pending",
        "importing",
        "sleep_in_progress",
        "sleeping",
        "awakening",
        "import_ready",
        "ready",
      ]),
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
      kind: Schema.Literals(["mysql", "postgresql"]),
    }),
  ),
});
export type ListDatabasesOutput = typeof ListDatabasesOutput.Type;

// The operation
/**
 * List databases
 *
 * @param organization - The name of the organization the database belongs to
 * @param q - Search term to filter databases by name
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listDatabases = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListDatabasesInput,
  outputSchema: ListDatabasesOutput,
  errors: [Forbidden, NotFound] as const,
}));
