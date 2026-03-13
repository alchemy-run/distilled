import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListLocationsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(T.Http({ method: "GET", path: "/v1/locations" }));
export type ListLocationsInput = typeof ListLocationsInput.Type;

// Output Schema
export const ListLocationsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  locations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ListLocationsOutput = typeof ListLocationsOutput.Type;

// The operation
/**
 * List Locations
 *
 * Returns a list of locations where you can create or replicate databases.
 */
export const listLocations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListLocationsInput,
  outputSchema: ListLocationsOutput,
}));
