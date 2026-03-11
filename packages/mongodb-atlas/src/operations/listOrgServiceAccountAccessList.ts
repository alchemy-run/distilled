import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrgServiceAccountAccessListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    clientId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    includeCount: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/accessList",
    }),
  );
export type ListOrgServiceAccountAccessListInput =
  typeof ListOrgServiceAccountAccessListInput.Type;

// Output Schema
export const ListOrgServiceAccountAccessListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListOrgServiceAccountAccessListOutput =
  typeof ListOrgServiceAccountAccessListOutput.Type;

// The operation
/**
 * Return All Access List Entries for One Organization Service Account
 *
 * Returns all access list entries that you configured for the specified Service Account for the organization.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clientId - The Client ID of the Service Account.
 */
export const listOrgServiceAccountAccessList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListOrgServiceAccountAccessListInput,
    outputSchema: ListOrgServiceAccountAccessListOutput,
  }));
