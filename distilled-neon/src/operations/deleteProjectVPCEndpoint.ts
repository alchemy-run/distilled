import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteProjectVPCEndpointInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  vpc_endpoint_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/projects/{project_id}/vpc_endpoints/{vpc_endpoint_id}" }));
export type DeleteProjectVPCEndpointInput = typeof DeleteProjectVPCEndpointInput.Type;

// Output Schema
export const DeleteProjectVPCEndpointOutput = Schema.Void;
export type DeleteProjectVPCEndpointOutput = typeof DeleteProjectVPCEndpointOutput.Type;

// The operation
/**
 * Delete VPC endpoint restriction
 *
 * Removes the specified VPC endpoint restriction from a Neon project.
 *
 * @param project_id - The Neon project ID
 * @param vpc_endpoint_id - The VPC endpoint ID
 */
export const deleteProjectVPCEndpoint = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteProjectVPCEndpointInput,
  outputSchema: DeleteProjectVPCEndpointOutput,
}));
