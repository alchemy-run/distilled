import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupDbAccessHistoryClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
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
      path: "/api/atlas/v2/groups/{groupId}/dbAccessHistory/clusters/{clusterName}",
    }),
  );
export type GetGroupDbAccessHistoryClusterInput =
  typeof GetGroupDbAccessHistoryClusterInput.Type;

// Output Schema
export const GetGroupDbAccessHistoryClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupDbAccessHistoryClusterOutput =
  typeof GetGroupDbAccessHistoryClusterOutput.Type;

// The operation
/**
 * Return Database Access History for One Cluster by Cluster Name
 *
 * Returns the access logs of one cluster identified by the cluster's name. Access logs contain a list of authentication requests made against your cluster. You can't use this feature on tenant-tier clusters (M0, M2, M5). To use this resource, the requesting Service Account or API Key must have the Project Monitoring Admin role, the Project Database Access Admin role, or the Project Cluster Log Viewer role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param authResult - Flag that indicates whether the response returns the successful authentication attempts only.
 * @param clusterName - Human-readable label that identifies the cluster.
 * @param end - Date and time when to stop retrieving database history. If you specify **end**, you must also specify **start**. This parameter uses UNIX epoch time in milliseconds.
 * @param ipAddress - One Internet Protocol address that attempted to authenticate with the database.
 * @param nLogs - Maximum number of lines from the log to return.
 * @param start - Date and time when MongoDB Cloud begins retrieving database history. If you specify **start**, you must also specify **end**. This parameter uses UNIX epoch time in milliseconds.
 */
export const getGroupDbAccessHistoryCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupDbAccessHistoryClusterInput,
    outputSchema: GetGroupDbAccessHistoryClusterOutput,
  }));
