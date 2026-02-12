import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListInvoicesInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization}/invoices" }),
);
export type ListInvoicesInput = typeof ListInvoicesInput.Type;

// Output Schema
export const ListInvoicesOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      total: Schema.String,
      billing_period_start: Schema.String,
      billing_period_end: Schema.String,
    }),
  ),
});
export type ListInvoicesOutput = typeof ListInvoicesOutput.Type;

// The operation
/**
 * Get invoices
 *
 * Get the invoices for an organization
 *
 * @param organization - The name of the organization
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listInvoices = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListInvoicesInput,
  outputSchema: ListInvoicesOutput,
  errors: [Forbidden, NotFound] as const,
}));
