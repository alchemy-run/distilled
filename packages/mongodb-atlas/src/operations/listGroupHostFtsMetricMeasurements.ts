import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupHostFtsMetricMeasurementsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    processId: Schema.String.pipe(T.PathParam()),
    groupId: Schema.String.pipe(T.PathParam()),
    granularity: Schema.String,
    period: Schema.optional(Schema.String),
    start: Schema.optional(Schema.String),
    end: Schema.optional(Schema.String),
    envelope: Schema.optional(Schema.Boolean),
    metrics: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics/measurements",
    }),
  );
export type ListGroupHostFtsMetricMeasurementsInput =
  typeof ListGroupHostFtsMetricMeasurementsInput.Type;

// Output Schema
export const ListGroupHostFtsMetricMeasurementsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupHostFtsMetricMeasurementsOutput =
  typeof ListGroupHostFtsMetricMeasurementsOutput.Type;

// The operation
/**
 * Return Atlas Search Hardware and Status Metrics
 *
 * Returns the Atlas Search hardware and status data series within the provided time range for one process in the specified project. You must have the Project Read Only or higher role to view the Atlas Search metric types.
 *
 * @param processId - Combination of hostname and IANA port that serves the MongoDB process. The host must be the hostname, fully qualified domain name (FQDN), or Internet Protocol address (IPv4 or IPv6) of the host that runs the MongoDB process (mongod or mongos). The port must be the IANA port on which the MongoDB process listens for requests.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param granularity - Duration that specifies the interval at which Atlas reports the metrics. This parameter expresses its value in the ISO 8601 duration format in UTC.
 * @param period - Duration over which Atlas reports the metrics. This parameter expresses its value in the ISO 8601 duration format in UTC. Include this parameter when you do not set **start** and **end**.
 * @param start - Date and time when MongoDB Cloud begins reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 * @param end - Date and time when MongoDB Cloud stops reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param metrics - List that contains the metrics that you want MongoDB Atlas to report for the associated data series. If you don't set this parameter, this resource returns all hardware and status metrics for the associated data series.
 */
export const listGroupHostFtsMetricMeasurements =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupHostFtsMetricMeasurementsInput,
    outputSchema: ListGroupHostFtsMetricMeasurementsOutput,
  }));
