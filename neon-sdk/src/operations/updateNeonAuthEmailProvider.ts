import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateNeonAuthEmailProviderInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/projects/{project_id}/branches/{branch_id}/auth/email_provider",
  }),
);
export type UpdateNeonAuthEmailProviderInput =
  typeof UpdateNeonAuthEmailProviderInput.Type;

// Output Schema
export const UpdateNeonAuthEmailProviderOutput = Schema.Unknown;
export type UpdateNeonAuthEmailProviderOutput =
  typeof UpdateNeonAuthEmailProviderOutput.Type;

// The operation
/**
 * Update email provider configuration
 *
 * Updates the email provider configuration for the specified branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const updateNeonAuthEmailProvider = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateNeonAuthEmailProviderInput,
    outputSchema: UpdateNeonAuthEmailProviderOutput,
  }),
);
