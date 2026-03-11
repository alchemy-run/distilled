import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateProjectLegacyApiKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    enabled: Schema.Boolean,
  }).pipe(
    T.Http({ method: "PUT", path: "/v1/projects/{ref}/api-keys/legacy" }),
  );
export type V1UpdateProjectLegacyApiKeysInput =
  typeof V1UpdateProjectLegacyApiKeysInput.Type;

// Output Schema
export const V1UpdateProjectLegacyApiKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    enabled: Schema.Boolean,
  });
export type V1UpdateProjectLegacyApiKeysOutput =
  typeof V1UpdateProjectLegacyApiKeysOutput.Type;

// The operation
/**
 * Disable or re-enable JWT based legacy (anon, service_role) API keys. This API endpoint will be removed in the future, check for HTTP 404 Not Found.
 *
 * @param ref - Project ref
 * @param enabled - Boolean string, true or false
 */
export const v1UpdateProjectLegacyApiKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1UpdateProjectLegacyApiKeysInput,
    outputSchema: V1UpdateProjectLegacyApiKeysOutput,
  }));
