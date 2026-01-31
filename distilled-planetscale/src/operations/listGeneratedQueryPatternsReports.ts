import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGeneratedQueryPatternsReportsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/query-patterns",
  }),
);
export type ListGeneratedQueryPatternsReportsInput =
  typeof ListGeneratedQueryPatternsReportsInput.Type;

// Output Schema
export const ListGeneratedQueryPatternsReportsOutput = Schema.Struct({
  has_next: Schema.Boolean,
  has_prev: Schema.Boolean,
  cursor_start: Schema.String,
  cursor_end: Schema.String,
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      state: Schema.Literal("pending", "completed", "failed"),
      created_at: Schema.String,
      finished_at: Schema.String,
      url: Schema.String,
      download_url: Schema.String,
      actor: Schema.Struct({
        id: Schema.String,
        display_name: Schema.String,
        avatar_url: Schema.String,
      }),
    }),
  ),
});
export type ListGeneratedQueryPatternsReportsOutput =
  typeof ListGeneratedQueryPatternsReportsOutput.Type;

// The operation
/**
 * List generated query patterns reports
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 */
export const listGeneratedQueryPatternsReports =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGeneratedQueryPatternsReportsInput,
    outputSchema: ListGeneratedQueryPatternsReportsOutput,
  }));
