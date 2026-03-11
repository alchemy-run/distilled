import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllSecretsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/secrets" }));
export type V1ListAllSecretsInput = typeof V1ListAllSecretsInput.Type;

// Output Schema
export const V1ListAllSecretsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    name: Schema.String,
    value: Schema.String,
    updated_at: Schema.optional(Schema.String),
  }),
);
export type V1ListAllSecretsOutput = typeof V1ListAllSecretsOutput.Type;

// The operation
/**
 * List all secrets
 *
 * Returns all secrets you've previously added to the specified project.
 *
 * @param ref - Project ref
 */
export const v1ListAllSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListAllSecretsInput,
  outputSchema: V1ListAllSecretsOutput,
}));
