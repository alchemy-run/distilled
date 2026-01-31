import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListDatabaseRegionsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/regions",
  }),
);
export type ListDatabaseRegionsInput = typeof ListDatabaseRegionsInput.Type;

// Output Schema
export const ListDatabaseRegionsOutput = Schema.Struct({
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
      current_default: Schema.Boolean,
    }),
  ),
});
export type ListDatabaseRegionsOutput = typeof ListDatabaseRegionsOutput.Type;

// The operation
/**
 * List database regions
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listDatabaseRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListDatabaseRegionsInput,
  outputSchema: ListDatabaseRegionsOutput,
}));
