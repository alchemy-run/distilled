import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupClusterProcessArgsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/processArgs",
    }),
  );
export type UpdateGroupClusterProcessArgsInput =
  typeof UpdateGroupClusterProcessArgsInput.Type;

// Output Schema
export const UpdateGroupClusterProcessArgsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupClusterProcessArgsOutput =
  typeof UpdateGroupClusterProcessArgsOutput.Type;

// The operation
/**
 * Update Advanced Configuration Options for One Cluster
 *
 * Updates the advanced configuration details for one cluster in the specified project. Clusters contain a group of hosts that maintain the same data set. Advanced configuration details include the read/write concern, index and oplog limits, and other database settings. To use this resource, the requesting Service Account or API Key must have the Project Cluster Manager role. This feature isn't available for `M0` free clusters, `M2` and `M5` shared-tier clusters, flex clusters, or serverless clusters. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clusterName - Human-readable label that identifies the cluster.
 */
export const updateGroupClusterProcessArgs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateGroupClusterProcessArgsInput,
    outputSchema: UpdateGroupClusterProcessArgsOutput,
  }));
