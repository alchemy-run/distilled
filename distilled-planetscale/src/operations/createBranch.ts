import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CreateBranchInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
  parent_branch: Schema.String,
  backup_id: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  restore_point: Schema.optional(Schema.String),
  seed_data: Schema.optional(Schema.Literal("last_successful_backup")),
  cluster_size: Schema.optional(Schema.String),
  major_version: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/branches",
  }),
);
export type CreateBranchInput = typeof CreateBranchInput.Type;

// Output Schema
export const CreateBranchOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  deleted_at: Schema.NullOr(Schema.String),
  restore_checklist_completed_at: Schema.NullOr(Schema.String),
  schema_last_updated_at: Schema.String,
  kind: Schema.Literal("mysql", "postgresql"),
  mysql_address: Schema.String,
  mysql_edge_address: Schema.String,
  state: Schema.Literal(
    "pending",
    "sleep_in_progress",
    "sleeping",
    "awakening",
    "ready",
  ),
  direct_vtgate: Schema.Boolean,
  vtgate_size: Schema.String,
  vtgate_count: Schema.Number,
  cluster_name: Schema.String,
  cluster_iops: Schema.NullOr(Schema.Number),
  ready: Schema.Boolean,
  schema_ready: Schema.Boolean,
  metal: Schema.Boolean,
  production: Schema.Boolean,
  safe_migrations: Schema.Boolean,
  sharded: Schema.Boolean,
  shard_count: Schema.Number,
  stale_schema: Schema.Boolean,
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  restored_from_branch: Schema.NullOr(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      created_at: Schema.String,
      updated_at: Schema.String,
      deleted_at: Schema.String,
    }),
  ),
  private_edge_connectivity: Schema.Boolean,
  has_replicas: Schema.Boolean,
  has_read_only_replicas: Schema.Boolean,
  html_url: Schema.String,
  url: Schema.String,
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
  parent_branch: Schema.NullOr(Schema.String),
});
export type CreateBranchOutput = typeof CreateBranchOutput.Type;

// The operation
/**
 * Create a branch
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param name - The name of the branch to create
 * @param parent_branch - Parent branch
 * @param backup_id - If provided, restores the backup's schema and data to the new branch. Must have `restore_production_branch_backup(s)` or `restore_backup(s)` access to do this.
 * @param region - The region to create the branch in. If not provided, the branch will be created in the default region for its database.
 * @param restore_point - Restore from a point-in-time recovery timestamp (e.g. 2023-01-01T00:00:00Z). Available only for PostgreSQL databases.
 * @param seed_data - If provided, restores the last successful backup's schema and data to the new branch. Must have `restore_production_branch_backup(s)` or `restore_backup(s)` access to do this, in addition to Data Branching™ being enabled for the branch.
 * @param cluster_size - The database cluster size. Required if a backup_id is provided, optional otherwise. Options: PS_10, PS_20, PS_40, ..., PS_2800
 * @param major_version - For PostgreSQL databases, the PostgreSQL major version to use for the branch. Defaults to the major version of the parent branch if it exists or the database's default branch major version. Ignored for branches restored from backups.
 */
export const createBranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateBranchInput,
  outputSchema: CreateBranchOutput,
  errors: [Forbidden, NotFound] as const,
}));
