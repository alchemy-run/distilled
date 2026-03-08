import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const UpdateDeployRequestThrottlerInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  number: Schema.Number.pipe(T.PathParam()),
  ratio: Schema.optional(Schema.Number),
  configurations: Schema.optional(Schema.Array(Schema.String)),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/deploy-requests/{number}/throttler",
  }),
);
export type UpdateDeployRequestThrottlerInput =
  typeof UpdateDeployRequestThrottlerInput.Type;

// Output Schema
export const UpdateDeployRequestThrottlerOutput = Schema.Struct({
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
export type UpdateDeployRequestThrottlerOutput =
  typeof UpdateDeployRequestThrottlerOutput.Type;

// The operation
/**
 * Update deploy request throttler configurations
 *
 * @param organization - The name of the deploy request's organization
 * @param database - The name of the deploy request's database
 * @param number - The number of the deploy request
 * @param ratio - A throttler ratio between 0 and 95 that will apply to all keyspaces affected by the deploy request. 0 effectively disables throttler, while 95 drastically slows down migrations in the deploy request
 * @param configurations - If specifying throttler ratios per keyspace, an array of { "keyspace_name": "mykeyspace", "ratio": 10 }, one for each eligible keyspace
 */
export const updateDeployRequestThrottler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UpdateDeployRequestThrottlerInput,
    outputSchema: UpdateDeployRequestThrottlerOutput,
    errors: [Forbidden, NotFound] as const,
  }));
