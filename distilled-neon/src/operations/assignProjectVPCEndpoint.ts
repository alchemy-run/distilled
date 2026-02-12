import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AssignProjectVPCEndpointInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  vpc_endpoint_id: Schema.String.pipe(T.PathParam()),
  label: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/vpc_endpoints/{vpc_endpoint_id}" }));
export type AssignProjectVPCEndpointInput = typeof AssignProjectVPCEndpointInput.Type;

// Output Schema
export const AssignProjectVPCEndpointOutput = Schema.Void;
export type AssignProjectVPCEndpointOutput = typeof AssignProjectVPCEndpointOutput.Type;

// The operation
/**
 * Set VPC endpoint restriction
 *
 * Sets or updates a VPC endpoint restriction for a Neon project.
 * When a VPC endpoint restriction is set, the project only accepts connections
 * from the specified VPC.
 * A VPC endpoint can be set as a restriction only after it is assigned to the
 * parent organization of the Neon project.
 *
 * @param project_id - The Neon project ID
 * @param vpc_endpoint_id - The VPC endpoint ID
 */
export const assignProjectVPCEndpoint = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AssignProjectVPCEndpointInput,
  outputSchema: AssignProjectVPCEndpointOutput,
}));
