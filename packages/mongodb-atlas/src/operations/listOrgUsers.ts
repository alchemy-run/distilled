import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrgUsersInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  username: Schema.optional(Schema.String),
  orgMembershipStatus: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2/orgs/{orgId}/users" }));
export type ListOrgUsersInput = typeof ListOrgUsersInput.Type;

// Output Schema
export const ListOrgUsersOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListOrgUsersOutput = typeof ListOrgUsersOutput.Type;

// The operation
/**
 * Return All MongoDB Cloud Users in One Organization
 *
 * Returns details about the pending and active MongoDB Cloud users associated with the specified organization. To use this resource, the requesting Service Account or API Key must have the Organization Member role.
 * **Note**: This resource cannot be used to view details about users invited via the deprecated Invite One MongoDB Cloud User to Join One Project endpoint.
 * **Note**: To return both pending and active users, use v2-{2025-02-19} or later. If using a deprecated version, only active users will be returned. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param username - Email address to filter users by. Not supported in deprecated versions.
 * @param orgMembershipStatus - Organization membership status to filter users by. If you exclude this parameter, this resource returns both pending and active users. Not supported in deprecated versions.
 */
export const listOrgUsers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrgUsersInput,
  outputSchema: ListOrgUsersOutput,
}));
