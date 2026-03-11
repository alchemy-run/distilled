import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DownloadGroupClusterOnlineArchiveQueryLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    startDate: Schema.optional(Schema.Number),
    endDate: Schema.optional(Schema.Number),
    archiveOnly: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/queryLogs.gz",
    }),
  );
export type DownloadGroupClusterOnlineArchiveQueryLogsInput =
  typeof DownloadGroupClusterOnlineArchiveQueryLogsInput.Type;

// Output Schema
export const DownloadGroupClusterOnlineArchiveQueryLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DownloadGroupClusterOnlineArchiveQueryLogsOutput =
  typeof DownloadGroupClusterOnlineArchiveQueryLogsOutput.Type;

// The operation
/**
 * Download Online Archive Query Logs
 *
 * Downloads query logs for the specified online archive. To use this resource, the requesting Service Account or API Key must have the Project Data Access Read Only or higher role. The API does not support direct calls with the json response schema. You must request a gzip response schema using an accept header of the format: `Accept: application/vnd.atlas.YYYY-MM-DD+gzip`.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param startDate - Date and time that specifies the starting point for the range of log messages to return. This resource expresses this value in the number of seconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).
 * @param endDate - Date and time that specifies the end point for the range of log messages to return. This resource expresses this value in the number of seconds that have elapsed since the [UNIX epoch](https://en.wikipedia.org/wiki/Unix_time).
 * @param clusterName - Human-readable label that identifies the cluster that contains the collection for which you want to return the query logs from one online archive.
 * @param archiveOnly - Flag that indicates whether to download logs for queries against your online archive only or both your online archive and cluster.
 */
export const downloadGroupClusterOnlineArchiveQueryLogs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DownloadGroupClusterOnlineArchiveQueryLogsInput,
    outputSchema: DownloadGroupClusterOnlineArchiveQueryLogsOutput,
  }));
