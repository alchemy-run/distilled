import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteCustomersCustomerSourcesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/customers/{customer}/sources/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteCustomersCustomerSourcesIdInput =
  typeof DeleteCustomersCustomerSourcesIdInput.Type;

// Output Schema
export const DeleteCustomersCustomerSourcesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type DeleteCustomersCustomerSourcesIdOutput =
  typeof DeleteCustomersCustomerSourcesIdOutput.Type;

// The operation
/**
 * Delete a customer source
 *
 * <p>Delete a specified source for a given customer.</p>
 */
export const DeleteCustomersCustomerSourcesId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteCustomersCustomerSourcesIdInput,
    outputSchema: DeleteCustomersCustomerSourcesIdOutput,
  }));
