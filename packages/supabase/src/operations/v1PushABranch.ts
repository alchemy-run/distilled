import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1PushABranchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  branch_id_or_ref: Schema.String.pipe(T.PathParam()),
  migration_version: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/v1/branches/{branch_id_or_ref}/push" }),
);
export type V1PushABranchInput = typeof V1PushABranchInput.Type;

// Output Schema
export const V1PushABranchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  workflow_run_id: Schema.String,
  message: Schema.Literals(["ok"]),
});
export type V1PushABranchOutput = typeof V1PushABranchOutput.Type;

// The operation
/**
 * Pushes a database branch
 *
 * Pushes the specified database branch
 *
 * @param branch_id_or_ref - Branch ID
 */
export const v1PushABranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1PushABranchInput,
  outputSchema: V1PushABranchOutput,
}));
