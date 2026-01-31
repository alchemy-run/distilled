import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetInvoiceInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/invoices/{id}",
  }),
);
export type GetInvoiceInput = typeof GetInvoiceInput.Type;

// Output Schema
export const GetInvoiceOutput = Schema.Struct({
  id: Schema.String,
  total: Schema.String,
  billing_period_start: Schema.String,
  billing_period_end: Schema.String,
});
export type GetInvoiceOutput = typeof GetInvoiceOutput.Type;

// The operation
/**
 * Get an invoice
 *
 * @param organization - The name of the organization
 * @param id - The ID of the invoice
 */
export const getInvoice = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetInvoiceInput,
  outputSchema: GetInvoiceOutput,
}));
