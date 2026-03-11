import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretkeyEncryptInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
  min_version: Schema.optional(Schema.String),
  associated_data: Schema.optional(Schema.Array(Schema.Number)),
  plaintext: Schema.optional(Schema.Array(Schema.Number)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/secretkeys/{secret_name}/encrypt",
  }),
);
export type SecretkeyEncryptInput = typeof SecretkeyEncryptInput.Type;

// Output Schema
export const SecretkeyEncryptOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ciphertext: Schema.optional(Schema.Array(Schema.Number)),
  },
);
export type SecretkeyEncryptOutput = typeof SecretkeyEncryptOutput.Type;

// The operation
/**
 * Encrypt with a secret key
 *
 * @param app_name - Fly App Name
 * @param secret_name - Secret key name
 * @param min_version - Minimum secrets version to return. Returned when setting a new secret
 */
export const SecretkeyEncrypt = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretkeyEncryptInput,
  outputSchema: SecretkeyEncryptOutput,
}));
