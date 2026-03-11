import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1PauseAProjectInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/pause" }));
export type V1PauseAProjectInput = typeof V1PauseAProjectInput.Type;

// Output Schema
export const V1PauseAProjectOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1PauseAProjectOutput = typeof V1PauseAProjectOutput.Type;

// The operation
/**
 * Pauses the given project
 *
 * @param ref - Project ref
 */
export const v1PauseAProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1PauseAProjectInput,
  outputSchema: V1PauseAProjectOutput,
}));
