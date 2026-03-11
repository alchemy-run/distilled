import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrgTeamsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  includeCount: Schema.optional(Schema.Boolean),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2/orgs/{orgId}/teams" }));
export type ListOrgTeamsInput = typeof ListOrgTeamsInput.Type;

// Output Schema
export const ListOrgTeamsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListOrgTeamsOutput = typeof ListOrgTeamsOutput.Type;

// The operation
/**
 * Return All Teams in One Organization
 *
 * Returns all teams that belong to the specified organization. Teams enable you to grant project access roles to MongoDB Cloud users. MongoDB Cloud only returns teams for which you have access. To use this resource, the requesting Service Account or API Key must have the Organization Member role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const listOrgTeams = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrgTeamsInput,
  outputSchema: ListOrgTeamsOutput,
}));
