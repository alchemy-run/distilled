import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrganizationInvoicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    type: Schema.optional(Schema.Literals(["all", "upcoming", "issued"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/invoices",
    }),
  );
export type ListOrganizationInvoicesInput =
  typeof ListOrganizationInvoicesInput.Type;

// Output Schema
export const ListOrganizationInvoicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invoices: Schema.optional(
      Schema.Array(
        Schema.Struct({
          invoice_number: Schema.optional(Schema.String),
          amount_due: Schema.optional(Schema.String),
          due_date: Schema.optional(Schema.String),
          paid_at: Schema.optional(Schema.String),
          payment_failed_at: Schema.optional(Schema.String),
          invoice_pdf: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ListOrganizationInvoicesOutput =
  typeof ListOrganizationInvoicesOutput.Type;

// The operation
/**
 * List Invoices
 *
 * Returns a list of invoices for the organization.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param type - The type of invoice to retrieve.
 */
export const listOrganizationInvoices = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListOrganizationInvoicesInput,
    outputSchema: ListOrganizationInvoicesOutput,
  }),
);
