import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPaymentLinksPaymentLinkLineItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    payment_link: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/payment_links/{payment_link}/line_items",
      contentType: "form-urlencoded",
    }),
  );
export type GetPaymentLinksPaymentLinkLineItemsInput =
  typeof GetPaymentLinksPaymentLinkLineItemsInput.Type;

// Output Schema
export const GetPaymentLinksPaymentLinkLineItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        adjustable_quantity: Schema.Unknown,
        amount_discount: Schema.Number,
        amount_subtotal: Schema.Number,
        amount_tax: Schema.Number,
        amount_total: Schema.Number,
        currency: Schema.String,
        description: Schema.NullOr(Schema.String),
        discounts: Schema.optional(
          Schema.Array(
            Schema.Struct({
              amount: Schema.Number,
              discount: Schema.Struct({
                checkout_session: Schema.NullOr(Schema.String),
                customer: Schema.Unknown,
                customer_account: Schema.NullOr(Schema.String),
                end: Schema.NullOr(Schema.Number),
                id: Schema.String,
                invoice: Schema.NullOr(Schema.String),
                invoice_item: Schema.NullOr(Schema.String),
                object: Schema.Literals(["discount"]),
                promotion_code: Schema.Unknown,
                source: Schema.Struct({
                  coupon: Schema.Unknown,
                  type: Schema.Literals(["coupon"]),
                }),
                start: Schema.Number,
                subscription: Schema.NullOr(Schema.String),
                subscription_item: Schema.NullOr(Schema.String),
              }),
            }),
          ),
        ),
        id: Schema.String,
        metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
        object: Schema.Literals(["item"]),
        price: Schema.Unknown,
        quantity: Schema.NullOr(Schema.Number),
        taxes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              amount: Schema.Number,
              rate: Schema.Struct({
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
              taxability_reason: Schema.NullOr(
                Schema.Literals([
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
              ),
              taxable_amount: Schema.NullOr(Schema.Number),
            }),
          ),
        ),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetPaymentLinksPaymentLinkLineItemsOutput =
  typeof GetPaymentLinksPaymentLinkLineItemsOutput.Type;

// The operation
/**
 * Retrieve a payment link's line items
 *
 * <p>When retrieving a payment link, there is an includable <strong>line_items</strong> property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetPaymentLinksPaymentLinkLineItems =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetPaymentLinksPaymentLinkLineItemsInput,
    outputSchema: GetPaymentLinksPaymentLinkLineItemsOutput,
  }));
