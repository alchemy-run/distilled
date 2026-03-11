import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupClusterSearchDeploymentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment",
    }),
  );
export type CreateGroupClusterSearchDeploymentInput =
  typeof CreateGroupClusterSearchDeploymentInput.Type;

// Output Schema
export const CreateGroupClusterSearchDeploymentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupClusterSearchDeploymentOutput =
  typeof CreateGroupClusterSearchDeploymentOutput.Type;

// The operation
/**
 * Create Search Nodes
 *
 * Creates Search Nodes for the specified cluster.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Label that identifies the cluster to create Search Nodes for.
 */
export const createGroupClusterSearchDeployment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateGroupClusterSearchDeploymentInput,
    outputSchema: CreateGroupClusterSearchDeploymentOutput,
  }));
