import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCustomersCustomerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/customers/{customer}",
      contentType: "form-urlencoded",
    }),
  );
export type GetCustomersCustomerInput = typeof GetCustomersCustomerInput.Type;

// Output Schema
export const GetCustomersCustomerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type GetCustomersCustomerOutput = typeof GetCustomersCustomerOutput.Type;

// The operation
/**
 * Retrieve a customer
 *
 * <p>Retrieves a Customer object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetCustomersCustomer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetCustomersCustomerInput,
    outputSchema: GetCustomersCustomerOutput,
  }),
);
