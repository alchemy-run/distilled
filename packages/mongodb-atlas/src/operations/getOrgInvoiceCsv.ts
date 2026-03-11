import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgInvoiceCsvInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  invoiceId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}/csv",
  }),
);
export type GetOrgInvoiceCsvInput = typeof GetOrgInvoiceCsvInput.Type;

// Output Schema
export const GetOrgInvoiceCsvOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgInvoiceCsvOutput = typeof GetOrgInvoiceCsvOutput.Type;

// The operation
/**
 * Return One Invoice as CSV for One Organization
 *
 * Returns one invoice that MongoDB issued to the specified organization in CSV format. A unique 24-hexadecimal digit string identifies the invoice. To use this resource, the requesting Service Account or API Key have at least the Organization Billing Viewer, Organization Billing Admin, or Organization Owner role. If you have a cross-organization setup, you can query for a linked invoice if you have the Organization Billing Admin or Organization Owner Role.
 * To compute the total owed amount of the invoice - sum up total owed amount of each payment included into the invoice. To compute payment's owed amount - use formula `totalBilledCents` * `unitPrice` + `salesTax` - `startingBalanceCents`.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param invoiceId - Unique 24-hexadecimal digit string that identifies the invoice submitted to the specified organization. Charges typically post the next day.
 */
export const getOrgInvoiceCsv = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrgInvoiceCsvInput,
  outputSchema: GetOrgInvoiceCsvOutput,
}));
