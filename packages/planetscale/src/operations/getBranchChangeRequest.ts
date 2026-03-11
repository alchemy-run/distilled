import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetBranchChangeRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.String.pipe(T.PathParam()),
    database: Schema.String.pipe(T.PathParam()),
    branch: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/organizations/{organization}/databases/{database}/branches/{branch}/changes/{id}",
    }),
  );
export type GetBranchChangeRequestInput =
  typeof GetBranchChangeRequestInput.Type;

// Output Schema
export const GetBranchChangeRequestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
    parameters: Schema.Record(Schema.String, Schema.Unknown),
    previous_cluster_name: Schema.String,
    previous_cluster_display_name: Schema.String,
    previous_cluster_metal: Schema.Boolean,
    previous_replicas: Schema.Number,
    previous_parameters: Schema.Record(Schema.String, Schema.Unknown),
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
export type GetBranchChangeRequestOutput =
  typeof GetBranchChangeRequestOutput.Type;

// The operation
/**
 * Get a branch change request
 *
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param database - Database name slug from `list_databases`. Example: `app-db`.
 * @param branch - Branch name from `list_branches`. Example: `main`.
 * @param id - The ID of the change request
 */
export const getBranchChangeRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetBranchChangeRequestInput,
    outputSchema: GetBranchChangeRequestOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
