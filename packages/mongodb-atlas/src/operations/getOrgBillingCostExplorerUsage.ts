import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgBillingCostExplorerUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    token: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/orgs/{orgId}/billing/costExplorer/usage/{token}",
    }),
  );
export type GetOrgBillingCostExplorerUsageInput =
  typeof GetOrgBillingCostExplorerUsageInput.Type;

// Output Schema
export const GetOrgBillingCostExplorerUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgBillingCostExplorerUsageOutput =
  typeof GetOrgBillingCostExplorerUsageOutput.Type;

// The operation
/**
 * Return Usage Details for One Cost Explorer Query
 *
 * Returns the usage details for a Cost Explorer query, if the query is finished and the data is ready to be viewed. If the data is not ready, a 'processing' response will indicate that another request should be sent later to view the data.
 *
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param token - Unique 64 digit string that identifies the Cost Explorer query.
 */
export const getOrgBillingCostExplorerUsage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetOrgBillingCostExplorerUsageInput,
    outputSchema: GetOrgBillingCostExplorerUsageOutput,
  }));
