import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupProcessCollStatMeasurementsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    processId: Schema.String.pipe(T.PathParam()),
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
      path: "/api/atlas/v2/groups/{groupId}/processes/{processId}/{databaseName}/{collectionName}/collStats/measurements",
    }),
  );
export type ListGroupProcessCollStatMeasurementsInput =
  typeof ListGroupProcessCollStatMeasurementsInput.Type;

// Output Schema
export const ListGroupProcessCollStatMeasurementsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupProcessCollStatMeasurementsOutput =
  typeof ListGroupProcessCollStatMeasurementsOutput.Type;

// The operation
/**
 * Return Host-Level Query Latency
 *
 * Get a list of the Coll Stats Latency process-level measurements for the given namespace.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param processId - Combination of hostname and IANA port that serves the MongoDB process. The host must be the hostname, fully qualified domain name (FQDN), or Internet Protocol address (IPv4 or IPv6) of the host that runs the MongoDB process (mongod or mongos). The port must be the IANA port on which the MongoDB process listens for requests.
 * @param databaseName - Human-readable label that identifies the database.
 * @param collectionName - Human-readable label that identifies the collection.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param metrics - List that contains the metrics that you want to retrieve for the associated data series. If you don't set this parameter, this resource returns data series for all Coll Stats Latency metrics.
 * @param start - Date and time when MongoDB Cloud begins reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 * @param end - Date and time when MongoDB Cloud stops reporting the metrics. This parameter expresses its value in the ISO 8601 timestamp format in UTC. Include this parameter when you do not set **period**.
 * @param period - Duration over which Atlas reports the metrics. This parameter expresses its value in the ISO 8601 duration format in UTC. Include this parameter when you do not set **start** and **end**.
 */
export const listGroupProcessCollStatMeasurements =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupProcessCollStatMeasurementsInput,
    outputSchema: ListGroupProcessCollStatMeasurementsOutput,
  }));
