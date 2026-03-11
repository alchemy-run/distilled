import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupPrivateEndpointEndpointServiceEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    cloudProvider: Schema.Literals(["AWS", "AZURE", "GCP"]).pipe(T.PathParam()),
    endpointServiceId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint",
    }),
  );
export type CreateGroupPrivateEndpointEndpointServiceEndpointInput =
  typeof CreateGroupPrivateEndpointEndpointServiceEndpointInput.Type;

// Output Schema
export const CreateGroupPrivateEndpointEndpointServiceEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupPrivateEndpointEndpointServiceEndpointOutput =
  typeof CreateGroupPrivateEndpointEndpointServiceEndpointOutput.Type;

// The operation
/**
 * Create One Private Endpoint for One Provider
 *
 * Creates one private endpoint for the specified cloud service provider. This cloud service provider manages the private endpoint service, which in turn manages the private endpoints for the project. To use this resource, the requesting Service Account or API Key must have the Project Owner role. To learn more about considerations, limitations, and prerequisites, see the MongoDB documentation for setting up a private endpoint.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param cloudProvider - Cloud service provider that manages this private endpoint.
 * @param endpointServiceId - Unique 24-hexadecimal digit string that identifies the private endpoint service for which you want to create a private endpoint.
 */
export const createGroupPrivateEndpointEndpointServiceEndpoint =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateGroupPrivateEndpointEndpointServiceEndpointInput,
    outputSchema: CreateGroupPrivateEndpointEndpointServiceEndpointOutput,
  }));
