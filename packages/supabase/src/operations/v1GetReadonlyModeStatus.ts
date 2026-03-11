import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetReadonlyModeStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/readonly" }));
export type V1GetReadonlyModeStatusInput =
  typeof V1GetReadonlyModeStatusInput.Type;

// Output Schema
export const V1GetReadonlyModeStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.Boolean,
    override_enabled: Schema.Boolean,
    override_active_until: Schema.String,
  });
export type V1GetReadonlyModeStatusOutput =
  typeof V1GetReadonlyModeStatusOutput.Type;

// The operation
/**
 * Returns project's readonly mode status
 *
 * @param ref - Project ref
 */
export const v1GetReadonlyModeStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetReadonlyModeStatusInput,
    outputSchema: V1GetReadonlyModeStatusOutput,
  }),
);
