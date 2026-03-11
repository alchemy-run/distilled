import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RemoveOrgTeamUserInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    orgId: Schema.String.pipe(T.PathParam()),
    teamId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/api/atlas/v2/orgs/{orgId}/teams/{teamId}:removeUser",
  }),
);
export type RemoveOrgTeamUserInput = typeof RemoveOrgTeamUserInput.Type;

// Output Schema
export const RemoveOrgTeamUserOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RemoveOrgTeamUserOutput = typeof RemoveOrgTeamUserOutput.Type;

// The operation
/**
 * Remove One MongoDB Cloud User from One Team
 *
 * Removes one MongoDB Cloud user from one team. You can remove an active user or a user that has not yet accepted the invitation to join the organization. To use this resource, the requesting Service Account or API Key must have the Organization Owner role.
 * **Note**: This resource cannot be used to remove a user invited via the deprecated Invite One MongoDB Cloud User to Join One Project endpoint.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param teamId - Unique 24-hexadecimal digit string that identifies the team to remove the MongoDB user from.
 */
export const removeOrgTeamUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RemoveOrgTeamUserInput,
  outputSchema: RemoveOrgTeamUserOutput,
}));
