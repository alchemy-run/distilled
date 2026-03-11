import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteHostnameConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "DELETE", path: "/v1/projects/{ref}/custom-hostname" }),
  );
export type V1DeleteHostnameConfigInput =
  typeof V1DeleteHostnameConfigInput.Type;

// Output Schema
export const V1DeleteHostnameConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DeleteHostnameConfigOutput =
  typeof V1DeleteHostnameConfigOutput.Type;

// The operation
/**
 * [Beta] Deletes a project's custom hostname configuration
 *
 * @param ref - Project ref
 */
export const v1DeleteHostnameConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1DeleteHostnameConfigInput,
    outputSchema: V1DeleteHostnameConfigOutput,
  }),
);
