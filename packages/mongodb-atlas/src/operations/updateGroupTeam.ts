import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupTeamInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  teamId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/api/atlas/v2/groups/{groupId}/teams/{teamId}",
  }),
);
export type UpdateGroupTeamInput = typeof UpdateGroupTeamInput.Type;

// Output Schema
export const UpdateGroupTeamOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupTeamOutput = typeof UpdateGroupTeamOutput.Type;

// The operation
/**
 * Update Team Roles in One Project
 *
 * Updates the project roles assigned to the specified team. You can grant team roles for specific projects and grant project access roles to users in the team. All members of the team share the same project access. To use this resource, the requesting Service Account or API Key must have the Project Owner role or Project Access Manager role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param teamId - Unique 24-hexadecimal digit string that identifies the team for which you want to update roles.
 */
export const updateGroupTeam = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateGroupTeamInput,
  outputSchema: UpdateGroupTeamOutput,
}));
