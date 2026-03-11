import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1MergeABranchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  branch_id_or_ref: Schema.String.pipe(T.PathParam()),
  migration_version: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/v1/branches/{branch_id_or_ref}/merge" }),
);
export type V1MergeABranchInput = typeof V1MergeABranchInput.Type;

// Output Schema
export const V1MergeABranchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflow_run_id: Schema.String,
  message: Schema.Literals(["ok"]),
});
export type V1MergeABranchOutput = typeof V1MergeABranchOutput.Type;

// The operation
/**
 * Merges a database branch
 *
 * Merges the specified database branch
 *
 * @param branch_id_or_ref - Branch ID
 */
export const v1MergeABranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1MergeABranchInput,
  outputSchema: V1MergeABranchOutput,
}));
