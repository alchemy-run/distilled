import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupClusterCollStatMeasurementsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    clusterView: Schema.Literals([
      "PRIMARY",
      "SECONDARY",
      "INDIVIDUAL_PROCESS",
    ]).pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    collectionName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    metrics: Schema.optional(Schema.String),
    start: Schema.optional(Schema.String),
    end: Schema.optional(Schema.String),
    period: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/{clusterView}/{databaseName}/{collectionName}/collStats/measurements",
    }),
  );
export type ListGroupClusterCollStatMeasurementsInput =
  typeof ListGroupClusterCollStatMeasurementsInput.Type;

// Output Schema
export const ListGroupClusterCollStatMeasurementsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupClusterCollStatMeasurementsOutput =
  typeof ListGroupClusterCollStatMeasurementsOutput.Type;

// The operation
/**
 * Return Cluster-Level Query Latency
 *
 * Get a list of the Coll Stats Latency cluster-level measurements for the given namespace.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster to retrieve metrics for.
 * @param clusterView - Human-readable label that identifies the cluster topology to retrieve metrics for.
 * @param databaseName - Human-readable label that identifies the database.
 * @param collectionName - Human-readable label that identifies the collection.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param metrics - List that contains the metrics that you want to retrieve for the associated data series. If you don't set this parameter, this resource returns data series for all Coll Stats Latency metrics.
 * @param start - Date and time when MongoDB Cloud begins reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 * @param end - Date and time when MongoDB Cloud stops reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 * @param period - Duration over which Atlas reports the metrics. This parameter expresses its value in the ISO 8601 duration format in UTC. Include this parameter when you do not set **start** and **end**.
 */
export const listGroupClusterCollStatMeasurements =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupClusterCollStatMeasurementsInput,
    outputSchema: ListGroupClusterCollStatMeasurementsOutput,
  }));
