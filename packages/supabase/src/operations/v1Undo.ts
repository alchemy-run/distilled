import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UndoInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
}).pipe(
  T.Http({ method: "POST", path: "/v1/projects/{ref}/database/backups/undo" }),
);
export type V1UndoInput = typeof V1UndoInput.Type;

// Output Schema
export const V1UndoOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1UndoOutput = typeof V1UndoOutput.Type;

// The operation
/**
 * Initiates an undo to a given restore point
 *
 * @param ref - Project ref
 */
export const v1Undo = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1UndoInput,
  outputSchema: V1UndoOutput,
}));
