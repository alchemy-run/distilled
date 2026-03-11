import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1RestoreAProjectInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
  },
).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/restore" }));
export type V1RestoreAProjectInput = typeof V1RestoreAProjectInput.Type;

// Output Schema
export const V1RestoreAProjectOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1RestoreAProjectOutput = typeof V1RestoreAProjectOutput.Type;

// The operation
/**
 * Restores the given project
 *
 * @param ref - Project ref
 */
export const v1RestoreAProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1RestoreAProjectInput,
  outputSchema: V1RestoreAProjectOutput,
}));
