import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetInvoiceitemsInvoiceitemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invoiceitem: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/invoiceitems/{invoiceitem}",
      contentType: "form-urlencoded",
    }),
  );
export type GetInvoiceitemsInvoiceitemInput =
  typeof GetInvoiceitemsInvoiceitemInput.Type;

// Output Schema
export const GetInvoiceitemsInvoiceitemOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Number,
    currency: Schema.String,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    date: Schema.Number,
    description: Schema.NullOr(Schema.String),
    discountable: Schema.Boolean,
    discounts: Schema.NullOr(Schema.Array(Schema.Unknown)),
    id: Schema.String,
    invoice: Schema.Unknown,
    livemode: Schema.Boolean,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    net_amount: Schema.optional(Schema.Number),
    object: Schema.Literals(["invoiceitem"]),
    parent: Schema.Unknown,
    period: Schema.Struct({
      end: Schema.Number,
      start: Schema.Number,
    }),
    pricing: Schema.Unknown,
    proration: Schema.Boolean,
    proration_details: Schema.optional(
      Schema.Struct({
        discount_amounts: Schema.Array(
          Schema.Struct({
            amount: Schema.Number,
            discount: Schema.Unknown,
          }),
        ),
      }),
    ),
    quantity: Schema.Number,
    tax_rates: Schema.NullOr(
      Schema.Array(
        Schema.Struct({
          active: Schema.Boolean,
          country: Schema.NullOr(Schema.String),
          created: Schema.Number,
          description: Schema.NullOr(Schema.String),
          display_name: Schema.String,
          effective_percentage: Schema.NullOr(Schema.Number),
          flat_amount: Schema.Unknown,
          id: Schema.String,
          inclusive: Schema.Boolean,
          jurisdiction: Schema.NullOr(Schema.String),
          jurisdiction_level: Schema.NullOr(
            Schema.Literals([
              "city",
              "country",
              "county",
              "district",
              "multiple",
              "state",
            ]),
          ),
          livemode: Schema.Boolean,
          metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
          object: Schema.Literals(["tax_rate"]),
          percentage: Schema.Number,
          rate_type: Schema.NullOr(
            Schema.Literals(["flat_amount", "percentage"]),
          ),
          state: Schema.NullOr(Schema.String),
          tax_type: Schema.NullOr(
            Schema.Literals([
              "amusement_tax",
              "communications_tax",
              "gst",
              "hst",
              "igst",
              "jct",
              "lease_tax",
              "pst",
              "qst",
              "retail_delivery_fee",
              "rst",
              "sales_tax",
              "service_tax",
              "vat",
            ]),
          ),
        }),
      ),
    ),
    test_clock: Schema.Unknown,
  });
export type GetInvoiceitemsInvoiceitemOutput =
  typeof GetInvoiceitemsInvoiceitemOutput.Type;

// The operation
/**
 * Retrieve an invoice item
 *
 * <p>Retrieves the invoice item with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetInvoiceitemsInvoiceitem = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetInvoiceitemsInvoiceitemInput,
    outputSchema: GetInvoiceitemsInvoiceitemOutput,
  }),
);
