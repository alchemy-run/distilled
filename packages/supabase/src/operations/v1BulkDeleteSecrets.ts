import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1BulkDeleteSecretsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "DELETE", path: "/v1/projects/{ref}/secrets" }));
export type V1BulkDeleteSecretsInput = typeof V1BulkDeleteSecretsInput.Type;

// Output Schema
export const V1BulkDeleteSecretsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1BulkDeleteSecretsOutput = typeof V1BulkDeleteSecretsOutput.Type;

// The operation
/**
 * Bulk delete secrets
 *
 * Deletes all secrets with the given names from the specified project
 *
 * @param ref - Project ref
 */
export const v1BulkDeleteSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1BulkDeleteSecretsInput,
  outputSchema: V1BulkDeleteSecretsOutput,
}));
