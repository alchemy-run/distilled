import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupFlexClusterBackupSnapshotInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    snapshotId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/snapshots/{snapshotId}",
    }),
  );
export type GetGroupFlexClusterBackupSnapshotInput =
  typeof GetGroupFlexClusterBackupSnapshotInput.Type;

// Output Schema
export const GetGroupFlexClusterBackupSnapshotOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupFlexClusterBackupSnapshotOutput =
  typeof GetGroupFlexClusterBackupSnapshotOutput.Type;

// The operation
/**
 * Return One Snapshot for One Flex Cluster
 *
 * Returns one snapshot of one flex cluster from the specified project. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param name - Human-readable label that identifies the flex cluster.
 * @param snapshotId - Unique 24-hexadecimal digit string that identifies the desired snapshot.
 */
export const getGroupFlexClusterBackupSnapshot =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupFlexClusterBackupSnapshotInput,
    outputSchema: GetGroupFlexClusterBackupSnapshotOutput,
  }));
