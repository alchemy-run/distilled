import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TakeGroupClusterBackupSnapshotsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots",
    }),
  );
export type TakeGroupClusterBackupSnapshotsInput =
  typeof TakeGroupClusterBackupSnapshotsInput.Type;

// Output Schema
export const TakeGroupClusterBackupSnapshotsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TakeGroupClusterBackupSnapshotsOutput =
  typeof TakeGroupClusterBackupSnapshotsOutput.Type;

// The operation
/**
 * Take One On-Demand Snapshot
 *
 * Takes one on-demand snapshot for the specified cluster. Atlas takes on-demand snapshots immediately and scheduled snapshots at regular intervals. If an on-demand snapshot with a status of `queued` or `inProgress` exists, before taking another snapshot, wait until Atlas completes processing the previously taken on-demand snapshot.
 * To use this resource, the requesting Service Account or API Key must have the Project Backup Manager role or Project Backup Creator role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 */
export const takeGroupClusterBackupSnapshots =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TakeGroupClusterBackupSnapshotsInput,
    outputSchema: TakeGroupClusterBackupSnapshotsOutput,
  }));
