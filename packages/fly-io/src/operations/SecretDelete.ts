import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({ method: "DELETE", path: "/apps/{app_name}/secrets/{secret_name}" }),
);
export type SecretDeleteInput = typeof SecretDeleteInput.Type;

// Output Schema
export const SecretDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  Version: Schema.optional(Schema.Number),
  version: Schema.optional(Schema.Number),
});
export type SecretDeleteOutput = typeof SecretDeleteOutput.Type;

// The operation
/**
 * Delete an app secret
 *
 * @param app_name - Fly App Name
 * @param secret_name - App secret name
 */
export const SecretDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretDeleteInput,
  outputSchema: SecretDeleteOutput,
}));
