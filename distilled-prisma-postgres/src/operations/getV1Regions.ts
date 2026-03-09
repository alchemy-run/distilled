import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1RegionsInput = Schema.Struct({
  product: Schema.optional(Schema.Literals(["postgres", "accelerate"])),
}).pipe(T.Http({ method: "GET", path: "/v1/regions" }));
export type GetV1RegionsInput = typeof GetV1RegionsInput.Type;

// Output Schema
export const GetV1RegionsOutput = Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      type: Schema.Literal("region"),
      name: Schema.String,
      product: Schema.Literals(["postgres", "accelerate"]),
      status: Schema.optional(Schema.Literals(["available", "unavailable"])),
    }),
  ),
});
export type GetV1RegionsOutput = typeof GetV1RegionsOutput.Type;

// The operation
/**
 * Get all regions
 *
 * Returns all available regions across products. Optionally filter by product.
 */
export const getV1Regions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV1RegionsInput,
  outputSchema: GetV1RegionsOutput,
}));
