import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCreditNotesPreviewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.optional(Schema.Number),
    credit_amount: Schema.optional(Schema.Number),
    effective_at: Schema.optional(Schema.Number),
    email_type: Schema.optional(Schema.Literals(["credit_note", "none"])),
    expand: Schema.optional(Schema.String),
    invoice: Schema.String,
    lines: Schema.optional(Schema.String),
    memo: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.String),
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
    refunds: Schema.optional(Schema.String),
    shipping_cost: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/credit_notes/preview",
      contentType: "form-urlencoded",
    }),
  );
export type GetCreditNotesPreviewInput = typeof GetCreditNotesPreviewInput.Type;

// Output Schema
export const GetCreditNotesPreviewOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
        type: Schema.NullOr(
          Schema.Literals(["payment_record_refund", "refund"]),
        ),
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
export type GetCreditNotesPreviewOutput =
  typeof GetCreditNotesPreviewOutput.Type;

// The operation
/**
 * Preview a credit note
 *
 * <p>Get a preview of a credit note without creating it.</p>
 *
 * @param amount - The integer amount in cents (or local equivalent) representing the total amount of the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.
 * @param credit_amount - The integer amount in cents (or local equivalent) representing the amount to credit the customer's balance, which will be automatically applied to their next invoice.
 * @param effective_at - The date when this credit note is in effect. Same as `created` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the credit note PDF.
 * @param email_type - Type of email to send to the customer, one of `credit_note` or `none` and the default is `credit_note`.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param invoice - ID of the invoice.
 * @param lines - Line items that make up the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.
 * @param memo - The credit note's memo appears on the credit note PDF.
 * @param metadata - Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
 * @param out_of_band_amount - The integer amount in cents (or local equivalent) representing the amount that is credited outside of Stripe.
 * @param reason - Reason for issuing this credit note, one of `duplicate`, `fraudulent`, `order_change`, or `product_unsatisfactory`
 * @param refund_amount - The integer amount in cents (or local equivalent) representing the amount to refund. If set, a refund will be created for the charge associated with the invoice.
 * @param refunds - Refunds to link to this credit note.
 * @param shipping_cost - When shipping_cost contains the shipping_rate from the invoice, the shipping_cost is included in the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.
 */
export const GetCreditNotesPreview = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetCreditNotesPreviewInput,
    outputSchema: GetCreditNotesPreviewOutput,
  }),
);
