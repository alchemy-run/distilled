import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPolicyByIdInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  policyId: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "GET", path: "/v2/policy-engine/policies/{policyId}" }),
);
export type GetPolicyByIdInput = typeof GetPolicyByIdInput.Type;

// Output Schema
export const GetPolicyByIdOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  description: Schema.optional(Schema.String),
  scope: Schema.Literals(["project", "account"]),
  rules: Schema.Array(Schema.Unknown),
  createdAt: Schema.String,
  updatedAt: Schema.String,
});
export type GetPolicyByIdOutput = typeof GetPolicyByIdOutput.Type;

// The operation
/**
 * Get a policy by ID
 *
 * Get a policy by its ID.
 *
 * @param policyId - The ID of the policy to get.
 */
export const getPolicyById = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetPolicyByIdInput,
  outputSchema: GetPolicyByIdOutput,
}));
