import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAnonymizedBranchStatusInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/anonymized_status",
  }),
);
export type GetAnonymizedBranchStatusInput =
  typeof GetAnonymizedBranchStatusInput.Type;

// Output Schema
export const GetAnonymizedBranchStatusOutput = Schema.Struct({
  project_id: Schema.String,
  branch_id: Schema.String,
  state: Schema.String,
  status_message: Schema.optional(Schema.String),
  created_at: Schema.String,
  updated_at: Schema.String,
  failed_at: Schema.optional(Schema.String),
  last_run: Schema.optional(
    Schema.Struct({
      started_at: Schema.optional(Schema.String),
      completed_at: Schema.optional(Schema.String),
      triggered_by: Schema.optional(Schema.String),
      triggered_by_username: Schema.optional(Schema.String),
      masked_columns: Schema.optional(Schema.Number),
    }),
  ),
});
export type GetAnonymizedBranchStatusOutput =
  typeof GetAnonymizedBranchStatusOutput.Type;

// The operation
/**
 * Get anonymized branch status
 *
 * Retrieves the current status of an anonymized branch, including its state and progress information.
 * This endpoint allows you to monitor the anonymization process from initialization through completion.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * Only anonymized branches will have status information available.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const getAnonymizedBranchStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetAnonymizedBranchStatusInput,
    outputSchema: GetAnonymizedBranchStatusOutput,
  }),
);
