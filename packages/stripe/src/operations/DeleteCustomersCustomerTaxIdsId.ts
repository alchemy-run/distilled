import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteCustomersCustomerTaxIdsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/customers/{customer}/tax_ids/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteCustomersCustomerTaxIdsIdInput =
  typeof DeleteCustomersCustomerTaxIdsIdInput.Type;

// Output Schema
export const DeleteCustomersCustomerTaxIdsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["tax_id"]),
  });
export type DeleteCustomersCustomerTaxIdsIdOutput =
  typeof DeleteCustomersCustomerTaxIdsIdOutput.Type;

// The operation
/**
 * Delete a Customer tax ID
 *
 * <p>Deletes an existing <code>tax_id</code> object.</p>
 */
export const DeleteCustomersCustomerTaxIdsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCustomersCustomerTaxIdsIdInput,
    outputSchema: DeleteCustomersCustomerTaxIdsIdOutput,
  }));
