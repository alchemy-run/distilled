import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DiffABranchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  branch_id_or_ref: Schema.String.pipe(T.PathParam()),
  included_schemas: Schema.optional(Schema.String),
  pgdelta: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "GET", path: "/v1/branches/{branch_id_or_ref}/diff" }),
);
export type V1DiffABranchInput = typeof V1DiffABranchInput.Type;

// Output Schema
export const V1DiffABranchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DiffABranchOutput = typeof V1DiffABranchOutput.Type;

// The operation
/**
 * [Beta] Diffs a database branch
 *
 * Diffs the specified database branch
 *
 * @param branch_id_or_ref - Branch ID
 * @param pgdelta - Use pg-delta instead of Migra for diffing when true
 */
export const v1DiffABranch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1DiffABranchInput,
  outputSchema: V1DiffABranchOutput,
}));
