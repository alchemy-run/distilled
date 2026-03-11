import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
  min_version: Schema.optional(Schema.String),
  show_secrets: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "GET", path: "/apps/{app_name}/secrets/{secret_name}" }),
);
export type SecretGetInput = typeof SecretGetInput.Type;

// Output Schema
export const SecretGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created_at: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updated_at: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
});
export type SecretGetOutput = typeof SecretGetOutput.Type;

// The operation
/**
 * Get an app secret
 *
 * @param app_name - Fly App Name
 * @param secret_name - App secret name
 * @param min_version - Minimum secrets version to return. Returned when setting a new secret
 * @param show_secrets - Show the secret value.
 */
export const SecretGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretGetInput,
  outputSchema: SecretGetOutput,
}));
