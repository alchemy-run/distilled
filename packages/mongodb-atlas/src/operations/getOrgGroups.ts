import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgGroupsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2/orgs/{orgId}/groups" }));
export type GetOrgGroupsInput = typeof GetOrgGroupsInput.Type;

// Output Schema
export const GetOrgGroupsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgGroupsOutput = typeof GetOrgGroupsOutput.Type;

// The operation
/**
 * Return All Projects in One Organization
 *
 * Returns multiple projects in the specified organization. Each organization can have multiple projects. Use projects to:
 * - Isolate different environments, such as development, test, or production environments, from each other.
 * - Associate different MongoDB Cloud users or teams with different environments, or give different permission to MongoDB Cloud users in different environments.
 * - Maintain separate cluster security configurations.
 * - Create different alert settings.
 * To use this resource, the requesting Service Account or API Key must have the Organization Member role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param name - Human-readable label of the project to use to filter the returned list. Performs a case-insensitive search for a project within the organization which is prefixed by the specified name.
 */
export const getOrgGroups = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrgGroupsInput,
  outputSchema: GetOrgGroupsOutput,
}));
