import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreatePolicyInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.Literals(["project", "account"]),
  description: Schema.optional(Schema.String),
  rules: Schema.Array(Schema.Unknown),
}).pipe(T.Http({ method: "POST", path: "/v2/policy-engine/policies" }));
export type CreatePolicyInput = typeof CreatePolicyInput.Type;

// Output Schema
export const CreatePolicyOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  description: Schema.optional(Schema.String),
  scope: Schema.Literals(["project", "account"]),
  rules: Schema.Array(Schema.Unknown),
  createdAt: Schema.String,
  updatedAt: Schema.String,
});
export type CreatePolicyOutput = typeof CreatePolicyOutput.Type;

// The operation
/**
 * Create a policy
 *
 * Create a policy that can be used to govern the behavior of accounts.
 *
 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const createPolicy = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreatePolicyInput,
  outputSchema: CreatePolicyOutput,
}));
