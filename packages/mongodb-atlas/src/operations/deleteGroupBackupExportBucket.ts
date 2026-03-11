import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupBackupExportBucketInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    exportBucketId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/backup/exportBuckets/{exportBucketId}",
    }),
  );
export type DeleteGroupBackupExportBucketInput =
  typeof DeleteGroupBackupExportBucketInput.Type;

// Output Schema
export const DeleteGroupBackupExportBucketOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupBackupExportBucketOutput =
  typeof DeleteGroupBackupExportBucketOutput.Type;

// The operation
/**
 * Delete One Snapshot Export Bucket
 *
 * Deletes an Export Bucket. Auto export must be disabled on all clusters in this Project exporting to this Export Bucket before revoking access. To use this resource, the requesting Service Account or API Key must have the Project Backup Manager role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param exportBucketId - Unique 24-hexadecimal character string that identifies the Export Bucket.
 */
export const deleteGroupBackupExportBucket =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteGroupBackupExportBucketInput,
    outputSchema: DeleteGroupBackupExportBucketOutput,
  }));
