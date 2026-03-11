import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostInvoiceitemsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  amount: Schema.optional(Schema.Number),
  currency: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  customer_account: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  discountable: Schema.optional(Schema.Boolean),
  discounts: Schema.optional(Schema.Unknown),
  expand: Schema.optional(Schema.Array(Schema.String)),
  invoice: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Unknown),
  period: Schema.optional(
    Schema.Struct({
      end: Schema.Number,
      start: Schema.Number,
    }),
  ),
  price_data: Schema.optional(
    Schema.Struct({
      currency: Schema.String,
      product: Schema.String,
      tax_behavior: Schema.optional(
        Schema.Literals(["exclusive", "inclusive", "unspecified"]),
      ),
      unit_amount: Schema.optional(Schema.Number),
      unit_amount_decimal: Schema.optional(Schema.String),
    }),
  ),
  pricing: Schema.optional(
    Schema.Struct({
      price: Schema.optional(Schema.String),
    }),
  ),
  quantity: Schema.optional(Schema.Number),
  subscription: Schema.optional(Schema.String),
  tax_behavior: Schema.optional(
    Schema.Literals(["exclusive", "inclusive", "unspecified"]),
  ),
  tax_code: Schema.optional(Schema.Unknown),
  tax_rates: Schema.optional(Schema.Array(Schema.String)),
  unit_amount_decimal: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/invoiceitems",
    contentType: "form-urlencoded",
  }),
);
export type PostInvoiceitemsInput = typeof PostInvoiceitemsInput.Type;

// Output Schema
export const PostInvoiceitemsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
  },
);
export type PostInvoiceitemsOutput = typeof PostInvoiceitemsOutput.Type;

// The operation
/**
 * Create an invoice item
 *
 * <p>Creates an item to be added to a draft invoice (up to 250 items per invoice). If no invoice is specified, the item will be on the next invoice created for the customer specified.</p>
 */
export const PostInvoiceitems = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostInvoiceitemsInput,
  outputSchema: PostInvoiceitemsOutput,
}));
