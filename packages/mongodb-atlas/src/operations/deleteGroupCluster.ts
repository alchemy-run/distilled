import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    retainBackups: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}",
    }),
  );
export type DeleteGroupClusterInput = typeof DeleteGroupClusterInput.Type;

// Output Schema
export const DeleteGroupClusterOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupClusterOutput = typeof DeleteGroupClusterOutput.Type;

// The operation
/**
 * Remove One Cluster from One Project
 *
 * Removes one cluster from the specified project. The cluster must have termination protection disabled in order to be deleted. To use this resource, the requesting Service Account or API Key must have the Project Owner role. This feature is not available for serverless clusters.
 * This endpoint can also be used on Flex clusters that were created using the [Create Cluster](https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Clusters/operation/createCluster) endpoint or former M2/M5 clusters that have been migrated to Flex clusters until January 2026. Please use the Delete Flex Cluster endpoint for Flex clusters instead. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 * @param retainBackups - Flag that indicates whether to retain backup snapshots for the deleted dedicated cluster.
 */
export const deleteGroupCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteGroupClusterInput,
  outputSchema: DeleteGroupClusterOutput,
}));
