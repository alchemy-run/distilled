import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteAProjectInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/v1/projects/{ref}" }));
export type V1DeleteAProjectInput = typeof V1DeleteAProjectInput.Type;

// Output Schema
export const V1DeleteAProjectOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.Number,
    ref: Schema.String,
    name: Schema.String,
  },
);
export type V1DeleteAProjectOutput = typeof V1DeleteAProjectOutput.Type;

// The operation
/**
 * Deletes the given project
 *
 * @param ref - Project ref
 */
export const v1DeleteAProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1DeleteAProjectInput,
  outputSchema: V1DeleteAProjectOutput,
}));
