import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgInvoiceInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  invoiceId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}",
  }),
);
export type GetOrgInvoiceInput = typeof GetOrgInvoiceInput.Type;

// Output Schema
export const GetOrgInvoiceOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgInvoiceOutput = typeof GetOrgInvoiceOutput.Type;

// The operation
/**
 * Return One Invoice for One Organization
 *
 * Returns one invoice that MongoDB issued to the specified organization. A unique 24-hexadecimal digit string identifies the invoice. You can choose to receive this invoice in JSON or CSV format. To use this resource, the requesting Service Account or API Key must have the Organization Billing Viewer, Organization Billing Admin, or Organization Owner role. If you have a cross-organization setup, you can query for a linked invoice if you have the Organization Billing Admin or Organization Owner role.
 * To compute the total owed amount of the invoice - sum up total owed amount of each payment included into the invoice. To compute payment's owed amount - use formula `totalBilledCents` * `unitPrice` + `salesTax` - `startingBalanceCents`.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param invoiceId - Unique 24-hexadecimal digit string that identifies the invoice submitted to the specified organization. Charges typically post the next day.
 */
export const getOrgInvoice = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrgInvoiceInput,
  outputSchema: GetOrgInvoiceOutput,
}));
