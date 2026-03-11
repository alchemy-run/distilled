import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretkeyDecryptInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
  min_version: Schema.optional(Schema.String),
  associated_data: Schema.optional(Schema.Array(Schema.Number)),
  ciphertext: Schema.optional(Schema.Array(Schema.Number)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/secretkeys/{secret_name}/decrypt",
  }),
);
export type SecretkeyDecryptInput = typeof SecretkeyDecryptInput.Type;

// Output Schema
export const SecretkeyDecryptOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    plaintext: Schema.optional(Schema.Array(Schema.Number)),
  },
);
export type SecretkeyDecryptOutput = typeof SecretkeyDecryptOutput.Type;

// The operation
/**
 * Decrypt with a secret key
 *
 * @param app_name - Fly App Name
 * @param secret_name - Secret key name
 * @param min_version - Minimum secrets version to return. Returned when setting a new secret
 */
export const SecretkeyDecrypt = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretkeyDecryptInput,
  outputSchema: SecretkeyDecryptOutput,
}));
