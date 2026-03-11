import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetInvoiceitemsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
  customer_account: Schema.optional(Schema.String),
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  invoice: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  pending: Schema.optional(Schema.Boolean),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/invoiceitems",
    contentType: "form-urlencoded",
  }),
);
export type GetInvoiceitemsInput = typeof GetInvoiceitemsInput.Type;

// Output Schema
export const GetInvoiceitemsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
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
            metadata: Schema.NullOr(
              Schema.Record(Schema.String, Schema.String),
            ),
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
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetInvoiceitemsOutput = typeof GetInvoiceitemsOutput.Type;

// The operation
/**
 * List all invoice items
 *
 * <p>Returns a list of your invoice items. Invoice items are returned sorted by creation date, with the most recently created invoice items appearing first.</p>
 *
 * @param created - Only return invoice items that were created during the given date interval.
 * @param customer - The identifier of the customer whose invoice items to return. If none is provided, returns all invoice items.
 * @param customer_account - The identifier of the account representing the customer whose invoice items to return. If none is provided, returns all invoice items.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param invoice - Only return invoice items belonging to this invoice. If none is provided, all invoice items will be returned. If specifying an invoice, no customer identifier is needed.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param pending - Set to `true` to only show pending invoice items, which are not yet attached to any invoices. Set to `false` to only show invoice items already attached to invoices. If unspecified, no filter is applied.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetInvoiceitems = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetInvoiceitemsInput,
  outputSchema: GetInvoiceitemsOutput,
}));
