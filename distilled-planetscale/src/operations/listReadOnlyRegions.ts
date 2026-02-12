import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListReadOnlyRegionsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/read-only-regions",
  }),
);
export type ListReadOnlyRegionsInput = typeof ListReadOnlyRegionsInput.Type;

// Output Schema
export const ListReadOnlyRegionsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      display_name: Schema.String,
      created_at: Schema.String,
      updated_at: Schema.String,
      ready_at: Schema.String,
      ready: Schema.Boolean,
      actor: Schema.Struct({
        id: Schema.String,
        display_name: Schema.String,
        avatar_url: Schema.String,
      }),
      region: Schema.Struct({
        id: Schema.String,
        provider: Schema.String,
        enabled: Schema.Boolean,
        public_ip_addresses: Schema.Array(Schema.String),
        display_name: Schema.String,
        location: Schema.String,
        slug: Schema.String,
        current_default: Schema.Boolean,
      }),
    }),
  ),
});
export type ListReadOnlyRegionsOutput = typeof ListReadOnlyRegionsOutput.Type;

// The operation
/**
 * List read-only regions
 *
 * List read-only regions for the database's default branch
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listReadOnlyRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListReadOnlyRegionsInput,
  outputSchema: ListReadOnlyRegionsOutput,
  errors: [Forbidden, NotFound] as const,
}));
