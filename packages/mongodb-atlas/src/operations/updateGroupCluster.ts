import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}",
    }),
  );
export type UpdateGroupClusterInput = typeof UpdateGroupClusterInput.Type;

// Output Schema
export const UpdateGroupClusterOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupClusterOutput = typeof UpdateGroupClusterOutput.Type;

// The operation
/**
 * Update One Cluster in One Project
 *
 * Updates the details for one cluster in the specified project. Clusters contain a group of hosts that maintain the same data set. This resource can update clusters with asymmetrically-sized shards. To update a cluster's termination protection, the requesting Service Account or API Key must have the Project Owner role. For all other updates, the requesting Service Account or API Key must have the Project Cluster Manager role or the Project Replica Set Manager role. You can't modify a paused cluster (`paused : true`). You must call this endpoint to set `paused : false`. After this endpoint responds with `paused : false`, you can call it again with the changes you want to make to the cluster. This feature is not available for serverless clusters. Deprecated versions: v2-{2024-08-05}, v2-{2023-02-01}, v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clusterName - Human-readable label that identifies the cluster.
 * @param Use-Effective-Instance-Fields - Controls how hardware specification fields are returned in the response after cluster updates. When set to true, returns the original client-specified values and provides separate effective fields showing current operational values. When false (default), hardware specification fields show current operational values directly. Note: When using this header with autoscaling enabled, MongoDB ignores `replicationSpecs` changes during updates. To intentionally override the `replicationSpecs`, disable this header.
 * @param Use-Effective-Fields-Replication-Specs - Controls how `replicationSpecs` fields are returned in the response. When set to `true`, stores the client's view of `replicationSpecs` and returns it in `replicationSpecs`, while the actual cluster state (including auto-scaled hardware and auto-added shards) is returned in `effectiveReplicationSpecs`. When `false` (default), `replicationSpecs` contains the actual cluster state.
 */
export const updateGroupCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateGroupClusterInput,
  outputSchema: UpdateGroupClusterOutput,
}));
