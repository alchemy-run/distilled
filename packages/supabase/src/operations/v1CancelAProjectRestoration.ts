import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CancelAProjectRestorationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "POST", path: "/v1/projects/{ref}/restore/cancel" }),
  );
export type V1CancelAProjectRestorationInput =
  typeof V1CancelAProjectRestorationInput.Type;

// Output Schema
export const V1CancelAProjectRestorationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1CancelAProjectRestorationOutput =
  typeof V1CancelAProjectRestorationOutput.Type;

// The operation
/**
 * Cancels the given project restoration
 *
 * @param ref - Project ref
 */
export const v1CancelAProjectRestoration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1CancelAProjectRestorationInput,
    outputSchema: V1CancelAProjectRestorationOutput,
  }),
);
