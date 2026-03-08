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
  next_page: Schema.Number,
  next_page_url: Schema.String,
  prev_page: Schema.Number,
  prev_page_url: Schema.String,
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      url: Schema.String,
      branches_url: Schema.String,
      branches_count: Schema.Number,
      open_schema_recommendations_count: Schema.Number,
      development_branches_count: Schema.Number,
      production_branches_count: Schema.Number,
      issues_count: Schema.Number,
      multiple_admins_required_for_deletion: Schema.Boolean,
      ready: Schema.Boolean,
      at_backup_restore_branches_limit: Schema.Boolean,
      at_development_branch_usage_limit: Schema.Boolean,
      data_import: Schema.Struct({
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
      sharded: Schema.Boolean,
      default_branch_shard_count: Schema.Number,
      default_branch_read_only_regions_count: Schema.Number,
      default_branch_table_count: Schema.Number,
      default_branch: Schema.String,
      require_approval_for_deploy: Schema.Boolean,
      resizing: Schema.Boolean,
      resize_queued: Schema.Boolean,
      config_changing: Schema.Boolean,
      config_change_queued: Schema.Boolean,
      allow_data_branching: Schema.Boolean,
      foreign_keys_enabled: Schema.Boolean,
      automatic_migrations: Schema.Boolean,
      restrict_branch_region: Schema.Boolean,
      insights_raw_queries: Schema.Boolean,
      plan: Schema.String,
      insights_enabled: Schema.Boolean,
      production_branch_web_console: Schema.Boolean,
      migration_table_name: Schema.String,
      migration_framework: Schema.String,
      created_at: Schema.String,
      updated_at: Schema.String,
      schema_last_updated_at: Schema.String,
      kind: Schema.Literals(["mysql", "postgresql"]),
    }),
  ),
});
export type ListDatabasesOutput = typeof ListDatabasesOutput.Type;

// The operation
/**
 * List databases
 *
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param q - Search term to filter databases by name
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listDatabases = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListDatabasesInput,
  outputSchema: ListDatabasesOutput,
  errors: [Forbidden, NotFound] as const,
}));
