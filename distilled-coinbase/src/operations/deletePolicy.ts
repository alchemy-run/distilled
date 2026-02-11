import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { AlreadyExists, IdempotencyError, NotFound, PolicyInUse } from "../errors";

// Input Schema
export const DeletePolicyInput = Schema.Struct({
  policyId: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/v2/policy-engine/policies/{policyId}" }));
export type DeletePolicyInput = typeof DeletePolicyInput.Type;

// Output Schema
export const DeletePolicyOutput = Schema.Void;
export type DeletePolicyOutput = typeof DeletePolicyOutput.Type;

// The operation
/**
 * Delete a policy
 *
 * Delete a policy by its ID. This will have the effect of removing the policy from all accounts that are currently using it.
 *
 * @param policyId - The ID of the policy to delete.
 */
export const deletePolicy = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletePolicyInput,
  outputSchema: DeletePolicyOutput,
  errors: [AlreadyExists, IdempotencyError, NotFound, PolicyInUse],
}));
