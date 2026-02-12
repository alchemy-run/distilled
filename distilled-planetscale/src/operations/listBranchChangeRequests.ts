import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListBranchChangeRequestsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/changes",
  }),
);
export type ListBranchChangeRequestsInput =
  typeof ListBranchChangeRequestsInput.Type;

// Output Schema
export const ListBranchChangeRequestsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      restart: Schema.Array(Schema.Number),
      state: Schema.Literal(
        "queued",
        "pending",
        "resizing",
        "canceled",
        "completed",
      ),
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
      storage_type: Schema.Literal("gp3", "io2", "pd_ssd"),
      storage_iops: Schema.Number,
      storage_throughput_mibs: Schema.Number,
      previous_minimum_storage_bytes: Schema.Number,
      previous_maximum_storage_bytes: Schema.Number,
      previous_storage_autoscaling: Schema.Boolean,
      previous_storage_shrinking: Schema.Boolean,
      previous_storage_type: Schema.String,
      previous_storage_iops: Schema.Number,
      previous_storage_throughput_mibs: Schema.Number,
    }),
  ),
});
export type ListBranchChangeRequestsOutput =
  typeof ListBranchChangeRequestsOutput.Type;

// The operation
/**
 * Get branch change requests
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listBranchChangeRequests = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListBranchChangeRequestsInput,
    outputSchema: ListBranchChangeRequestsOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
