import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteABranchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  branch_id_or_ref: Schema.String.pipe(T.PathParam()),
  force: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "DELETE", path: "/v1/branches/{branch_id_or_ref}" }));
export type V1DeleteABranchInput = typeof V1DeleteABranchInput.Type;

// Output Schema
export const V1DeleteABranchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  message: Schema.Literals(["ok"]),
});
export type V1DeleteABranchOutput = typeof V1DeleteABranchOutput.Type;

// The operation
/**
 * Delete a database branch
 *
 * Deletes the specified database branch. By default, deletes immediately. Use force=false to schedule deletion with 1-hour grace period (only when soft deletion is enabled).
 *
 * @param branch_id_or_ref - Branch ID
 * @param force - If set to false, schedule deletion with 1-hour grace period (only when soft deletion is enabled).
 */
export const v1DeleteABranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1DeleteABranchInput,
  outputSchema: V1DeleteABranchOutput,
}));
