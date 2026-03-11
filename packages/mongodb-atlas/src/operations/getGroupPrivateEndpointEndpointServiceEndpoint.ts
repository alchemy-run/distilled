import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupPrivateEndpointEndpointServiceEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    cloudProvider: Schema.Literals(["AWS", "AZURE", "GCP"]).pipe(T.PathParam()),
    endpointId: Schema.String.pipe(T.PathParam()),
    endpointServiceId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint/{endpointId}",
    }),
  );
export type GetGroupPrivateEndpointEndpointServiceEndpointInput =
  typeof GetGroupPrivateEndpointEndpointServiceEndpointInput.Type;

// Output Schema
export const GetGroupPrivateEndpointEndpointServiceEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupPrivateEndpointEndpointServiceEndpointOutput =
  typeof GetGroupPrivateEndpointEndpointServiceEndpointOutput.Type;

// The operation
/**
 * Return One Private Endpoint for One Provider
 *
 * Returns the connection state of the specified private endpoint. The private endpoint service manages this private endpoint which belongs to one project hosted from one cloud service provider. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param cloudProvider - Cloud service provider that manages this private endpoint.
 * @param endpointId - Unique string that identifies the private endpoint you want to return. The format of the `endpointId` parameter differs for AWS and Azure. You must URL encode the `endpointId` for Azure private endpoints.
 * @param endpointServiceId - Unique 24-hexadecimal digit string that identifies the private endpoint service for which you want to return a private endpoint.
 */
export const getGroupPrivateEndpointEndpointServiceEndpoint =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupPrivateEndpointEndpointServiceEndpointInput,
    outputSchema: GetGroupPrivateEndpointEndpointServiceEndpointOutput,
  }));
