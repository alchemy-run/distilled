import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupPrivateEndpointEndpointServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/privateEndpoint/endpointService",
    }),
  );
export type CreateGroupPrivateEndpointEndpointServiceInput =
  typeof CreateGroupPrivateEndpointEndpointServiceInput.Type;

// Output Schema
export const CreateGroupPrivateEndpointEndpointServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupPrivateEndpointEndpointServiceOutput =
  typeof CreateGroupPrivateEndpointEndpointServiceOutput.Type;

// The operation
/**
 * Create One Private Endpoint Service for One Provider
 *
 * Creates one private endpoint service for the specified cloud service provider. This cloud service provider manages the private endpoint service for the project. When you create a private endpoint service, MongoDB Cloud creates a network container in the project for the cloud provider for which you create the private endpoint service if one doesn't already exist. To learn more about private endpoint terminology in MongoDB Cloud, see Private Endpoint Concepts. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const createGroupPrivateEndpointEndpointService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateGroupPrivateEndpointEndpointServiceInput,
    outputSchema: CreateGroupPrivateEndpointEndpointServiceOutput,
  }));
