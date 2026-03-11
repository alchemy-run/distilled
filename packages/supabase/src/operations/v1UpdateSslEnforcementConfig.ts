import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateSslEnforcementConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    requestedConfig: Schema.Struct({
      database: Schema.Boolean,
    }),
  }).pipe(
    T.Http({ method: "PUT", path: "/v1/projects/{ref}/ssl-enforcement" }),
  );
export type V1UpdateSslEnforcementConfigInput =
  typeof V1UpdateSslEnforcementConfigInput.Type;

// Output Schema
export const V1UpdateSslEnforcementConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    currentConfig: Schema.Struct({
      database: Schema.Boolean,
    }),
    appliedSuccessfully: Schema.Boolean,
  });
export type V1UpdateSslEnforcementConfigOutput =
  typeof V1UpdateSslEnforcementConfigOutput.Type;

// The operation
/**
 * [Beta] Update project's SSL enforcement configuration.
 *
 * @param ref - Project ref
 */
export const v1UpdateSslEnforcementConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1UpdateSslEnforcementConfigInput,
    outputSchema: V1UpdateSslEnforcementConfigOutput,
  }));
