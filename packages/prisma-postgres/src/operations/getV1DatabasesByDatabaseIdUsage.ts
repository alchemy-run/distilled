import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1DatabasesByDatabaseIdUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    databaseId: Schema.String.pipe(T.PathParam()),
    startDate: Schema.optional(Schema.String),
    endDate: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "GET", path: "/v1/databases/{databaseId}/usage" }));
export type GetV1DatabasesByDatabaseIdUsageInput =
  typeof GetV1DatabasesByDatabaseIdUsageInput.Type;

// Output Schema
export const GetV1DatabasesByDatabaseIdUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    period: Schema.Struct({
      start: Schema.String,
      end: Schema.String,
    }),
    metrics: Schema.Struct({
      operations: Schema.Struct({
        used: Schema.Number,
        unit: Schema.String,
      }),
      storage: Schema.Struct({
        used: Schema.Number,
        unit: Schema.String,
      }),
    }),
    generatedAt: Schema.String,
  });
export type GetV1DatabasesByDatabaseIdUsageOutput =
  typeof GetV1DatabasesByDatabaseIdUsageOutput.Type;

// The operation
/**
 * Get database usage metrics
 *
 * Returns usage metrics for the specified database.
 */
export const getV1DatabasesByDatabaseIdUsage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1DatabasesByDatabaseIdUsageInput,
    outputSchema: GetV1DatabasesByDatabaseIdUsageOutput,
  }));
