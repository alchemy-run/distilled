import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretkeySignInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
  min_version: Schema.optional(Schema.String),
  plaintext: Schema.optional(Schema.Array(Schema.Number)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/secretkeys/{secret_name}/sign",
  }),
);
export type SecretkeySignInput = typeof SecretkeySignInput.Type;

// Output Schema
export const SecretkeySignOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  signature: Schema.optional(Schema.Array(Schema.Number)),
});
export type SecretkeySignOutput = typeof SecretkeySignOutput.Type;

// The operation
/**
 * Sign with a secret key
 *
 * @param app_name - Fly App Name
 * @param secret_name - Secret key name
 * @param min_version - Minimum secrets version to return. Returned when setting a new secret
 */
export const SecretkeySign = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretkeySignInput,
  outputSchema: SecretkeySignOutput,
}));
