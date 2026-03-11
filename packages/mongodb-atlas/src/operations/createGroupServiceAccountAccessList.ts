import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupServiceAccountAccessListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clientId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    includeCount: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/accessList",
    }),
  );
export type CreateGroupServiceAccountAccessListInput =
  typeof CreateGroupServiceAccountAccessListInput.Type;

// Output Schema
export const CreateGroupServiceAccountAccessListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupServiceAccountAccessListOutput =
  typeof CreateGroupServiceAccountAccessListOutput.Type;

// The operation
/**
 * Add Access List Entries for One Project Service Account
 *
 * Add Access List Entries for the specified Service Account for the project. Resources require all API requests to originate from IP addresses on the API access list. To use this resource, the requesting Service Account or API Key must have the Project Owner role or Project Access Manager role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clientId - The Client ID of the Service Account.
 */
export const createGroupServiceAccountAccessList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateGroupServiceAccountAccessListInput,
    outputSchema: CreateGroupServiceAccountAccessListOutput,
  }));
