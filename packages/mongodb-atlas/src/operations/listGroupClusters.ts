import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupClustersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    includeCount: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
    includeDeletedWithRetainedBackups: Schema.optional(Schema.Boolean),
  },
).pipe(
  T.Http({ method: "GET", path: "/api/atlas/v2/groups/{groupId}/clusters" }),
);
export type ListGroupClustersInput = typeof ListGroupClustersInput.Type;

// Output Schema
export const ListGroupClustersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupClustersOutput = typeof ListGroupClustersOutput.Type;

// The operation
/**
 * Return All Clusters in One Project
 *
 * Returns the details for all clusters in the specific project to which you have access. Clusters contain a group of hosts that maintain the same data set. The response includes clusters with asymmetrically-sized shards. To use this resource, the requesting Service Account or API Key must have the Project Read Only role. This feature is not  available for serverless clusters.
 * This endpoint can also be used on Flex clusters that were created using the [Create Cluster](https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Clusters/operation/createCluster) endpoint or former M2/M5 clusters that have been migrated to Flex clusters until January 2026. Please use the List Flex Clusters endpoint for Flex clusters instead. Deprecated versions: v2-{2023-02-01}, v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param includeDeletedWithRetainedBackups - Flag that indicates whether to return Clusters with retain backups.
 * @param Use-Effective-Instance-Fields - Controls how hardware specification fields are returned in the response. When set to true, returns the original client-specified values and provides separate effective fields showing current operational values. When false (default), hardware specification fields show current operational values directly. Primarily used for autoscaling compatibility.
 */
export const listGroupClusters = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListGroupClustersInput,
  outputSchema: ListGroupClustersOutput,
}));
