import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ToggleGroupPrivateEndpointRegionalModeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/privateEndpoint/regionalMode",
    }),
  );
export type ToggleGroupPrivateEndpointRegionalModeInput =
  typeof ToggleGroupPrivateEndpointRegionalModeInput.Type;

// Output Schema
export const ToggleGroupPrivateEndpointRegionalModeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ToggleGroupPrivateEndpointRegionalModeOutput =
  typeof ToggleGroupPrivateEndpointRegionalModeOutput.Type;

// The operation
/**
 * Toggle Regionalized Private Endpoint Status
 *
 * Enables or disables the ability to create multiple private endpoints per region in all cloud service providers in one project. The cloud service provider manages the private endpoints for the project. Connection strings to existing multi-region and global sharded clusters change when you enable this setting. You must update your applications to use the new connection strings. This might cause downtime. To use this resource, the requesting Service Account or API Key must have the Project Owner role and all clusters in the deployment must be sharded clusters. Once enabled, you cannot create replica sets.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const toggleGroupPrivateEndpointRegionalMode =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ToggleGroupPrivateEndpointRegionalModeInput,
    outputSchema: ToggleGroupPrivateEndpointRegionalModeOutput,
  }));
