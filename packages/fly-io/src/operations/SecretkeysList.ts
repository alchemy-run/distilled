import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretkeysListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  min_version: Schema.optional(Schema.String),
  types: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/apps/{app_name}/secretkeys" }));
export type SecretkeysListInput = typeof SecretkeysListInput.Type;

// Output Schema
export const SecretkeysListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  secret_keys: Schema.optional(
    Schema.Array(
      Schema.Struct({
        created_at: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        public_key: Schema.optional(Schema.Array(Schema.Number)),
        type: Schema.optional(Schema.String),
        updated_at: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type SecretkeysListOutput = typeof SecretkeysListOutput.Type;

// The operation
/**
 * List secret keys belonging to an app
 *
 * @param app_name - Fly App Name
 * @param min_version - Minimum secrets version to return. Returned when setting a new secret
 * @param types - Comma-seperated list of secret keys to list
 */
export const SecretkeysList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretkeysListInput,
  outputSchema: SecretkeysListOutput,
}));
