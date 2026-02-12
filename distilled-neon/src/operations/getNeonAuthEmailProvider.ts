import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetNeonAuthEmailProviderInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/branches/{branch_id}/auth/email_provider" }));
export type GetNeonAuthEmailProviderInput = typeof GetNeonAuthEmailProviderInput.Type;

// Output Schema
export const GetNeonAuthEmailProviderOutput = Schema.Unknown;
export type GetNeonAuthEmailProviderOutput = typeof GetNeonAuthEmailProviderOutput.Type;

// The operation
/**
 * Get email provider configuration
 *
 * Gets the email provider configuration for the specified branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const getNeonAuthEmailProvider = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetNeonAuthEmailProviderInput,
  outputSchema: GetNeonAuthEmailProviderOutput,
}));
