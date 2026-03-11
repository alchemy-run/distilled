import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1DatabasesByDatabaseIdBackupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    databaseId: Schema.String.pipe(T.PathParam()),
    limit: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/databases/{databaseId}/backups" }),
  );
export type GetV1DatabasesByDatabaseIdBackupsInput =
  typeof GetV1DatabasesByDatabaseIdBackupsInput.Type;

// Output Schema
export const GetV1DatabasesByDatabaseIdBackupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        backupType: Schema.Literals(["full", "incremental"]),
        createdAt: Schema.String,
        size: Schema.optional(Schema.Number),
        status: Schema.Literals(["running", "completed", "failed", "unknown"]),
        type: Schema.optional(Schema.String),
      }),
    ),
    meta: Schema.Struct({
      backupRetentionDays: Schema.Number,
    }),
    pagination: Schema.Struct({
      hasMore: Schema.Boolean,
      limit: Schema.Unknown,
    }),
  });
export type GetV1DatabasesByDatabaseIdBackupsOutput =
  typeof GetV1DatabasesByDatabaseIdBackupsOutput.Type;

// The operation
/**
 * Get list of backups
 *
 * Returns backups for the specified database.
 */
export const getV1DatabasesByDatabaseIdBackups =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1DatabasesByDatabaseIdBackupsInput,
    outputSchema: GetV1DatabasesByDatabaseIdBackupsOutput,
  }));
