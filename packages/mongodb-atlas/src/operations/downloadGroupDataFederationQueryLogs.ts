import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DownloadGroupDataFederationQueryLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    tenantName: Schema.String.pipe(T.PathParam()),
    endDate: Schema.optional(Schema.Number),
    startDate: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/queryLogs.gz",
    }),
  );
export type DownloadGroupDataFederationQueryLogsInput =
  typeof DownloadGroupDataFederationQueryLogsInput.Type;

// Output Schema
export const DownloadGroupDataFederationQueryLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DownloadGroupDataFederationQueryLogsOutput =
  typeof DownloadGroupDataFederationQueryLogsOutput.Type;

// The operation
/**
 * Download Query Logs for One Federated Database Instance
 *
 * Downloads the query logs for the specified federated database instance. To use this resource, the requesting Service Account or API Key must have the Project Owner or Project Data Access Read Write roles. The API does not support direct calls with the json response schema. You must request a gzip response schema using an accept header of the format: `Accept: application/vnd.atlas.YYYY-MM-DD+gzip`.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param endDate - Timestamp that specifies the end point for the range of log messages to download.  MongoDB Cloud expresses this timestamp in the number of seconds that have elapsed since the UNIX epoch.
 * @param startDate - Timestamp that specifies the starting point for the range of log messages to download. MongoDB Cloud expresses this timestamp in the number of seconds that have elapsed since the UNIX epoch.
 * @param tenantName - Human-readable label that identifies the federated database instance for which you want to download query logs.
 */
export const downloadGroupDataFederationQueryLogs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DownloadGroupDataFederationQueryLogsInput,
    outputSchema: DownloadGroupDataFederationQueryLogsOutput,
  }));
