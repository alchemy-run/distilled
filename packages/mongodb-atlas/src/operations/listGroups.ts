import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  envelope: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2/groups" }));
export type ListGroupsInput = typeof ListGroupsInput.Type;

// Output Schema
export const ListGroupsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupsOutput = typeof ListGroupsOutput.Type;

// The operation
/**
 * Return All Projects
 *
 * Returns details about all projects. Projects group clusters into logical collections that support an application environment, workload, or both. Each project can have its own users, teams, security, tags, and alert settings. To use this resource, the requesting Service Account or API Key must have the Organization Read Only role or higher.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const listGroups = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListGroupsInput,
  outputSchema: ListGroupsOutput,
}));
