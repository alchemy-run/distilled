import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetKeyspaceRolloutStatusInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  keyspace: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/keyspaces/{keyspace}/rollout-status",
  }),
);
export type GetKeyspaceRolloutStatusInput =
  typeof GetKeyspaceRolloutStatusInput.Type;

// Output Schema
export const GetKeyspaceRolloutStatusOutput = Schema.Struct({
  name: Schema.String,
  state: Schema.String,
  shards: Schema.Array(
    Schema.Struct({
      name: Schema.String,
      last_rollout_started_at: Schema.String,
      last_rollout_finished_at: Schema.String,
      state: Schema.String,
    }),
  ),
});
export type GetKeyspaceRolloutStatusOutput =
  typeof GetKeyspaceRolloutStatusOutput.Type;

// The operation
/**
 * Get keyspace rollout status
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 * @param keyspace - The name of the keyspace
 */
export const getKeyspaceRolloutStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetKeyspaceRolloutStatusInput,
    outputSchema: GetKeyspaceRolloutStatusOutput,
  }),
);
