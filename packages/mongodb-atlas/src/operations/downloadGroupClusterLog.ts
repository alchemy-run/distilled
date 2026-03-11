import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DownloadGroupClusterLogInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    hostName: Schema.String.pipe(T.PathParam()),
    logName: Schema.Literals([
      "mongodb",
      "mongos",
      "mongodb-audit-log",
      "mongos-audit-log",
    ]).pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    endDate: Schema.optional(Schema.Number),
    startDate: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{hostName}/logs/{logName}.gz",
    }),
  );
export type DownloadGroupClusterLogInput =
  typeof DownloadGroupClusterLogInput.Type;

// Output Schema
export const DownloadGroupClusterLogOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DownloadGroupClusterLogOutput =
  typeof DownloadGroupClusterLogOutput.Type;

// The operation
/**
 * Download Logs for One Cluster Host in One Project
 *
 * Returns a compressed (.gz) log file that contains a range of log messages for the specified host for the specified project. MongoDB updates process and audit logs from the cluster backend infrastructure every five minutes. Logs are stored in chunks approximately five minutes in length, but this duration may vary. If you poll the API for log files, we recommend polling every five minutes even though consecutive polls could contain some overlapping logs. This feature isn't available for `M0` free clusters, `M2`, `M5`, flex, or serverless clusters. To use this resource, the requesting Service Account or API Key must have the Project Cluster Log Viewer role or Project Data Access Read Only role. The API does not support direct calls with the json response schema. You must request a gzip response schema using an accept header of the format: `Accept: application/vnd.atlas.YYYY-MM-DD+gzip`. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param hostName - Human-readable label that identifies the host that stores the log files that you want to download.
 * @param logName - Human-readable label that identifies the log file that you want to return. To return audit logs, enable *Database Auditing* for the specified project.
 * @param endDate - Specifies the date and time for the ending point of the range of log messages to retrieve, in the number of seconds that have elapsed since the UNIX epoch. This value will default to 24 hours after the start date. If the start date is also unspecified, the value will default to the time of the request.
 * @param startDate - Specifies the date and time for the starting point of the range of log messages to retrieve, in the number of seconds that have elapsed since the UNIX epoch. This value will default to 24 hours prior to the end date. If the end date is also unspecified, the value will default to 24 hours prior to the time of the request.
 */
export const downloadGroupClusterLog = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DownloadGroupClusterLogInput,
    outputSchema: DownloadGroupClusterLogOutput,
  }),
);
