import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupEncryptionAtRestPrivateEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    cloudProvider: Schema.Literals(["AZURE", "AWS"]).pipe(T.PathParam()),
    endpointId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints/{endpointId}",
    }),
  );
export type GetGroupEncryptionAtRestPrivateEndpointInput =
  typeof GetGroupEncryptionAtRestPrivateEndpointInput.Type;

// Output Schema
export const GetGroupEncryptionAtRestPrivateEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupEncryptionAtRestPrivateEndpointOutput =
  typeof GetGroupEncryptionAtRestPrivateEndpointOutput.Type;

// The operation
/**
 * Return One Private Endpoint for Encryption at Rest Using Customer Key Management for One Cloud Provider in One Project
 *
 * Returns one private endpoint, identified by its ID, for encryption at rest using Customer Key Management.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param cloudProvider - Human-readable label that identifies the cloud provider of the private endpoint.
 * @param endpointId - Unique 24-hexadecimal digit string that identifies the private endpoint.
 */
export const getGroupEncryptionAtRestPrivateEndpoint =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupEncryptionAtRestPrivateEndpointInput,
    outputSchema: GetGroupEncryptionAtRestPrivateEndpointOutput,
  }));
