import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DisablePreviewBranchingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "DELETE", path: "/v1/projects/{ref}/branches" }));
export type V1DisablePreviewBranchingInput =
  typeof V1DisablePreviewBranchingInput.Type;

// Output Schema
export const V1DisablePreviewBranchingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DisablePreviewBranchingOutput =
  typeof V1DisablePreviewBranchingOutput.Type;

// The operation
/**
 * Disables preview branching
 *
 * Disables preview branching for the specified project
 *
 * @param ref - Project ref
 */
export const v1DisablePreviewBranching = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1DisablePreviewBranchingInput,
    outputSchema: V1DisablePreviewBranchingOutput,
  }),
);
