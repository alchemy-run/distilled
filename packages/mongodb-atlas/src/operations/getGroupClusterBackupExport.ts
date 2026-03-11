import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupClusterBackupExportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    exportId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/exports/{exportId}",
    }),
  );
export type GetGroupClusterBackupExportInput =
  typeof GetGroupClusterBackupExportInput.Type;

// Output Schema
export const GetGroupClusterBackupExportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupClusterBackupExportOutput =
  typeof GetGroupClusterBackupExportOutput.Type;

// The operation
/**
 * Return One Snapshot Export Job
 *
 * Returns one Cloud Backup Snapshot Export Job associated with the specified Atlas cluster. To use this resource, the requesting Service Account or API Key must have the Project Atlas Admin role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 * @param exportId - Unique 24-hexadecimal character string that identifies the Export Job.
 */
export const getGroupClusterBackupExport = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupClusterBackupExportInput,
    outputSchema: GetGroupClusterBackupExportOutput,
  }),
);
