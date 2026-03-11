import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1BulkCreateSecretsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/secrets" }));
export type V1BulkCreateSecretsInput = typeof V1BulkCreateSecretsInput.Type;

// Output Schema
export const V1BulkCreateSecretsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1BulkCreateSecretsOutput = typeof V1BulkCreateSecretsOutput.Type;

// The operation
/**
 * Bulk create secrets
 *
 * Creates multiple secrets and adds them to the specified project.
 *
 * @param ref - Project ref
 */
export const v1BulkCreateSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1BulkCreateSecretsInput,
  outputSchema: V1BulkCreateSecretsOutput,
}));
