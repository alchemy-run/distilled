import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupProcessDatabaseMeasurementsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    processId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    m: Schema.optional(Schema.String),
    granularity: Schema.String,
    period: Schema.optional(Schema.String),
    start: Schema.optional(Schema.String),
    end: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/processes/{processId}/databases/{databaseName}/measurements",
    }),
  );
export type GetGroupProcessDatabaseMeasurementsInput =
  typeof GetGroupProcessDatabaseMeasurementsInput.Type;

// Output Schema
export const GetGroupProcessDatabaseMeasurementsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupProcessDatabaseMeasurementsOutput =
  typeof GetGroupProcessDatabaseMeasurementsOutput.Type;

// The operation
/**
 * Return Measurements for One Database in One MongoDB Process
 *
 * Returns the measurements of one database for the specified host for the specified project. Returns the database's on-disk storage space based on the MongoDB `dbStats` command output. To calculate some metric series, Atlas takes the rate between every two adjacent points. For these metric series, the first data point has a null value because Atlas can't calculate a rate for the first data point given the query time range. Atlas retrieves database metrics every 20 minutes but reduces frequency when necessary to optimize database performance. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param databaseName - Human-readable label that identifies the database that the specified MongoDB process serves.
 * @param m - One or more types of measurement to request for this MongoDB process. If omitted, the resource returns all measurements. To specify multiple values for `m`, repeat the `m` parameter for each value. Specify measurements that apply to the specified host. MongoDB Cloud returns an error if you specified any invalid measurements.
 * @param processId - Combination of hostname and Internet Assigned Numbers Authority (IANA) port that serves the MongoDB process. The host must be the hostname, fully qualified domain name (FQDN), or Internet Protocol address (IPv4 or IPv6) of the host that runs the MongoDB process (`mongod` or `mongos`). The port must be the IANA port on which the MongoDB process listens for requests.
 * @param granularity - Duration that specifies the interval at which Atlas reports the metrics. This parameter expresses its value in the ISO 8601 duration format in UTC.
 * @param period - Duration over which Atlas reports the metrics. This parameter expresses its value in the ISO 8601 duration format in UTC. Include this parameter when you do not set **start** and **end**.
 * @param start - Date and time when MongoDB Cloud begins reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 * @param end - Date and time when MongoDB Cloud stops reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 */
export const getGroupProcessDatabaseMeasurements =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupProcessDatabaseMeasurementsInput,
    outputSchema: GetGroupProcessDatabaseMeasurementsOutput,
  }));
