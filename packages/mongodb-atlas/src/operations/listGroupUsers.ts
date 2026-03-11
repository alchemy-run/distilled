import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupUsersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
  flattenTeams: Schema.optional(Schema.Boolean),
  includeOrgUsers: Schema.optional(Schema.Boolean),
  orgMembershipStatus: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "GET", path: "/api/atlas/v2/groups/{groupId}/users" }),
);
export type ListGroupUsersInput = typeof ListGroupUsersInput.Type;

// Output Schema
export const ListGroupUsersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupUsersOutput = typeof ListGroupUsersOutput.Type;

// The operation
/**
 * Return All MongoDB Cloud Users in One Project
 *
 * Returns details about the pending and active MongoDB Cloud users associated with the specified project. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 * **Note**: This resource cannot be used to view details about users invited via the deprecated Invite One MongoDB Cloud User to Join One Project endpoint.
 * **Note**: To return both pending and active users, use v2-{2025-02-19} or later. If using a deprecated version, only active users will be returned. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param flattenTeams - Flag that indicates whether the returned list should include users who belong to a team with a role in this project. You might not have assigned the individual users a role in this project. If `"flattenTeams" : false`, this resource returns only users with a role in the project.  If `"flattenTeams" : true`, this resource returns both users with roles in the project and users who belong to teams with roles in the project.
 * @param includeOrgUsers - Flag that indicates whether the returned list should include users with implicit access to the project, the Organization Owner or Organization Read Only role. You might not have assigned the individual users a role in this project. If `"includeOrgUsers": false`, this resource returns only users with a role in the project. If `"includeOrgUsers": true`, this resource returns both users with roles in the project and users who have implicit access to the project through their organization role.
 * @param orgMembershipStatus - Flag that indicates whether to filter the returned list by users organization membership status. If you exclude this parameter, this resource returns both pending and active users. Not supported in deprecated versions.
 * @param username - Email address to filter users by. Not supported in deprecated versions.
 */
export const listGroupUsers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListGroupUsersInput,
  outputSchema: ListGroupUsersOutput,
}));
