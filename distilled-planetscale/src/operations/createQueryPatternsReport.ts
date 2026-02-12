import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CreateQueryPatternsReportInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/query-patterns",
  }),
);
export type CreateQueryPatternsReportInput =
  typeof CreateQueryPatternsReportInput.Type;

// Output Schema
export const CreateQueryPatternsReportOutput = Schema.Struct({
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
export type CreateQueryPatternsReportOutput =
  typeof CreateQueryPatternsReportOutput.Type;

// The operation
/**
 * Create a new query patterns report
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 */
export const createQueryPatternsReport = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateQueryPatternsReportInput,
    outputSchema: CreateQueryPatternsReportOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
