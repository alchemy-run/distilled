import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupStreamConnectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    tenantName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections",
    }),
  );
export type ListGroupStreamConnectionsInput =
  typeof ListGroupStreamConnectionsInput.Type;

// Output Schema
export const ListGroupStreamConnectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupStreamConnectionsOutput =
  typeof ListGroupStreamConnectionsOutput.Type;

// The operation
/**
 * Return All Connections of the Stream Workspaces
 *
 * Returns all connections of the stream workspace for the specified project. To use this resource, the requesting Service Account or API Key must have the Project Data Access roles, Project Owner role or Project Stream Processing Owner role.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param tenantName - Label that identifies the stream workspace.
 */
export const listGroupStreamConnections = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListGroupStreamConnectionsInput,
    outputSchema: ListGroupStreamConnectionsOutput,
  }),
);
