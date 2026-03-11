import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTaxCalculationsCalculationLineItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    calculation: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/tax/calculations/{calculation}/line_items",
      contentType: "form-urlencoded",
    }),
  );
export type GetTaxCalculationsCalculationLineItemsInput =
  typeof GetTaxCalculationsCalculationLineItemsInput.Type;

// Output Schema
export const GetTaxCalculationsCalculationLineItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        amount_tax: Schema.Number,
        id: Schema.String,
        livemode: Schema.Boolean,
        metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
        object: Schema.Literals(["tax.calculation_line_item"]),
        product: Schema.NullOr(Schema.String),
        quantity: Schema.Number,
        reference: Schema.String,
        tax_behavior: Schema.Literals(["exclusive", "inclusive"]),
        tax_breakdown: Schema.optional(
          Schema.NullOr(
            Schema.Array(
              Schema.Struct({
                amount: Schema.Number,
                jurisdiction: Schema.Struct({
                  country: Schema.String,
                  display_name: Schema.String,
                  level: Schema.Literals([
                    "city",
                    "country",
                    "county",
                    "district",
                    "state",
                  ]),
                  state: Schema.NullOr(Schema.String),
                }),
                sourcing: Schema.Literals(["destination", "origin"]),
                tax_rate_details: Schema.Unknown,
                taxability_reason: Schema.Literals([
                  "customer_exempt",
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
                taxable_amount: Schema.Number,
              }),
            ),
          ),
        ),
        tax_code: Schema.String,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTaxCalculationsCalculationLineItemsOutput =
  typeof GetTaxCalculationsCalculationLineItemsOutput.Type;

// The operation
/**
 * Retrieve a calculation's line items
 *
 * <p>Retrieves the line items of a tax calculation as a collection, if the calculation hasn’t expired.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetTaxCalculationsCalculationLineItems =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTaxCalculationsCalculationLineItemsInput,
    outputSchema: GetTaxCalculationsCalculationLineItemsOutput,
  }));
