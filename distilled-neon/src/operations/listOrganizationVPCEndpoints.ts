import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrganizationVPCEndpointsInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
  region_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/organizations/{org_id}/vpc/region/{region_id}/vpc_endpoints" }));
export type ListOrganizationVPCEndpointsInput = typeof ListOrganizationVPCEndpointsInput.Type;

// Output Schema
export const ListOrganizationVPCEndpointsOutput = Schema.Struct({
  endpoints: Schema.Array(Schema.Struct({
    vpc_endpoint_id: Schema.String,
    label: Schema.String,
  })),
});
export type ListOrganizationVPCEndpointsOutput = typeof ListOrganizationVPCEndpointsOutput.Type;

// The operation
/**
 * List VPC endpoints
 *
 * Retrieves the list of VPC endpoints for the specified Neon organization.
 *
 * @param org_id - The Neon organization ID
 * @param region_id - The Neon region ID
 */
export const listOrganizationVPCEndpoints = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrganizationVPCEndpointsInput,
  outputSchema: ListOrganizationVPCEndpointsOutput,
}));
