import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupDbAccessHistoryProcessInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    hostname: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    authResult: Schema.optional(Schema.Boolean),
    end: Schema.optional(Schema.Number),
    ipAddress: Schema.optional(Schema.String),
    nLogs: Schema.optional(Schema.Number),
    start: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/dbAccessHistory/processes/{hostname}",
    }),
  );
export type GetGroupDbAccessHistoryProcessInput =
  typeof GetGroupDbAccessHistoryProcessInput.Type;

// Output Schema
export const GetGroupDbAccessHistoryProcessOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupDbAccessHistoryProcessOutput =
  typeof GetGroupDbAccessHistoryProcessOutput.Type;

// The operation
/**
 * Return Database Access History for One Cluster by Hostname
 *
 * Returns the access logs of one cluster identified by the cluster's hostname. Access logs contain a list of authentication requests made against your clusters. You can't use this feature on tenant-tier clusters (M0, M2, M5). To use this resource, the requesting Service Account or API Key must have the Project Monitoring Admin role, the Project Database Access Admin role, or the Project Cluster Log Viewer role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param authResult - Flag that indicates whether the response returns the successful authentication attempts only.
 * @param end - Date and time when to stop retrieving database history. If you specify **end**, you must also specify **start**. This parameter uses UNIX epoch time in milliseconds.
 * @param hostname - Fully qualified domain name or IP address of the MongoDB host that stores the log files that you want to download.
 * @param ipAddress - One Internet Protocol address that attempted to authenticate with the database.
 * @param nLogs - Maximum number of lines from the log to return.
 * @param start - Date and time when MongoDB Cloud begins retrieving database history. If you specify **start**, you must also specify **end**. This parameter uses UNIX epoch time in milliseconds.
 */
export const getGroupDbAccessHistoryProcess =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupDbAccessHistoryProcessInput,
    outputSchema: GetGroupDbAccessHistoryProcessOutput,
  }));
