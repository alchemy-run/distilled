import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetQueryPatternsReportInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/query-patterns/{id}/download",
  }),
);
export type GetQueryPatternsReportInput =
  typeof GetQueryPatternsReportInput.Type;

// Output Schema
export const GetQueryPatternsReportOutput = Schema.Void;
export type GetQueryPatternsReportOutput =
  typeof GetQueryPatternsReportOutput.Type;

// The operation
/**
 * Download a finished query patterns report
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param id - The ID of the query patterns report
 */
export const getQueryPatternsReport = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetQueryPatternsReportInput,
    outputSchema: GetQueryPatternsReportOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
