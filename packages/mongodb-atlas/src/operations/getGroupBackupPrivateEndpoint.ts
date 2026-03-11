import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupBackupPrivateEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    cloudProvider: Schema.Literals(["AWS"]).pipe(T.PathParam()),
    endpointId: Schema.String.pipe(T.PathParam()),
    pretty: Schema.optional(Schema.Boolean),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints/{endpointId}",
    }),
  );
export type GetGroupBackupPrivateEndpointInput =
  typeof GetGroupBackupPrivateEndpointInput.Type;

// Output Schema
export const GetGroupBackupPrivateEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupBackupPrivateEndpointOutput =
  typeof GetGroupBackupPrivateEndpointOutput.Type;

// The operation
/**
 * Return One Object Storage Private Endpoint for Cloud Backups for One Cloud Provider in One Project
 *
 * Returns one private endpoint, identified by its ID, for object storage backup operations.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param cloudProvider - Human-readable label that identifies the cloud provider of the private endpoint.
 * @param endpointId - Unique 24-hexadecimal digit string that identifies the private endpoint.
 */
export const getGroupBackupPrivateEndpoint =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupBackupPrivateEndpointInput,
    outputSchema: GetGroupBackupPrivateEndpointOutput,
  }));
