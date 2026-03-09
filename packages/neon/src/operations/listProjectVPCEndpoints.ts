import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListProjectVPCEndpointsInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "GET", path: "/projects/{project_id}/vpc_endpoints" }),
);
export type ListProjectVPCEndpointsInput =
  typeof ListProjectVPCEndpointsInput.Type;

// Output Schema
export const ListProjectVPCEndpointsOutput = Schema.Struct({
  endpoints: Schema.Array(
    Schema.Struct({
      vpc_endpoint_id: Schema.String,
      label: Schema.String,
    }),
  ),
});
export type ListProjectVPCEndpointsOutput =
  typeof ListProjectVPCEndpointsOutput.Type;

// The operation
/**
 * List VPC endpoint restrictions
 *
 * Lists VPC endpoint restrictions for the specified Neon project.
 *
 * @param project_id - The Neon project ID
 */
export const listProjectVPCEndpoints = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListProjectVPCEndpointsInput,
    outputSchema: ListProjectVPCEndpointsOutput,
  }),
);
