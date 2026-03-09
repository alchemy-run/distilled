import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateMaskingRulesInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  masking_rules: Schema.Array(
    Schema.Struct({
      database_name: Schema.String,
      schema_name: Schema.String,
      table_name: Schema.String,
      column_name: Schema.String,
      masking_function: Schema.optional(Schema.String),
      masking_value: Schema.optional(Schema.String),
    }),
  ),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/projects/{project_id}/branches/{branch_id}/masking_rules",
  }),
);
export type UpdateMaskingRulesInput = typeof UpdateMaskingRulesInput.Type;

// Output Schema
export const UpdateMaskingRulesOutput = Schema.Struct({
  masking_rules: Schema.Array(
    Schema.Struct({
      database_name: Schema.String,
      schema_name: Schema.String,
      table_name: Schema.String,
      column_name: Schema.String,
      masking_function: Schema.optional(Schema.String),
      masking_value: Schema.optional(Schema.String),
    }),
  ),
});
export type UpdateMaskingRulesOutput = typeof UpdateMaskingRulesOutput.Type;

// The operation
/**
 * Update masking rules
 *
 * Updates the masking rules for the specified anonymized branch.
 * Masking rules define how sensitive data should be anonymized using PostgreSQL Anonymizer.
 * You can obtain a `project_id` by listing the projects for your Neon account.
 * You can obtain the `branch_id` by listing the project's branches.
 * **Note**: This endpoint is currently in Beta.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The branch ID
 */
export const updateMaskingRules = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateMaskingRulesInput,
  outputSchema: UpdateMaskingRulesOutput,
}));
