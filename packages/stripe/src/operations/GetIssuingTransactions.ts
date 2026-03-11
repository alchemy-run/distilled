import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIssuingTransactionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    card: Schema.optional(Schema.String),
    cardholder: Schema.optional(Schema.String),
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
    type: Schema.optional(Schema.Literals(["capture", "refund"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/issuing/transactions",
      contentType: "form-urlencoded",
    }),
  );
export type GetIssuingTransactionsInput =
  typeof GetIssuingTransactionsInput.Type;

// Output Schema
export const GetIssuingTransactionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        amount_details: Schema.Unknown,
        authorization: Schema.Unknown,
        balance_transaction: Schema.Unknown,
        card: Schema.Unknown,
        cardholder: Schema.Unknown,
        created: Schema.Number,
        currency: Schema.String,
        dispute: Schema.Unknown,
        id: Schema.String,
        livemode: Schema.Boolean,
        merchant_amount: Schema.Number,
        merchant_currency: Schema.String,
        merchant_data: Schema.Struct({
          category: Schema.String,
          category_code: Schema.String,
          city: Schema.NullOr(Schema.String),
          country: Schema.NullOr(Schema.String),
          name: Schema.NullOr(Schema.String),
          network_id: Schema.String,
          postal_code: Schema.NullOr(Schema.String),
          state: Schema.NullOr(Schema.String),
          tax_id: Schema.NullOr(Schema.String),
          terminal_id: Schema.NullOr(Schema.String),
          url: Schema.NullOr(Schema.String),
        }),
        metadata: Schema.Record(Schema.String, Schema.String),
        network_data: Schema.Unknown,
        object: Schema.Literals(["issuing.transaction"]),
        purchase_details: Schema.optional(Schema.Unknown),
        token: Schema.optional(Schema.Unknown),
        treasury: Schema.optional(Schema.Unknown),
        type: Schema.Literals(["capture", "refund"]),
        wallet: Schema.NullOr(
          Schema.Literals(["apple_pay", "google_pay", "samsung_pay"]),
        ),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetIssuingTransactionsOutput =
  typeof GetIssuingTransactionsOutput.Type;

// The operation
/**
 * List all transactions
 *
 * <p>Returns a list of Issuing <code>Transaction</code> objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>
 *
 * @param card - Only return transactions that belong to the given card.
 * @param cardholder - Only return transactions that belong to the given cardholder.
 * @param created - Only return transactions that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param type - Only return transactions that have the given type. One of `capture` or `refund`.
 */
export const GetIssuingTransactions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetIssuingTransactionsInput,
    outputSchema: GetIssuingTransactionsOutput,
  }),
);
