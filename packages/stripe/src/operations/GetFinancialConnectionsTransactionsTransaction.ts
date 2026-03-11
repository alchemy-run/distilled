import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetFinancialConnectionsTransactionsTransactionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    transaction: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/financial_connections/transactions/{transaction}",
      contentType: "form-urlencoded",
    }),
  );
export type GetFinancialConnectionsTransactionsTransactionInput =
  typeof GetFinancialConnectionsTransactionsTransactionInput.Type;

// Output Schema
export const GetFinancialConnectionsTransactionsTransactionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String,
    amount: Schema.Number,
    currency: Schema.String,
    description: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["financial_connections.transaction"]),
    status: Schema.Literals(["pending", "posted", "void"]),
    status_transitions: Schema.Struct({
      posted_at: Schema.NullOr(Schema.Number),
      void_at: Schema.NullOr(Schema.Number),
    }),
    transacted_at: Schema.Number,
    transaction_refresh: Schema.String,
    updated: Schema.Number,
  });
export type GetFinancialConnectionsTransactionsTransactionOutput =
  typeof GetFinancialConnectionsTransactionsTransactionOutput.Type;

// The operation
/**
 * Retrieve a Transaction
 *
 * <p>Retrieves the details of a Financial Connections <code>Transaction</code></p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetFinancialConnectionsTransactionsTransaction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetFinancialConnectionsTransactionsTransactionInput,
    outputSchema: GetFinancialConnectionsTransactionsTransactionOutput,
  }));
