import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const StartAnonymizationInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/branches/{branch_id}/anonymize" }));
export type StartAnonymizationInput = typeof StartAnonymizationInput.Type;

// Output Schema
export const StartAnonymizationOutput = Schema.Struct({
  project_id: Schema.String,
  branch_id: Schema.String,
  state: Schema.String,
  status_message: Schema.optional(Schema.String),
  created_at: Schema.String,
  updated_at: Schema.String,
  failed_at: Schema.optional(Schema.String),
  last_run: Schema.optional(Schema.Struct({
    started_at: Schema.optional(Schema.String),
    completed_at: Schema.optional(Schema.String),
    triggered_by: Schema.optional(Schema.String),
    triggered_by_username: Schema.optional(Schema.String),
    masked_columns: Schema.optional(Schema.Number),
  })),
});
export type StartAnonymizationOutput = typeof StartAnonymizationOutput.Type;

// The operation
/**
 * Start anonymization
 *
 * Starts the anonymization process for an anonymized branch that is in the initialized, error, or anonymized state.
 * This will apply all defined masking rules to anonymize sensitive data in the branch databases.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * The branch must be an anonymized branch to start anonymization.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const startAnonymization = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StartAnonymizationInput,
  outputSchema: StartAnonymizationOutput,
}));
