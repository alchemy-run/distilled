import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIssuingTransactionsTransactionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    transaction: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/issuing/transactions/{transaction}",
      contentType: "form-urlencoded",
    }),
  );
export type GetIssuingTransactionsTransactionInput =
  typeof GetIssuingTransactionsTransactionInput.Type;

// Output Schema
export const GetIssuingTransactionsTransactionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetIssuingTransactionsTransactionOutput =
  typeof GetIssuingTransactionsTransactionOutput.Type;

// The operation
/**
 * Retrieve a transaction
 *
 * <p>Retrieves an Issuing <code>Transaction</code> object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetIssuingTransactionsTransaction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetIssuingTransactionsTransactionInput,
    outputSchema: GetIssuingTransactionsTransactionOutput,
  }));
