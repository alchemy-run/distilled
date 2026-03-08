import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetInvoiceLineItemsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/invoices/{id}/line-items",
  }),
);
export type GetInvoiceLineItemsInput = typeof GetInvoiceLineItemsInput.Type;

// Output Schema
export const GetInvoiceLineItemsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.Number,
  next_page_url: Schema.String,
  prev_page: Schema.Number,
  prev_page_url: Schema.String,
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      subtotal: Schema.Number,
      description: Schema.String,
      metric_name: Schema.String,
      database_id: Schema.String,
      database_name: Schema.String,
      resource: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        created_at: Schema.String,
        updated_at: Schema.String,
        deleted_at: Schema.String,
      }),
    }),
  ),
});
export type GetInvoiceLineItemsOutput = typeof GetInvoiceLineItemsOutput.Type;

// The operation
/**
 * Get invoice line items
 *
 * Get the line items for an invoice
 *
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param id - Invoice public ID from `list_invoices`. Example: `aabb12123434`.
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const getInvoiceLineItems = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetInvoiceLineItemsInput,
  outputSchema: GetInvoiceLineItemsOutput,
  errors: [Forbidden, NotFound] as const,
}));
