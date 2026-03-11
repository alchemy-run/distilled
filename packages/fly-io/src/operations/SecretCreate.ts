import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
  value: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "POST", path: "/apps/{app_name}/secrets/{secret_name}" }),
);
export type SecretCreateInput = typeof SecretCreateInput.Type;

// Output Schema
export const SecretCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  Version: Schema.optional(Schema.Number),
  created_at: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updated_at: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
});
export type SecretCreateOutput = typeof SecretCreateOutput.Type;

// The operation
/**
 * Create or update Secret
 *
 * @param app_name - Fly App Name
 * @param secret_name - App secret name
 */
export const SecretCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretCreateInput,
  outputSchema: SecretCreateOutput,
}));
