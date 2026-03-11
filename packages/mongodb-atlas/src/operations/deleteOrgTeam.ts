import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteOrgTeamInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  teamId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/api/atlas/v2/orgs/{orgId}/teams/{teamId}",
  }),
);
export type DeleteOrgTeamInput = typeof DeleteOrgTeamInput.Type;

// Output Schema
export const DeleteOrgTeamOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteOrgTeamOutput = typeof DeleteOrgTeamOutput.Type;

// The operation
/**
 * Remove One Team from One Organization
 *
 * Removes one team specified using its unique 24-hexadecimal digit identifier from the organization specified using its unique 24-hexadecimal digit identifier. To use this resource, the requesting Service Account or API Key must have the Organization Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param teamId - Unique 24-hexadecimal digit string that identifies the team that you want to delete.
 */
export const deleteOrgTeam = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteOrgTeamInput,
  outputSchema: DeleteOrgTeamOutput,
}));
