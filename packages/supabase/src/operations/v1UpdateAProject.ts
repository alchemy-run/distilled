import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateAProjectInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
}).pipe(T.Http({ method: "PATCH", path: "/v1/projects/{ref}" }));
export type V1UpdateAProjectInput = typeof V1UpdateAProjectInput.Type;

// Output Schema
export const V1UpdateAProjectOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.Number,
    ref: Schema.String,
    name: Schema.String,
  },
);
export type V1UpdateAProjectOutput = typeof V1UpdateAProjectOutput.Type;

// The operation
/**
 * Updates the given project
 *
 * @param ref - Project ref
 */
export const v1UpdateAProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1UpdateAProjectInput,
  outputSchema: V1UpdateAProjectOutput,
}));
