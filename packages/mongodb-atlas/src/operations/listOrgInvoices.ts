import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrgInvoicesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
  viewLinkedInvoices: Schema.optional(Schema.Boolean),
  statusNames: Schema.optional(Schema.String),
  fromDate: Schema.optional(Schema.String),
  toDate: Schema.optional(Schema.String),
  sortBy: Schema.optional(Schema.Literals(["START_DATE", "END_DATE"])),
  orderBy: Schema.optional(Schema.Literals(["desc", "asc"])),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2/orgs/{orgId}/invoices" }));
export type ListOrgInvoicesInput = typeof ListOrgInvoicesInput.Type;

// Output Schema
export const ListOrgInvoicesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListOrgInvoicesOutput = typeof ListOrgInvoicesOutput.Type;

// The operation
/**
 * Return All Invoices for One Organization
 *
 * Returns all invoices that MongoDB issued to the specified organization. This list includes all invoices regardless of invoice status. To use this resource, the requesting Service Account or API Key must have the Organization Billing Viewer, Organization Billing Admin, or Organization Owner role. If you have a cross-organization setup, you can view linked invoices if you have the Organization Billing Admin or Organization Owner role.
 * To compute the total owed amount of the invoices - sum up total owed of each invoice. It could be computed as a sum of owed amount of each payment included into the invoice. To compute payment's owed amount - use formula `totalBilledCents` * `unitPrice` + `salesTax` - `startingBalanceCents`.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param viewLinkedInvoices - Flag that indicates whether to return linked invoices in the `linkedInvoices` field.
 * @param statusNames - Statuses of the invoice to be retrieved. Omit to return invoices of all statuses.
 * @param fromDate - Retrieve the invoices the `startDates` of which are greater than or equal to the `fromDate`. If omit, the invoices return will go back to earliest `startDate`.
 * @param toDate - Retrieve the invoices the `endDates` of which are smaller than or equal to the `toDate`. If omit, the invoices return will go further to latest `endDate`.
 * @param sortBy - Field used to sort the returned invoices by. Use in combination with `orderBy` parameter to control the order of the result.
 * @param orderBy - Field used to order the returned invoices by. Use in combination of `sortBy` parameter to control the order of the result.
 */
export const listOrgInvoices = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrgInvoicesInput,
  outputSchema: ListOrgInvoicesOutput,
}));
