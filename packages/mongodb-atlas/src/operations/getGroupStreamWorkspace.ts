import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupStreamWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    tenantName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    includeConnections: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/streams/{tenantName}",
    }),
  );
export type GetGroupStreamWorkspaceInput =
  typeof GetGroupStreamWorkspaceInput.Type;

// Output Schema
export const GetGroupStreamWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupStreamWorkspaceOutput =
  typeof GetGroupStreamWorkspaceOutput.Type;

// The operation
/**
 * Return One Stream Workspace
 *
 * Returns the details of one stream workspace within the specified project. To use this resource, the requesting Service Account or API Key must have the Project Data Access roles, Project Owner role or Project Stream Processing Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param tenantName - Label that identifies the stream workspace to return.
 * @param includeConnections - Flag to indicate whether connections information should be included in the stream workspace.
 */
export const getGroupStreamWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupStreamWorkspaceInput,
    outputSchema: GetGroupStreamWorkspaceOutput,
  }),
);
