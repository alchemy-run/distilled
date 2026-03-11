import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrgServiceAccountsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/orgs/{orgId}/serviceAccounts",
    }),
  );
export type ListOrgServiceAccountsInput =
  typeof ListOrgServiceAccountsInput.Type;

// Output Schema
export const ListOrgServiceAccountsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListOrgServiceAccountsOutput =
  typeof ListOrgServiceAccountsOutput.Type;

// The operation
/**
 * Return All Organization Service Accounts
 *
 * Returns all Service Accounts for the specified Organization.
 *
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const listOrgServiceAccounts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOrgServiceAccountsInput,
    outputSchema: ListOrgServiceAccountsOutput,
  }),
);
