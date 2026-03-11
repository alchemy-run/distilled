import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupClusterBackupScheduleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/schedule",
    }),
  );
export type DeleteGroupClusterBackupScheduleInput =
  typeof DeleteGroupClusterBackupScheduleInput.Type;

// Output Schema
export const DeleteGroupClusterBackupScheduleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupClusterBackupScheduleOutput =
  typeof DeleteGroupClusterBackupScheduleOutput.Type;

// The operation
/**
 * Remove All Cloud Backup Schedules
 *
 * Removes all cloud backup schedules for the specified cluster. This schedule defines when MongoDB Cloud takes scheduled snapshots and how long it stores those snapshots. To use this resource, the requesting Service Account or API Key must have the Project Atlas Admin role. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 */
export const deleteGroupClusterBackupSchedule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteGroupClusterBackupScheduleInput,
    outputSchema: DeleteGroupClusterBackupScheduleOutput,
  }));
