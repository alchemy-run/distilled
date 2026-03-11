import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdatePolicyInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  policyId: Schema.String.pipe(T.PathParam()),
  description: Schema.optional(Schema.String),
  rules: Schema.Array(Schema.Unknown),
}).pipe(
  T.Http({ method: "PUT", path: "/v2/policy-engine/policies/{policyId}" }),
);
export type UpdatePolicyInput = typeof UpdatePolicyInput.Type;

// Output Schema
export const UpdatePolicyOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  description: Schema.optional(Schema.String),
  scope: Schema.Literals(["project", "account"]),
  rules: Schema.Array(Schema.Unknown),
  createdAt: Schema.String,
  updatedAt: Schema.String,
});
export type UpdatePolicyOutput = typeof UpdatePolicyOutput.Type;

// The operation
/**
 * Update a policy
 *
 * Updates a policy by its ID. This will have the effect of applying the updated policy to all accounts that are currently using it.
 *
 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param policyId - The ID of the policy to update.
 */
export const updatePolicy = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatePolicyInput,
  outputSchema: UpdatePolicyOutput,
}));
