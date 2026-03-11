import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetPgsodiumConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/pgsodium" }));
export type V1GetPgsodiumConfigInput = typeof V1GetPgsodiumConfigInput.Type;

// Output Schema
export const V1GetPgsodiumConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    root_key: Schema.String,
  });
export type V1GetPgsodiumConfigOutput = typeof V1GetPgsodiumConfigOutput.Type;

// The operation
/**
 * [Beta] Gets project's pgsodium config
 *
 * @param ref - Project ref
 */
export const v1GetPgsodiumConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetPgsodiumConfigInput,
  outputSchema: V1GetPgsodiumConfigOutput,
}));
