import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupBackupPrivateEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    cloudProvider: Schema.Literals(["AWS"]).pipe(T.PathParam()),
    pretty: Schema.optional(Schema.Boolean),
    envelope: Schema.optional(Schema.Boolean),
    includeCount: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints",
    }),
  );
export type ListGroupBackupPrivateEndpointsInput =
  typeof ListGroupBackupPrivateEndpointsInput.Type;

// Output Schema
export const ListGroupBackupPrivateEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupBackupPrivateEndpointsOutput =
  typeof ListGroupBackupPrivateEndpointsOutput.Type;

// The operation
/**
 * Return Object Storage Private Endpoints for Cloud Backups for One Cloud Provider in One Project
 *
 * Returns the private endpoints of the specified cloud provider for object storage backup operations.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param cloudProvider - Human-readable label that identifies the cloud provider for the private endpoints to return.
 */
export const listGroupBackupPrivateEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupBackupPrivateEndpointsInput,
    outputSchema: ListGroupBackupPrivateEndpointsOutput,
  }));
