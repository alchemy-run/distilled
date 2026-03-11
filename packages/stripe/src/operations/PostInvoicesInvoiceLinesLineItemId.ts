import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostInvoicesInvoiceLinesLineItemIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invoice: Schema.String.pipe(T.PathParam()),
    line_item_id: Schema.String.pipe(T.PathParam()),
    amount: Schema.optional(Schema.Number),
    description: Schema.optional(Schema.String),
    discountable: Schema.optional(Schema.Boolean),
    discounts: Schema.optional(Schema.Unknown),
    expand: Schema.optional(Schema.Array(Schema.String)),
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
        product: Schema.optional(Schema.String),
        product_data: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
            images: Schema.optional(Schema.Array(Schema.String)),
            metadata: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            name: Schema.String,
            tax_code: Schema.optional(Schema.String),
            unit_label: Schema.optional(Schema.String),
          }),
        ),
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
    tax_amounts: Schema.optional(Schema.Unknown),
    tax_rates: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/invoices/{invoice}/lines/{line_item_id}",
      contentType: "form-urlencoded",
    }),
  );
export type PostInvoicesInvoiceLinesLineItemIdInput =
  typeof PostInvoicesInvoiceLinesLineItemIdInput.Type;

// Output Schema
export const PostInvoicesInvoiceLinesLineItemIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type PostInvoicesInvoiceLinesLineItemIdOutput =
  typeof PostInvoicesInvoiceLinesLineItemIdOutput.Type;

// The operation
/**
 * Update an invoice's line item
 *
 * <p>Updates an invoice’s line item. Some fields, such as <code>tax_amounts</code>, only live on the invoice line item,
 * so they can only be updated through this endpoint. Other fields, such as <code>amount</code>, live on both the invoice
 * item and the invoice line item, so updates on this endpoint will propagate to the invoice item as well.
 * Updating an invoice’s line item is only possible before the invoice is finalized.</p>
 *
 * @param invoice - Invoice ID of line item
 * @param line_item_id - Invoice line item ID
 */
export const PostInvoicesInvoiceLinesLineItemId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostInvoicesInvoiceLinesLineItemIdInput,
    outputSchema: PostInvoicesInvoiceLinesLineItemIdOutput,
  }));
