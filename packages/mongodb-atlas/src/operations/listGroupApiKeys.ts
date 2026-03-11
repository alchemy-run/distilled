import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupApiKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "GET", path: "/api/atlas/v2/groups/{groupId}/apiKeys" }),
);
export type ListGroupApiKeysInput = typeof ListGroupApiKeysInput.Type;

// Output Schema
export const ListGroupApiKeysOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupApiKeysOutput = typeof ListGroupApiKeysOutput.Type;

// The operation
/**
 * Return All Organization API Keys Assigned to One Project
 *
 * Returns all organization API keys that you assigned to the specified project. Users with the Project Owner role in the project associated with the API key can use the organization API key to access the resources. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const listGroupApiKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListGroupApiKeysInput,
  outputSchema: ListGroupApiKeysOutput,
}));
