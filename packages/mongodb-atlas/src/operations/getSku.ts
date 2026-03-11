import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSkuInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  skuId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2/skus/{skuId}" }));
export type GetSkuInput = typeof GetSkuInput.Type;

// Output Schema
export const GetSkuOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetSkuOutput = typeof GetSkuOutput.Type;

// The operation
/**
 * Return One Stock Keeping Unit
 *
 * Returns details about a single SKU (Stock Keeping Unit) by its identifier. SKUs represent different products and services offered by MongoDB.
 *
 * @param skuId - Unique identifier of the SKU to retrieve.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const getSku = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSkuInput,
  outputSchema: GetSkuOutput,
}));
