import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupDatabaseUserCertsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    username: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    includeCount: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/databaseUsers/{username}/certs",
    }),
  );
export type ListGroupDatabaseUserCertsInput =
  typeof ListGroupDatabaseUserCertsInput.Type;

// Output Schema
export const ListGroupDatabaseUserCertsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupDatabaseUserCertsOutput =
  typeof ListGroupDatabaseUserCertsOutput.Type;

// The operation
/**
 * Return All X.509 Certificates Assigned to One Database User
 *
 * Returns all unexpired X.509 certificates for the specified MongoDB user. This MongoDB user belongs to one project. Atlas manages these certificates and the MongoDB user. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param username - Human-readable label that represents the MongoDB database user account whose certificates you want to return.
 */
export const listGroupDatabaseUserCerts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListGroupDatabaseUserCertsInput,
    outputSchema: ListGroupDatabaseUserCertsOutput,
  }),
);
