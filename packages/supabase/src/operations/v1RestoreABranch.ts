import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1RestoreABranchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  branch_id_or_ref: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "POST", path: "/v1/branches/{branch_id_or_ref}/restore" }),
);
export type V1RestoreABranchInput = typeof V1RestoreABranchInput.Type;

// Output Schema
export const V1RestoreABranchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    message: Schema.Literals(["Branch restoration initiated"]),
  },
);
export type V1RestoreABranchOutput = typeof V1RestoreABranchOutput.Type;

// The operation
/**
 * Restore a scheduled branch deletion
 *
 * Cancels scheduled deletion and restores the branch to active state
 *
 * @param branch_id_or_ref - Branch ID
 */
export const v1RestoreABranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1RestoreABranchInput,
  outputSchema: V1RestoreABranchOutput,
}));
