import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupProcessMeasurementsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    processId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    m: Schema.optional(Schema.String),
    period: Schema.optional(Schema.String),
    granularity: Schema.String,
    start: Schema.optional(Schema.String),
    end: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/processes/{processId}/measurements",
    }),
  );
export type GetGroupProcessMeasurementsInput =
  typeof GetGroupProcessMeasurementsInput.Type;

// Output Schema
export const GetGroupProcessMeasurementsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupProcessMeasurementsOutput =
  typeof GetGroupProcessMeasurementsOutput.Type;

// The operation
/**
 * Return Measurements for One MongoDB Process
 *
 * Returns disk, partition, or host measurements per process for the specified host for the specified project. Returned value can be one of the following:
 * - Throughput of I/O operations for the disk partition used for the MongoDB process
 * - Percentage of time during which requests the partition issued and serviced
 * - Latency per operation type of the disk partition used for the MongoDB process
 * - Amount of free and used disk space on the disk partition used for the MongoDB process
 * - Measurements for the host, such as CPU usage or number of I/O operations
 * To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param m - One or more types of measurement to request for this MongoDB process. If omitted, the resource returns all measurements. To specify multiple values for `m`, repeat the `m` parameter for each value. Specify measurements that apply to the specified host. MongoDB Cloud returns an error if you specified any invalid measurements.
 * @param period - Duration over which Atlas reports the metrics. This parameter expresses its value in the ISO 8601 duration format in UTC. Include this parameter when you do not set **start** and **end**.
 * @param processId - Combination of hostname and Internet Assigned Numbers Authority (IANA) port that serves the MongoDB process. The host must be the hostname, fully qualified domain name (FQDN), or Internet Protocol address (IPv4 or IPv6) of the host that runs the MongoDB process (`mongod` or `mongos`). The port must be the IANA port on which the MongoDB process listens for requests.
 * @param granularity - Duration that specifies the interval at which Atlas reports the metrics. This parameter expresses its value in the ISO 8601 duration format in UTC.
 * @param start - Date and time when MongoDB Cloud begins reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 * @param end - Date and time when MongoDB Cloud stops reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 */
export const getGroupProcessMeasurements = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupProcessMeasurementsInput,
    outputSchema: GetGroupProcessMeasurementsOutput,
  }),
);
