import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteInvoicesInvoiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invoice: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/invoices/{invoice}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteInvoicesInvoiceInput = typeof DeleteInvoicesInvoiceInput.Type;

// Output Schema
export const DeleteInvoicesInvoiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["invoice"]),
  });
export type DeleteInvoicesInvoiceOutput =
  typeof DeleteInvoicesInvoiceOutput.Type;

// The operation
/**
 * Delete a draft invoice
 *
 * <p>Permanently deletes a one-off invoice draft. This cannot be undone. Attempts to delete invoices that are no longer in a draft state will fail; once an invoice has been finalized or if an invoice is for a subscription, it must be <a href="#void_invoice">voided</a>.</p>
 */
export const DeleteInvoicesInvoice = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteInvoicesInvoiceInput,
    outputSchema: DeleteInvoicesInvoiceOutput,
  }),
);
