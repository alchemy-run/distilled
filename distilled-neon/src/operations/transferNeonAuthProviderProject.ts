import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TransferNeonAuthProviderProjectInput = Schema.Struct({
  project_id: Schema.String,
  auth_provider: Schema.Literal("mock", "stack", "stack_v2", "better_auth"),
}).pipe(T.Http({ method: "POST", path: "/projects/auth/transfer_ownership" }));
export type TransferNeonAuthProviderProjectInput = typeof TransferNeonAuthProviderProjectInput.Type;

// Output Schema
export const TransferNeonAuthProviderProjectOutput = Schema.Struct({
  url: Schema.String,
});
export type TransferNeonAuthProviderProjectOutput = typeof TransferNeonAuthProviderProjectOutput.Type;

// The operation
/**
 * Transfer Neon-managed auth project to your own account
 *
 * Transfer ownership of your Neon-managed auth project to your own auth provider account.
 */
export const transferNeonAuthProviderProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TransferNeonAuthProviderProjectInput,
  outputSchema: TransferNeonAuthProviderProjectOutput,
}));
