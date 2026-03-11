import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPaymentIntentsIntentAmountDetailsLineItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    intent: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/payment_intents/{intent}/amount_details_line_items",
      contentType: "form-urlencoded",
    }),
  );
export type GetPaymentIntentsIntentAmountDetailsLineItemsInput =
  typeof GetPaymentIntentsIntentAmountDetailsLineItemsInput.Type;

// Output Schema
export const GetPaymentIntentsIntentAmountDetailsLineItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        discount_amount: Schema.NullOr(Schema.Number),
        id: Schema.String,
        object: Schema.Literals(["payment_intent_amount_details_line_item"]),
        payment_method_options: Schema.Unknown,
        product_code: Schema.NullOr(Schema.String),
        product_name: Schema.String,
        quantity: Schema.Number,
        tax: Schema.Unknown,
        unit_cost: Schema.Number,
        unit_of_measure: Schema.NullOr(Schema.String),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetPaymentIntentsIntentAmountDetailsLineItemsOutput =
  typeof GetPaymentIntentsIntentAmountDetailsLineItemsOutput.Type;

// The operation
/**
 * List all PaymentIntent LineItems
 *
 * <p>Lists all LineItems of a given PaymentIntent.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetPaymentIntentsIntentAmountDetailsLineItems =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetPaymentIntentsIntentAmountDetailsLineItemsInput,
    outputSchema: GetPaymentIntentsIntentAmountDetailsLineItemsOutput,
  }));
