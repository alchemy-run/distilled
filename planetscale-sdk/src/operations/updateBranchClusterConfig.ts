import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const UpdateBranchClusterConfigInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  cluster_size: Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/cluster",
  }),
);
export type UpdateBranchClusterConfigInput =
  typeof UpdateBranchClusterConfigInput.Type;

// Output Schema
export const UpdateBranchClusterConfigOutput = Schema.Void;
export type UpdateBranchClusterConfigOutput =
  typeof UpdateBranchClusterConfigOutput.Type;

// The operation
/**
 * Change a branch cluster configuration
 *
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch to configure
 * @param cluster_size - The new size of the database cluster: PS_10, PS_20,…
 */
export const updateBranchClusterConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateBranchClusterConfigInput,
    outputSchema: UpdateBranchClusterConfigOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
