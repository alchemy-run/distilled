import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrganizationVPCEndpointsAllRegionsInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/organizations/{org_id}/vpc/vpc_endpoints" }));
export type ListOrganizationVPCEndpointsAllRegionsInput = typeof ListOrganizationVPCEndpointsAllRegionsInput.Type;

// Output Schema
export const ListOrganizationVPCEndpointsAllRegionsOutput = Schema.Struct({
  endpoints: Schema.Array(Schema.Struct({
    vpc_endpoint_id: Schema.String,
    label: Schema.String,
    region_id: Schema.String,
  })),
});
export type ListOrganizationVPCEndpointsAllRegionsOutput = typeof ListOrganizationVPCEndpointsAllRegionsOutput.Type;

// The operation
/**
 * List VPC endpoints across all regions
 *
 * Retrieves the list of VPC endpoints for the specified Neon organization across all regions.
 *
 * @param org_id - The Neon organization ID
 */
export const listOrganizationVPCEndpointsAllRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrganizationVPCEndpointsAllRegionsInput,
  outputSchema: ListOrganizationVPCEndpointsAllRegionsOutput,
}));
