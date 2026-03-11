import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteInvoiceitemsInvoiceitemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invoiceitem: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/invoiceitems/{invoiceitem}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteInvoiceitemsInvoiceitemInput =
  typeof DeleteInvoiceitemsInvoiceitemInput.Type;

// Output Schema
export const DeleteInvoiceitemsInvoiceitemOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["invoiceitem"]),
  });
export type DeleteInvoiceitemsInvoiceitemOutput =
  typeof DeleteInvoiceitemsInvoiceitemOutput.Type;

// The operation
/**
 * Delete an invoice item
 *
 * <p>Deletes an invoice item, removing it from an invoice. Deleting invoice items is only possible when they’re not attached to invoices, or if it’s attached to a draft invoice.</p>
 */
export const DeleteInvoiceitemsInvoiceitem =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteInvoiceitemsInvoiceitemInput,
    outputSchema: DeleteInvoiceitemsInvoiceitemOutput,
  }));
