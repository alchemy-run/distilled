import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteCustomersCustomerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/customers/{customer}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteCustomersCustomerInput =
  typeof DeleteCustomersCustomerInput.Type;

// Output Schema
export const DeleteCustomersCustomerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["customer"]),
  });
export type DeleteCustomersCustomerOutput =
  typeof DeleteCustomersCustomerOutput.Type;

// The operation
/**
 * Delete a customer
 *
 * <p>Permanently deletes a customer. It cannot be undone. Also immediately cancels any active subscriptions on the customer.</p>
 */
export const DeleteCustomersCustomer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteCustomersCustomerInput,
    outputSchema: DeleteCustomersCustomerOutput,
  }),
);
