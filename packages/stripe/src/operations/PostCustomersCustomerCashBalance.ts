import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostCustomersCustomerCashBalanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    settings: Schema.optional(
      Schema.Struct({
        reconciliation_mode: Schema.optional(
          Schema.Literals(["automatic", "manual", "merchant_default"]),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/customers/{customer}/cash_balance",
      contentType: "form-urlencoded",
    }),
  );
export type PostCustomersCustomerCashBalanceInput =
  typeof PostCustomersCustomerCashBalanceInput.Type;

// Output Schema
export const PostCustomersCustomerCashBalanceOutput =
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
export type PostCustomersCustomerCashBalanceOutput =
  typeof PostCustomersCustomerCashBalanceOutput.Type;

// The operation
/**
 * Update a cash balance's settings
 *
 * <p>Changes the settings on a customer’s cash balance.</p>
 */
export const PostCustomersCustomerCashBalance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostCustomersCustomerCashBalanceInput,
    outputSchema: PostCustomersCustomerCashBalanceOutput,
  }));
