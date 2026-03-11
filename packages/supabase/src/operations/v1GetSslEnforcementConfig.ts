import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetSslEnforcementConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/ssl-enforcement" }),
  );
export type V1GetSslEnforcementConfigInput =
  typeof V1GetSslEnforcementConfigInput.Type;

// Output Schema
export const V1GetSslEnforcementConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    currentConfig: Schema.Struct({
      database: Schema.Boolean,
    }),
    appliedSuccessfully: Schema.Boolean,
  });
export type V1GetSslEnforcementConfigOutput =
  typeof V1GetSslEnforcementConfigOutput.Type;

// The operation
/**
 * [Beta] Get project's SSL enforcement configuration.
 *
 * @param ref - Project ref
 */
export const v1GetSslEnforcementConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetSslEnforcementConfigInput,
    outputSchema: V1GetSslEnforcementConfigOutput,
  }),
);
