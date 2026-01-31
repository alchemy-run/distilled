import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateKeyspaceInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  keyspace: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/keyspaces/{keyspace}",
  }),
);
export type UpdateKeyspaceInput = typeof UpdateKeyspaceInput.Type;

// Output Schema
export const UpdateKeyspaceOutput = Schema.Struct({
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
  ready: Schema.Boolean,
  metal: Schema.Boolean,
  default: Schema.Boolean,
  imported: Schema.Boolean,
  vector_pool_allocation: Schema.NullOr(Schema.Number),
  replication_durability_constraints: Schema.Struct({
    strategy: Schema.optional(Schema.Literal("available", "lag", "always")),
  }),
  vreplication_flags: Schema.Struct({
    optimize_inserts: Schema.Boolean,
    allow_no_blob_binlog_row_image: Schema.Boolean,
    vplayer_batching: Schema.Boolean,
  }),
});
export type UpdateKeyspaceOutput = typeof UpdateKeyspaceOutput.Type;

// The operation
/**
 * Configure keyspace settings
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param keyspace - The name of the keyspace
 */
export const updateKeyspace = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateKeyspaceInput,
  outputSchema: UpdateKeyspaceOutput,
}));
