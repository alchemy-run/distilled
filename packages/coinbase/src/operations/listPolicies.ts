import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListPoliciesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.Literals(["project", "account"])),
}).pipe(T.Http({ method: "GET", path: "/v2/policy-engine/policies" }));
export type ListPoliciesInput = typeof ListPoliciesInput.Type;

// Output Schema
export const ListPoliciesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  policies: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      description: Schema.optional(Schema.String),
      scope: Schema.Literals(["project", "account"]),
      rules: Schema.Array(Schema.Unknown),
      createdAt: Schema.String,
      updatedAt: Schema.String,
    }),
  ),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListPoliciesOutput = typeof ListPoliciesOutput.Type;

// The operation
/**
 * List policies
 *
 * Lists the policies belonging to the developer's CDP Project. Use the `scope` parameter to filter the policies by scope.
 * The response is paginated, and by default, returns 20 policies per page.
 *
 * @param pageSize - The number of resources to return per page.
 * @param pageToken - The token for the next page of resources, if any.
 * @param scope - The scope of the policies to return. If `project`, the response will include exactly one policy, which is the project-level policy. If `account`, the response will include all account-level policies for the developer's CDP Project.
 */
export const listPolicies = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListPoliciesInput,
  outputSchema: ListPoliciesOutput,
}));
