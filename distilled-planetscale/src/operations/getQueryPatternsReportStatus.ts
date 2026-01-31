import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetQueryPatternsReportStatusInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/query-patterns/{id}",
  }),
);
export type GetQueryPatternsReportStatusInput =
  typeof GetQueryPatternsReportStatusInput.Type;

// Output Schema
export const GetQueryPatternsReportStatusOutput = Schema.Struct({
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
});
export type GetQueryPatternsReportStatusOutput =
  typeof GetQueryPatternsReportStatusOutput.Type;

// The operation
/**
 * Show the status of a query patterns report
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param id - The ID of the query patterns report
 */
export const getQueryPatternsReportStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetQueryPatternsReportStatusInput,
    outputSchema: GetQueryPatternsReportStatusOutput,
  }));
