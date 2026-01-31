import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetDeployRequestThrottlerInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  number: Schema.Number.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/deploy-requests/{number}/throttler",
  }),
);
export type GetDeployRequestThrottlerInput =
  typeof GetDeployRequestThrottlerInput.Type;

// Output Schema
export const GetDeployRequestThrottlerOutput = Schema.Struct({
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
export type GetDeployRequestThrottlerOutput =
  typeof GetDeployRequestThrottlerOutput.Type;

// The operation
/**
 * Get deploy request throttler configurations
 *
 * @param organization - The name of the deploy request's organization
 * @param database - The name of the deploy request's database
 * @param number - The number of the deploy request
 */
export const getDeployRequestThrottler = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetDeployRequestThrottlerInput,
    outputSchema: GetDeployRequestThrottlerOutput,
  }),
);
