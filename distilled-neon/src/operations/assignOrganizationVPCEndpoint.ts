import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AssignOrganizationVPCEndpointInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
  region_id: Schema.String.pipe(T.PathParam()),
  vpc_endpoint_id: Schema.String.pipe(T.PathParam()),
  label: Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{org_id}/vpc/region/{region_id}/vpc_endpoints/{vpc_endpoint_id}",
  }),
);
export type AssignOrganizationVPCEndpointInput =
  typeof AssignOrganizationVPCEndpointInput.Type;

// Output Schema
export const AssignOrganizationVPCEndpointOutput = Schema.Void;
export type AssignOrganizationVPCEndpointOutput =
  typeof AssignOrganizationVPCEndpointOutput.Type;

// The operation
/**
 * Assign or update VPC endpoint
 *
 * Assigns a VPC endpoint to a Neon organization or updates its existing assignment.
 *
 * @param org_id - The Neon organization ID
 * @param region_id - The Neon region ID.
Azure regions are currently not supported.

 * @param vpc_endpoint_id - The VPC endpoint ID
 */
export const assignOrganizationVPCEndpoint =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssignOrganizationVPCEndpointInput,
    outputSchema: AssignOrganizationVPCEndpointOutput,
  }));
