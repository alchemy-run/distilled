import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupUserInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  userId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/api/atlas/v2/groups/{groupId}/users/{userId}",
  }),
);
export type GetGroupUserInput = typeof GetGroupUserInput.Type;

// Output Schema
export const GetGroupUserOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupUserOutput = typeof GetGroupUserOutput.Type;

// The operation
/**
 * Return One MongoDB Cloud User in One Project
 *
 * Returns information about the specified MongoDB Cloud user within the context of the specified project. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 * **Note**: You can only use this resource to fetch information about MongoDB Cloud human users. To return information about an API Key, use the [Return One Organization API Key](#tag/Programmatic-API-Keys/operation/getApiKey) endpoint.
 * **Note**: This resource does not return information about pending users invited via the deprecated [Invite One MongoDB Cloud User to Join One Project](#tag/Projects/operation/createProjectInvitation) endpoint.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param userId - Unique 24-hexadecimal digit string that identifies the pending or active user in the project. If you need to lookup a user's `userId` or verify a user's status in the organization, use the Return All MongoDB Cloud Users in One Project resource and filter by `username`.
 */
export const getGroupUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetGroupUserInput,
  outputSchema: GetGroupUserOutput,
}));
