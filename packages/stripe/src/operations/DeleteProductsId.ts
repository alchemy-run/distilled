import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteProductsIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/v1/products/{id}",
    contentType: "form-urlencoded",
  }),
);
export type DeleteProductsIdInput = typeof DeleteProductsIdInput.Type;

// Output Schema
export const DeleteProductsIdOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["product"]),
  },
);
export type DeleteProductsIdOutput = typeof DeleteProductsIdOutput.Type;

// The operation
/**
 * Delete a product
 *
 * <p>Delete a product. Deleting a product is only possible if it has no prices associated with it. Additionally, deleting a product with <code>type=good</code> is only possible if it has no SKUs associated with it.</p>
 */
export const DeleteProductsId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteProductsIdInput,
  outputSchema: DeleteProductsIdOutput,
}));
