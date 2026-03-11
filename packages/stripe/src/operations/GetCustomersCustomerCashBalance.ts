import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCustomersCustomerCashBalanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/customers/{customer}/cash_balance",
      contentType: "form-urlencoded",
    }),
  );
export type GetCustomersCustomerCashBalanceInput =
  typeof GetCustomersCustomerCashBalanceInput.Type;

// Output Schema
export const GetCustomersCustomerCashBalanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    available: Schema.NullOr(Schema.Record(Schema.String, Schema.Number)),
    customer: Schema.String,
    customer_account: Schema.NullOr(Schema.String),
    livemode: Schema.Boolean,
    object: Schema.Literals(["cash_balance"]),
    settings: Schema.Struct({
      reconciliation_mode: Schema.Literals(["automatic", "manual"]),
      using_merchant_default: Schema.Boolean,
    }),
  });
export type GetCustomersCustomerCashBalanceOutput =
  typeof GetCustomersCustomerCashBalanceOutput.Type;

// The operation
/**
 * Retrieve a cash balance
 *
 * <p>Retrieves a customer’s cash balance.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetCustomersCustomerCashBalance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCustomersCustomerCashBalanceInput,
    outputSchema: GetCustomersCustomerCashBalanceOutput,
  }));
