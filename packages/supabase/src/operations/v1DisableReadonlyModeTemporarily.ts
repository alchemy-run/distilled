import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DisableReadonlyModeTemporarilyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/readonly/temporary-disable",
    }),
  );
export type V1DisableReadonlyModeTemporarilyInput =
  typeof V1DisableReadonlyModeTemporarilyInput.Type;

// Output Schema
export const V1DisableReadonlyModeTemporarilyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DisableReadonlyModeTemporarilyOutput =
  typeof V1DisableReadonlyModeTemporarilyOutput.Type;

// The operation
/**
 * Disables project's readonly mode for the next 15 minutes
 *
 * @param ref - Project ref
 */
export const v1DisableReadonlyModeTemporarily =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1DisableReadonlyModeTemporarilyInput,
    outputSchema: V1DisableReadonlyModeTemporarilyOutput,
  }));
