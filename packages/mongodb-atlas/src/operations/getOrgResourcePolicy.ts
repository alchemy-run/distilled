import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgResourcePolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    resourcePolicyId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/orgs/{orgId}/resourcePolicies/{resourcePolicyId}",
    }),
  );
export type GetOrgResourcePolicyInput = typeof GetOrgResourcePolicyInput.Type;

// Output Schema
export const GetOrgResourcePolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgResourcePolicyOutput = typeof GetOrgResourcePolicyOutput.Type;

// The operation
/**
 * Return One Atlas Resource Policy
 *
 * Return one Atlas Resource Policy for an organization.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param resourcePolicyId - Unique 24-hexadecimal digit string that identifies an atlas resource policy.
 */
export const getOrgResourcePolicy = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetOrgResourcePolicyInput,
    outputSchema: GetOrgResourcePolicyOutput,
  }),
);
