import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListDatabasePostgresCidrsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/cidrs",
  }),
);
export type ListDatabasePostgresCidrsInput =
  typeof ListDatabasePostgresCidrsInput.Type;

// Output Schema
export const ListDatabasePostgresCidrsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      schema: Schema.String,
      role: Schema.String,
      cidrs: Schema.Array(Schema.String),
      created_at: Schema.String,
      updated_at: Schema.String,
      deleted_at: Schema.String,
      actor: Schema.Struct({
        id: Schema.String,
        display_name: Schema.String,
        avatar_url: Schema.String,
      }),
    }),
  ),
});
export type ListDatabasePostgresCidrsOutput =
  typeof ListDatabasePostgresCidrsOutput.Type;

// The operation
/**
 * List IP restriction entries
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listDatabasePostgresCidrs = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListDatabasePostgresCidrsInput,
    outputSchema: ListDatabasePostgresCidrsOutput,
  }),
);
