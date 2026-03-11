import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  min_version: Schema.optional(Schema.String),
  show_secrets: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "GET", path: "/apps/{app_name}/secrets" }));
export type SecretsListInput = typeof SecretsListInput.Type;

// Output Schema
export const SecretsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  secrets: Schema.optional(
    Schema.Array(
      Schema.Struct({
        created_at: Schema.optional(Schema.String),
        digest: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        updated_at: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type SecretsListOutput = typeof SecretsListOutput.Type;

// The operation
/**
 * List app secrets belonging to an app
 *
 * @param app_name - Fly App Name
 * @param min_version - Minimum secrets version to return. Returned when setting a new secret
 * @param show_secrets - Show the secret values.
 */
export const SecretsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretsListInput,
  outputSchema: SecretsListOutput,
}));
