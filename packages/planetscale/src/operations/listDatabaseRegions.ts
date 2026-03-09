import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListDatabaseRegionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export const ListDatabaseRegionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param database - Database name slug from `list_databases`. Example: `app-db`.
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listDatabaseRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListDatabaseRegionsInput,
  outputSchema: ListDatabaseRegionsOutput,
  errors: [Forbidden, NotFound] as const,
}));
