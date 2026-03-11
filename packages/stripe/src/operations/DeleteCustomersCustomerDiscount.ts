import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteCustomersCustomerDiscountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/customers/{customer}/discount",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteCustomersCustomerDiscountInput =
  typeof DeleteCustomersCustomerDiscountInput.Type;

// Output Schema
export const DeleteCustomersCustomerDiscountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    checkout_session: Schema.NullOr(Schema.String),
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    deleted: Schema.Literals(["true"]),
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
  });
export type DeleteCustomersCustomerDiscountOutput =
  typeof DeleteCustomersCustomerDiscountOutput.Type;

// The operation
/**
 * Delete a customer discount
 *
 * <p>Removes the currently applied discount on a customer.</p>
 */
export const DeleteCustomersCustomerDiscount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCustomersCustomerDiscountInput,
    outputSchema: DeleteCustomersCustomerDiscountOutput,
  }));
