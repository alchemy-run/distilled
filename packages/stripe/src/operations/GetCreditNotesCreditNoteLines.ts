import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCreditNotesCreditNoteLinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    credit_note: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/credit_notes/{credit_note}/lines",
      contentType: "form-urlencoded",
    }),
  );
export type GetCreditNotesCreditNoteLinesInput =
  typeof GetCreditNotesCreditNoteLinesInput.Type;

// Output Schema
export const GetCreditNotesCreditNoteLinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetCreditNotesCreditNoteLinesOutput =
  typeof GetCreditNotesCreditNoteLinesOutput.Type;

// The operation
/**
 * Retrieve a credit note's line items
 *
 * <p>When retrieving a credit note, you’ll get a <strong>lines</strong> property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetCreditNotesCreditNoteLines =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCreditNotesCreditNoteLinesInput,
    outputSchema: GetCreditNotesCreditNoteLinesOutput,
  }));
