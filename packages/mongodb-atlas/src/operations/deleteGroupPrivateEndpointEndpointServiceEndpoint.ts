import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupPrivateEndpointEndpointServiceEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    cloudProvider: Schema.Literals(["AWS", "AZURE", "GCP"]).pipe(T.PathParam()),
    endpointId: Schema.String.pipe(T.PathParam()),
    endpointServiceId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint/{endpointId}",
    }),
  );
export type DeleteGroupPrivateEndpointEndpointServiceEndpointInput =
  typeof DeleteGroupPrivateEndpointEndpointServiceEndpointInput.Type;

// Output Schema
export const DeleteGroupPrivateEndpointEndpointServiceEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupPrivateEndpointEndpointServiceEndpointOutput =
  typeof DeleteGroupPrivateEndpointEndpointServiceEndpointOutput.Type;

// The operation
/**
 * Remove One Private Endpoint for One Provider
 *
 * Removes one private endpoint from the specified project and private endpoint service, as managed by the specified cloud service provider. When the last private endpoint is removed from a given private endpoint service, that private endpoint service is also removed. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param cloudProvider - Cloud service provider that manages this private endpoint.
 * @param endpointId - Unique string that identifies the private endpoint you want to delete. The format of the `endpointId` parameter differs for AWS and Azure. You must URL encode the `endpointId` for Azure private endpoints.
 * @param endpointServiceId - Unique 24-hexadecimal digit string that identifies the private endpoint service from which you want to delete a private endpoint.
 */
export const deleteGroupPrivateEndpointEndpointServiceEndpoint =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteGroupPrivateEndpointEndpointServiceEndpointInput,
    outputSchema: DeleteGroupPrivateEndpointEndpointServiceEndpointOutput,
  }));
