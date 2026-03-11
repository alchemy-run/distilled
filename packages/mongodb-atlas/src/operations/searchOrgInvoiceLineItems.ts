import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SearchOrgInvoiceLineItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    invoiceId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}/lineItems:search",
    }),
  );
export type SearchOrgInvoiceLineItemsInput =
  typeof SearchOrgInvoiceLineItemsInput.Type;

// Output Schema
export const SearchOrgInvoiceLineItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SearchOrgInvoiceLineItemsOutput =
  typeof SearchOrgInvoiceLineItemsOutput.Type;

// The operation
/**
 * Return All Line Items for One Invoice by Invoice ID
 *
 * Query the `lineItems` of the specified invoice and return the result JSON. A unique 24-hexadecimal digit string identifies the invoice.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param invoiceId - Unique 24-hexadecimal digit string that identifies the invoice submitted to the specified organization. Charges typically post the next day.
 */
export const searchOrgInvoiceLineItems = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SearchOrgInvoiceLineItemsInput,
    outputSchema: SearchOrgInvoiceLineItemsOutput,
  }),
);
