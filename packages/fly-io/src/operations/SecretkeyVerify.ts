import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretkeyVerifyInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
  min_version: Schema.optional(Schema.String),
  plaintext: Schema.optional(Schema.Array(Schema.Number)),
  signature: Schema.optional(Schema.Array(Schema.Number)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/secretkeys/{secret_name}/verify",
  }),
);
export type SecretkeyVerifyInput = typeof SecretkeyVerifyInput.Type;

// Output Schema
export const SecretkeyVerifyOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SecretkeyVerifyOutput = typeof SecretkeyVerifyOutput.Type;

// The operation
/**
 * Verify with a secret key
 *
 * @param app_name - Fly App Name
 * @param secret_name - Secret key name
 * @param min_version - Minimum secrets version to return. Returned when setting a new secret
 */
export const SecretkeyVerify = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretkeyVerifyInput,
  outputSchema: SecretkeyVerifyOutput,
}));
