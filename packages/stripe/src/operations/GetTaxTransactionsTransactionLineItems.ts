import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTaxTransactionsTransactionLineItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    transaction: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/tax/transactions/{transaction}/line_items",
      contentType: "form-urlencoded",
    }),
  );
export type GetTaxTransactionsTransactionLineItemsInput =
  typeof GetTaxTransactionsTransactionLineItemsInput.Type;

// Output Schema
export const GetTaxTransactionsTransactionLineItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        amount_tax: Schema.Number,
        id: Schema.String,
        livemode: Schema.Boolean,
        metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
        object: Schema.Literals(["tax.transaction_line_item"]),
        product: Schema.NullOr(Schema.String),
        quantity: Schema.Number,
        reference: Schema.String,
        reversal: Schema.Unknown,
        tax_behavior: Schema.Literals(["exclusive", "inclusive"]),
        tax_code: Schema.String,
        type: Schema.Literals(["reversal", "transaction"]),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTaxTransactionsTransactionLineItemsOutput =
  typeof GetTaxTransactionsTransactionLineItemsOutput.Type;

// The operation
/**
 * Retrieve a transaction's line items
 *
 * <p>Retrieves the line items of a committed standalone transaction as a collection.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetTaxTransactionsTransactionLineItems =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTaxTransactionsTransactionLineItemsInput,
    outputSchema: GetTaxTransactionsTransactionLineItemsOutput,
  }));
