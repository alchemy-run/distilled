import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupBackupExportBucketInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    exportBucketId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/backup/exportBuckets/{exportBucketId}",
    }),
  );
export type UpdateGroupBackupExportBucketInput =
  typeof UpdateGroupBackupExportBucketInput.Type;

// Output Schema
export const UpdateGroupBackupExportBucketOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupBackupExportBucketOutput =
  typeof UpdateGroupBackupExportBucketOutput.Type;

// The operation
/**
 * Update One Export Bucket Private Networking Settings
 *
 * Updates the private networking settings for one snapshot export bucket in the specified project. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param exportBucketId - Unique 24-hexadecimal character string that identifies the snapshot export bucket.
 */
export const updateGroupBackupExportBucket =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateGroupBackupExportBucketInput,
    outputSchema: UpdateGroupBackupExportBucketOutput,
  }));
