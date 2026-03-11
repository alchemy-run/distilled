import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdatePgsodiumConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    root_key: Schema.String,
  }).pipe(T.Http({ method: "PUT", path: "/v1/projects/{ref}/pgsodium" }));
export type V1UpdatePgsodiumConfigInput =
  typeof V1UpdatePgsodiumConfigInput.Type;

// Output Schema
export const V1UpdatePgsodiumConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    root_key: Schema.String,
  });
export type V1UpdatePgsodiumConfigOutput =
  typeof V1UpdatePgsodiumConfigOutput.Type;

// The operation
/**
 * [Beta] Updates project's pgsodium config. Updating the root_key can cause all data encrypted with the older key to become inaccessible.
 *
 * @param ref - Project ref
 */
export const v1UpdatePgsodiumConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdatePgsodiumConfigInput,
    outputSchema: V1UpdatePgsodiumConfigOutput,
  }),
);
