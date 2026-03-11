import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretkeySetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Array(Schema.Number)),
}).pipe(
  T.Http({ method: "POST", path: "/apps/{app_name}/secretkeys/{secret_name}" }),
);
export type SecretkeySetInput = typeof SecretkeySetInput.Type;

// Output Schema
export const SecretkeySetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  Version: Schema.optional(Schema.Number),
  created_at: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  public_key: Schema.optional(Schema.Array(Schema.Number)),
  type: Schema.optional(Schema.String),
  updated_at: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
});
export type SecretkeySetOutput = typeof SecretkeySetOutput.Type;

// The operation
/**
 * Create or update a secret key
 *
 * @param app_name - Fly App Name
 * @param secret_name - Secret key name
 */
export const SecretkeySet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretkeySetInput,
  outputSchema: SecretkeySetOutput,
}));
