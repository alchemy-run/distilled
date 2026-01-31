import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListPublicRegionsInput = Schema.Struct({
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(T.Http({ method: "GET", path: "/regions" }));
export type ListPublicRegionsInput = typeof ListPublicRegionsInput.Type;

// Output Schema
export const ListPublicRegionsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      provider: Schema.String,
      enabled: Schema.Boolean,
      public_ip_addresses: Schema.Array(Schema.String),
      display_name: Schema.String,
      location: Schema.String,
      slug: Schema.String,
    }),
  ),
});
export type ListPublicRegionsOutput = typeof ListPublicRegionsOutput.Type;

// The operation
/**
 * List public regions
 *
 * Endpoint is available without authentication.
 *
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listPublicRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListPublicRegionsInput,
  outputSchema: ListPublicRegionsOutput,
}));
