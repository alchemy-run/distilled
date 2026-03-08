import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetActiveRegionsInput = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/regions" }),
);
export type GetActiveRegionsInput = typeof GetActiveRegionsInput.Type;

// Output Schema
export const GetActiveRegionsOutput = Schema.Struct({
  regions: Schema.Array(
    Schema.Struct({
      region_id: Schema.String,
      name: Schema.String,
      default: Schema.Boolean,
      geo_lat: Schema.String,
      geo_long: Schema.String,
    }),
  ),
});
export type GetActiveRegionsOutput = typeof GetActiveRegionsOutput.Type;

// The operation
/**
 * List supported regions
 *
 * Lists supported Neon regions
 */
export const getActiveRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetActiveRegionsInput,
  outputSchema: GetActiveRegionsOutput,
}));
