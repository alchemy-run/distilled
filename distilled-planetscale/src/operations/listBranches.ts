import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListBranchesInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  q: Schema.optional(Schema.String),
  production: Schema.optional(Schema.Boolean),
  safe_migrations: Schema.optional(Schema.Boolean),
  order: Schema.optional(Schema.Literal("asc", "desc")),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches",
  }),
);
export type ListBranchesInput = typeof ListBranchesInput.Type;

// Output Schema
export const ListBranchesOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
});
export type ListBranchesOutput = typeof ListBranchesOutput.Type;

// The operation
/**
 * List branches
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param q - Search branches by name
 * @param production - Filter branches by production status
 * @param safe_migrations - Filter branches by safe migrations (DDL protection)
 * @param order - Order branches by created_at time
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listBranches = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListBranchesInput,
  outputSchema: ListBranchesOutput,
}));
