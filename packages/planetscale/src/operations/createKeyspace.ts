import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CreateKeyspaceInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
  cluster_size: Schema.String,
  extra_replicas: Schema.optional(Schema.Number),
  shards: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/keyspaces",
  }),
);
export type CreateKeyspaceInput = typeof CreateKeyspaceInput.Type;

// Output Schema
export const CreateKeyspaceOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  vector_pool_allocation: Schema.NullOr(Schema.Number),
  node_ttl_strategy: Schema.Literals([
    "node_ttl_follow_maintenance",
    "node_ttl_always",
    "node_ttl_off",
  ]),
  replication_durability_constraints: Schema.Struct({
    strategy: Schema.optional(Schema.Literals(["available", "lag", "always"])),
  }),
  vreplication_flags: Schema.Struct({
    optimize_inserts: Schema.Boolean,
    allow_no_blob_binlog_row_image: Schema.Boolean,
    vplayer_batching: Schema.Boolean,
  }),
  mysqld_options: Schema.Record(Schema.String, Schema.Unknown),
  vttablet_options: Schema.Record(Schema.String, Schema.Unknown),
});
export type CreateKeyspaceOutput = typeof CreateKeyspaceOutput.Type;

// The operation
/**
 * Create a keyspace
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param name - The name of the keyspace
 * @param cluster_size - The database cluster size name (e.g., 'PS_10', 'PS_80'). Use the 'List available cluster sizes' endpoint to get available options for your organization. /v1/organizations/:organization/cluster-size-skus
 * @param extra_replicas - The number of additional replicas beyond the included default
 * @param shards - The number of shards. Default: 1
 */
export const createKeyspace = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateKeyspaceInput,
  outputSchema: CreateKeyspaceOutput,
  errors: [Forbidden, NotFound] as const,
}));
