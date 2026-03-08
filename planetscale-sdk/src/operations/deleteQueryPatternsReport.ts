import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const DeleteQueryPatternsReportInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/query-patterns/{id}",
  }),
);
export type DeleteQueryPatternsReportInput =
  typeof DeleteQueryPatternsReportInput.Type;

// Output Schema
export const DeleteQueryPatternsReportOutput = Schema.Void;
export type DeleteQueryPatternsReportOutput =
  typeof DeleteQueryPatternsReportOutput.Type;

// The operation
/**
 * Delete a query patterns report
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param id - The ID of the query patterns report
 */
export const deleteQueryPatternsReport = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteQueryPatternsReportInput,
    outputSchema: DeleteQueryPatternsReportOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
