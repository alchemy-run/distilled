import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetDatabaseStatsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/organizations/{organizationSlug}/databases/{databaseName}/stats",
  }),
);
export type GetDatabaseStatsInput = typeof GetDatabaseStatsInput.Type;

// Output Schema
export const GetDatabaseStatsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    top_queries: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.Struct({
            query: Schema.optional(Schema.String),
            rows_read: Schema.optional(Schema.Number),
            rows_written: Schema.optional(Schema.Number),
          }),
        ),
      ),
    ),
  },
);
export type GetDatabaseStatsOutput = typeof GetDatabaseStatsOutput.Type;

// The operation
/**
 * Retrieve Database Stats
 *
 * Fetch the top queries of a database, including the count of rows read and written.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 */
export const getDatabaseStats = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetDatabaseStatsInput,
  outputSchema: GetDatabaseStatsOutput,
}));
