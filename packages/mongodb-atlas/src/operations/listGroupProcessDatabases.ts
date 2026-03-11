import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupProcessDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    processId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    includeCount: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/processes/{processId}/databases",
    }),
  );
export type ListGroupProcessDatabasesInput =
  typeof ListGroupProcessDatabasesInput.Type;

// Output Schema
export const ListGroupProcessDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupProcessDatabasesOutput =
  typeof ListGroupProcessDatabasesOutput.Type;

// The operation
/**
 * Return Available Databases for One MongoDB Process
 *
 * Returns the list of databases running on the specified host for the specified project. `M0` free clusters, `M2`, `M5`, serverless, and Flex clusters have some operational limits. The MongoDB Cloud process must be a `mongod`. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param processId - Combination of hostname and Internet Assigned Numbers Authority (IANA) port that serves the MongoDB process. The host must be the hostname, fully qualified domain name (FQDN), or Internet Protocol address (IPv4 or IPv6) of the host that runs the MongoDB process (`mongod`). The port must be the IANA port on which the MongoDB process listens for requests.
 */
export const listGroupProcessDatabases = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListGroupProcessDatabasesInput,
    outputSchema: ListGroupProcessDatabasesOutput,
  }),
);
