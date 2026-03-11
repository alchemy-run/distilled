import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupClusterQueryShapeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    queryShapeHash: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapes/{queryShapeHash}",
    }),
  );
export type UpdateGroupClusterQueryShapeInput =
  typeof UpdateGroupClusterQueryShapeInput.Type;

// Output Schema
export const UpdateGroupClusterQueryShapeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupClusterQueryShapeOutput =
  typeof UpdateGroupClusterQueryShapeOutput.Type;

// The operation
/**
 * Update Query Shape Rejection Status
 *
 * Updates the rejection status of a query shape. Use this endpoint to reject a query shape (preventing it from executing on the cluster) or to unreject a previously rejected query shape (allowing it to execute again). This operation is idempotent: rejecting an already rejected query shape or unrejecting an already unrejected query shape will return 200 OK.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies the cluster.
 * @param queryShapeHash - A SHA256 hash of a query shape, output by MongoDB commands like `$queryStats` and `$explain` or slow query logs.
 */
export const updateGroupClusterQueryShape =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateGroupClusterQueryShapeInput,
    outputSchema: UpdateGroupClusterQueryShapeOutput,
  }));
