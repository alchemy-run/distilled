import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetInvoicesInvoiceLinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invoice: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/invoices/{invoice}/lines",
      contentType: "form-urlencoded",
    }),
  );
export type GetInvoicesInvoiceLinesInput =
  typeof GetInvoicesInvoiceLinesInput.Type;

// Output Schema
export const GetInvoicesInvoiceLinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        currency: Schema.String,
        description: Schema.NullOr(Schema.String),
        discount_amounts: Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              amount: Schema.Number,
              discount: Schema.Unknown,
            }),
          ),
        ),
        discountable: Schema.Boolean,
        discounts: Schema.Array(Schema.Unknown),
        id: Schema.String,
        invoice: Schema.NullOr(Schema.String),
        livemode: Schema.Boolean,
        metadata: Schema.Record(Schema.String, Schema.String),
        object: Schema.Literals(["line_item"]),
        parent: Schema.Unknown,
        period: Schema.Struct({
          end: Schema.Number,
          start: Schema.Number,
        }),
        pretax_credit_amounts: Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              amount: Schema.Number,
              credit_balance_transaction: Schema.optional(Schema.Unknown),
              discount: Schema.optional(Schema.Unknown),
              type: Schema.Literals(["credit_balance_transaction", "discount"]),
            }),
          ),
        ),
        pricing: Schema.Unknown,
        quantity: Schema.NullOr(Schema.Number),
        subscription: Schema.Unknown,
        subtotal: Schema.Number,
        taxes: Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              amount: Schema.Number,
              tax_behavior: Schema.Literals(["exclusive", "inclusive"]),
              tax_rate_details: Schema.Unknown,
              taxability_reason: Schema.Literals([
                "customer_exempt",
                "not_available",
                "not_collecting",
                "not_subject_to_tax",
                "not_supported",
                "portion_product_exempt",
                "portion_reduced_rated",
                "portion_standard_rated",
                "product_exempt",
                "product_exempt_holiday",
                "proportionally_rated",
                "reduced_rated",
                "reverse_charge",
                "standard_rated",
                "taxable_basis_reduced",
                "zero_rated",
              ]),
              taxable_amount: Schema.NullOr(Schema.Number),
              type: Schema.Literals(["tax_rate_details"]),
            }),
          ),
        ),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetInvoicesInvoiceLinesOutput =
  typeof GetInvoicesInvoiceLinesOutput.Type;

// The operation
/**
 * Retrieve an invoice's line items
 *
 * <p>When retrieving an invoice, you’ll get a <strong>lines</strong> property containing the total count of line items and the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetInvoicesInvoiceLines = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetInvoicesInvoiceLinesInput,
    outputSchema: GetInvoicesInvoiceLinesOutput,
  }),
);
