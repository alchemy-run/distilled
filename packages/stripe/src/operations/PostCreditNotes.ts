import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostCreditNotesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  amount: Schema.optional(Schema.Number),
  credit_amount: Schema.optional(Schema.Number),
  effective_at: Schema.optional(Schema.Number),
  email_type: Schema.optional(Schema.Literals(["credit_note", "none"])),
  expand: Schema.optional(Schema.Array(Schema.String)),
  invoice: Schema.String,
  lines: Schema.optional(
    Schema.Array(
      Schema.Struct({
        amount: Schema.optional(Schema.Number),
        description: Schema.optional(Schema.String),
        invoice_line_item: Schema.optional(Schema.String),
        quantity: Schema.optional(Schema.Number),
        tax_amounts: Schema.optional(Schema.Unknown),
        tax_rates: Schema.optional(Schema.Unknown),
        type: Schema.Literals(["custom_line_item", "invoice_line_item"]),
        unit_amount: Schema.optional(Schema.Number),
        unit_amount_decimal: Schema.optional(Schema.String),
      }),
    ),
  ),
  memo: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  out_of_band_amount: Schema.optional(Schema.Number),
  reason: Schema.optional(
    Schema.Literals([
      "duplicate",
      "fraudulent",
      "order_change",
      "product_unsatisfactory",
    ]),
  ),
  refund_amount: Schema.optional(Schema.Number),
  refunds: Schema.optional(
    Schema.Array(
      Schema.Struct({
        amount_refunded: Schema.optional(Schema.Number),
        payment_record_refund: Schema.optional(
          Schema.Struct({
            payment_record: Schema.String,
            refund_group: Schema.String,
          }),
        ),
        refund: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals(["payment_record_refund", "refund"]),
        ),
      }),
    ),
  ),
  shipping_cost: Schema.optional(
    Schema.Struct({
      shipping_rate: Schema.optional(Schema.String),
    }),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/credit_notes",
    contentType: "form-urlencoded",
  }),
);
export type PostCreditNotesInput = typeof PostCreditNotesInput.Type;

// Output Schema
export const PostCreditNotesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  amount: Schema.Number,
  amount_shipping: Schema.Number,
  created: Schema.Number,
  currency: Schema.String,
  customer: Schema.Unknown,
  customer_account: Schema.NullOr(Schema.String),
  customer_balance_transaction: Schema.Unknown,
  discount_amount: Schema.Number,
  discount_amounts: Schema.Array(
    Schema.Struct({
      amount: Schema.Number,
      discount: Schema.Unknown,
    }),
  ),
  effective_at: Schema.NullOr(Schema.Number),
  id: Schema.String,
  invoice: Schema.Unknown,
  lines: Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        description: Schema.NullOr(Schema.String),
        discount_amount: Schema.Number,
        discount_amounts: Schema.Array(
          Schema.Struct({
            amount: Schema.Number,
            discount: Schema.Unknown,
          }),
        ),
        id: Schema.String,
        invoice_line_item: Schema.optional(Schema.String),
        livemode: Schema.Boolean,
        object: Schema.Literals(["credit_note_line_item"]),
        pretax_credit_amounts: Schema.Array(
          Schema.Struct({
            amount: Schema.Number,
            credit_balance_transaction: Schema.optional(Schema.Unknown),
            discount: Schema.optional(Schema.Unknown),
            type: Schema.Literals(["credit_balance_transaction", "discount"]),
          }),
        ),
        quantity: Schema.NullOr(Schema.Number),
        tax_rates: Schema.Array(
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
        type: Schema.Literals(["custom_line_item", "invoice_line_item"]),
        unit_amount: Schema.NullOr(Schema.Number),
        unit_amount_decimal: Schema.NullOr(Schema.String),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  }),
  livemode: Schema.Boolean,
  memo: Schema.NullOr(Schema.String),
  metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
  number: Schema.String,
  object: Schema.Literals(["credit_note"]),
  out_of_band_amount: Schema.NullOr(Schema.Number),
  pdf: Schema.String,
  post_payment_amount: Schema.Number,
  pre_payment_amount: Schema.Number,
  pretax_credit_amounts: Schema.Array(
    Schema.Struct({
      amount: Schema.Number,
      credit_balance_transaction: Schema.optional(Schema.Unknown),
      discount: Schema.optional(Schema.Unknown),
      type: Schema.Literals(["credit_balance_transaction", "discount"]),
    }),
  ),
  reason: Schema.NullOr(
    Schema.Literals([
      "duplicate",
      "fraudulent",
      "order_change",
      "product_unsatisfactory",
    ]),
  ),
  refunds: Schema.Array(
    Schema.Struct({
      amount_refunded: Schema.Number,
      payment_record_refund: Schema.Unknown,
      refund: Schema.Unknown,
      type: Schema.NullOr(Schema.Literals(["payment_record_refund", "refund"])),
    }),
  ),
  shipping_cost: Schema.Unknown,
  status: Schema.Literals(["issued", "void"]),
  subtotal: Schema.Number,
  subtotal_excluding_tax: Schema.NullOr(Schema.Number),
  total: Schema.Number,
  total_excluding_tax: Schema.NullOr(Schema.Number),
  total_taxes: Schema.NullOr(
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
  type: Schema.Literals(["mixed", "post_payment", "pre_payment"]),
  voided_at: Schema.NullOr(Schema.Number),
});
export type PostCreditNotesOutput = typeof PostCreditNotesOutput.Type;

// The operation
/**
 * Create a credit note
 *
 * <p>Issue a credit note to adjust the amount of a finalized invoice. A credit note will first reduce the invoice’s <code>amount_remaining</code> (and <code>amount_due</code>), but not below zero.
 * This amount is indicated by the credit note’s <code>pre_payment_amount</code>. The excess amount is indicated by <code>post_payment_amount</code>, and it can result in any combination of the following:</p>
 * <ul>
 * <li>Refunds: create a new refund (using <code>refund_amount</code>) or link existing refunds (using <code>refunds</code>).</li>
 * <li>Customer balance credit: credit the customer’s balance (using <code>credit_amount</code>) which will be automatically applied to their next invoice when it’s finalized.</li>
 * <li>Outside of Stripe credit: record the amount that is or will be credited outside of Stripe (using <code>out_of_band_amount</code>).</li>
 * </ul>
 * <p>The sum of refunds, customer balance credits, and outside of Stripe credits must equal the <code>post_payment_amount</code>.</p>
 * <p>You may issue multiple credit notes for an invoice. Each credit note may increment the invoice’s <code>pre_payment_credit_notes_amount</code>,
 * <code>post_payment_credit_notes_amount</code>, or both, depending on the invoice’s <code>amount_remaining</code> at the time of credit note creation.</p>
 */
export const PostCreditNotes = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostCreditNotesInput,
  outputSchema: PostCreditNotesOutput,
}));
