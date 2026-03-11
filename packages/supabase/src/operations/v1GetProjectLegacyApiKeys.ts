import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectLegacyApiKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/api-keys/legacy" }),
  );
export type V1GetProjectLegacyApiKeysInput =
  typeof V1GetProjectLegacyApiKeysInput.Type;

// Output Schema
export const V1GetProjectLegacyApiKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.Boolean,
  });
export type V1GetProjectLegacyApiKeysOutput =
  typeof V1GetProjectLegacyApiKeysOutput.Type;

// The operation
/**
 * Check whether JWT based legacy (anon, service_role) API keys are enabled. This API endpoint will be removed in the future, check for HTTP 404 Not Found.
 *
 * @param ref - Project ref
 */
export const v1GetProjectLegacyApiKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetProjectLegacyApiKeysInput,
    outputSchema: V1GetProjectLegacyApiKeysOutput,
  }),
);
