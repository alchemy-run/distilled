import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupClusterStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/status",
    }),
  );
export type GetGroupClusterStatusInput = typeof GetGroupClusterStatusInput.Type;

// Output Schema
export const GetGroupClusterStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupClusterStatusOutput =
  typeof GetGroupClusterStatusOutput.Type;

// The operation
/**
 * Return Status of All Cluster Operations
 *
 * Returns the status of all changes that you made to the specified cluster in the specified project. Use this resource to check the progress MongoDB Cloud has made in processing your changes. The response does not include the deployment of new dedicated clusters. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clusterName - Human-readable label that identifies the cluster.
 */
export const getGroupClusterStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupClusterStatusInput,
    outputSchema: GetGroupClusterStatusOutput,
  }),
);
