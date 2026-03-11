import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DownloadGroupStreamOperationalLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    tenantName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    endDate: Schema.optional(Schema.Number),
    startDate: Schema.optional(Schema.Number),
    spName: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/streams/{tenantName}:downloadOperationalLogs",
    }),
  );
export type DownloadGroupStreamOperationalLogsInput =
  typeof DownloadGroupStreamOperationalLogsInput.Type;

// Output Schema
export const DownloadGroupStreamOperationalLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DownloadGroupStreamOperationalLogsOutput =
  typeof DownloadGroupStreamOperationalLogsOutput.Type;

// The operation
/**
 * Download Operational Logs for One Atlas Stream Processing Workspace
 *
 * Downloads the operational logs for the specified Atlas Streams Processing workspace or stream processor. By default, logs cover periods of 30 days. To use this resource, the requesting Service Account or API Key must have the Project Data Access roles, Project Owner role or Project Stream Processing Owner role. The API does not support direct calls with the json response schema. You must request a gzip response schema using an accept header of the format: "Accept: application/vnd.atlas.2025-03-12+gzip".
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param endDate - Timestamp that specifies the end point for the range of log messages to download.  MongoDB Cloud expresses this timestamp in the number of seconds that have elapsed since the UNIX epoch.
 * @param startDate - Timestamp that specifies the starting point for the range of log messages to download. MongoDB Cloud expresses this timestamp in the number of seconds that have elapsed since the UNIX epoch.
 * @param spName - Name of the stream processor to download logs for. An empty string will download logs for all stream processors in the workspace.
 * @param tenantName - Label that identifies the stream workspace.
 */
export const downloadGroupStreamOperationalLogs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DownloadGroupStreamOperationalLogsInput,
    outputSchema: DownloadGroupStreamOperationalLogsOutput,
  }));
