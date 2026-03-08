import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListKeyspacesInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/keyspaces",
  }),
);
export type ListKeyspacesInput = typeof ListKeyspacesInput.Type;

// Output Schema
export const ListKeyspacesOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.Number,
  next_page_url: Schema.String,
  prev_page: Schema.Number,
  prev_page_url: Schema.String,
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      shards: Schema.Number,
      sharded: Schema.Boolean,
      replicas: Schema.Number,
      extra_replicas: Schema.Number,
      created_at: Schema.String,
      updated_at: Schema.String,
      cluster_name: Schema.String,
      cluster_display_name: Schema.String,
      resizing: Schema.Boolean,
      resize_pending: Schema.Boolean,
      config_change_in_progress: Schema.Boolean,
      ready: Schema.Boolean,
      metal: Schema.Boolean,
      default: Schema.Boolean,
      imported: Schema.Boolean,
      vector_pool_allocation: Schema.Number,
      node_ttl_strategy: Schema.Literals([
        "node_ttl_follow_maintenance",
        "node_ttl_always",
        "node_ttl_off",
      ]),
      replication_durability_constraints: Schema.Struct({
        strategy: Schema.Literals(["available", "lag", "always"]),
      }),
      vreplication_flags: Schema.Struct({
        optimize_inserts: Schema.Boolean,
        allow_no_blob_binlog_row_image: Schema.Boolean,
        vplayer_batching: Schema.Boolean,
      }),
      mysqld_options: Schema.Record(Schema.String, Schema.Unknown),
      vttablet_options: Schema.Record(Schema.String, Schema.Unknown),
    }),
  ),
});
export type ListKeyspacesOutput = typeof ListKeyspacesOutput.Type;

// The operation
/**
 * Get keyspaces
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listKeyspaces = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListKeyspacesInput,
  outputSchema: ListKeyspacesOutput,
  errors: [Forbidden, NotFound] as const,
}));
