import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetInvoiceInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export const GetInvoiceOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  total: Schema.String,
  billing_period_start: Schema.String,
  billing_period_end: Schema.String,
  paid: Schema.Boolean,
  overdue: Schema.Boolean,
});
export type GetInvoiceOutput = typeof GetInvoiceOutput.Type;

// The operation
/**
 * Get an invoice
 *
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param id - Invoice public ID from `list_invoices`. Example: `aabb12123434`.
 */
export const getInvoice = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetInvoiceInput,
  outputSchema: GetInvoiceOutput,
  errors: [Forbidden, NotFound] as const,
}));
