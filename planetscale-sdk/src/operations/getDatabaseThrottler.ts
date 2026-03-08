import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const GetDatabaseThrottlerInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/throttler",
  }),
);
export type GetDatabaseThrottlerInput = typeof GetDatabaseThrottlerInput.Type;

// Output Schema
export const GetDatabaseThrottlerOutput = Schema.Struct({
  keyspaces: Schema.Array(Schema.String),
  configurable: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.String,
  }),
  configurations: Schema.Array(
    Schema.Struct({
      keyspace_name: Schema.String,
      ratio: Schema.Number,
    }),
  ),
});
export type GetDatabaseThrottlerOutput = typeof GetDatabaseThrottlerOutput.Type;

// The operation
/**
 * Get database throttler configurations
 *
 * @param organization - The name of the organization that the throttled deploy requests belong to
 * @param database - The name of the database that the throttled deploy requests belong to
 */
export const getDatabaseThrottler = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetDatabaseThrottlerInput,
    outputSchema: GetDatabaseThrottlerOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
