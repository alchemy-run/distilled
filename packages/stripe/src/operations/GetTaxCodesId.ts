import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTaxCodesIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/tax_codes/{id}",
    contentType: "form-urlencoded",
  }),
);
export type GetTaxCodesIdInput = typeof GetTaxCodesIdInput.Type;

// Output Schema
export const GetTaxCodesIdOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  description: Schema.String,
  id: Schema.String,
  name: Schema.String,
  object: Schema.Literals(["tax_code"]),
});
export type GetTaxCodesIdOutput = typeof GetTaxCodesIdOutput.Type;

// The operation
/**
 * Retrieve a tax code
 *
 * <p>Retrieves the details of an existing tax code. Supply the unique tax code ID and Stripe will return the corresponding tax code information.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTaxCodesId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetTaxCodesIdInput,
  outputSchema: GetTaxCodesIdOutput,
}));
