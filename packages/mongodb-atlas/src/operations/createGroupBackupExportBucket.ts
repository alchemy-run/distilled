import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupBackupExportBucketInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/backup/exportBuckets",
    }),
  );
export type CreateGroupBackupExportBucketInput =
  typeof CreateGroupBackupExportBucketInput.Type;

// Output Schema
export const CreateGroupBackupExportBucketOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupBackupExportBucketOutput =
  typeof CreateGroupBackupExportBucketOutput.Type;

// The operation
/**
 * Create One Snapshot Export Bucket
 *
 * Creates a Snapshot Export Bucket for an AWS S3 Bucket, Azure Blob Storage Container, or Google Cloud Storage Bucket. Once created, an snapshots can be exported to the Export Bucket and its referenced AWS S3 Bucket, Azure Blob Storage Container, or Google Cloud Storage Bucket. To use this resource, the requesting Service Account or API Key must have the Project Owner role. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const createGroupBackupExportBucket =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateGroupBackupExportBucketInput,
    outputSchema: CreateGroupBackupExportBucketOutput,
  }));
