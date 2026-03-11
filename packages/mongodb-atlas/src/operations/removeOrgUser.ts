import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RemoveOrgUserInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  userId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/api/atlas/v2/orgs/{orgId}/users/{userId}",
  }),
);
export type RemoveOrgUserInput = typeof RemoveOrgUserInput.Type;

// Output Schema
export const RemoveOrgUserOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RemoveOrgUserOutput = typeof RemoveOrgUserOutput.Type;

// The operation
/**
 * Remove One MongoDB Cloud User from One Organization
 *
 * Removes one MongoDB Cloud user in the specified organization. You can remove an active user or a user that has not yet accepted the invitation to join the organization. To use this resource, the requesting Service Account or API Key must have the Organization Owner role.
 * **Note**: This resource cannot be used to remove pending users invited via the deprecated Invite One MongoDB Cloud User to Join One Project endpoint.
 * **Note**: To remove pending or active users, use v2-{2025-02-19} or later. If using a deprecated version, only active users can be removed. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param userId - Unique 24-hexadecimal digit string that identifies the pending or active user in the organization. If you need to lookup a user's `userId` or verify a user's status in the organization, use the [Return All MongoDB Cloud Users in One Organization](#tag/MongoDB-Cloud-Users/operation/listOrganizationUsers) resource and filter by `username`.
 */
export const removeOrgUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RemoveOrgUserInput,
  outputSchema: RemoveOrgUserOutput,
}));
