import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const UpdateBranchChangeRequestInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  cluster_size: Schema.optional(Schema.String),
  replicas: Schema.optional(Schema.Number),
  parameters: Schema.optional(Schema.Unknown),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/changes",
  }),
);
export type UpdateBranchChangeRequestInput =
  typeof UpdateBranchChangeRequestInput.Type;

// Output Schema
export const UpdateBranchChangeRequestOutput = Schema.Struct({
  id: Schema.String,
  restart: Schema.Array(Schema.Number),
  state: Schema.Literals([
    "queued",
    "pending",
    "resizing",
    "canceled",
    "completed",
  ]),
  started_at: Schema.String,
  completed_at: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  cluster_name: Schema.String,
  cluster_display_name: Schema.String,
  cluster_metal: Schema.Boolean,
  replicas: Schema.Number,
  parameters: Schema.Unknown,
  previous_cluster_name: Schema.String,
  previous_cluster_display_name: Schema.String,
  previous_cluster_metal: Schema.Boolean,
  previous_replicas: Schema.Number,
  previous_parameters: Schema.Unknown,
  minimum_storage_bytes: Schema.Number,
  maximum_storage_bytes: Schema.Number,
  storage_autoscaling: Schema.Boolean,
  storage_shrinking: Schema.Boolean,
  storage_type: Schema.Literals(["gp3", "io2", "pd_ssd"]),
  storage_iops: Schema.Number,
  storage_throughput_mibs: Schema.Number,
  previous_minimum_storage_bytes: Schema.Number,
  previous_maximum_storage_bytes: Schema.Number,
  previous_storage_autoscaling: Schema.Boolean,
  previous_storage_shrinking: Schema.Boolean,
  previous_storage_type: Schema.String,
  previous_storage_iops: Schema.Number,
  previous_storage_throughput_mibs: Schema.Number,
});
export type UpdateBranchChangeRequestOutput =
  typeof UpdateBranchChangeRequestOutput.Type;

// The operation
/**
 * Upsert a change request
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param cluster_size - The size of the cluster. Available sizes can be found using the 'List cluster sizes' endpoint.
 * @param replicas - The total number of replicas
 * @param parameters - Cluster configuration parameters nested by namespace (e.g., {"pgconf": {"max_connections": "200"}}). Use the 'List cluster parameters' endpoint to retrieve available parameters. Supported namespaces include 'patroni', 'pgconf', and 'pgbouncer'.
 */
export const updateBranchChangeRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateBranchChangeRequestInput,
    outputSchema: UpdateBranchChangeRequestOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
