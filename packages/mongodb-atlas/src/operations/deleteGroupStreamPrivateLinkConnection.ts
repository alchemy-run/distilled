import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupStreamPrivateLinkConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    connectionId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections/{connectionId}",
    }),
  );
export type DeleteGroupStreamPrivateLinkConnectionInput =
  typeof DeleteGroupStreamPrivateLinkConnectionInput.Type;

// Output Schema
export const DeleteGroupStreamPrivateLinkConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupStreamPrivateLinkConnectionOutput =
  typeof DeleteGroupStreamPrivateLinkConnectionOutput.Type;

// The operation
/**
 * Delete One Private Link Connection
 *
 * Deletes one Private Link in the specified project. To use this resource, the requesting Service Account or API Key must have the Project Owner or Project Stream Processing Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param connectionId - Unique ID that identifies the Private Link connection.
 */
export const deleteGroupStreamPrivateLinkConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteGroupStreamPrivateLinkConnectionInput,
    outputSchema: DeleteGroupStreamPrivateLinkConnectionOutput,
  }));
