import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCustomersCustomerSourcesIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/customers/{customer}/sources/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetCustomersCustomerSourcesIdInput =
  typeof GetCustomersCustomerSourcesIdInput.Type;

// Output Schema
export const GetCustomersCustomerSourcesIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type GetCustomersCustomerSourcesIdOutput =
  typeof GetCustomersCustomerSourcesIdOutput.Type;

// The operation
/**
 * <p>Retrieve a specified source for a given customer.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetCustomersCustomerSourcesId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetCustomersCustomerSourcesIdInput,
    outputSchema: GetCustomersCustomerSourcesIdOutput,
  }));
