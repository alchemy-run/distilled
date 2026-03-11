import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupStreamPrivateLinkConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    connectionId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections/{connectionId}",
    }),
  );
export type GetGroupStreamPrivateLinkConnectionInput =
  typeof GetGroupStreamPrivateLinkConnectionInput.Type;

// Output Schema
export const GetGroupStreamPrivateLinkConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupStreamPrivateLinkConnectionOutput =
  typeof GetGroupStreamPrivateLinkConnectionOutput.Type;

// The operation
/**
 * Return One Private Link Connection
 *
 * Returns the details of one Private Link connection within the project. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param connectionId - Unique ID that identifies the Private Link connection.
 */
export const getGroupStreamPrivateLinkConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupStreamPrivateLinkConnectionInput,
    outputSchema: GetGroupStreamPrivateLinkConnectionOutput,
  }));
