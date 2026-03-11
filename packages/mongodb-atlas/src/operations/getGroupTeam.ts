import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupTeamInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  teamId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/api/atlas/v2/groups/{groupId}/teams/{teamId}",
  }),
);
export type GetGroupTeamInput = typeof GetGroupTeamInput.Type;

// Output Schema
export const GetGroupTeamOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupTeamOutput = typeof GetGroupTeamOutput.Type;

// The operation
/**
 * Return One Team in One Project
 *
 * Returns one team to which the authenticated user has access in the project specified using its unique 24-hexadecimal digit identifier. All members of the team share the same project access. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param teamId - Unique 24-hexadecimal digit string that identifies the team for which you want to get.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const getGroupTeam = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetGroupTeamInput,
  outputSchema: GetGroupTeamOutput,
}));
