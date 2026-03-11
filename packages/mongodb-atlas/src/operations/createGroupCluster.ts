import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({ method: "POST", path: "/api/atlas/v2/groups/{groupId}/clusters" }),
  );
export type CreateGroupClusterInput = typeof CreateGroupClusterInput.Type;

// Output Schema
export const CreateGroupClusterOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupClusterOutput = typeof CreateGroupClusterOutput.Type;

// The operation
/**
 * Create One Cluster in One Project
 *
 * Creates one cluster in the specified project. Clusters contain a group of hosts that maintain the same data set. This resource can create clusters with asymmetrically-sized shards. Each project supports up to 25 database deployments. To use this resource, the requesting Service Account or API Key must have the Project Owner role or Project Cluster Creator role. This feature is not available for serverless clusters.
 * Please note that using an `instanceSize` of M2 or M5 will create a Flex cluster instead. Support for the `instanceSize` of M2 or M5 will be discontinued in January 2026. We recommend using the Create Flex Cluster API for such configurations moving forward. Deprecated versions: v2-{2024-08-05}, v2-{2023-02-01}, v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param Use-Effective-Instance-Fields - Controls how hardware specification fields are returned in the response after cluster creation. When set to true, returns the original client-specified values and provides separate effective fields showing current operational values. When false (default), hardware specification fields show current operational values directly. Primarily used for autoscaling compatibility.
 * @param Use-Effective-Fields-Replication-Specs - Controls how `replicationSpecs` fields are returned in the response. When set to `true`, stores the client's view of `replicationSpecs` and returns it in `replicationSpecs`, while the actual cluster state (including auto-scaled hardware and auto-added shards) is returned in `effectiveReplicationSpecs`. When `false` (default), `replicationSpecs` contains the actual cluster state.
 */
export const createGroupCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateGroupClusterInput,
  outputSchema: CreateGroupClusterOutput,
}));
