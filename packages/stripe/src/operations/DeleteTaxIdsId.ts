import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteTaxIdsIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/v1/tax_ids/{id}",
    contentType: "form-urlencoded",
  }),
);
export type DeleteTaxIdsIdInput = typeof DeleteTaxIdsIdInput.Type;

// Output Schema
export const DeleteTaxIdsIdOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  deleted: Schema.Literals(["true"]),
  id: Schema.String,
  object: Schema.Literals(["tax_id"]),
});
export type DeleteTaxIdsIdOutput = typeof DeleteTaxIdsIdOutput.Type;

// The operation
/**
 * Delete a tax ID
 *
 * <p>Deletes an existing account or customer <code>tax_id</code> object.</p>
 */
export const DeleteTaxIdsId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteTaxIdsIdInput,
  outputSchema: DeleteTaxIdsIdOutput,
}));
